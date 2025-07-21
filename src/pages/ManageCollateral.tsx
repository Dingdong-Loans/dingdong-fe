import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Copy,
  QrCode,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader,
  Loader2,
} from "lucide-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/use-wallet";
import { useCollateralManager } from "@/hooks/use-collateral-manager";
import { useLendingCore } from "@/hooks/use-lending-core";
import { getWalletTokenBalances, SUPPORTED_TOKENS } from "@/lib/contract-utils";



// Types
interface CollateralAsset {
  type: string;
  symbol: string;
  name: string;
  amount: number;
  displayAmount: string;
  valueIDR: number;
  contractAddress: string;
  decimals: number;
}

interface WalletBalances {
  walletBalances: Record<string, bigint>;
}

interface TransactionHistoryItem {
  id: string;
  date: string;
  type: "Deposit" | "Withdrawal";
  amount: string;
  status: string;
}



// Constants
const CACHE_DURATION = 30000; // 30 seconds
const DEPOSIT_SIMULATION_DELAY = 2000;
const WITHDRAWAL_SIMULATION_DELAY = 2000;
const MIN_AMOUNT_THRESHOLD = 0.00000001;

const ManageCollateral = () => {  // User wallet
  const { address } = useWallet();
  // Contract hooks
  const { depositCollateral, withdrawCollateral } = useLendingCore();
  const { getDepositedCollateral } = useCollateralManager();

  // State management
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const [isDepositConfirmOpen, setDepositConfirmOpen] = useState(false);
  const [isWithdrawConfirmOpen, setWithdrawConfirmOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [depositCollateralType, setDepositCollateralType] = useState("");
  const [depositStatus, setDepositStatus] = useState<"ready" | "pending" | "completed">("ready");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalCollateralType, setWithdrawalCollateralType] = useState("");
  const [withdrawalStatus, setWithdrawalStatus] = useState<"ready" | "pending" | "completed">("ready");
  const [withdrawalError, setWithdrawalError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [lastDepositedCollateralFetchTime, setLastDepositedCollateralFetchTime] = useState(0);
  const [availableCollateral, setAvailableCollateral] = useState<CollateralAsset[]>(() =>
    SUPPORTED_TOKENS.filter(token => token.COLLATERAL_TOKEN).map(token => ({
      type: token.TOKEN_SYMBOL.toLowerCase(),
      symbol: token.TOKEN_SYMBOL,
      name: token.TOKEN_NAME,
      amount: 0,
      displayAmount: "0",
      valueIDR: 0,
      contractAddress: token.CONTRACT_ADDRESS,
      decimals: token.DECIMALS
    }))
  );
  const [walletBalances, setWalletBalances] = useState<WalletBalances>({
    walletBalances: {}
  });
  const [depositedCollateral, setDepositedCollateral] = useState<CollateralAsset[]>(() =>
    SUPPORTED_TOKENS.filter(token => token.COLLATERAL_TOKEN).map(token => ({
      type: token.TOKEN_SYMBOL.toLowerCase(),
      symbol: token.TOKEN_SYMBOL,
      name: token.TOKEN_NAME,
      amount: 0,
      displayAmount: "0",
      valueIDR: 0,
      contractAddress: token.CONTRACT_ADDRESS,
      decimals: token.DECIMALS
    }))
  );


  const { toast } = useToast();

  // Mock transaction history - in real app this would come from API
  const transactionHistory: TransactionHistoryItem[] = [
    { id: "TX001", date: "10 Jun 2024", type: "Deposit", amount: "0.15 wBTC", status: "Selesai" },
    { id: "TX002", date: "5 Jun 2024", type: "Deposit", amount: "0.8 wETH", status: "Selesai" },
    { id: "TX003", date: "1 Jun 2024", type: "Withdrawal", amount: "0.05 wBTC", status: "Selesai" },
  ];

  // Utility functions
  const formatCurrency = useCallback((value: number, locale: string = 'id-ID', options?: Intl.NumberFormatOptions) => {
    return value.toLocaleString(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 8,
      ...options
    });
  }, []);

  const formatInputNumber = useCallback((value: string): string => {
    if (!value) return "";
    const cleanValue = value.replace(/[^0-9,]/g, "").replace(",", ".");
    const parts = cleanValue.split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.length > 1 ? `${integerPart},${parts[1]}` : integerPart;
  }, []);

  const parseInputNumber = useCallback((value: string): number => {
    return parseFloat(value.replace(/\./g, "").replace(",", "."));
  }, []);
  // Memoized crypto rates
  const cryptoRates = useMemo(() => {
    const rates: Record<string, number> = {};
    SUPPORTED_TOKENS.filter(token => token.COLLATERAL_TOKEN).forEach(token => {
      rates[token.TOKEN_SYMBOL.toLowerCase()] = token.TOKEN_SYMBOL === 'wETH' ? 37500000 : 1000000000;
    });
    return rates;
  }, []);

  // Optimized balance calculation
  const calculateAssetValue = useCallback((amount: number, tokenType: string): number => {
    const rate = cryptoRates[tokenType] || 0;
    return amount * rate;
  }, [cryptoRates]);

  const updateAssetDisplay = useCallback((asset: CollateralAsset, newAmount: number): CollateralAsset => {
    return {
      ...asset,
      amount: newAmount,
      displayAmount: formatCurrency(newAmount),
      valueIDR: calculateAssetValue(newAmount, asset.type)
    };
  }, [formatCurrency, calculateAssetValue]);

  const showToast = useCallback((type: 'success' | 'error', title: string, description: string) => {
    const baseClasses = type === 'success'
      ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
      : "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400";

    toast({
      variant: type === 'error' ? "destructive" : "default",
      title,
      description,
      className: baseClasses,
    });
  }, [toast]);
  // Memoized balance fetching function
  const fetchBalances = useCallback(async () => {
    const now = Date.now();

    if (now - lastFetchTime < CACHE_DURATION) {
      console.log('Skipping fetch due to cache');
      return;
    }

    try {
      console.log('Fetching balances from RPC...');
      const balances = await getWalletTokenBalances();
      setLastFetchTime(now);

      // Process balance data efficiently
      const walletBalancesData: Record<string, bigint> = {};

      balances.walletBalances.forEach(token => {
        const rawBalance = BigInt(Math.floor(token.balance * Math.pow(10, token.decimals)));
        walletBalancesData[token.address] = rawBalance;
      });

      setWalletBalances({ walletBalances: walletBalancesData });

      // Update collateral assets efficiently
      setAvailableCollateral(prev =>
        prev.map(token => {
          const balanceData = balances.walletBalances.find(b => b.address === token.contractAddress && b.isCollateralToken);
          const amount = balanceData?.balance || 0;
          return updateAssetDisplay(token, amount);
        })
      );

    } catch (error) {
      console.error('Error fetching wallet balances:', error);
      showToast('error', "Error", "Failed to fetch wallet balances. Please try again.");
    }
  }, [lastFetchTime, showToast, updateAssetDisplay]);

  // Force refresh function
  const forceRefreshBalances = useCallback(async () => {
    setLastFetchTime(0);
    await fetchBalances();
  }, [fetchBalances]);

  // Fetch deposited collateral from contract
  const fetchDepositedCollateral = useCallback(async () => {
    if (!address) return;

    const now = Date.now();
    if (now - lastDepositedCollateralFetchTime < CACHE_DURATION) {
      console.log('Skipping deposited collateral fetch due to cache');
      return;
    }

    try {
      console.log('Fetching deposited collateral from contract...');
      setLastDepositedCollateralFetchTime(now);

      // Fetch deposited amounts for all supported collateral tokens
      const depositedAmounts = await Promise.all(
        SUPPORTED_TOKENS.filter(token => token.COLLATERAL_TOKEN).map(async (token) => {
          try {
            const depositedAmount = await getDepositedCollateral(
              address as `0x${string}`,
              token.CONTRACT_ADDRESS as `0x${string}`
            );

            // Convert BigInt to number with correct decimals
            const amount = Number(depositedAmount as bigint) / (10 ** token.DECIMALS);

            return {
              type: token.TOKEN_SYMBOL.toLowerCase(),
              symbol: token.TOKEN_SYMBOL,
              name: token.TOKEN_NAME,
              amount,
              displayAmount: formatCurrency(amount),
              valueIDR: calculateAssetValue(amount, token.TOKEN_SYMBOL.toLowerCase()),
              contractAddress: token.CONTRACT_ADDRESS,
              decimals: token.DECIMALS
            } as CollateralAsset;
          } catch (error) {
            console.error(`Error fetching deposited collateral for ${token.TOKEN_SYMBOL}:`, error);
            return {
              type: token.TOKEN_SYMBOL.toLowerCase(),
              symbol: token.TOKEN_SYMBOL,
              name: token.TOKEN_NAME,
              amount: 0,
              displayAmount: "0",
              valueIDR: 0,
              contractAddress: token.CONTRACT_ADDRESS,
              decimals: token.DECIMALS
            } as CollateralAsset;
          }
        })
      );

      setDepositedCollateral(depositedAmounts);
    } catch (error) {
      console.error('Error fetching deposited collateral:', error);
      showToast('error', "Error", "Failed to fetch deposited collateral. Please try again.");
    }
  }, [address, lastDepositedCollateralFetchTime, getDepositedCollateral, formatCurrency, calculateAssetValue, showToast]);

  useEffect(() => {
    fetchBalances();
    if (address) {
      fetchDepositedCollateral();
    }
  }, [fetchBalances, fetchDepositedCollateral, address]);
  const getTokenBySymbol = useCallback((symbol: string) => {
    return SUPPORTED_TOKENS.find(
      token => token.TOKEN_SYMBOL.toLowerCase() === symbol.toLowerCase() && token.COLLATERAL_TOKEN
    );
  }, []);

  const getAssetByType = useCallback((type: string) => {
    return depositedCollateral.find(asset => asset.type === type);
  }, [depositedCollateral]);

  // Validation functions
  const validateDepositInput = useCallback(() => {
    const amount = parseInputNumber(depositAmount);
    return {
      isValid: depositCollateralType && depositAmount && !isNaN(amount) && amount > 0,
      amount
    };
  }, [depositCollateralType, depositAmount, parseInputNumber]);

  const validateWithdrawalInput = useCallback(() => {
    const selectedAsset = getAssetByType(withdrawalCollateralType);
    const amount = parseInputNumber(withdrawalAmount);

    return {
      isValid: selectedAsset && !isNaN(amount) && amount > 0 && amount <= selectedAsset.amount,
      amount,
      selectedAsset
    };
  }, [withdrawalCollateralType, withdrawalAmount, parseInputNumber, getAssetByType]);
  // Optimized handlers
  const handleDeposit = () => {
    const validation = validateDepositInput();

    if (!validation.isValid) {
      showToast('error', "Deposit Gagal", "Silakan pilih jenis crypto dan masukkan jumlah yang valid.");
      return;
    }

    setDepositConfirmOpen(true);
  };

  const handleWithdrawal = () => {
    const validation = validateWithdrawalInput();

    if (!validation.isValid) {
      showToast('error', "Penarikan Gagal", "Jumlah penarikan tidak valid atau melebihi jaminan yang tersedia.");
      return;
    }

    setWithdrawConfirmOpen(true);
  };

  const confirmDeposit = useCallback(async (): Promise<void> => {
    setButtonIsLoading(true);
    const validation = validateDepositInput();
    if (!validation.isValid) return;

    // Get token details
    const token = getTokenBySymbol(depositCollateralType);
    if (!token) {
      showToast('error', "Deposit Gagal", "Token tidak didukung.");
      return;
    }

    setLoading(true);
    setDepositStatus("pending");

    try {
      // Convert amount to BigInt with correct decimals
      const amountInWei = BigInt(Math.floor(validation.amount * 10 ** token.DECIMALS));      // Call the contract's depositCollateral function
      // The LendingCore.depositCollateral function expects (collateralToken, amount)
      await depositCollateral(
        token.CONTRACT_ADDRESS as `0x${string}`,
        amountInWei
      );

      setDepositStatus("completed");
      // showToast('success', "Deposit Berhasil", `Jaminan ${depositAmount} ${depositCollateralType.toUpperCase()} telah ditambahkan.`);

      // Reset form
      setDepositAmount("");
      setDepositCollateralType("");
      setDepositConfirmOpen(false);

      // Force refresh balances to show updated values
      await forceRefreshBalances();
      setLastDepositedCollateralFetchTime(0);
      await fetchDepositedCollateral();
    } catch (error) {
      console.error("Deposit error:", error);
      showToast('error', "Deposit Gagal", error instanceof Error ? error.message : "Terjadi kesalahan saat deposit jaminan.");
    } finally {
      setLoading(false);
      setButtonIsLoading(false);
    }
  }, [validateDepositInput, depositCollateralType, depositAmount, getTokenBySymbol, showToast, forceRefreshBalances, fetchDepositedCollateral, depositCollateral]);
  const confirmWithdrawal = useCallback(async () => {
    setButtonIsLoading(true);
    const validation = validateWithdrawalInput();
    if (!validation.isValid) return;

    // Get token details
    const asset = getAssetByType(withdrawalCollateralType);
    if (!asset) {
      showToast('error', "Penarikan Gagal", "Jaminan tidak tersedia.");
      return;
    }

    setLoading(true);
    setWithdrawalStatus("pending");

    try {
      // Convert amount to BigInt with correct decimals
      const amountInWei = BigInt(Math.floor(validation.amount * 10 ** asset.decimals));

      // Call the contract's withdraw function
      // The contract.withdraw function expects (user, token, amount)
      await withdrawCollateral(
        asset.contractAddress as `0x${string}`,
        amountInWei
      );

      setWithdrawalStatus("completed");
      // showToast('success', "Penarikan Berhasil", `Jaminan ${withdrawalAmount} ${withdrawalCollateralType.toUpperCase()} telah ditarik.`);

      // Reset form
      setWithdrawalAmount("");
      setWithdrawalCollateralType("");
      setWithdrawConfirmOpen(false);

      // Force refresh balances to show updated values
      await forceRefreshBalances();
      setLastDepositedCollateralFetchTime(0);
      await fetchDepositedCollateral();
    } catch (error) {
      console.error("Withdrawal error:", error);
      showToast('error', "Penarikan Gagal", error instanceof Error ? error.message : "Terjadi kesalahan saat menarik jaminan.");
    } finally {
      setLoading(false);
      setButtonIsLoading(false);
    }
  }, [validateWithdrawalInput, withdrawalCollateralType, withdrawalAmount, address, getAssetByType, showToast, forceRefreshBalances, fetchDepositedCollateral, withdrawCollateral]);

  // Max amount handlers
  const handleSetMaxWithdrawal = () => {
    const selectedAsset = getAssetByType(withdrawalCollateralType);
    if (selectedAsset) {
      const formattedAmount = selectedAsset.amount.toString().replace(".", ",");
      setWithdrawalAmount(formatInputNumber(formattedAmount));
      setWithdrawalError("");
    }
  };

  const handleSetMaxDeposit = () => {
    if (!depositCollateralType) {
      showToast('error', "Pilih Jenis Crypto", "Silakan pilih jenis crypto terlebih dahulu.");
      return;
    }

    const selectedToken = getTokenBySymbol(depositCollateralType);
    if (!selectedToken) return;

    const balance = walletBalances.walletBalances[selectedToken.CONTRACT_ADDRESS] || 0n;
    const maxAmount = Number(balance) / (10 ** selectedToken.DECIMALS);
    const formattedAmount = maxAmount.toString().replace(".", ",");
    setDepositAmount(formatInputNumber(formattedAmount));
  };

  // Input change handlers
  const handleDepositAmountChange = (value: string) => {
    setDepositAmount(formatInputNumber(value));
  };

  const handleWithdrawalAmountChange = (value: string) => {
    const formattedValue = formatInputNumber(value);
    const amount = parseInputNumber(formattedValue);
    setWithdrawalAmount(formattedValue);

    const selectedAsset = getAssetByType(withdrawalCollateralType);
    if (selectedAsset && amount > selectedAsset.amount) {
      setWithdrawalError("Jumlah melebihi jaminan yang tersedia.");
    } else {
      setWithdrawalError("");
    }
  };

  // Computed values
  const totalCollateralValue = useMemo(() =>
    depositedCollateral.reduce((sum, asset) => sum + asset.valueIDR, 0),
    [depositedCollateral]
  );

  const availableWithdrawalAssets = useMemo(() =>
    depositedCollateral.filter(asset => asset.amount > 0),
    [depositedCollateral]
  );

  const getWalletBalance = (tokenSymbol: string) => {
    const token = getTokenBySymbol(tokenSymbol);
    if (!token) return "0";

    const balance = walletBalances.walletBalances[token.CONTRACT_ADDRESS] || 0n;
    return formatCurrency(Number(balance) / (10 ** token.DECIMALS));
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Kelola Jaminan</h1>
              <p className="text-muted-foreground">
                Deposit atau tarik jaminan crypto Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Tabs defaultValue="deposit" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="deposit">
                    <ArrowUpCircle className="w-4 h-4 mr-2" /> Deposit
                  </TabsTrigger>
                  <TabsTrigger value="withdraw">
                    <ArrowDownCircle className="w-4 h-4 mr-2" /> Tarik
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="deposit">
                  <Card>
                    <CardHeader>
                      <CardTitle>Deposit Jaminan</CardTitle>
                      <CardDescription>
                        Pilih crypto dan jumlah yang ingin dideposit.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="crypto-type">Jenis Crypto</Label>
                        <Select
                          value={depositCollateralType}
                          onValueChange={setDepositCollateralType}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis crypto" />
                          </SelectTrigger>                          <SelectContent>
                            {SUPPORTED_TOKENS.filter(token => token.COLLATERAL_TOKEN).map(token => (
                              <SelectItem key={token.TOKEN_SYMBOL} value={token.TOKEN_SYMBOL.toLowerCase()}>
                                {token.TOKEN_NAME} ({token.TOKEN_SYMBOL})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Jumlah</Label>
                        <div className="relative">
                          <Input
                            id="amount"
                            placeholder="0,001"
                            value={depositAmount}
                            onChange={(e) => handleDepositAmountChange(e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3"
                            onClick={handleSetMaxDeposit}
                            disabled={!depositCollateralType}
                          >
                            Max
                          </Button>
                        </div>
                        {depositCollateralType && (
                          <p className="text-sm text-muted-foreground">
                            Saldo: {getWalletBalance(depositCollateralType)} {depositCollateralType.toUpperCase()}
                          </p>
                        )}
                      </div>

                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                        onClick={handleDeposit}
                        disabled={
                          !depositAmount || !depositCollateralType || loading
                        }
                      >
                        {loading && depositStatus === "pending"
                          ? "Memproses..."
                          : "Deposit Jaminan"}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="withdraw">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tarik Jaminan</CardTitle>
                      <CardDescription>
                        Pilih jaminan yang tersedia untuk ditarik.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="crypto-type-withdraw">
                          Jenis Crypto
                        </Label>
                        <Select
                          value={withdrawalCollateralType}
                          onValueChange={setWithdrawalCollateralType}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jaminan yang akan ditarik" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableWithdrawalAssets.map((asset) => (
                              <SelectItem key={asset.type} value={asset.type}>
                                {asset.name} - Tersedia:{" "}
                                {asset.displayAmount} {asset.symbol.toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount-withdraw">Jumlah</Label>
                        <div className="relative">
                          <Input
                            id="amount-withdraw"
                            placeholder="0,001"
                            value={withdrawalAmount}
                            onChange={(e) => handleWithdrawalAmountChange(e.target.value)}
                            className={
                              withdrawalError
                                ? "border-red-500 focus-visible:ring-red-500"
                                : ""
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3"
                            onClick={handleSetMaxWithdrawal}
                            disabled={!withdrawalCollateralType}
                          >
                            Max
                          </Button>
                        </div>
                        {withdrawalError && (
                          <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                            <AlertTriangle className="h-4 w-4" />
                            {withdrawalError}
                          </p>
                        )}
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                        Penarikan akan mempengaruhi Health Factor pinjaman Anda.
                        Pastikan Health Factor tetap di atas ambang batas aman.
                      </div>
                      <Button
                        className="w-full text-white"
                        onClick={handleWithdrawal}
                        disabled={
                          !withdrawalAmount ||
                          !withdrawalCollateralType ||
                          loading ||
                          !!withdrawalError
                        }
                      >
                        {loading && withdrawalStatus === "pending"
                          ? "Memproses..."
                          : "Tarik Jaminan"}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="w-5 h-5 mr-2" />
                    Ringkasan Jaminan
                  </CardTitle>
                  <CardDescription>
                    Total jaminan yang Anda miliki saat ini.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <div className="space-y-2">
                    {depositedCollateral.map((asset) => {
                      // Only show assets with deposited amounts greater than 0
                      if (asset.amount <= 0) return null;

                      return (
                        <div
                          key={asset.type}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${asset.symbol === "wBTC"
                                ? "bg-orange-500"
                                : asset.symbol === "wETH"
                                  ? "bg-gray-500"
                                  : "bg-blue-500"
                                }`}
                            >
                              <span className="text-white text-xs font-bold">
                                {asset.symbol}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{asset.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {asset.displayAmount} {asset.symbol}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              Rp {formatCurrency(asset.valueIDR)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    {depositedCollateral.every(asset => asset.amount <= 0) && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Belum ada jaminan yang didepositkan</p>
                        <p className="text-sm">Deposit crypto Anda untuk mulai meminjam</p>
                      </div>
                    )}
                  </div>
                  <div className="border-t pt-4 mt-auto text-center">
                    <p className="text-sm font-medium">Total Nilai Jaminan</p>
                    <p className="text-2xl font-bold">
                      Rp {formatCurrency(totalCollateralValue)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Riwayat Transaksi Jaminan</CardTitle>
                <CardDescription>
                  Daftar semua transaksi deposit dan penarikan jaminan Anda.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionHistory.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              tx.type === "Deposit" ? "default" : "secondary"
                            }
                            className={
                              tx.type === "Deposit"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {tx.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {tx.amount}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{tx.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>

      {/* --- PERUBAHAN: Dialog Konfirmasi Deposit dengan struktur baru --- */}
      <Dialog open={isDepositConfirmOpen} onOpenChange={setDepositConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Konfirmasi Deposit</DialogTitle>
            <DialogDescription>
              Anda akan melakukan deposit jaminan sebesar{" "}
              <span className="font-bold">
                {depositAmount} {depositCollateralType.toUpperCase()}
              </span>
              . Tindakan ini tidak dapat dibatalkan setelah diproses.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            {/* --- PERUBAHAN: Tombol konfirmasi dengan warna primer --- */}
            <Button
              className="bg-primary text-white hover:bg-primary/90"
              onClick={confirmDeposit}
              disabled={buttonIsLoading}
            >
              {buttonIsLoading ? <><Loader2 />Deposit sedang diproses</> : "Ya, Lanjutkan Deposit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- PERUBAHAN: Dialog Konfirmasi Penarikan dengan struktur baru --- */}
      <Dialog
        open={isWithdrawConfirmOpen}
        onOpenChange={setWithdrawConfirmOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Konfirmasi Penarikan</DialogTitle>
            <DialogDescription>
              Anda akan menarik jaminan sebesar{" "}
              <span className="font-bold">
                {withdrawalAmount} {withdrawalCollateralType.toUpperCase()}
              </span>
              . Pastikan Anda telah memahami risikonya.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            {/* --- PERUBAHAN: Tombol konfirmasi dengan warna primer --- */}
            <Button
              className="bg-primary text-white hover:bg-primary/90"
              onClick={confirmWithdrawal}
              disabled={buttonIsLoading}
            >
              {buttonIsLoading ? <><Loader2 />Penarikan sedang diproses</> : "Ya, Lanjutkan Penarikan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageCollateral;
