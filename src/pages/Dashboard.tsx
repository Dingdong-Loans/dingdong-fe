import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PlusCircle,
  CreditCard,
  ArrowRight,
  Wallet,
  Banknote,
  HandCoins,
  CheckCircle,
  XCircle
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

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userName] = useState("Andro");
  const { toast } = useToast();

  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<any | null>(null);

  const [repaymentType, setRepaymentType] = useState("monthly");
  const [customAmount, setCustomAmount] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const activeLoans = [
    {
      id: "Pinjaman Modal Kerja #001",
      date: "14 Nov 2024",
      collateral: "12 BTC",
      tenor: "12 Bulan",
      amount: "50.000.000",
      size: "45.000.000",
      status: "active",
      monthlyPayment: "4.500.000",
      interestRate: "1.5%",
      dueDate: "14 Desember 2024",
    },
    {
      id: "LOAN-002",
      date: "28 Okt 2024",
      collateral: "8 ETH",
      tenor: "24 Bulan",
      amount: "30.000.000",
      size: "18.000.000",
      status: "active",
      monthlyPayment: "2.187.500",
      interestRate: "9.0%",
      dueDate: "28 November 2024",
    },
    {
      id: "Pinjaman Ekspansi #003",
      date: "15 Sep 2024",
      collateral: "15 BTC",
      tenor: "18 Bulan",
      amount: "75.000.000",
      size: "70.000.000",
      status: "active",
      monthlyPayment: "6.875.000",
      interestRate: "8.75%",
      dueDate: "15 Oktober 2024",
    },
    {
      id: "Pinjaman Darurat #004",
      date: "01 Agu 2024",
      collateral: "50 SOL",
      tenor: "6 Bulan",
      amount: "15.000.000",
      size: "15.000.000",
      status: "inactive",
      monthlyPayment: "N/A",
      interestRate: "10.0%",
      dueDate: "01 Februari 2025",
    },
  ];

  const portfolioItems = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      amount: "0,25",
      valueIDR: "Rp 100.000.000",
      color: "bg-orange-500",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      amount: "0,8",
      valueIDR: "Rp 20.000.000",
      color: "bg-gray-500",
    },
    {
      name: "Solana",
      symbol: "SOL",
      amount: "10,5",
      valueIDR: "Rp 10.000.000",
      color: "bg-purple-500",
    },
  ];

  const totalCollateralValue = 135000000;
  // --- PERUBAHAN: Menggunakan `replace(/\./g, '')` untuk menghapus titik sebagai pemisah ribuan ---
  // Ini memastikan string seperti "45.000.000" diubah menjadi angka 45000000 dengan benar.
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

  const handlePaymentClick = (e: React.MouseEvent, loan: any) => {
    e.stopPropagation();
    setSelectedLoan(loan);
    setRepaymentType("monthly");
    setCustomAmount("");
    setIsPaymentDialogOpen(true);
  };

  const handleDetailClick = (e: React.MouseEvent, loan: any) => {
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
    if (repaymentType === "full") return parseCurrency(selectedLoan.size);
    if (repaymentType === "monthly")
      return parseCurrency(selectedLoan.monthlyPayment);
    return parseFloat(customAmount) || 0;
  };

  const paymentAmount = getRepaymentAmount();

  const handlePaymentSubmit = () => {
    // Simulasi kemungkinan gagal atau berhasil
    const isSuccess = Math.random() > 0.3; // 70% kemungkinan berhasil
    
    if (isSuccess) {
      // --- Logika untuk notifikasi BERHASIL (tidak berubah) ---
      toast({
        title: "Pembayaran Berhasil",
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>
              Pembayaran untuk {selectedLoan?.id} sedang diproses.
            </span>
          </div>
        ),
        className: "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
      });
    } else {
      // --- PERUBAHAN: Logika untuk notifikasi GAGAL ---
      toast({
        variant: "destructive", // Varian 'destructive' akan menggunakan warna merah
        title: "Pembayaran Gagal",
        description: (
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            <span>
              Terjadi masalah saat memproses pembayaran. Silakan coba lagi.
            </span>
          </div>
        ),
        // Menambahkan kelas untuk border dan latar belakang merah
        className: "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
      });
    }

    setIsPaymentDialogOpen(false);
  };

  return (
    <>
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <main className="container mx-auto px-20 py-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <Skeleton className="h-10 w-1/2 mb-8" />
            ) : (
              <h1 className="text-4xl font-bold text-foreground mb-8">
                Welcome back <span className="text-primary">{userName}</span>
              </h1>
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
                          Total Jaminan Aktif
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">
                          Rp {totalCollateralValue.toLocaleString("id-ID")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          +5.2% dari bulan lalu
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border shadow-sm">
                      <CardHeader className="flex flex-row items-center gap-1 space-y-0 pb-2">
                        <Banknote className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-sm font-medium">
                          Sisa Pinjaman Aktif
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">
                          Rp {totalOutstandingLoans.toLocaleString("id-ID")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          dari semua pinjaman
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border shadow-sm">
                      <CardHeader className="flex flex-row items-center gap-1 space-y-0 pb-2">
                        <HandCoins className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-sm font-medium">
                          Tersedia untuk Pinjam
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">Rp 75.000.000</p>
                        <p className="text-xs text-muted-foreground">
                          Berdasarkan jaminan saat ini
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Active Loans Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Riwayat Pinjaman</h2>
                    <Link to="/apply">
                      <Button variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Tambah Pinjaman
                      </Button>
                    </Link>
                  </div>
                  {loading ? (
                    <div className="space-y-4">
                      <SkeletonLoader type="loan_card" />
                      <SkeletonLoader type="loan_card" />
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {activeLoans.map((loan) => (
                        <Card
                          key={loan.id}
                          className={`group transition-all duration-300 rounded-lg overflow-hidden cursor-pointer bg-white hover:bg-gray-100`}
                        >
                          <CardContent className="p-5 flex mb-3 flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0">
                            <div className="flex-1 flex flex-col min-w-0">
                              <div className="mb-4 space-y-1">
                                <p className="font-bold text-lg">{loan.id}</p>
                                <p className="text-sm text-muted-foreground">
                                  Dibuat: {loan.date}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Tenor: {loan.tenor}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                {loan.status === "active" && (
                                  <Button
                                    size="sm"
                                    className="bg-primary text-white hover:bg-primary/90"
                                    onClick={(e) => handlePaymentClick(e, loan)}
                                  >
                                    Bayar Cicilan
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
                                Rp {loan.amount}
                              </p>
                              <p className="text-sm text-muted-foreground mb-2">
                                Sisa: Rp {loan.size}
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
                        Portofolio Jaminan
                      </CardTitle>
                      <p className="text-xs text-white text-opacity-80">
                        Total aset yang Anda jaminkan
                      </p>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
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
                            Kelola Jaminan
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
              <span className="font-medium">Rp {selectedLoan?.amount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sisa Hutang:</span>
              <span className="font-medium">Rp {selectedLoan?.size}</span>
            </div>
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
              Pilih jenis pembayaran dan lakukan pembayaran menggunakan IDRX.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
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
                    Pelunasan (Rp{" "}
                    {/* --- PERUBAHAN: Menggunakan `replace(/\./g, '')` --- */}
                    {parseFloat(
                      selectedLoan?.size.replace(/\./g, "")
                    ).toLocaleString("id-ID")}
                    )
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="cursor-pointer">
                    Cicilan Bulanan (Rp{" "}
                    {/* --- PERUBAHAN: Menggunakan `replace(/\./g, '')` --- */}
                    {parseFloat(
                      selectedLoan?.monthlyPayment.replace(/\./g, "")
                    ).toLocaleString("id-ID")}
                    )
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
                  Jumlah Pembayaran (IDRX)
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
                  Rp {paymentAmount.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Dalam IDRX:</span>
                <span className="font-medium">
                  {paymentAmount.toLocaleString("id-ID")} IDRX
                </span>
              </div>
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
            >
              Konfirmasi Pembayaran
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;