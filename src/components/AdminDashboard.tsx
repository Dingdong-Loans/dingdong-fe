import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLendingCore } from '@/hooks/use-lending-core';
import { useToast } from '@/hooks/use-toast';
import { parseEther } from 'viem';

// Common role hashes (you should get these from your contract)
const ROLES = {
    DEFAULT_ADMIN_ROLE: '0x0000000000000000000000000000000000000000000000000000000000000000' as const,
    PAUSER_ROLE: '0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a' as const,
    MANAGER_ROLE: '0x241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b08' as const,
};

const AdminDashboard = () => {
    const {
        loading,
        error,
        isConnected,
        address,
        // Admin functions
        pause,
        unpause,
        grantRole,
        revokeRole,
        hasRole,
        setLTV,
        setMaxBorrowAmount,
        setLiquidationPenalty,
        addBorrowToken,
        removeBorrowToken,
        isPaused,
        getLtvBPS,
        getMaxBorrowAmount,
        getLiquidationPenaltyBPS,
    } = useLendingCore();

    const { toast } = useToast();

    // State for form inputs
    const [newAdmin, setNewAdmin] = useState('');
    const [roleToGrant, setRoleToGrant] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [ltvValue, setLtvValue] = useState('');
    const [maxBorrowValue, setMaxBorrowValue] = useState('');
    const [liquidationPenaltyValue, setLiquidationPenaltyValue] = useState('');

    // State for contract data
    const [contractPaused, setContractPaused] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentLTV, setCurrentLTV] = useState('0');
    const [currentMaxBorrow, setCurrentMaxBorrow] = useState('0');
    const [currentLiquidationPenalty, setCurrentLiquidationPenalty] = useState('0');

    // Load admin data
    const loadAdminData = useCallback(async () => {
        if (!address) return;

        try {
            const [paused, adminRole] = await Promise.all([
                isPaused(),
                hasRole(ROLES.DEFAULT_ADMIN_ROLE, address as `0x${string}`),
            ]);

            setContractPaused(paused as boolean);
            setIsAdmin(adminRole as boolean);

            // Load parameters if user is admin
            if (adminRole) {
                const [ltv, maxBorrow, penalty] = await Promise.all([
                    getLtvBPS('0x0000000000000000000000000000000000000000' as `0x${string}`), // You'll need to pass the correct token address
                    getMaxBorrowAmount('0x0000000000000000000000000000000000000000' as `0x${string}`), // You'll need to pass the correct token address
                    getLiquidationPenaltyBPS('0x0000000000000000000000000000000000000000' as `0x${string}`), // You'll need to pass the correct token address
                ]);

                setCurrentLTV(((ltv as bigint) / 100n).toString());
                setCurrentMaxBorrow((maxBorrow as bigint).toString());
                setCurrentLiquidationPenalty(((penalty as bigint) / 100n).toString());
            }
        } catch (err) {
            console.error('Error loading admin data:', err);
        }
    }, [address, isPaused, hasRole, getLtvBPS, getMaxBorrowAmount, getLiquidationPenaltyBPS]);

    useEffect(() => {
        if (isConnected) {
            loadAdminData();
        }
    }, [isConnected, loadAdminData]);

    const handlePauseContract = async () => {
        try {
            await pause();
            await loadAdminData();
            toast({
                title: "Success",
                description: "Contract paused successfully",
            });
        } catch (err) {
            console.error('Pause failed:', err);
        }
    };

    const handleUnpauseContract = async () => {
        try {
            await unpause();
            await loadAdminData();
            toast({
                title: "Success",
                description: "Contract unpaused successfully",
            });
        } catch (err) {
            console.error('Unpause failed:', err);
        }
    };

    const handleGrantRole = async () => {
        if (!newAdmin || !roleToGrant) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please fill in all fields",
            });
            return;
        }

        try {
            await grantRole(roleToGrant as `0x${string}`, newAdmin as `0x${string}`);
            setNewAdmin('');
            setRoleToGrant('');
            toast({
                title: "Success",
                description: "Role granted successfully",
            });
        } catch (err) {
            console.error('Grant role failed:', err);
        }
    };

    const handleRevokeRole = async () => {
        if (!newAdmin || !roleToGrant) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please fill in all fields",
            });
            return;
        }

        try {
            await revokeRole(roleToGrant as `0x${string}`, newAdmin as `0x${string}`);
            setNewAdmin('');
            setRoleToGrant('');
            toast({
                title: "Success",
                description: "Role revoked successfully",
            });
        } catch (err) {
            console.error('Revoke role failed:', err);
        }
    };

    const handleSetLTV = async () => {
        if (!ltvValue) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please enter LTV value",
            });
            return;
        }

        try {
            await setLTV(tokenAddress as `0x${string}`, parseInt(ltvValue) * 100); // Convert to basis points
            await loadAdminData();
            setLtvValue('');
            toast({
                title: "Success",
                description: "LTV updated successfully",
            });
        } catch (err) {
            console.error('Set LTV failed:', err);
        }
    };

    const handleSetMaxBorrow = async () => {
        if (!maxBorrowValue) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please enter max borrow amount",
            });
            return;
        }

        try {
            await setMaxBorrowAmount(tokenAddress as `0x${string}`, parseEther(maxBorrowValue));
            await loadAdminData();
            setMaxBorrowValue('');
            toast({
                title: "Success",
                description: "Max borrow amount updated successfully",
            });
        } catch (err) {
            console.error('Set max borrow failed:', err);
        }
    };

    const handleSetLiquidationPenalty = async () => {
        if (!liquidationPenaltyValue) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please enter liquidation penalty",
            });
            return;
        }

        try {
            await setLiquidationPenalty(tokenAddress as `0x${string}`, parseInt(liquidationPenaltyValue) * 100); // Convert to basis points
            await loadAdminData();
            setLiquidationPenaltyValue('');
            toast({
                title: "Success",
                description: "Liquidation penalty updated successfully",
            });
        } catch (err) {
            console.error('Set liquidation penalty failed:', err);
        }
    };

    const handleAddToken = async () => {
        if (!tokenAddress) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please enter token address",
            });
            return;
        }

        try {
            await addBorrowToken(tokenAddress as `0x${string}`, '0x0000000000000000000000000000000000000000' as `0x${string}`); // You'll need the price feed address
            setTokenAddress('');
            toast({
                title: "Success",
                description: "Token added successfully",
            });
        } catch (err) {
            console.error('Add token failed:', err);
        }
    };

    const handleRemoveToken = async () => {
        if (!tokenAddress) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please enter token address",
            });
            return;
        }

        try {
            await removeBorrowToken(tokenAddress as `0x${string}`);
            setTokenAddress('');
            toast({
                title: "Success",
                description: "Token removed successfully",
            });
        } catch (err) {
            console.error('Remove token failed:', err);
        }
    };

    if (!isConnected) {
        return (
            <div className="flex items-center justify-center h-64">
                <Card>
                    <CardHeader>
                        <CardTitle>Connect Wallet</CardTitle>
                        <CardDescription>
                            Please connect your wallet to access the admin dashboard
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center h-64">
                <Card>
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription>
                            You need admin privileges to access this dashboard
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex items-center space-x-2">
                    <Badge variant={contractPaused ? "destructive" : "default"}>
                        {contractPaused ? "Paused" : "Active"}
                    </Badge>
                    <Badge variant="secondary">Admin</Badge>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current Parameters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Current Parameters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label className="text-sm text-muted-foreground">LTV Ratio</Label>
                            <p className="text-2xl font-bold">{currentLTV}%</p>
                        </div>
                        <div>
                            <Label className="text-sm text-muted-foreground">Max Borrow Amount</Label>
                            <p className="text-lg">{currentMaxBorrow} ETH</p>
                        </div>
                        <div>
                            <Label className="text-sm text-muted-foreground">Liquidation Penalty</Label>
                            <p className="text-lg">{currentLiquidationPenalty}%</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Contract Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Contract Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>Contract State</span>
                            <Badge variant={contractPaused ? "destructive" : "default"}>
                                {contractPaused ? "Paused" : "Active"}
                            </Badge>
                        </div>
                        <div className="space-y-2">
                            <Button
                                onClick={handlePauseContract}
                                variant="destructive"
                                className="w-full"
                                disabled={loading || contractPaused}
                            >
                                Pause Contract
                            </Button>
                            <Button
                                onClick={handleUnpauseContract}
                                variant="default"
                                className="w-full"
                                disabled={loading || !contractPaused}
                            >
                                Unpause Contract
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button
                            onClick={() => loadAdminData()}
                            variant="outline"
                            className="w-full"
                            disabled={loading}
                        >
                            Refresh Data
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="parameters" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="parameters">Parameters</TabsTrigger>
                    <TabsTrigger value="roles">Roles</TabsTrigger>
                    <TabsTrigger value="tokens">Tokens</TabsTrigger>
                </TabsList>

                <TabsContent value="parameters" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Set LTV Ratio</CardTitle>
                                <CardDescription>
                                    Loan-to-Value ratio in percentage
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="ltvValue">LTV Percentage</Label>
                                    <Input
                                        id="ltvValue"
                                        type="number"
                                        placeholder="75"
                                        value={ltvValue}
                                        onChange={(e) => setLtvValue(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handleSetLTV}
                                    className="w-full"
                                    disabled={loading || !ltvValue}
                                >
                                    Update LTV
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Set Max Borrow</CardTitle>
                                <CardDescription>
                                    Maximum borrowable amount in ETH
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="maxBorrowValue">Amount (ETH)</Label>
                                    <Input
                                        id="maxBorrowValue"
                                        type="number"
                                        placeholder="1000"
                                        value={maxBorrowValue}
                                        onChange={(e) => setMaxBorrowValue(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handleSetMaxBorrow}
                                    className="w-full"
                                    disabled={loading || !maxBorrowValue}
                                >
                                    Update Max Borrow
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Set Liquidation Penalty</CardTitle>
                                <CardDescription>
                                    Penalty percentage for liquidations
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="liquidationPenaltyValue">Penalty Percentage</Label>
                                    <Input
                                        id="liquidationPenaltyValue"
                                        type="number"
                                        placeholder="5"
                                        value={liquidationPenaltyValue}
                                        onChange={(e) => setLiquidationPenaltyValue(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handleSetLiquidationPenalty}
                                    className="w-full"
                                    disabled={loading || !liquidationPenaltyValue}
                                >
                                    Update Penalty
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="roles" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Roles</CardTitle>
                            <CardDescription>
                                Grant or revoke admin roles
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="newAdmin">User Address</Label>
                                    <Input
                                        id="newAdmin"
                                        placeholder="0x..."
                                        value={newAdmin}
                                        onChange={(e) => setNewAdmin(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="roleToGrant">Role</Label>
                                    <select
                                        id="roleToGrant"
                                        value={roleToGrant}
                                        onChange={(e) => setRoleToGrant(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="">Select role</option>
                                        <option value={ROLES.DEFAULT_ADMIN_ROLE}>Admin Role</option>
                                        <option value={ROLES.PAUSER_ROLE}>Pauser Role</option>
                                        <option value={ROLES.MANAGER_ROLE}>Manager Role</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    onClick={handleGrantRole}
                                    className="flex-1"
                                    disabled={loading || !newAdmin || !roleToGrant}
                                >
                                    Grant Role
                                </Button>
                                <Button
                                    onClick={handleRevokeRole}
                                    variant="destructive"
                                    className="flex-1"
                                    disabled={loading || !newAdmin || !roleToGrant}
                                >
                                    Revoke Role
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="tokens" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Tokens</CardTitle>
                            <CardDescription>
                                Add or remove supported borrow tokens
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="tokenAddress">Token Address</Label>
                                <Input
                                    id="tokenAddress"
                                    placeholder="0x..."
                                    value={tokenAddress}
                                    onChange={(e) => setTokenAddress(e.target.value)}
                                />
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    onClick={handleAddToken}
                                    className="flex-1"
                                    disabled={loading || !tokenAddress}
                                >
                                    Add Token
                                </Button>
                                <Button
                                    onClick={handleRemoveToken}
                                    variant="destructive"
                                    className="flex-1"
                                    disabled={loading || !tokenAddress}
                                >
                                    Remove Token
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;
