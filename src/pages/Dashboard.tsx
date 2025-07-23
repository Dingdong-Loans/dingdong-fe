import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useState, useEffect, useCallback, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PlusCircle,
  CreditCard,
  ArrowRight,
  Wallet,
  Banknote,
  HandCoins,
  CheckCircle,
  XCircle,
  RefreshCw
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useWallet } from "@/hooks/use-wallet";
import { useLendingCore, Loan } from "@/hooks/use-lending-core";
import { useRepayLoan, useGetBatchUserLoan } from "@/hooks/use-lending-corev2";
import { SUPPORTED_BORROW_TOKENS, SUPPORTED_COLLATERAL_TOKENS } from "@/lib/contract-utils";
import { formatEther } from "viem";

const Dashboard = () => {
  const { address, isConnected, balance, connect } = useWallet();
  const {
    loading: contractLoading,
    error,
    // Read functions
    getBorrowTokens,
    getAvailableSupply,
    getUserLoan,
    getCurrentInterestRateBPS,
    getUtilizationBPS,
    getTotalSupply,
    isPaused,
  } = useLendingCore();

  // Hooks from lending-corev2
  const {
    repayLoan,
    isPending: isRepayPending,
    isWaiting: isRepayWaiting,
    isSuccess: isRepaySuccess,
  } = useRepayLoan();

  // New batch user loan hook
  const {
    loans: batchUserLoans,
    isLoading: isBatchUserLoansLoading,
    error: batchUserLoansError,
    refetchUserLoans: refetchBatchUserLoans
  } = useGetBatchUserLoan(
    address as `0x${string}`,
  );

  useEffect(() => { console.log(batchUserLoans) }, [batchUserLoans])

  const { toast } = useToast();

  // Refs to prevent infinite loops
  const isLoadingRef = useRef(false);
  const lastLoadedTokenRef = useRef<string>('');

  // UI loading state
  const [loading, setLoading] = useState(true);
  const [userName] = useState("Andro");

  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<LoanData | null>(null);

  const [repaymentType, setRepaymentType] = useState("monthly");
  const [customAmount, setCustomAmount] = useState("");

  // Contract data state
  const [borrowTokens, setBorrowTokens] = useState<string[]>([]);
  const [userLoans, setUserLoans] = useState<Array<Loan & { collateralTokenAddress?: string }>>([]);
  const [contractPaused, setContractPaused] = useState(false);
  // New metrics based on user loans
  const [totalBorrowingValue, setTotalBorrowingValue] = useState<string>('0');
  const [totalLoanValue, setTotalLoanValue] = useState<string>('0');
  const [totalInterestRate, setTotalInterestRate] = useState<string>('0');
  // Legacy state for backward compatibility
  const [availableSupply, setAvailableSupply] = useState<string>('0');
  const [totalSupply, setTotalSupply] = useState<string>('0');
  const [utilizationBPS, setUtilizationBPS] = useState<string>('0');
  const [interestRateBPS, setInterestRateBPS] = useState<string>('0');

  // Define loan data type for UI
  interface LoanData {
    id: string;
    date: string;
    collateral: string;
    tenor: string;
    amount: string;
    size: string;
    status: "active" | "inactive";
    monthlyPayment: string;
    interestRate: string;
    dueDate: string;
    contractLoan?: Loan;
    collateralToken?: string;
  }

  // Mock data for demo - replace with real contract data
  const [walletBalance, setWalletBalance] = useState(150000000); // Example balance: 150 Million IDRX

  // Load token-specific data
  const loadTokenData = useCallback(async (token: `0x${string}`) => {
    if (lastLoadedTokenRef.current === token || isLoadingRef.current) return;

    lastLoadedTokenRef.current = token;
    isLoadingRef.current = true;

    try {
      const currentDuration = BigInt(30) * 24n * 60n * 60n; // 30 days in seconds
      const [supply, total, utilization, interestRate] = await Promise.all([
        getAvailableSupply(token),
        getTotalSupply(token),
        getUtilizationBPS(token),
        getCurrentInterestRateBPS(token, currentDuration),
      ]);

      // Store the original values in the legacy state variables for reference/backup
      setAvailableSupply(formatEther(supply as bigint));
      setTotalSupply(formatEther(total as bigint));
      setUtilizationBPS(((utilization as bigint) / 100n).toString());
      setInterestRateBPS(((interestRate as bigint) / 100n).toString());

      // Note: We no longer use these values for UI display
      // Instead, we calculate the new metrics in loadContractData from userLoans
    } catch (err) {
      console.error('Error loading token data:', err);
    } finally {
      isLoadingRef.current = false;
    }
  }, [getAvailableSupply, getTotalSupply, getUtilizationBPS, getCurrentInterestRateBPS]);

  // Load initial contract data
  const loadContractData = useCallback(async () => {
    if (isLoadingRef.current || !isConnected || !address) return;
    isLoadingRef.current = true;

    try {
      // Load borrow tokens
      const tokens = await getBorrowTokens() as string[];
      setBorrowTokens(tokens);

      // Load paused state
      const paused = await isPaused() as boolean;
      setContractPaused(paused);

      // Refresh batch user loans data
      await refetchBatchUserLoans();

      // Initialize state to zero values in case we don't find any loans
      setTotalBorrowingValue("0.00");
      setTotalLoanValue("0.00");
      setTotalInterestRate("0.00");

      // Process the batch user loans data
      const loansWithCollateral: Array<Loan & { collateralTokenAddress: string }> = [];
      let totalBorrowing = 0;
      let totalLoan = 0;
      let totalInterest = 0;
      let loanCount = 0;

      // If we have batch user loans data, process it
      if (batchUserLoans && batchUserLoans.length > 0) {
        batchUserLoans.forEach((loanData) => {
          if (loanData && loanData.active) {
            // Add loan to array
            loansWithCollateral.push({
              ...loanData,
              collateralTokenAddress: loanData.borrowToken
            });

            // Find borrow token info
            const borrowToken = SUPPORTED_BORROW_TOKENS.find(
              t => t.CONTRACT_ADDRESS.toLowerCase() === loanData.borrowToken.toLowerCase()
            );

            if (borrowToken) {
              const divisor = BigInt(10 ** borrowToken.DECIMALS);

              // Calculate values in USD equivalent
              const principalValue = Number(loanData.principal) / Number(divisor);
              const interestValue = Number(loanData.interestAccrued) / Number(divisor);
              const repaidValue = Number(loanData.repaidAmount) / Number(divisor);
              const outstandingPrincipal = principalValue - repaidValue;
              totalBorrowing += outstandingPrincipal > 0 ? outstandingPrincipal : 0;

              // Total loan value (principal plus interest minus repaid)
              const outstandingTotal = principalValue + interestValue - repaidValue;
              totalLoan += outstandingTotal > 0 ? outstandingTotal : 0;

              // Calculate interest rate as a percentage of the principal
              if (principalValue > 0) {
                totalInterest += (interestValue / principalValue) * 100;
                loanCount++;
              }
            }
          }
        });

        // Set all the state values
        setUserLoans(loansWithCollateral as Loan[]);
        setTotalBorrowingValue(totalBorrowing.toFixed(2));
        setTotalLoanValue(totalLoan.toFixed(2));

        // Calculate average interest rate if there are loans
        if (loanCount > 0) {
          setTotalInterestRate((totalInterest / loanCount).toFixed(2));
        } else {
          setTotalInterestRate("0.00");
        }
      } else {
        // No loans found
        setUserLoans([]);
      }

      // Load token data for first borrow token
      if (tokens.length > 0) {
        await loadTokenData(tokens[0] as `0x${string}`);
      }

    } catch (err) {
      console.error('Error loading contract data:', err);
    } finally {
      isLoadingRef.current = false;
    }
  }, [address, isConnected, getBorrowTokens, isPaused, refetchBatchUserLoans, batchUserLoans, loadTokenData]);

  // Helper functions for token handling
  const getBorrowTokenSymbol = (tokenAddress: string): string => {
    const token = SUPPORTED_BORROW_TOKENS.find(
      t => t.CONTRACT_ADDRESS.toLowerCase() === tokenAddress.toLowerCase()
    );
    return token?.TOKEN_SYMBOL || 'Unknown';
  };

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

  const getCollateralTokenSymbol = (tokenAddress: string): string => {
    const token = SUPPORTED_COLLATERAL_TOKENS.find(
      t => t.CONTRACT_ADDRESS.toLowerCase() === tokenAddress.toLowerCase()
    );
    return token?.TOKEN_SYMBOL || 'Unknown';
  };

  // Convert contract loans to UI format
  const convertContractLoansToUI = (contractLoans: Array<Loan & { collateralTokenAddress?: string }>): LoanData[] => {
    return contractLoans.map((loan, index) => {
      const borrowTokenSymbol = getBorrowTokenSymbol(loan.borrowToken);
      const collateralTokenSymbol = loan.collateralTokenAddress
        ? getCollateralTokenSymbol(loan.collateralTokenAddress)
        : 'Unknown';

      const principalAmount = formatBorrowTokenAmount(loan.principal, loan.borrowToken);
      const remainingAmount = formatBorrowTokenAmount(
        loan.principal + loan.interestAccrued,
        loan.borrowToken
      );

      // Calculate monthly payment (simplified - you might want more complex calculation)
      const monthsRemaining = Math.max(1, Math.ceil((loan.dueDate - Date.now() / 1000) / (30 * 24 * 60 * 60)));
      const monthlyPayment = (parseFloat(remainingAmount) / monthsRemaining).toFixed(2);

      return {
        id: `Loan #${index + 1}`,
        date: new Date(loan.startTime * 1000).toLocaleDateString('id-ID'),
        collateral: `${collateralTokenSymbol} Collateral`,
        tenor: `${Math.ceil((loan.dueDate - loan.startTime) / (30 * 24 * 60 * 60))} Bulan`,
        amount: principalAmount,
        size: remainingAmount,
        status: loan.active ? "active" as const : "inactive" as const,
        monthlyPayment: monthlyPayment,
        interestRate: "Variable", // You'd calculate this from interest accrued
        dueDate: new Date(loan.dueDate * 1000).toLocaleDateString('id-ID'),
        contractLoan: loan,
        collateralToken: loan.collateralTokenAddress // This is now the actual collateral token address
      };
    });
  };

  // Load data when wallet connects
  useEffect(() => {
    if (isConnected && !isLoadingRef.current) {
      loadContractData();
    }
  }, [isConnected, loadContractData]);

  // Update state when batch user loans data changes
  useEffect(() => {
    if (isConnected && !isLoadingRef.current && batchUserLoans) {
      loadContractData();
    }
  }, [batchUserLoans, isConnected, loadContractData]);

  // UI loading timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const activeLoans: LoanData[] = isConnected && userLoans.length > 0
    ? convertContractLoansToUI(userLoans)
    : [];

  const portfolioItems = [
    {
      name: "Wrapped Bitcoin",
      symbol: "wBTC",
      amount: "0,25",
      valueIDR: "Rp 100.000.000",
      color: "bg-orange-500",
    },
    {
      name: "Wrapped Ethereum",
      symbol: "wETH",
      amount: "0,8",
      valueIDR: "Rp 20.000.000",
      color: "bg-gray-500",
    },
  ];

  const totalCollateralValue = 135000000;
  const totalOutstandingLoans = activeLoans
    .filter((loan) => loan.status === "active")
    .reduce(
      (acc, loan) => acc + parseFloat(loan.size.replace(/\./g, "")),
      0
    );

  const healthFactor =
    totalOutstandingLoans > 0
      ? totalCollateralValue / totalOutstandingLoans
      : 2.5;

  const getHealthFactorHslColor = (factor: number) => {
    if (factor < 1) return "hsl(var(--destructive))";
    if (factor === 1) return "hsl(48 96% 59%)"; // Yellow
    return "hsl(var(--primary))";
  };

  const healthFactorColor = getHealthFactorHslColor(healthFactor);

  const handlePaymentClick = (e: React.MouseEvent, loan: LoanData) => {
    e.stopPropagation();
    setSelectedLoan(loan);
    setRepaymentType("monthly");
    setCustomAmount("");
    setIsPaymentDialogOpen(true);
  };

  const handleDetailClick = (e: React.MouseEvent, loan: LoanData) => {
    e.stopPropagation();
    setSelectedLoan(loan);
    setIsDetailDialogOpen(true);
  };

  const openPaymentFromDetail = () => {
    setIsDetailDialogOpen(false);
    setIsPaymentDialogOpen(true);
  };

  const getRepaymentAmount = () => {
    if (!selectedLoan) return 0;
    // --- PERUBAHAN: Helper 'parseCurrency' sekarang juga menggunakan `replace(/\./g, '')` ---
    // Ini memastikan semua kalkulasi pembayaran menggunakan angka yang benar.
    const parseCurrency = (value: string) =>
      parseFloat(value.replace(/\./g, ""));

    if (repaymentType === "full") {
      if (selectedLoan.contractLoan) {
        // For contract loans, return principal + interest accrued
        const borrowToken = SUPPORTED_BORROW_TOKENS.find(
          t => t.CONTRACT_ADDRESS.toLowerCase() === selectedLoan.contractLoan!.borrowToken.toLowerCase()
        );
        if (!borrowToken) return 0;

        const totalOwed = selectedLoan.contractLoan.principal + selectedLoan.contractLoan.interestAccrued;
        return Number(totalOwed) / (10 ** borrowToken.DECIMALS);
      }
      return parseCurrency(selectedLoan.size);
    }

    if (repaymentType === "monthly")
      return parseCurrency(selectedLoan.monthlyPayment);
    return parseFloat(customAmount) || 0;
  };

  const paymentAmount = getRepaymentAmount();

  // Enhanced payment submission with actual smart contract interaction
  const handlePaymentSubmit = async () => {
    if (!selectedLoan) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Tidak ada pinjaman yang dipilih untuk dibayar.",
      });
      return;
    }

    const paymentAmount = getRepaymentAmount();
    console.log('Debug selectedLoan:', {
      selectedLoan,
      contractLoan: selectedLoan.contractLoan,
      collateralToken: selectedLoan.collateralToken,
      collateralTokenType: typeof selectedLoan.collateralToken
    });

    // For contract loans, use real repayment
    if (selectedLoan.contractLoan && selectedLoan.collateralToken && isConnected) {
      try {
        // Parse amount based on borrow token decimals
        const borrowToken = selectedLoan.contractLoan.borrowToken;
        const token = SUPPORTED_BORROW_TOKENS.find(
          t => t.CONTRACT_ADDRESS.toLowerCase() === borrowToken.toLowerCase()
        );

        if (!token) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Token tidak didukung untuk pembayaran.",
          });
          return;
        }

        // Get the collateral token address - must be a string
        const collateralTokenAddress = selectedLoan.collateralToken;

        console.log('Debug collateral token:', {
          collateralTokenAddress,
          type: typeof collateralTokenAddress,
          isString: typeof collateralTokenAddress === 'string'
        });

        if (!collateralTokenAddress || typeof collateralTokenAddress !== 'string') {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Collateral token address tidak valid atau bukan string.",
          });
          return;
        }

        // Validate that collateralToken is a valid collateral token address
        const collateralToken = SUPPORTED_COLLATERAL_TOKENS.find(
          t => t.CONTRACT_ADDRESS.toLowerCase() === collateralTokenAddress.toLowerCase()
        );

        if (!collateralToken) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Collateral token tidak didukung.",
          });
          return;
        }

        const repayAmountBigInt = BigInt(Math.floor(paymentAmount * 10 ** token.DECIMALS));

        console.log('Repaying loan:', {
          collateralTokenAddress: collateralTokenAddress,
          amount: repayAmountBigInt,
          borrowToken: borrowToken,
          tokenSymbol: token.TOKEN_SYMBOL
        });

        try {
          await repayLoan({
            collateralToken: collateralTokenAddress as `0x${string}`,
            amount: repayAmountBigInt
          });

          // Refresh data after successful transaction
          await refetchBatchUserLoans();          // The success toast is now handled by useRepayLoan's useEffect
          // but we can still show a custom message if needed
          toast({
            title: "Pembayaran Berhasil",
            description: (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>
                  Pembayaran sebesar {paymentAmount.toLocaleString('id-ID')} {token.TOKEN_SYMBOL} berhasil.
                </span>
              </div>
            ),
            className: "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
          });
        } catch (err) {
          // Error handling is already managed in the hook's useEffect
          console.error('Additional error details:', err);
        }

      } catch (err) {
        console.error('Repayment failed:', err);
        toast({
          variant: "destructive",
          title: "Pembayaran Gagal",
          description: "Transaksi pembayaran gagal. Silakan coba lagi.",
        });
      }
    } else {
      // Mock payment simulation for demo loans
      const isSuccess = walletBalance >= paymentAmount;

      if (isSuccess) {
        setWalletBalance(walletBalance - paymentAmount);

        toast({
          title: "Pembayaran Berhasil",
          description: (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>
                Pembayaran sebesar {paymentAmount.toLocaleString('id-ID')} IDRX berhasil.
              </span>
            </div>
          ),
          className: "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
        });

      } else {
        toast({
          variant: "destructive",
          title: "Pembayaran Gagal",
          description: (
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              <span>
                Saldo dompet tidak mencukupi untuk membayar {paymentAmount.toLocaleString('id-ID')} IDRX.
              </span>
            </div>
          ),
        });
      }
    }

    setIsPaymentDialogOpen(false);
  };

  return (
    <>
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />

        {/* Wallet Connection Banner */}
        {!isConnected && (
          <div className="bg-primary/10 border-b border-primary/20">
            <div className="container mx-auto px-20 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Connect your wallet to access lending features</p>
                    <p className="text-sm text-muted-foreground">Connect your wallet to view your loans and make payments</p>
                  </div>
                </div>
                <Button onClick={connect} className="bg-primary hover:bg-primary/90">
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        )}

        <main className="container mx-auto px-20 py-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <Skeleton className="h-10 w-1/2 mb-8" />
            ) : (
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-foreground">
                  Welcome back <span className="text-primary">{userName}</span>
                </h1>
                {isConnected && (
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Wallet Balance</p>
                      <p className="font-bold">{balance} ETH</p>
                    </div>
                    <Button
                      onClick={() => {
                        if (!isLoadingRef.current) {
                          lastLoadedTokenRef.current = '';
                          refetchBatchUserLoans();
                        }
                      }}
                      variant="outline"
                      size="sm"
                      disabled={contractLoading || isLoadingRef.current || isBatchUserLoansLoading}
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${(contractLoading || isLoadingRef.current || isBatchUserLoansLoading) ? 'animate-spin' : ''}`} />
                      Refresh Data
                    </Button>
                  </div>
                )}
              </div>
            )}

            {(error || batchUserLoansError) && (
              <Card className="border-red-200 bg-red-50 mb-6">
                <CardHeader>
                  <CardTitle className="text-red-800">Contract Error</CardTitle>
                  <p className="text-red-600">{error || String(batchUserLoansError)}</p>
                </CardHeader>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Top Info Cards */}
                {loading ? (
                  <SkeletonLoader type="stats_row" />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border shadow-sm">
                      <CardHeader className="flex flex-row items-center gap-1 space-y-0 pb-2">
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-sm font-medium">
                          {isConnected ? "Total Borrowing Value" : "Total Jaminan Aktif"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">
                          {isConnected
                            ? `$${totalBorrowingValue}`
                            : `Rp ${totalCollateralValue.toLocaleString("id-ID")}`
                          }
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isConnected ? "Principal minus repayments" : "+5.2% dari bulan lalu"}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border shadow-sm">
                      <CardHeader className="flex flex-row items-center gap-1 space-y-0 pb-2">
                        <Banknote className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-sm font-medium">
                          {isConnected ? "Total Loan Value" : "Sisa Pinjaman Aktif"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">
                          {isConnected
                            ? `$${totalLoanValue}`
                            : `Rp ${totalOutstandingLoans.toLocaleString("id-ID")}`
                          }
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isConnected ? "Principal plus interest" : "dari semua pinjaman"}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border shadow-sm">
                      <CardHeader className="flex flex-row items-center gap-1 space-y-0 pb-2">
                        <HandCoins className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-sm font-medium">
                          {isConnected ? "Total Interest Rate" : "Tersedia untuk Pinjam"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">
                          {isConnected
                            ? `${totalInterestRate}%`
                            : "Rp 75.000.000"
                          }
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isConnected
                            ? `Across all active loans`
                            : "Berdasarkan jaminan saat ini"
                          }
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Active Loans Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl font-bold">
                        {isConnected ? "Your Loans" : "Riwayat Pinjaman"}
                      </h2>
                      {isConnected && (
                        <div className="flex items-center gap-2">
                          <Badge variant={contractPaused ? "destructive" : "default"}>
                            {contractPaused ? "Contract Paused" : "Contract Active"}
                          </Badge>
                          {(contractLoading || isLoadingRef.current || isBatchUserLoansLoading) && (
                            <Badge variant="secondary">Loading...</Badge>
                          )}
                        </div>
                      )}
                    </div>
                    <Link to="/apply">
                      <Button variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        {isConnected ? "New Loan" : "Tambah Pinjaman"}
                      </Button>
                    </Link>
                  </div>
                  {loading ? (
                    <div className="space-y-4">
                      <SkeletonLoader type="loan_card" />
                      <SkeletonLoader type="loan_card" />
                    </div>
                  ) : activeLoans.length > 0 ? (
                    <div className="space-y-5">
                      {isConnected && userLoans.length === 0 && (
                        <Card className="border-dashed border-2 border-muted-foreground/25">
                          <CardContent className="flex flex-col items-center justify-center py-8">
                            <Banknote className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="font-semibold text-lg mb-2">No Active Loans</h3>
                            <p className="text-muted-foreground text-center mb-4">
                              You don't have any active loans yet. Start by applying for a loan with your collateral.
                            </p>
                            <Link to="/apply">
                              <Button>
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Apply for Loan
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      )}
                      {activeLoans.map((loan) => (
                        <Card
                          key={loan.id}
                          className={`group transition-all duration-300 rounded-lg overflow-hidden cursor-pointer bg-white hover:bg-gray-100 ${loan.contractLoan ? 'border-primary/30 bg-primary/5' : ''
                            }`}
                        >
                          <CardContent className="p-5 flex mb-3 flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0">
                            <div className="flex-1 flex flex-col min-w-0">
                              <div className="mb-4 space-y-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-bold text-lg">{loan.id}</p>
                                  {loan.contractLoan && (
                                    <Badge variant="outline" className="text-xs">
                                      Smart Contract
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Dibuat: {loan.date}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Tenor: {loan.tenor}
                                </p>
                                {loan.contractLoan && (
                                  <p className="text-sm text-muted-foreground">
                                    Borrow Token: {getBorrowTokenSymbol(loan.contractLoan.borrowToken)}
                                  </p>
                                )}
                                {loan.contractLoan && loan.collateralToken && (
                                  <p className="text-sm text-muted-foreground">
                                    Collateral: {getCollateralTokenSymbol(loan.collateralToken)}
                                  </p>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                {loan.status === "active" && (
                                  <Button
                                    size="sm"
                                    className="bg-primary text-white hover:bg-primary/90"
                                    onClick={(e) => handlePaymentClick(e, loan)}
                                    disabled={contractPaused && !!loan.contractLoan}
                                  >
                                    {loan.contractLoan ? "Repay Loan" : "Bayar Cicilan"}
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => handleDetailClick(e, loan)}
                                >
                                  Detail
                                </Button>
                              </div>
                            </div>

                            <div className="flex-shrink-0 text-right">
                              <p className="text-2xl font-bold">
                                {loan.contractLoan
                                  ? `${formatBorrowTokenAmount(loan.contractLoan.principal, loan.contractLoan.borrowToken)} ${getBorrowTokenSymbol(loan.contractLoan.borrowToken)}`
                                  : `Rp ${loan.amount}`
                                }
                              </p>
                              <p className="text-sm text-muted-foreground mb-2">
                                Sisa: {loan.contractLoan
                                  ? `${formatBorrowTokenAmount(
                                    loan.contractLoan.principal + loan.contractLoan.interestAccrued,
                                    loan.contractLoan.borrowToken
                                  )} ${getBorrowTokenSymbol(loan.contractLoan.borrowToken)}`
                                  : `Rp ${loan.size}`
                                }
                              </p>
                              {loan.status === "active" ? (
                                <Badge className="bg-primary/20 text-primary border-primary/30 hover:text-white">
                                  Aktif
                                </Badge>
                              ) : (
                                <Badge className="bg-muted text-muted-foreground hover:text-white">
                                  Non-aktif
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="border-dashed border-2 border-muted-foreground/25">
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Banknote className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="font-semibold text-lg mb-2">No Loans Found</h3>
                        <p className="text-muted-foreground text-center mb-4">
                          {isConnected
                            ? "You don't have any loans yet. Start by applying for a loan with your collateral."
                            : "Connect your wallet to view your loan history."
                          }
                        </p>
                        {isConnected ? (
                          <Link to="/apply">
                            <Button>
                              <PlusCircle className="w-4 h-4 mr-2" />
                              Apply for Loan
                            </Button>
                          </Link>
                        ) : (
                          <Button onClick={connect}>
                            <Wallet className="w-4 h-4 mr-2" />
                            Connect Wallet
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Right Sidebar */}
              <aside className="space-y-6">
                {loading ? (
                  <SkeletonLoader type="portfolio" />
                ) : (
                  <Card className="bg-primary rounded-2xl p-5">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-white">
                        {isConnected ? "Wallet & Portfolio" : "Portofolio Jaminan"}
                      </CardTitle>
                      <p className="text-xs text-white text-opacity-80">
                        {isConnected ? "Your connected wallet balance" : "Total aset yang Anda jaminkan"}
                      </p>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      {isConnected && (
                        <div className="bg-white/10 rounded-lg p-3 mb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
                                <Wallet className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="font-medium text-white">Wallet Balance</p>
                                <p className="text-sm text-white/80">
                                  {address?.slice(0, 6)}...{address?.slice(-4)}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-white tabular-nums">
                                {parseFloat(balance).toFixed(6)} ETH
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {portfolioItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${item.color}`}
                            >
                              {item.symbol}
                            </div>
                            <div>
                              <p className="font-medium text-white">
                                {item.symbol}
                              </p>
                              <p className="text-sm text-white/80">
                                {item.name}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-white tabular-nums">
                              {item.amount}
                            </p>
                            <p className="text-sm text-white/80 tabular-nums">
                              {item.valueIDR}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4">
                        <Link to="/manage-collateral" className="w-full">
                          <Button
                            variant="secondary"
                            className="bg-white text-muted-foreground w-full text-md"
                          >
                            {isConnected ? "Manage Collateral" : "Kelola Jaminan"}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {loading ? (
                  <SkeletonLoader type="health_factor" />
                ) : (
                  <Card className="bg-foreground text-white rounded-2xl p-6 flex flex-col">
                    <CardContent className="p-0 flex flex-col flex-grow items-center">
                      <div className="w-full text-left mb-2">
                        <CardTitle className="py-1">Health Factor</CardTitle>
                        <p className="text-xs text-gray-300 pb-2">
                          Rasio nilai jaminan terhadap pinjaman
                        </p>
                      </div>
                      <div className="flex-grow w-full flex flex-col items-center justify-center">
                        <div className="w-full h-24">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                              data={[
                                {
                                  name: "Health Factor",
                                  value: healthFactor,
                                  fill: healthFactorColor,
                                },
                              ]}
                              innerRadius="190%"
                              outerRadius="220%"
                              barSize={17}
                              startAngle={180}
                              endAngle={0}
                              cy="100%"
                            >
                              <PolarAngleAxis
                                type="number"
                                domain={[0, 1]}
                                angleAxisId={0}
                                tick={false}
                              />
                              <RadialBar
                                background={{
                                  fill: "rgba(255, 255, 255, 0.1)",
                                }}
                                dataKey="value"
                                cornerRadius={10}
                              />
                            </RadialBarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="text-center -mt-10">
                          <p
                            className="text-4xl font-bold"
                            style={{ color: healthFactorColor }}
                          >
                            {healthFactor.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-300 mt-2">
                            Status: {healthFactor > 1 ? "Aman" : "Berisiko"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </aside>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Pinjaman: {selectedLoan?.id}</DialogTitle>
            <DialogDescription>
              Ringkasan lengkap dari pinjaman Anda.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tanggal Pengajuan:</span>
              <span className="font-medium">{selectedLoan?.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Jumlah Pinjaman:</span>
              <span className="font-medium">
                {selectedLoan?.contractLoan
                  ? `${formatBorrowTokenAmount(selectedLoan.contractLoan.principal, selectedLoan.contractLoan.borrowToken)} ${getBorrowTokenSymbol(selectedLoan.contractLoan.borrowToken)}`
                  : `Rp ${selectedLoan?.amount}`
                }
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sisa Hutang:</span>
              <span className="font-medium">
                {selectedLoan?.contractLoan
                  ? `${formatBorrowTokenAmount(
                    selectedLoan.contractLoan.principal + selectedLoan.contractLoan.interestAccrued,
                    selectedLoan.contractLoan.borrowToken
                  )} ${getBorrowTokenSymbol(selectedLoan.contractLoan.borrowToken)}`
                  : `Rp ${selectedLoan?.size}`
                }
              </span>
            </div>
            {selectedLoan?.contractLoan && selectedLoan.collateralToken && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Collateral Token:</span>
                <span className="font-medium">{getCollateralTokenSymbol(selectedLoan.collateralToken)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tenor:</span>
              <span className="font-medium">{selectedLoan?.tenor}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Suku Bunga:</span>
              <span className="font-medium">{selectedLoan?.interestRate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Jatuh Tempo Berikutnya:
              </span>
              <span className="font-medium">{selectedLoan?.dueDate}</span>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDetailDialogOpen(false)}
            >
              Tutup
            </Button>
            {selectedLoan?.status === "active" && (
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={openPaymentFromDetail}
              >
                Bayar Cicilan
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pembayaran Pinjaman: {selectedLoan?.id}</DialogTitle>
            <DialogDescription>
              {selectedLoan?.contractLoan
                ? "Make a repayment using your connected wallet and smart contract."
                : "Pilih jenis pembayaran dan lakukan pembayaran menggunakan IDRX."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedLoan?.contractLoan && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">Smart Contract Loan</Badge>
                </div>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Collateral Token:</span> {selectedLoan.collateralToken ? getCollateralTokenSymbol(selectedLoan.collateralToken) : 'Unknown'}</p>
                  <p><span className="font-medium">Borrow Token:</span> {getBorrowTokenSymbol(selectedLoan.contractLoan.borrowToken)}</p>
                  <p><span className="font-medium">Principal:</span> {formatBorrowTokenAmount(selectedLoan.contractLoan.principal, selectedLoan.contractLoan.borrowToken)}</p>
                  <p><span className="font-medium">Interest Accrued:</span> {formatBorrowTokenAmount(selectedLoan.contractLoan.interestAccrued, selectedLoan.contractLoan.borrowToken)}</p>
                  <p><span className="font-medium">Repaid:</span> {formatBorrowTokenAmount(selectedLoan.contractLoan.repaidAmount, selectedLoan.contractLoan.borrowToken)}</p>
                  <p><span className="font-medium">Remaining:</span> {formatBorrowTokenAmount(
                    selectedLoan.contractLoan.principal + selectedLoan.contractLoan.interestAccrued,
                    selectedLoan.contractLoan.borrowToken
                  )}</p>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label>Jenis Pembayaran</Label>
              <RadioGroup
                value={repaymentType}
                onValueChange={setRepaymentType}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full" className="cursor-pointer">
                    Pelunasan (
                    {selectedLoan?.contractLoan
                      ? `${formatBorrowTokenAmount(
                        selectedLoan.contractLoan.principal + selectedLoan.contractLoan.interestAccrued,
                        selectedLoan.contractLoan.borrowToken
                      )} ${getBorrowTokenSymbol(selectedLoan.contractLoan.borrowToken)}`
                      : `Rp ${parseFloat(selectedLoan?.size?.replace(/\./g, "") || "0").toLocaleString("id-ID")}`
                    })
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="cursor-pointer">
                    {selectedLoan?.contractLoan ? "Partial Payment" : "Cicilan Bulanan"} (
                    {selectedLoan?.contractLoan
                      ? `${formatBorrowTokenAmount(selectedLoan.contractLoan.principal / 12n, selectedLoan.contractLoan.borrowToken)} ${getBorrowTokenSymbol(selectedLoan.contractLoan.borrowToken)}`
                      : `Rp ${parseFloat(selectedLoan?.monthlyPayment?.replace(/\./g, "") || "0").toLocaleString("id-ID")}`
                    })
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom" className="cursor-pointer">
                    Jumlah Custom
                  </Label>
                </div>
              </RadioGroup>
            </div>
            {repaymentType === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="custom-amount">
                  Jumlah Pembayaran ({selectedLoan?.contractLoan ? getBorrowTokenSymbol(selectedLoan.contractLoan.borrowToken) : "IDRX"})
                </Label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Masukkan jumlah"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
              </div>
            )}
            <div className="space-y-1 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Jumlah Pembayaran:
                </span>
                <span className="font-medium">
                  {selectedLoan?.contractLoan
                    ? `${paymentAmount.toFixed(6)} ${getBorrowTokenSymbol(selectedLoan.contractLoan.borrowToken)}`
                    : `Rp ${paymentAmount.toLocaleString("id-ID")}`
                  }
                </span>
              </div>
              {!selectedLoan?.contractLoan && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dalam IDRX:</span>
                  <span className="font-medium">
                    {paymentAmount.toLocaleString("id-ID")} IDRX
                  </span>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPaymentDialogOpen(false)}
            >
              Batal
            </Button>
            <Button
              className="bg-primary text-white hover:bg-primary/90"
              onClick={handlePaymentSubmit}
              disabled={isRepayPending || isRepayWaiting || contractLoading || (contractPaused && selectedLoan?.contractLoan !== undefined)}
            >
              {isRepayPending
                ? "Preparing..."
                : isRepayWaiting
                  ? "Processing..."
                  : contractLoading
                    ? "Loading..."
                    : "Konfirmasi Pembayaran"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;