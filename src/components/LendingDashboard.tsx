import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLendingCore, type Loan } from '@/hooks/use-lending-core';
import { useToast } from '@/hooks/use-toast';
import { formatEther, parseEther } from 'viem';
import { SUPPORTED_COLLATERAL_TOKENS, SUPPORTED_BORROW_TOKENS } from '@/lib/contract-utils';
import { useBatchGetDepositedCollateral } from '@/hooks/use-collateral-managerv2';
import { useAccount } from 'wagmi';

const LendingDashboard = () => {
    const {
        loading,
        error,
        isConnected,
        address,
        // Read functions
        getBorrowTokens,
        getAvailableSupply,
        getUserLoan,
        getCurrentInterestRateBPS,
        getUtilizationBPS,
        getTotalSupply,
        isPaused,
        // Write functions
        borrow,
        depositCollateral,
        repay,
        withdrawCollateral,
        addLiquidity,
        removeLiquidity,
    } = useLendingCore();

    const { address: walletAddress } = useAccount();
    const { collaterals, isLoading, error: fetchError, refetch } = useBatchGetDepositedCollateral(walletAddress);

    // useEffect(() => { console.log(collaterals) }, [collaterals]);

    // useEffect(() => { setInterval(() => { refetch() }, 10000) }, [])

    const { toast } = useToast();

    // Refs to prevent infinite loops
    const isLoadingRef = useRef(false);
    const lastLoadedTokenRef = useRef<string>('');

    // State for form inputs
    const [borrowAmount, setBorrowAmount] = useState('');
    const [collateralAmount, setCollateralAmount] = useState('');
    const [duration, setDuration] = useState('30');
    const [borrowToken, setBorrowToken] = useState<string>('');
    const [collateralToken, setCollateralToken] = useState<string>('');
    const [liquidityAmount, setLiquidityAmount] = useState('');
    const [repayAmount, setRepayAmount] = useState('');
    const [repayToken, setRepayToken] = useState<string>('');

    // State for contract data
    const [borrowTokens, setBorrowTokens] = useState<string[]>([]);
    const [userLoan, setUserLoan] = useState<Loan | null>(null);
    const [contractPaused, setContractPaused] = useState(false);
    const [availableSupply, setAvailableSupply] = useState<string>('0');
    const [totalSupply, setTotalSupply] = useState<string>('0');
    const [utilizationBPS, setUtilizationBPS] = useState<string>('0');
    const [interestRateBPS, setInterestRateBPS] = useState<string>('0');

    // Load initial data - using refs to prevent infinite loops
    const loadContractData = useCallback(async () => {
        if (isLoadingRef.current) return; // Prevent concurrent calls
        isLoadingRef.current = true;

        try {
            // Load borrow tokens
            const tokens = await getBorrowTokens() as string[];
            setBorrowTokens(tokens);

            // Set default tokens if available
            if (tokens.length > 0) {
                setBorrowToken(tokens[0]);
                setCollateralToken(tokens[0]); // You might want different logic here
            }

            // Load paused state
            const paused = await isPaused() as boolean;
            setContractPaused(paused);

            // Load user loan if address and collateralToken are available
            if (address && collateralToken && collateralToken.startsWith('0x') && collateralToken.length === 42) {
                const loan = await getUserLoan(address as `0x${string}`, collateralToken as `0x${string}`) as Loan;
                setUserLoan(loan);
            }

        } catch (err) {
            console.error('Error loading contract data:', err);
        } finally {
            isLoadingRef.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, collateralToken]); // Manual dependency control

    // Only load data when connection status changes
    useEffect(() => {
        if (isConnected && !isLoadingRef.current) {
            loadContractData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected]); // Manual control to prevent loops

    // Load token-specific data when token changes
    const loadTokenData = useCallback(async (token: `0x${string}`) => {
        // Prevent duplicate calls for the same token
        if (lastLoadedTokenRef.current === token || isLoadingRef.current) return;

        lastLoadedTokenRef.current = token;
        isLoadingRef.current = true;

        try {
            const currentDuration = BigInt(duration) * 24n * 60n * 60n; // Convert days to seconds
            const [supply, total, utilization, interestRate] = await Promise.all([
                getAvailableSupply(token),
                getTotalSupply(token),
                getUtilizationBPS(token),
                getCurrentInterestRateBPS(token, currentDuration),
            ]);

            setAvailableSupply(formatEther(supply as bigint));
            setTotalSupply(formatEther(total as bigint));
            setUtilizationBPS(((utilization as bigint) / 100n).toString());
            setInterestRateBPS(((interestRate as bigint) / 100n).toString());
        } catch (err) {
            console.error('Error loading token data:', err);
        } finally {
            isLoadingRef.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [duration]); // Manual dependency control

    // Load token data only when borrowToken changes, with guards
    useEffect(() => {
        if (borrowToken && borrowToken.startsWith('0x') && borrowToken.length === 42 && borrowToken !== lastLoadedTokenRef.current) {
            const timeoutId = setTimeout(() => {
                loadTokenData(borrowToken as `0x${string}`);
            }, 500); // 500ms debounce to prevent rapid calls

            return () => clearTimeout(timeoutId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [borrowToken]); // Manual control

    const handleBorrow = async () => {
        if (!borrowAmount || !collateralToken || !duration) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please fill in all required fields",
            });
            return;
        }

        try {
            const borrowAmountParsed = parseBorrowTokenAmount(borrowAmount, borrowToken);

            await borrow(
                borrowToken as `0x${string}`,
                borrowAmountParsed,
                collateralToken as `0x${string}`,
                BigInt(duration) * 24n * 60n * 60n // Convert days to seconds
            );

            // Refresh data after successful transaction
            await loadContractData();
            setBorrowAmount('');
        } catch (err) {
            console.error('Borrow failed:', err);
        }
    };

    const handleDepositCollateral = async () => {
        if (!collateralAmount || !collateralToken) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please enter collateral amount and select token",
            });
            return;
        }

        try {
            // Parse amount with correct decimals
            const amount = parseTokenAmount(collateralAmount, collateralToken);

            await depositCollateral(
                collateralToken as `0x${string}`,
                amount
            );

            await loadContractData();
            setCollateralAmount('');
        } catch (err) {
            console.error('Deposit failed:', err);
        }
    };

    const parseTokenAmount = (amount: string, tokenAddress: string): bigint => {
        const selectedToken = SUPPORTED_COLLATERAL_TOKENS.find(
            token => token.CONTRACT_ADDRESS === tokenAddress
        );

        if (!selectedToken) {
            toast({
                variant: "destructive",
                title: "Invalid Token",
                description: "Selected collateral token is not supported",
            });
            throw new Error("Selected collateral token is not supported");
        }

        return BigInt(Math.floor(parseFloat(amount) * 10 ** selectedToken.DECIMALS));
    };

    const parseBorrowTokenAmount = (amount: string, tokenAddress: string): bigint => {
        const selectedToken = SUPPORTED_BORROW_TOKENS.find(
            token => token.CONTRACT_ADDRESS === tokenAddress
        );

        if (!selectedToken) {
            toast({
                variant: "destructive",
                title: "Invalid Token",
                description: "Selected borrow token is not supported",
            });
            throw new Error("Selected borrow token is not supported");
        }

        return BigInt(Math.floor(parseFloat(amount) * 10 ** selectedToken.DECIMALS));
    };

    // Helper function to get token symbol from contract address
    const getBorrowTokenSymbol = (tokenAddress: string): string => {
        const token = SUPPORTED_BORROW_TOKENS.find(
            t => t.CONTRACT_ADDRESS.toLowerCase() === tokenAddress.toLowerCase()
        );
        return token?.TOKEN_SYMBOL || 'Unknown';
    };

    // Helper function to format amount based on token decimals
    const formatBorrowTokenAmount = (amount: bigint, tokenAddress: string): string => {
        const token = SUPPORTED_BORROW_TOKENS.find(
            t => t.CONTRACT_ADDRESS.toLowerCase() === tokenAddress.toLowerCase()
        );
        if (!token) return formatEther(amount);

        const divisor = BigInt(10 ** token.DECIMALS);
        const quotient = amount / divisor;
        const remainder = amount % divisor;
        const decimal = Number(remainder) / Number(divisor);
        return (Number(quotient) + decimal).toFixed(Math.min(token.DECIMALS, 6));
    };

    const handleWithdrawCollateral = async () => {
        if (!collateralAmount || !collateralToken) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please enter collateral amount and select token",
            });
            return;
        }

        try {
            const amount = parseTokenAmount(collateralAmount, collateralToken);

            await withdrawCollateral(
                collateralToken as `0x${string}`,
                amount
            );

            await loadContractData();
            setCollateralAmount('');
        } catch (err) {
            console.error('Withdraw failed:', err);
        }
    };

    const handleRepay = async () => {
        if (!repayAmount || !collateralToken || !repayToken) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please enter repay amount, select collateral token, and select repay token",
            });
            return;
        }

        try {
            const amount = parseBorrowTokenAmount(repayAmount, repayToken);

            await repay(
                collateralToken as `0x${string}`,
                amount
            );

            await loadContractData();
            setRepayAmount('');
        } catch (err) {
            console.error('Repay failed:', err);
        }
    };

    const handleAddLiquidity = async () => {
        if (!liquidityAmount || !borrowToken) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please enter amount and select token",
            });
            return;
        }

        try {
            const liquidityAmountParsed = parseBorrowTokenAmount(liquidityAmount, borrowToken);

            await addLiquidity(
                borrowToken as `0x${string}`,
                liquidityAmountParsed
            );

            await loadTokenData(borrowToken as `0x${string}`);
            setLiquidityAmount('');
        } catch (err) {
            console.error('Add liquidity failed:', err);
        }
    };

    const handleRemoveLiquidity = async () => {
        if (!liquidityAmount || !borrowToken) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please enter amount and select token",
            });
            return;
        }

        try {
            const liquidityAmountParsed = parseBorrowTokenAmount(liquidityAmount, borrowToken);

            await removeLiquidity(
                borrowToken as `0x${string}`,
                liquidityAmountParsed
            );

            await loadTokenData(borrowToken as `0x${string}`);
            setLiquidityAmount('');
        } catch (err) {
            console.error('Remove liquidity failed:', err);
        }
    };

    if (!isConnected) {
        return (
            <div className="flex items-center justify-center h-64">
                <Card>
                    <CardHeader>
                        <CardTitle>Connect Wallet</CardTitle>
                        <CardDescription>
                            Please connect your wallet to access the lending platform
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Lending Dashboard</h1>
                <div className="flex items-center space-x-2">
                    <Badge variant={contractPaused ? "destructive" : "default"}>
                        {contractPaused ? "Paused" : "Active"}
                    </Badge>
                    {loading && <Badge variant="secondary">Loading...</Badge>}
                </div>
            </div>

            {error && (
                <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                        <CardTitle className="text-red-800">Error</CardTitle>
                        <CardDescription className="text-red-600">{error}</CardDescription>
                    </CardHeader>
                </Card>
            )}
            {/* <Button onClick={() => {
                console.log("clicked");
                refetch();
            }}>TESTING</Button> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Market Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Market Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label className="text-sm text-muted-foreground">Available Supply</Label>
                            <p className="text-2xl font-bold">{availableSupply} ETH</p>
                        </div>
                        <div>
                            <Label className="text-sm text-muted-foreground">Total Supply</Label>
                            <p className="text-lg">{totalSupply} ETH</p>
                        </div>
                        <div>
                            <Label className="text-sm text-muted-foreground">Utilization Rate</Label>
                            <p className="text-lg">{utilizationBPS}%</p>
                        </div>
                        <div>
                            <Label className="text-sm text-muted-foreground">Interest Rate</Label>
                            <p className="text-lg">{interestRateBPS}%</p>
                        </div>
                    </CardContent>
                </Card>

                {/* User Loan Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Your Loan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {userLoan && userLoan.active ? (
                            <div className="space-y-2">

                                <div>
                                    <Label className="text-sm text-muted-foreground">Principal</Label>
                                    <p className="text-lg">{formatBorrowTokenAmount(userLoan.principal, userLoan.borrowToken)} {getBorrowTokenSymbol(userLoan.borrowToken)}</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">Interest Accrued</Label>
                                    <p className="text-lg">{formatBorrowTokenAmount(userLoan.interestAccrued, userLoan.borrowToken)} {getBorrowTokenSymbol(userLoan.borrowToken)}</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">Repaid Amount</Label>
                                    <p className="text-lg">{formatBorrowTokenAmount(userLoan.repaidAmount, userLoan.borrowToken)} {getBorrowTokenSymbol(userLoan.borrowToken)}</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">Due Date</Label>
                                    <p className="text-sm">{new Date(userLoan.dueDate * 1000).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No active loan</p>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button
                            onClick={() => {
                                if (!isLoadingRef.current) {
                                    lastLoadedTokenRef.current = ''; // Reset to force reload
                                    loadContractData();
                                }
                            }}
                            variant="outline"
                            className="w-full"
                            disabled={loading || isLoadingRef.current}
                        >
                            Refresh Data
                        </Button>
                        <Button
                            onClick={() => {
                                if (!isLoadingRef.current && borrowToken) {
                                    lastLoadedTokenRef.current = ''; // Reset to force reload
                                    loadTokenData(borrowToken as `0x${string}`);
                                }
                            }}
                            variant="outline"
                            className="w-full"
                            disabled={loading || !borrowToken || isLoadingRef.current}
                        >
                            Refresh Token Data
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="borrow" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="borrow">Borrow</TabsTrigger>
                    <TabsTrigger value="collateral">Collateral</TabsTrigger>
                    <TabsTrigger value="repay">Repay</TabsTrigger>
                    <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
                </TabsList>

                <TabsContent value="borrow" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Borrow Funds</CardTitle>
                            <CardDescription>
                                Borrow tokens by providing collateral
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="borrowToken">Borrow Token</Label>
                                    <select
                                        id="borrowToken"
                                        value={borrowToken}
                                        onChange={(e) => setBorrowToken(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="">Select token</option>
                                        {SUPPORTED_BORROW_TOKENS.map((token) => (
                                            <option key={token.CONTRACT_ADDRESS} value={token.CONTRACT_ADDRESS}>
                                                {token.TOKEN_SYMBOL} - {token.TOKEN_NAME}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="borrowAmount">
                                        Amount ({SUPPORTED_BORROW_TOKENS.find(t => t.CONTRACT_ADDRESS === borrowToken)?.TOKEN_SYMBOL || 'Token'})
                                    </Label>
                                    <Input
                                        id="borrowAmount"
                                        type="number"
                                        placeholder="0.0"
                                        value={borrowAmount}
                                        onChange={(e) => setBorrowAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="collateralToken">Collateral Token</Label>
                                    <select
                                        id="collateralToken"
                                        value={collateralToken}
                                        onChange={(e) => setCollateralToken(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="">Select collateral token</option>
                                        {SUPPORTED_COLLATERAL_TOKENS.map((token) => (
                                            <option key={token.CONTRACT_ADDRESS} value={token.CONTRACT_ADDRESS}>
                                                {token.TOKEN_SYMBOL} - {token.TOKEN_NAME}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration (days)</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Button
                                onClick={handleBorrow}
                                className="w-full"
                                disabled={loading || !borrowAmount || !collateralToken}
                            >
                                {loading ? 'Processing...' : 'Borrow'}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="collateral" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Collateral</CardTitle>
                            <CardDescription>
                                Deposit or withdraw collateral
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="collateralTokenManage">Collateral Token</Label>
                                    <select
                                        id="collateralTokenManage"
                                        value={collateralToken}
                                        onChange={(e) => setCollateralToken(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="">Select collateral token</option>
                                        {SUPPORTED_COLLATERAL_TOKENS.map((token) => (
                                            <option key={token.CONTRACT_ADDRESS} value={token.CONTRACT_ADDRESS}>
                                                {token.TOKEN_SYMBOL} - {token.TOKEN_NAME}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="collateralAmountManage">
                                        Amount ({SUPPORTED_COLLATERAL_TOKENS.find(t => t.CONTRACT_ADDRESS === collateralToken)?.TOKEN_SYMBOL || 'Token'})
                                    </Label>
                                    <Input
                                        id="collateralAmountManage"
                                        type="number"
                                        placeholder="0.0"
                                        value={collateralAmount}
                                        onChange={(e) => setCollateralAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    onClick={handleDepositCollateral}
                                    className="flex-1"
                                    disabled={loading || !collateralAmount}
                                >
                                    Deposit
                                </Button>
                                <Button
                                    onClick={handleWithdrawCollateral}
                                    variant="outline"
                                    className="flex-1"
                                    disabled={loading || !collateralAmount}
                                >
                                    Withdraw
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="repay" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Repay Loan</CardTitle>
                            <CardDescription>
                                Repay your outstanding loan
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="repayCollateralToken">Collateral Token (Loan Identity)</Label>
                                    <select
                                        id="repayCollateralToken"
                                        value={collateralToken}
                                        onChange={(e) => setCollateralToken(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="">Select collateral token</option>
                                        {SUPPORTED_COLLATERAL_TOKENS.map((token) => (
                                            <option key={token.CONTRACT_ADDRESS} value={token.CONTRACT_ADDRESS}>
                                                {token.TOKEN_SYMBOL} - {token.TOKEN_NAME}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="repayToken">Repay With Token</Label>
                                    <select
                                        id="repayToken"
                                        value={repayToken}
                                        onChange={(e) => setRepayToken(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="">Select repay token</option>
                                        {SUPPORTED_BORROW_TOKENS.map((token) => (
                                            <option key={token.CONTRACT_ADDRESS} value={token.CONTRACT_ADDRESS}>
                                                {token.TOKEN_SYMBOL} - {token.TOKEN_NAME}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="repayAmount">
                                        Repay Amount ({SUPPORTED_BORROW_TOKENS.find(t => t.CONTRACT_ADDRESS === repayToken)?.TOKEN_SYMBOL || 'Token'})
                                    </Label>
                                    <Input
                                        id="repayAmount"
                                        type="number"
                                        placeholder="0.0"
                                        value={repayAmount}
                                        onChange={(e) => setRepayAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Button
                                onClick={handleRepay}
                                className="w-full"
                                disabled={loading || !repayAmount || !collateralToken || !repayToken}
                            >
                                {loading ? 'Processing...' : 'Repay'}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="liquidity" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Liquidity</CardTitle>
                            <CardDescription>
                                Add or remove liquidity from the protocol
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="liquidityToken">Token</Label>
                                    <select
                                        id="liquidityToken"
                                        value={borrowToken}
                                        onChange={(e) => setBorrowToken(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="">Select token</option>
                                        {SUPPORTED_BORROW_TOKENS.map((token) => (
                                            <option key={token.CONTRACT_ADDRESS} value={token.CONTRACT_ADDRESS}>
                                                {token.TOKEN_SYMBOL} - {token.TOKEN_NAME}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="liquidityAmountInput">
                                        Amount ({SUPPORTED_BORROW_TOKENS.find(t => t.CONTRACT_ADDRESS === borrowToken)?.TOKEN_SYMBOL || 'Token'})
                                    </Label>
                                    <Input
                                        id="liquidityAmountInput"
                                        type="number"
                                        placeholder="0.0"
                                        value={liquidityAmount}
                                        onChange={(e) => setLiquidityAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    onClick={handleAddLiquidity}
                                    className="flex-1"
                                    disabled={loading || !liquidityAmount}
                                >
                                    Add Liquidity
                                </Button>
                                <Button
                                    onClick={handleRemoveLiquidity}
                                    variant="outline"
                                    className="flex-1"
                                    disabled={loading || !liquidityAmount}
                                >
                                    Remove Liquidity
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default LendingDashboard;
