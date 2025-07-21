// Path: src/pages/ApplyLoan.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calculator, AlertCircle, CheckCircle, ArrowRight, Wallet, TrendingUp, HelpCircle, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SUPPORTED_COLLATERAL_TOKENS, SUPPORTED_BORROW_TOKENS, SUPPORTED_TOKENS } from "@/lib/contract-utils";
import { useLendingCore } from "@/hooks/use-lending-core";
import { useWallet } from "@/hooks/use-wallet";
import { useCollateralManager } from "@/hooks/use-collateral-manager";

const ApplyLoan = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const navigate = useNavigate();
  const { address } = useWallet();
  const lendingCore = useLendingCore();
  const collateralManager = useCollateralManager();

  // State for collateral and borrow tokens
  const [selectedCollateralToken, setSelectedCollateralToken] = useState("");
  const [selectedBorrowToken, setSelectedBorrowToken] = useState("");
  const [maxBorrowAmount, setMaxBorrowAmount] = useState(0);
  const [collateralBalances, setCollateralBalances] = useState<Record<string, number>>({});
  const [loadingBalances, setLoadingBalances] = useState(false);
  const [lastBalanceFetch, setLastBalanceFetch] = useState(0);
  const [fetchErrorCount, setFetchErrorCount] = useState(0);

  const [currentTutorialStepIndex, setCurrentTutorialStepIndex] = useState(0);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // Example collateral value (would come from the wallet or contract)
  const totalCollateralValueIDR = 130000000;
  const usdToIdrRate = 15800;

  // Cache configuration
  const CACHE_DURATION = 30000; // 30 seconds cache validity
  const RETRY_BACKOFF_BASE = 1000; // Base backoff time in ms
  const MAX_RETRIES = 3;

  // Fetch single token balance
  const fetchSingleTokenBalance = async (token: typeof SUPPORTED_TOKENS[0]) => {
    try {
      // Use getCollateralBalance from the collateralManager hook
      const balance = await collateralManager.getCollateralBalance(
        address as `0x${string}`,
        token.CONTRACT_ADDRESS
      );

      // Convert balance to a readable number
      const decimals = token.DECIMALS;
      const readableBalance = Number(balance) / (10 ** decimals);
      return { address: token.CONTRACT_ADDRESS, balance: readableBalance };
    } catch (err) {
      console.error(`Error fetching balance for ${token.TOKEN_SYMBOL}:`, err);
      return { address: token.CONTRACT_ADDRESS, balance: 0, error: true };
    }
  };

  // Fetch collateral balances with cache control and retry logic
  const fetchBalances = async (forceRefresh = false) => {
    // Check if we have a cached balance and it's still valid
    const now = Date.now();
    if (!forceRefresh && lastBalanceFetch > 0 && now - lastBalanceFetch < CACHE_DURATION) {
      console.log("Using cached balances");
      return;
    }

    try {
      setLoadingBalances(true);
      // Filter for collateral tokens
      const collateralTokens = SUPPORTED_TOKENS.filter(token => token.COLLATERAL_TOKEN);

      // If user has selected a token, prioritize fetching its balance
      let tokensToFetch = [...collateralTokens];
      if (selectedCollateralToken) {
        tokensToFetch = [
          ...collateralTokens.filter(token => token.CONTRACT_ADDRESS === selectedCollateralToken),
          ...collateralTokens.filter(token => token.CONTRACT_ADDRESS !== selectedCollateralToken)
        ];
      }

      const balances: Record<string, number> = { ...collateralBalances };

      // Fetch only selected token balance if it exists
      if (selectedCollateralToken) {
        const selectedToken = tokensToFetch.find(token => token.CONTRACT_ADDRESS === selectedCollateralToken);
        if (selectedToken) {
          const result = await fetchSingleTokenBalance(selectedToken);
          if (!result.error) {
            balances[result.address] = result.balance;
          }
        }
        setCollateralBalances(balances);
        setLastBalanceFetch(Date.now());
        setFetchErrorCount(0);
      }
      // Fetch all balances, but sequentially to avoid RPC spamming
      else {
        // Fetch first token immediately, others with delay
        if (tokensToFetch.length > 0) {
          const result = await fetchSingleTokenBalance(tokensToFetch[0]);
          if (!result.error) {
            balances[result.address] = result.balance;
            setCollateralBalances({ ...balances });
          }

          // Fetch remaining tokens with a delay between requests
          for (let i = 1; i < tokensToFetch.length; i++) {
            setTimeout(async () => {
              try {
                const result = await fetchSingleTokenBalance(tokensToFetch[i]);
                if (!result.error) {
                  setCollateralBalances(prev => ({
                    ...prev,
                    [result.address]: result.balance
                  }));
                }
              } catch (err) {
                console.error("Error in delayed token balance fetch:", err);
              }
            }, i * 1000); // 1 second delay between requests
          }

          setLastBalanceFetch(Date.now());
          setFetchErrorCount(0);
        }
      }
    } catch (error) {
      console.error("Failed to fetch collateral balances:", error);
      // Implement exponential backoff for retries
      const newErrorCount = fetchErrorCount + 1;
      setFetchErrorCount(newErrorCount);

      if (newErrorCount <= MAX_RETRIES) {
        const backoffTime = RETRY_BACKOFF_BASE * (2 ** (newErrorCount - 1));
        console.log(`Retrying balance fetch in ${backoffTime}ms (attempt ${newErrorCount})`);
        setTimeout(() => fetchBalances(forceRefresh), backoffTime);
      }
    } finally {
      setLoadingBalances(false);
    }
  };

  // Fetch balances on mount and when address changes
  useEffect(() => {
    if (address) {
      fetchBalances(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  // Refetch selected token balance when selection changes
  useEffect(() => {
    if (address && selectedCollateralToken) {
      fetchBalances(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCollateralToken, address]);

  // Get the selected tokens
  const selectedCollateralTokenDetails = SUPPORTED_TOKENS.find(
    token => token.CONTRACT_ADDRESS === selectedCollateralToken
  );

  const selectedBorrowTokenDetails = SUPPORTED_TOKENS.find(
    token => token.CONTRACT_ADDRESS === selectedBorrowToken
  );

  // Store max borrow amounts with cache expiration
  const [maxBorrowCache, setMaxBorrowCache] = useState<{
    key: string;
    amount: number;
    timestamp: number;
  } | null>(null);

  // Calculate max borrowable amount based on LTV with caching
  useEffect(() => {
    if (selectedCollateralToken && selectedBorrowToken && address) {
      // Create cache key from tokens
      const cacheKey = `${selectedCollateralToken}_${selectedBorrowToken}`;

      // Check if we have a valid cached value
      const now = Date.now();
      if (
        maxBorrowCache &&
        maxBorrowCache.key === cacheKey &&
        now - maxBorrowCache.timestamp < CACHE_DURATION
      ) {
        console.log("Using cached max borrow amount");
        setMaxBorrowAmount(maxBorrowCache.amount);
        return;
      }

      // Calculate new max borrow amount
      const collateralToken = SUPPORTED_TOKENS.find(
        token => token.CONTRACT_ADDRESS === selectedCollateralToken
      );

      if (collateralToken) {
        const ltv = collateralToken.LTV || 0;
        const maxLoanable = totalCollateralValueIDR * ltv;
        setMaxBorrowAmount(maxLoanable);

        // Cache the calculated value
        setMaxBorrowCache({
          key: cacheKey,
          amount: maxLoanable,
          timestamp: now
        });
      }

      // In a real application, we'd call the contract to get the max borrow amount
      // with a debounce to prevent RPC spamming:
      /*
      const getMaxBorrow = async () => {
        try {
          const maxBorrow = await lendingCore.getMaxBorrowBeforeInterest(
            address as `0x${string}`,
            selectedBorrowToken as `0x${string}`,
            selectedCollateralToken as `0x${string}`
          );
          const maxLoanable = Number(maxBorrow);
          setMaxBorrowAmount(maxLoanable);
          
          // Cache the fetched value
          setMaxBorrowCache({
            key: cacheKey,
            amount: maxLoanable,
            timestamp: Date.now()
          });
        } catch (error) {
          console.error("Error fetching max borrow amount:", error);
          // Use fallback calculation on error
          if (collateralToken) {
            const ltv = collateralToken.LTV || 0;
            const maxLoanable = totalCollateralValueIDR * ltv;
            setMaxBorrowAmount(maxLoanable);
          }
        }
      };
      
      // Use debounce to prevent multiple rapid calls
      const debounceTimer = setTimeout(() => {
        getMaxBorrow();
      }, 300);
      
      return () => clearTimeout(debounceTimer);
      */
    }
  }, [selectedCollateralToken, selectedBorrowToken, address, CACHE_DURATION, maxBorrowCache]);

  // Convert loan amount to number for comparisons
  const numericLoanAmount = parseFloat(loanAmount.replace(/\./g, ''));
  const isLoanAmountExceeded = numericLoanAmount > maxBorrowAmount;

  // Handle loan amount change with formatting
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Remove all non-digit characters
    const numericValue = rawValue.replace(/[^0-9]/g, '');

    if (numericValue === '') {
      setLoanAmount('');
      return;
    }

    // Format number with thousands separator
    const formattedValue = new Intl.NumberFormat('id-ID').format(parseInt(numericValue, 10));
    setLoanAmount(formattedValue);
  };

  // Set max loan amount based on calculated max borrow
  const handleSetMaxLoan = () => {
    if (maxBorrowAmount > 0) {
      // Format with thousands separator
      const formattedValue = new Intl.NumberFormat('id-ID').format(maxBorrowAmount);
      // Set loan amount to max value
      setLoanAmount(formattedValue);
    }
  };

  const calculateRepayments = () => {
    // Gunakan nilai numerik yang sudah dibersihkan untuk kalkulasi
    const amount = numericLoanAmount || 0;
    const interestRate = 1.5;
    const monthlyPayment = duration ? (amount * (1 + interestRate / 100)) / parseInt(duration) : 0;
    return { monthlyPayment };
  };

  const { monthlyPayment } = calculateRepayments();

  const tutorialSteps = [
    {
      key: 'step1-collateral-summary',
      title: "Langkah 1: Periksa Ringkasan Limit",
      description: "Pertama, perhatikan bagian kartu di atas formulir. Di sini Anda akan melihat 'Total Jaminan Anda'. Nilai ini dihitung otomatis berdasarkan aset kripto yang Anda miliki. Setelah memilih token jaminan, Anda akan melihat 'Maksimal Pinjaman' yang bisa Anda ajukan.",
    },
    {
      key: 'step2-select-tokens',
      title: "Langkah 2: Pilih Token",
      description: "Pilih salah satu kartu 'Token Jaminan' yang akan digunakan sebagai jaminan pinjaman Anda. Anda dapat melihat saldo yang tersedia dan nilai LTV untuk masing-masing token. Kemudian pilih 'Token Pinjaman' yang ingin Anda pinjam. Nilai LTV (Loan-to-Value) menentukan jumlah maksimum yang dapat Anda pinjam berdasarkan jaminan Anda.",
    },
    {
      key: 'step3-loan-amount',
      title: "Langkah 3: Isi Jumlah Pinjaman",
      description: "Masukkan jumlah yang ingin Anda pinjam dalam token yang Anda pilih. Pastikan angka yang Anda masukkan tidak melebihi 'Maksimal Pinjaman' yang tertera di ringkasan limit Anda. Anda dapat mengklik tombol 'Max' untuk mengisi nilai maksimum secara otomatis.",
    },
    {
      key: 'step4-duration',
      title: "Langkah 4: Pilih Jangka Waktu",
      description: "Selanjutnya, gunakan dropdown 'Jangka Waktu (Bulan)' untuk memilih durasi pinjaman Anda. Pilihan ini akan mempengaruhi perhitungan cicilan bulanan Anda.",
    },
    {
      key: 'step5-loan-summary',
      title: "Langkah 5: Tinjau Ringkasan Pinjaman",
      description: "Lihatlah kartu 'Ringkasan Pinjaman' di sisi kanan. Ini adalah tempat di mana Anda dapat melihat detail pinjaman yang telah Anda masukkan, termasuk estimasi 'Pembayaran Bulanan' dan 'Suku Bunga'. Pastikan semua sudah sesuai.",
    },
    {
      key: 'step6-submit-button',
      title: "Langkah 6: Ajukan Pinjaman",
      description: "Setelah meninjau semua detail dan memastikan semuanya benar, klik tombol 'Ajukan Pinjaman'. Jika aplikasi Anda memenuhi syarat, dana akan langsung cair ke wallet Anda dalam beberapa menit.",
    },
  ];

  const currentTutorialStep = tutorialSteps[currentTutorialStepIndex];

  const handleNextTutorialStep = () => {
    setCurrentTutorialStepIndex((prevIndex) =>
      Math.min(prevIndex + 1, tutorialSteps.length - 1)
    );
  };

  const handlePreviousTutorialStep = () => {
    setCurrentTutorialStepIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmit = () => {
    if (isLoanAmountExceeded || !selectedCollateralToken || !selectedBorrowToken) return;
    setLoading(true);

    // In a real implementation, we would call the contract here to create the loan
    // Example:
    // lendingCore.borrow(
    //   selectedBorrowToken as `0x${string}`, 
    //   selectedCollateralToken as `0x${string}`, 
    //   parseFloat(loanAmount.replace(/\./g, '')),
    //   BigInt(parseInt(duration) * 30 * 24 * 60 * 60) // Convert duration months to seconds
    // );

    setTimeout(() => {
      setApplicationSubmitted(true);
      setLoading(false);
    }, 2000);
  };

  const proceedToDashboard = () => navigate('/dashboard');

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen bg-background"><Navbar />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="pt-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Aplikasi Pinjaman Terkirim!</h2>
                <p className="text-muted-foreground mb-6">Selamat! Aplikasi pinjaman Anda sedang diproses. Dana akan cair ke wallet Anda dalam 5-15 menit.</p>
                <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Token Jaminan:</span>
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mr-2">
                          {selectedCollateralTokenDetails?.TOKEN_SYMBOL.substring(0, 2)}
                        </div>
                        <span className="font-medium">{selectedCollateralTokenDetails?.TOKEN_SYMBOL}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Token Pinjaman:</span>
                      <span className="font-medium">{selectedBorrowTokenDetails?.TOKEN_SYMBOL}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jumlah Pinjaman:</span>
                      <span className="font-medium">Rp {parseFloat(loanAmount.replace(/\./g, '')).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jangka Waktu:</span>
                      <span className="font-medium">{duration} Bulan</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cicilan Bulanan:</span>
                      <span className="font-medium">Rp {monthlyPayment.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full text-white" size="lg" onClick={proceedToDashboard}>Kembali ke Dashboard <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </CardContent>
            </Card>
          </div>
        </div><Footer />
      </div>
    );
  }

  return (
    <>
      <Dialog open={isTutorialOpen} onOpenChange={setIsTutorialOpen}>
        <div className="min-h-screen bg-background"><Navbar />
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8"><h1 className="text-3xl font-bold mb-2">Ajukan Pinjaman</h1><p className="text-muted-foreground">Dapatkan IDRX dengan mudah berdasarkan jaminan yang Anda miliki.</p></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Application Form */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Detail Pinjaman</CardTitle>
                        <CardDescription className="py-2">Isi form berikut untuk mengajukan pinjaman.</CardDescription>
                      </div>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="flex-shrink-0" onClick={() => setCurrentTutorialStepIndex(0)}>
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedCollateralToken && selectedCollateralTokenDetails && (
                      <Card className="bg-gray-50/50">
                        <CardContent className="pt-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
                                {selectedCollateralTokenDetails.TOKEN_SYMBOL.substring(0, 2)}
                              </div>
                              <div>
                                <div className="font-medium">{selectedCollateralTokenDetails.TOKEN_NAME}</div>
                                <div className="text-xs text-muted-foreground">Nilai LTV: {(selectedCollateralTokenDetails.LTV * 100).toFixed(0)}%</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {collateralBalances[selectedCollateralToken] !== undefined && (
                                <Badge variant="outline">
                                  Saldo: {collateralBalances[selectedCollateralToken].toLocaleString('id-ID')} {selectedCollateralTokenDetails.TOKEN_SYMBOL}
                                </Badge>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 rounded-full"
                                onClick={() => fetchBalances(true)}
                                disabled={loadingBalances}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${loadingBalances ? 'animate-spin' : ''}`}>
                                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
                                </svg>
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground flex items-center"><TrendingUp className="w-4 h-4 mr-2" />Maksimal Pinjaman</span>
                            <span className="font-medium text-green-600">Rp {maxBorrowAmount.toLocaleString('id-ID')}</span>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Collateral Token Visual Selection */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="collateralToken">Token Jaminan</Label>
                        <div className="flex items-center space-x-2">
                          {loadingBalances && (
                            <div className="text-xs text-muted-foreground flex items-center">
                              <div className="h-3 w-3 rounded-full border-2 border-t-transparent border-primary animate-spin mr-2"></div>
                              Memuat saldo...
                            </div>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-xs"
                            onClick={() => fetchBalances(true)}
                            disabled={loadingBalances}
                          >
                            Refresh
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {SUPPORTED_TOKENS
                          .filter(token => token.COLLATERAL_TOKEN)
                          .map(token => {
                            const isSelected = selectedCollateralToken === token.CONTRACT_ADDRESS;
                            const balance = collateralBalances[token.CONTRACT_ADDRESS] || 0;

                            return (
                              <div
                                key={token.CONTRACT_ADDRESS}
                                onClick={() => setSelectedCollateralToken(token.CONTRACT_ADDRESS)}
                                className={`cursor-pointer transition-all duration-200 ${isSelected ? 'ring-2 ring-primary' : 'hover:bg-gray-50'}`}
                              >
                                <Card className={`overflow-hidden ${isSelected ? 'border-primary' : ''}`}>
                                  <div className="flex">
                                    {/* Token Icon/Image */}
                                    <div className="flex items-center justify-center bg-gray-100 p-4 min-w-[80px]">
                                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {token.TOKEN_SYMBOL.substring(0, 2)}
                                      </div>
                                    </div>

                                    {/* Token Details */}
                                    <CardContent className="py-3 flex-1">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <h3 className="font-semibold">{token.TOKEN_NAME}</h3>
                                          <div className="text-sm text-muted-foreground">{token.TOKEN_SYMBOL}</div>
                                        </div>

                                        {isSelected && (
                                          <div className="bg-primary/10 p-1 rounded-full">
                                            <Check className="h-4 w-4 text-primary" />
                                          </div>
                                        )}
                                      </div>

                                      <div className="mt-2 space-y-1">
                                        <div className="flex justify-between items-center text-sm">
                                          <span className="text-muted-foreground">Saldo:</span>
                                          <span className="font-medium">
                                            {loadingBalances
                                              ? '...'
                                              : `${balance.toLocaleString('id-ID')} ${token.TOKEN_SYMBOL}`
                                            }
                                          </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                          <span className="text-muted-foreground">LTV:</span>
                                          <Badge variant={isSelected ? "default" : "outline"} className="text-xs">
                                            {(token.LTV * 100).toFixed(0)}%
                                          </Badge>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </div>
                                </Card>
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>

                    {/* Borrow Token Dropdown */}
                    <div className="space-y-2">
                      <Label htmlFor="borrowToken">Token Pinjaman</Label>
                      <Select
                        value={selectedBorrowToken}
                        onValueChange={setSelectedBorrowToken}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih token pinjaman" />
                        </SelectTrigger>
                        <SelectContent>
                          {SUPPORTED_TOKENS
                            .filter(token => token.BORROW_TOKEN)
                            .map(token => (
                              <SelectItem
                                key={token.CONTRACT_ADDRESS}
                                value={token.CONTRACT_ADDRESS}
                              >
                                {token.TOKEN_SYMBOL} - {token.TOKEN_NAME}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Borrow Amount Input */}
                    <div className="space-y-2">
                      <Label htmlFor="amount">
                        Jumlah Pinjaman {selectedBorrowTokenDetails ? `(${selectedBorrowTokenDetails.TOKEN_SYMBOL})` : ''}
                      </Label>
                      <div className="relative">
                        <Input
                          id="amount"
                          type="text"
                          inputMode="numeric"
                          placeholder="ex. 50.000.000"
                          value={loanAmount}
                          onChange={handleLoanAmountChange}
                          className={isLoanAmountExceeded ? "border-red-500 focus-visible:ring-red-500 pr-12" : "pr-12"}
                          disabled={!selectedCollateralToken || !selectedBorrowToken}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3"
                          onClick={handleSetMaxLoan}
                          disabled={!selectedCollateralToken || !selectedBorrowToken}
                        >
                          Max
                        </Button>
                      </div>
                      {isLoanAmountExceeded && (
                        <Alert variant="destructive" className="mt-2 text-xs">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>Jumlah pinjaman melebihi batas maksimal.</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Jangka Waktu (Bulan)</Label>
                      <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jangka waktu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 Bulan</SelectItem>
                          <SelectItem value="12">12 Bulan</SelectItem>
                          <SelectItem value="18">18 Bulan</SelectItem>
                          <SelectItem value="24">24 Bulan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Loan Summary */}
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center"><Calculator className="w-5 h-5 mr-2" />Ringkasan Pinjaman</CardTitle><CardDescription className="py-1">Perhitungan berdasarkan input Anda.</CardDescription></CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <div className="space-y-4 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Token Jaminan</span>
                        {selectedCollateralTokenDetails ? (
                          <div className="flex items-center">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mr-2">
                              {selectedCollateralTokenDetails.TOKEN_SYMBOL.substring(0, 2)}
                            </div>
                            <span className="font-medium">{selectedCollateralTokenDetails.TOKEN_SYMBOL}</span>
                          </div>
                        ) : (
                          <span>-</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Token Pinjaman</span>
                        <span className="font-medium">
                          {selectedBorrowTokenDetails ? selectedBorrowTokenDetails.TOKEN_SYMBOL : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Jumlah Pinjaman</span>
                        <span className="font-medium">
                          {loanAmount ? `Rp ${loanAmount}` : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Jangka Waktu</span>
                        <span className="font-medium">{duration ? `${duration} Bulan` : '-'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Suku Bunga</span>
                        <span className="font-medium">1.5% per tahun</span>
                      </div>
                      <div className="flex justify-between items-center text-lg">
                        <span className="text-muted-foreground">Pembayaran Bulanan</span>
                        <span className="font-bold text-primary">
                          {monthlyPayment > 0 ? `Rp ${monthlyPayment.toLocaleString('id-ID')}` : '-'}
                        </span>
                      </div>
                      {selectedCollateralTokenDetails && loanAmount && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">LTV Setelah Pinjaman</span>
                          <Badge variant="outline">
                            {((numericLoanAmount / totalCollateralValueIDR) * 100).toFixed(2)}%
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="mt-auto pt-4 border-t">
                      <Button
                        className="w-full bg-primary text-white hover:to-green-600"
                        size="lg"
                        onClick={handleSubmit}
                        disabled={
                          !loanAmount ||
                          !duration ||
                          loading ||
                          isLoanAmountExceeded ||
                          !selectedCollateralToken ||
                          !selectedBorrowToken
                        }
                      >
                        {loading ? "Memproses Aplikasi..." : "Ajukan Pinjaman"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <Footer />
        </div>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cara Mengajukan Pinjaman</DialogTitle>
          </DialogHeader>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
              <h3 className="text-lg font-semibold text-center">{currentTutorialStep.title}</h3>
              <p className="text-sm text-muted-foreground text-center">{currentTutorialStep.description}</p>
              <div className="flex justify-between w-full mt-4">
                <Button
                  variant="outline"
                  onClick={handlePreviousTutorialStep}
                  disabled={currentTutorialStepIndex === 0}
                >
                  Kembali
                </Button>
                {currentTutorialStepIndex < tutorialSteps.length - 1 ? (
                  <Button onClick={handleNextTutorialStep}>Lanjut</Button>
                ) : (
                  <Button onClick={() => setIsTutorialOpen(false)}>Selesai</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplyLoan;