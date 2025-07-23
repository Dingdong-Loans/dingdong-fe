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
import { Calculator, AlertCircle, CheckCircle, ArrowRight, Wallet, TrendingUp, HelpCircle, Check, ArrowDown } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SUPPORTED_COLLATERAL_TOKENS, SUPPORTED_BORROW_TOKENS, SUPPORTED_TOKENS } from "@/lib/contract-utils";
import { useLendingCore } from "@/hooks/use-lending-core";
import { useWallet } from "@/hooks/use-wallet";
import { useCollateralManager } from "@/hooks/use-collateral-manager";
import { useBatchGetDepositedCollateral } from "@/hooks/use-collateral-managerv2";
import { useBorrowToken } from "@/hooks/use-lending-corev2";
import { useAccount } from "wagmi";

const ApplyLoan = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const navigate = useNavigate();
  const { address } = useWallet();

  // Use the borrowToken hook
  const {
    borrow,
    isPending: isBorrowPending,
    isWaiting: isBorrowWaiting,
    isSuccess: isBorrowSuccess,
    isError: isBorrowError,
    error: borrowError
  } = useBorrowToken();

  // State for collateral and borrow tokens
  const [selectedCollateralToken, setSelectedCollateralToken] = useState("");
  const [selectedBorrowToken, setSelectedBorrowToken] = useState("");
  const [maxBorrowAmount, setMaxBorrowAmount] = useState(0);

  // Example price rates (would come from an oracle in production)
  const TOKEN_RATES = useMemo(() => ({
    USDT: { IDRX: 16500, USDT: 1 },
    wETH: { IDRX: 16500 * 3600, USDT: 3600 }, // Assuming 1 ETH = 2000 USD
    wBTC: { IDRX: 16500 * 120000, USDT: 120000 }, // Assuming 1 BTC = 30000 USD
  }), []);

  // Use the batch hook to get collateral balances
  const { collaterals: collateralTokensWithBalances, isLoading: isLoadingBalances } = useBatchGetDepositedCollateral(address as `0x${string}`);

  // Get the selected tokens
  const selectedCollateralTokenDetails = SUPPORTED_TOKENS.find(
    token => token.CONTRACT_ADDRESS === selectedCollateralToken
  );

  const selectedBorrowTokenDetails = SUPPORTED_TOKENS.find(
    token => token.CONTRACT_ADDRESS === selectedBorrowToken
  );

  // Compute collateral balances from the hook results
  const collateralBalances = useMemo(() => {
    return collateralTokensWithBalances.reduce((acc, token) => {
      if (token.depositedCollateral !== undefined) {
        console.log('usememo trigger', acc, token);
        // Convert BigInt to readable number with proper decimals
        acc[token.CONTRACT_ADDRESS] = Number(token.depositedCollateral) / (10 ** token.DECIMALS);
      }
      return acc;
    }, {} as Record<string, number>);
  }, [collateralTokensWithBalances]);

  // Calculate total value in IDR for all collaterals
  // const totalCollateralValueIDR = useMemo(() => {
  //   return collateralTokensWithBalances.reduce((total, token) => {
  //     if (token.depositedCollateral !== undefined) {
  //       const balance = Number(token.depositedCollateral) / (10 ** token.DECIMALS);
  //       const rate = TOKEN_TO_IDR_RATE[token.TOKEN_SYMBOL as keyof typeof TOKEN_TO_IDR_RATE] || 15800;
  //       total += balance * rate;
  //     }
  //     return total;
  //   }, 0);
  // }, [collateralTokensWithBalances, TOKEN_TO_IDR_RATE]);

  // Update the maxBorrowAmount calculation to use actual collateral value
  useEffect(() => {
    if (selectedCollateralToken && selectedBorrowToken && address) {
      console.log("reached set max amount");

      const selectedCollateral = collateralTokensWithBalances.find(
        token => token.CONTRACT_ADDRESS === selectedCollateralToken
      );

      if (selectedCollateral) {
        const balance = selectedCollateral.depositedCollateral
          ? Number(selectedCollateral.depositedCollateral) / (10 ** selectedCollateral.DECIMALS)
          : 0;
        // Calculate max borrow based on LTV and balance
        const ltv = selectedCollateral.LTV || 0;
        // const 
        if (selectedBorrowTokenDetails) {
          const rate = TOKEN_RATES[selectedCollateral.TOKEN_SYMBOL as keyof typeof TOKEN_RATES][selectedBorrowTokenDetails.TOKEN_SYMBOL as 'IDRX' | 'USDT'];
          const maxLoanable = balance * ltv * rate;
          setMaxBorrowAmount(maxLoanable);
        }
      }
    }
  }, [selectedCollateralToken, selectedBorrowToken, address, collateralTokensWithBalances, TOKEN_RATES, selectedBorrowTokenDetails]);

  const [currentTutorialStepIndex, setCurrentTutorialStepIndex] = useState(0);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  // Example collateral value (would come from the wallet or contract)
  // const totalCollateralValueIDR = 130000000;

  // Listen for borrow success/failure
  useEffect(() => {
    if (isBorrowSuccess) {
      setApplicationSubmitted(true);
      setLoading(false);
    } else if (isBorrowError) {
      console.error("Borrow error:", borrowError);
      setLoading(false);
    }
  }, [isBorrowSuccess, isBorrowError, borrowError]);

  // Convert loan amount to number for comparisons
  const numericLoanAmount = parseFloat(loanAmount.replace(/\./g, ''));
  const isLoanAmountExceeded = numericLoanAmount > maxBorrowAmount;

  // Handle loan amount change with formatting
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Allow digits and one decimal point
    const numericValue = rawValue.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) return;

    // Limit decimal places to 2
    // if (parts[1] && parts[1].length > 2) return;

    if (numericValue === '' || numericValue === '.') {
      setLoanAmount('');
      setBorrowAmount('');
      return;
    }

    // Set the collateral amount first
    setLoanAmount(numericValue);

    // Calculate and update the borrow amount based on collateral value, token rates, and LTV
    if (selectedCollateralTokenDetails && selectedBorrowTokenDetails) {
      const collateralAmount = parseFloat(numericValue);
      const ltv = selectedCollateralTokenDetails.LTV || 0;
      const rate = TOKEN_RATES[selectedCollateralTokenDetails.TOKEN_SYMBOL as keyof typeof TOKEN_RATES][selectedBorrowTokenDetails.TOKEN_SYMBOL as 'IDRX' | 'USDT'];

      // Calculate what the borrow amount should be based on collateral and LTV
      const calculatedBorrowAmount = collateralAmount * rate;

      // Calculate the max allowed borrow based on LTV
      const maxAllowedBorrow = collateralAmount * ltv * rate;

      // Use the smaller of the calculated amount or max allowed by LTV
      const finalBorrowAmount = Math.min(calculatedBorrowAmount, maxAllowedBorrow);

      // Update the borrow amount
      setBorrowAmount(finalBorrowAmount.toString());
    }
  };

  const handleBorrowAmountChange = (value: React.ChangeEvent<HTMLInputElement> | number) => {
    // Handle both event and direct number input
    const rawValue = typeof value === 'number' ? value.toString() : value.target.value;

    // Allow digits and one decimal point
    const numericValue = rawValue.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) return;

    if (numericValue === '' || numericValue === '.') {
      setBorrowAmount('');
      setLoanAmount('');
      return;
    }

    // Set the borrow amount first
    setBorrowAmount(numericValue);

    // Convert borrowAmount to collateral value based on token rates
    if (selectedCollateralTokenDetails && selectedBorrowTokenDetails) {
      const borrowAmount = parseFloat(numericValue);
      const ltv = selectedCollateralTokenDetails.LTV || 0;
      const rate = TOKEN_RATES[selectedCollateralTokenDetails.TOKEN_SYMBOL as keyof typeof TOKEN_RATES][selectedBorrowTokenDetails.TOKEN_SYMBOL as 'IDRX' | 'USDT'];

      // Calculate the minimum collateral needed based on LTV
      const minimumCollateral = borrowAmount / (ltv * rate);

      // Calculate the direct conversion without LTV constraint
      const directConversion = borrowAmount / rate;

      // Use the larger of the two to ensure LTV compliance
      const requiredCollateral = Math.max(minimumCollateral, directConversion);

      // Check if user has enough balance
      const availableBalance = collateralBalances[selectedCollateralToken] || 0;
      const finalCollateralAmount = Math.min(requiredCollateral, availableBalance);

      // Set the collateral amount
      setLoanAmount(finalCollateralAmount.toString());

      // If the required collateral exceeds available balance, adjust borrow amount
      if (requiredCollateral > availableBalance && availableBalance > 0) {
        const maxPossibleBorrow = availableBalance * ltv * rate;
        setBorrowAmount(maxPossibleBorrow.toString());
      }
    }
  };

  // Set max loan amount based on calculated max borrow
  // const handleSetMaxLoan = () => {
  //   if (maxBorrowAmount > 0) {
  //     // Format with thousands separator
  //     const formattedValue = new Intl.NumberFormat('id-ID').format(maxBorrowAmount);
  //     // Set loan amount to max value
  //     setLoanAmount(formattedValue);
  //   }
  // };

  const handleSetMaxBorrow = () => {
    if (maxBorrowAmount > 0 && selectedCollateralTokenDetails && selectedBorrowTokenDetails) {
      // Call the borrow amount change handler to update both values
      handleBorrowAmountChange(maxBorrowAmount);
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

  const handleShowConfirmation = () => {
    if (isLoanAmountExceeded || !selectedCollateralToken || !selectedBorrowToken) return;
    setIsConfirmationOpen(true);
  };

  const handleSubmit = async () => {
    if (isLoanAmountExceeded || !selectedCollateralToken || !selectedBorrowToken) return;
    setLoading(true);

    try {
      // Parse amount as a number, then convert to bigint with proper decimals
      const numericalAmount = parseFloat(borrowAmount.replace(/,/g, ''));
      const decimalMultiplier = 10 ** (selectedBorrowTokenDetails?.DECIMALS || 18);
      const amountInSmallestUnit = BigInt(Math.floor(numericalAmount * decimalMultiplier));

      // Convert duration from months to seconds
      const durationSeconds = BigInt(parseInt(duration) * 30 * 24 * 60 * 60);

      // Call the borrow function from the hook
      await borrow({
        borrowToken: selectedBorrowToken as `0x${string}`,
        collateralToken: selectedCollateralToken as `0x${string}`,
        amount: amountInSmallestUnit,
        duration: durationSeconds
      });

      // We'll handle the success in useEffect
      setIsConfirmationOpen(false);
      setApplicationSubmitted(true);
    } catch (error) {
      console.error("Error borrowing:", error);
    } finally {
      setLoading(false);
    }
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
      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Pengajuan Pinjaman</DialogTitle>
          </DialogHeader>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Ringkasan Pinjaman Anda</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Token Jaminan:</span>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mr-2">
                      {selectedCollateralTokenDetails?.TOKEN_SYMBOL.substring(0, 2)}
                    </div>
                    <span className="font-medium">{selectedCollateralTokenDetails?.TOKEN_SYMBOL}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Jumlah Jaminan:</span>
                  <span className="font-medium">{parseFloat(loanAmount).toLocaleString('id-ID')} {selectedCollateralTokenDetails?.TOKEN_SYMBOL}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Token Pinjaman:</span>
                  <span className="font-medium">{selectedBorrowTokenDetails?.TOKEN_SYMBOL}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Jumlah Pinjaman:</span>
                  <span className="font-medium">{parseFloat(borrowAmount.replace(/,/g, '')).toLocaleString('id-ID')} {selectedBorrowTokenDetails?.TOKEN_SYMBOL}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Jangka Waktu:</span>
                  <span className="font-medium">{duration} Bulan</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Suku Bunga:</span>
                  <span className="font-medium">1.5% per tahun</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-muted-foreground">Pembayaran Bulanan:</span>
                  <span className="font-bold text-primary">
                    {monthlyPayment > 0 ? `${monthlyPayment.toLocaleString('id-ID')} ${selectedBorrowTokenDetails?.TOKEN_SYMBOL}` : '-'}
                  </span>
                </div>
              </div>
              <Alert className="mt-4 bg-blue-50">
                <AlertDescription className="text-sm">
                  Dengan mengajukan pinjaman ini, Anda setuju bahwa jaminan Anda dapat dilikuidasi jika pinjaman tidak dibayar sesuai jadwal.
                </AlertDescription>
              </Alert>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setIsConfirmationOpen(false)}>
                  Batal
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading || isBorrowPending || isBorrowWaiting}
                >
                  {loading || isBorrowPending || isBorrowWaiting ? "Memproses..." : "Konfirmasi Pinjaman"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

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
                    {/* Swap-like Interface */}
                    <div className="space-y-4">
                      {/* Collateral Token Input */}
                      <div className="rounded-lg border bg-card p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm text-muted-foreground">Token Jaminan</Label>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-muted-foreground">
                              Saldo: {selectedCollateralToken && !isLoadingBalances
                                ? `${collateralBalances[selectedCollateralToken] || '0'} ${selectedCollateralTokenDetails?.TOKEN_SYMBOL || ''}`
                                : isLoadingBalances ? 'Memuat...' : '0'}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 relative">
                          <Input
                            type="text"
                            // inputMode="numeric"
                            placeholder="0.0"
                            value={loanAmount}
                            onChange={handleLoanAmountChange}
                            className={`${isLoanAmountExceeded ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            disabled={!selectedCollateralToken || !selectedBorrowToken}
                          />

                          <Select
                            value={selectedCollateralToken}
                            onValueChange={setSelectedCollateralToken}
                          >
                            <SelectTrigger className="w-[160px]">
                              {selectedCollateralTokenDetails ? (
                                <div className="flex items-center">
                                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mr-2">
                                    {selectedCollateralTokenDetails.TOKEN_SYMBOL.substring(0, 2)}
                                  </div>
                                  <span>{selectedCollateralTokenDetails.TOKEN_SYMBOL}</span>
                                </div>
                              ) : (
                                <SelectValue placeholder="Pilih Token" />
                              )}
                            </SelectTrigger>
                            <SelectContent>
                              {collateralTokensWithBalances.map(token => (
                                <SelectItem
                                  key={token.CONTRACT_ADDRESS}
                                  value={token.CONTRACT_ADDRESS}
                                >
                                  <div className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mr-2">
                                      {token.TOKEN_SYMBOL.substring(0, 2)}
                                    </div>
                                    <span className="flex-1">{token.TOKEN_SYMBOL}</span>
                                    <span className="text-xs text-muted-foreground ml-2">
                                      {token.depositedCollateral
                                        ? (Number(token.depositedCollateral) / (10 ** token.DECIMALS)).toLocaleString('id-ID', { maximumFractionDigits: 6 })
                                        : '0'}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {selectedCollateralTokenDetails && (
                          <div className="mt-2 flex justify-between items-center text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              <span className="mr-1">LTV: </span>
                              {(selectedCollateralTokenDetails.LTV * 100).toFixed(0)}%
                            </Badge>
                            <div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs font-medium"
                                onClick={() => {
                                  if (selectedCollateralToken && selectedCollateralTokenDetails && selectedBorrowTokenDetails) {
                                    const collateralValue = collateralBalances[selectedCollateralToken] || 0;
                                    const amount = collateralValue / 2;
                                    setLoanAmount(amount.toString());

                                    // Also update the borrow amount based on the collateral
                                    const ltv = selectedCollateralTokenDetails.LTV || 0;
                                    const rate = TOKEN_RATES[selectedCollateralTokenDetails.TOKEN_SYMBOL as keyof typeof TOKEN_RATES][selectedBorrowTokenDetails.TOKEN_SYMBOL as 'IDRX' | 'USDT'];
                                    const borrowAmount = amount * ltv * rate;
                                    setBorrowAmount(borrowAmount.toString());
                                  }
                                }}
                                disabled={!selectedCollateralToken || !selectedBorrowToken}
                              >
                                50%
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs font-medium"
                                onClick={() => {
                                  const collateralValue = collateralBalances[selectedCollateralToken] || 0;
                                  setLoanAmount(collateralValue.toString());

                                  // Also update the borrow amount based on the collateral
                                  if (selectedCollateralTokenDetails && selectedBorrowTokenDetails) {
                                    const ltv = selectedCollateralTokenDetails.LTV || 0;
                                    const rate = TOKEN_RATES[selectedCollateralTokenDetails.TOKEN_SYMBOL as keyof typeof TOKEN_RATES][selectedBorrowTokenDetails.TOKEN_SYMBOL as 'IDRX' | 'USDT'];
                                    const borrowAmount = collateralValue * ltv * rate;
                                    setBorrowAmount(borrowAmount.toString());
                                  }
                                }}
                                disabled={!selectedCollateralToken || !selectedBorrowToken}
                              >
                                MAX
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Swap Arrow */}
                      <div className="flex justify-center">
                        <div className="bg-background rounded-full p-2 -my-2 z-10">
                          <ArrowDown className="h-6 w-6 text-muted-foreground" />
                        </div>
                      </div>

                      {/* Borrow Token Input */}
                      <div className="rounded-lg border bg-card p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm text-muted-foreground">Token Pinjaman</Label>
                          {selectedBorrowTokenDetails && (
                            <div className="text-sm text-muted-foreground">
                              Max: {maxBorrowAmount.toLocaleString('id-ID')}
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Input
                            type="text"
                            // readOnly
                            // disabled={false}
                            placeholder="0.0"
                            value={borrowAmount}
                            onChange={handleBorrowAmountChange}
                            className={""}
                            disabled={!selectedBorrowToken}
                          // className="bg-muted"
                          />
                          <Select
                            value={selectedBorrowToken}
                            onValueChange={setSelectedBorrowToken}
                          >
                            <SelectTrigger className="w-[160px]">
                              {selectedBorrowTokenDetails ? (
                                <div className="flex items-center">
                                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mr-2">
                                    {selectedBorrowTokenDetails.TOKEN_SYMBOL.substring(0, 2)}
                                  </div>
                                  <span>{selectedBorrowTokenDetails.TOKEN_SYMBOL}</span>
                                </div>
                              ) : (
                                <SelectValue placeholder="Pilih Token" />
                              )}
                            </SelectTrigger>
                            <SelectContent>
                              {SUPPORTED_TOKENS
                                .filter(token => token.BORROW_TOKEN)
                                .map(token => (
                                  <SelectItem
                                    key={token.CONTRACT_ADDRESS}
                                    value={token.CONTRACT_ADDRESS}
                                  >
                                    <div className="flex items-center">
                                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mr-2">
                                        {token.TOKEN_SYMBOL.substring(0, 2)}
                                      </div>
                                      <span>{token.TOKEN_SYMBOL}</span>
                                    </div>
                                  </SelectItem>
                                ))
                              }
                            </SelectContent>
                          </Select>
                        </div>
                        {selectedCollateralTokenDetails && (
                          <div className="mt-2 flex justify-end items-center text-sm text-muted-foreground">
                            <div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs font-medium"
                                onClick={() => {
                                  if (selectedCollateralToken && selectedCollateralTokenDetails && selectedBorrowTokenDetails) {
                                    const balance = collateralBalances[selectedCollateralToken] || 0;
                                    const ltv = selectedCollateralTokenDetails.LTV || 0;
                                    const rate = TOKEN_RATES[selectedCollateralTokenDetails.TOKEN_SYMBOL as keyof typeof TOKEN_RATES][selectedBorrowTokenDetails.TOKEN_SYMBOL as 'IDRX' | 'USDT'];
                                    // Calculate 50% of the max borrowable amount
                                    const maxAmount = balance * ltv * rate;
                                    const amount = maxAmount * 0.5;
                                    setBorrowAmount(amount.toLocaleString('en-US'));
                                    handleBorrowAmountChange(amount);
                                  }
                                }}
                                disabled={!selectedCollateralToken || !selectedBorrowToken}
                              >
                                50%
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs font-medium"
                                onClick={handleSetMaxBorrow}
                                disabled={!selectedCollateralToken || !selectedBorrowToken}
                              >
                                MAX
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {isLoanAmountExceeded && (
                        <Alert variant="destructive" className="mt-2">
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
                    <CardTitle className="flex items-center"><Calculator className="w-5 h-5 mr-2" />Ringkasan Pinjaman</CardTitle>
                    <CardDescription className="py-1">Perhitungan berdasarkan input Anda.</CardDescription>
                  </CardHeader>
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
                            {/* {((numericLoanAmount / totalCollateralValueIDR) * 100).toFixed(2)}% */}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="mt-auto pt-4 border-t">
                      <Button
                        className="w-full bg-primary text-white hover:to-green-600"
                        size="lg"
                        onClick={handleShowConfirmation}
                        disabled={
                          !loanAmount ||
                          !duration ||
                          loading ||
                          isLoanAmountExceeded ||
                          !selectedCollateralToken ||
                          !selectedBorrowToken ||
                          isBorrowPending ||
                          isBorrowWaiting
                        }
                      >
                        {loading || isBorrowPending || isBorrowWaiting ? "Memproses Aplikasi..." : "Ajukan Pinjaman"}
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