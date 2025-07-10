import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, CreditCard, ArrowRight, Info, Wallet, Banknote, HandCoins } from "lucide-react";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
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
      amount: "50,000,000",
      size: "45,000,000",
      status: "active",
      monthlyPayment: "4,500,000",
      interestRate: "8.5%",
      dueDate: "14 Desember 2024"
    },
    {
      id: "LOAN-002",
      date: "28 Okt 2024",
      collateral: "8 ETH",
      tenor: "24 Bulan",
      amount: "30,000,000",
      size: "18,000,000",
      status: "active",
      monthlyPayment: "2,187,500",
      interestRate: "9.0%",
      dueDate: "28 November 2024"
    },
    {
      id: "Pinjaman Ekspansi #003",
      date: "15 Sep 2024",
      collateral: "15 BTC",
      tenor: "18 Bulan",
      amount: "75,000,000",
      size: "70,000,000",
      status: "active",
      monthlyPayment: "6,875,000",
      interestRate: "8.75%",
      dueDate: "15 Oktober 2024"
    },
    {
      id: "Pinjaman Darurat #004",
      date: "01 Agu 2024",
      collateral: "50 SOL",
      tenor: "6 Bulan",
      amount: "15,000,000",
      size: "15,000,000",
      status: "inactive",
      monthlyPayment: "N/A",
      interestRate: "10.0%",
      dueDate: "01 Februari 2025"
    },
  ];

  const portfolioItems = [
    { name: "Bitcoin", value: "Rp 100.000.000" },
    { name: "Ethereum", value: "Rp 20.000.000" },
    { name: "Solana", value: "Rp 10.000.000" },
  ];

  const totalCollateralValue = 135000000;
  const totalOutstandingLoans = activeLoans
    .filter(loan => loan.status === 'active')
    .reduce((acc, loan) => acc + parseFloat(loan.size.replace(/,/g, '')), 0);

  const healthFactor = totalOutstandingLoans > 0 ? totalCollateralValue / totalOutstandingLoans : 2.5;

  const getHealthFactorHslColor = (factor: number) => {
    if (factor < 1) return 'hsl(var(--destructive))';
    if (factor === 1) return 'hsl(48 96% 59%)'; // Yellow
    return 'hsl(var(--primary))';
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
    const parseCurrency = (value: string) => parseFloat(value.replace(/,/g, ''));
    if (repaymentType === "full") return parseCurrency(selectedLoan.size);
    if (repaymentType === "monthly") return parseCurrency(selectedLoan.monthlyPayment);
    return parseFloat(customAmount) || 0;
  };

  const paymentAmount = getRepaymentAmount();

  const handlePaymentSubmit = () => {
    toast({
      title: "Pembayaran Berhasil",
      description: `Pembayaran untuk ${selectedLoan?.id} sedang diproses.`,
    });
    setIsPaymentDialogOpen(false);
  }

  return (
    <>
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
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
                        <CardTitle className="text-sm font-medium">Total Jaminan Aktif</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-2xl font-bold">{totalCollateralValue.toLocaleString('id-ID')}</p>
                        <p className="text-xs text-muted-foreground">+5.2% dari bulan lalu</p>
                      </CardContent>
                    </Card>
                    <Card className="border shadow-sm">
                      <CardHeader className="flex flex-row items-center gap-1 space-y-0 pb-2">
                        <Banknote className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-sm font-medium">Sisa Pinjaman Aktif</CardTitle>

                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">Rp {totalOutstandingLoans.toLocaleString('id-ID')}</p>
                        <p className="text-xs text-muted-foreground">dari semua pinjaman</p>
                      </CardContent>
                    </Card>
                    <Card className="border shadow-sm">
                      <CardHeader className="flex flex-row items-center gap-1 space-y-0 pb-2">
                        <HandCoins className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-sm font-medium">Tersedia untuk Pinjam</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">Rp 75,000,000</p>
                        <p className="text-xs text-muted-foreground">Berdasarkan jaminan saat ini</p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Active Loans Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Riwayat Pinjaman</h2>
                    <Link to="/apply"><Button variant="outline" size="sm"><PlusCircle className="w-4 h-4 mr-2" />Tambah Pinjaman</Button></Link>
                  </div>
                  {loading ? (
                    <div className="space-y-4"><SkeletonLoader type="loan_card" /><SkeletonLoader type="loan_card" /></div>
                  ) : (
                    <div className="space-y-4">
                      {activeLoans.map((loan) => (
                        <Card
                          key={loan.id}
                          className={`group transition-all duration-300 rounded-lg overflow-hidden cursor-pointer bg-white hover:bg-gray-100`}
                        >
                          <CardContent className="p-0 flex justify-between items-stretch">
                            <div className="p-4 flex-1 flex items-center justify-between min-w-0">
                              <div className="flex items-center gap-4">
                                {/* <div className={`w-12 h-12 rounded-md flex-shrink-0 ${loan.status === 'inactive' ? 'bg-[#48524A]' : 'bg-gray-200'}`} /> */}
                                <div className="min-w-0">
                                  <p className="font-bold truncate">{loan.id}</p>
                                  <p className={`text-sm ${loan.status === 'inactive' ? 'text-gray-400' : 'text-muted-foreground'}`}>Sisa: Rp {loan.size}</p>
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                {loan.status === 'active' ? (
                                  <Badge className="bg-primary/20 text-primary border-primary/30 hover:text-white">Aktif</Badge>
                                ) : (
                                  <Badge className="bg-muted text-muted-foreground hover:text-white">Non-aktif</Badge>
                                )}
                              </div>
                            </div>

                            <div className={`flex transition-all duration-300 ease-in-out w-0 group-hover:w-32`}>
                              {loan.status === 'active' && (
                                <Button variant="ghost" className="h-full flex-1 flex-col space-y-1 rounded-none text-muted-foreground bg-accent hover:bg-primary/90 " onClick={(e) => handlePaymentClick(e, loan)}>
                                  <CreditCard className="w-5 h-5" />
                                  <span className="text-xs">Bayar</span>
                                </Button>
                              )}
                              <Button variant="ghost" className="h-full flex-1 flex-col space-y-1 rounded-none hover:bg-primary/90" onClick={(e) => handleDetailClick(e, loan)}>
                                <Info className="w-5 h-5" />
                                <span className="text-xs">Detail</span>
                              </Button>
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
                {loading ? <SkeletonLoader type="portfolio" /> : (
                  <Card className="bg-primary rounded-2xl p-6">
                    <CardHeader className="p-0 mb-4"><CardTitle className="text-white">Portofolio Jaminan</CardTitle><p className="text-xs text-white text-opacity-80">in progress</p></CardHeader>
                    <CardContent className="p-0 space-y-4">
                      {portfolioItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white" /><p className="font-medium text-white">{item.name}</p></div>
                          <p className="font-semibold text-white">{item.value}</p>
                        </div>
                      ))}
                      <div className="pt-4"><Link to="/manage-collateral" className="w-full"><Button variant="outline" className="bg-white w-full">Kelola Jaminan</Button></Link></div>
                    </CardContent>
                  </Card>
                )}
                {loading ? <SkeletonLoader type="health_factor" /> : (
                  <Card className="bg-foreground text-white rounded-2xl p-6">
                    <CardHeader className="p-0 mb-4 text-left">
                      <CardTitle>Health Factor</CardTitle>
                      <p className="text-xs text-gray-300">Rasio nilai jaminan terhadap pinjaman</p>
                    </CardHeader>
                    <CardContent className="p-0 h-40 w-full mx-auto relative flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                          data={[{ name: 'Health Factor', value: healthFactor, fill: healthFactorColor }]}
                          innerRadius="150%"
                          outerRadius="180%"
                          barSize={16}
                          startAngle={180}
                          endAngle={0}
                          cx="50%"
                          cy="75%"
                        >
                          <PolarAngleAxis
                            type="number"
                            domain={[0, 1]}
                            angleAxisId={0}
                            tick={false}
                          />
                          <RadialBar
                            background={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                            dataKey="value"
                            cornerRadius={10}
                          />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-full text-center">
                        <p className="text-5xl font-bold" style={{ color: healthFactorColor }}>
                          {healthFactor.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          Status: {healthFactor > 1 ? 'Aman' : 'Berisiko'}
                        </p>
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
            <DialogDescription>Ringkasan lengkap dari pinjaman Anda.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tanggal Pengajuan:</span><span className="font-medium">{selectedLoan?.date}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Jumlah Pinjaman:</span><span className="font-medium">Rp {selectedLoan?.amount}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Sisa Pinjaman:</span><span className="font-medium">Rp {selectedLoan?.size}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tenor:</span><span className="font-medium">{selectedLoan?.tenor}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Suku Bunga:</span><span className="font-medium">{selectedLoan?.interestRate}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Jatuh Tempo Berikutnya:</span><span className="font-medium">{selectedLoan?.dueDate}</span></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>Tutup</Button>
            {selectedLoan?.status === 'active' && (
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={openPaymentFromDetail}>Bayar Cicilan</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pembayaran Pinjaman: {selectedLoan?.id}</DialogTitle>
            <DialogDescription>Pilih jenis pembayaran dan lakukan pembayaran menggunakan IDRX.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Jenis Pembayaran</Label>
              <RadioGroup value={repaymentType} onValueChange={setRepaymentType} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full" className="cursor-pointer">Pelunasan (Rp {parseFloat(selectedLoan?.size.replace(/,/g, '')).toLocaleString('id-ID')})</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="cursor-pointer">Cicilan Bulanan (Rp {parseFloat(selectedLoan?.monthlyPayment.replace(/,/g, '')).toLocaleString('id-ID')})</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom" className="cursor-pointer">Jumlah Custom</Label>
                </div>
              </RadioGroup>
            </div>
            {repaymentType === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="custom-amount">Jumlah Pembayaran (IDRX)</Label>
                <Input id="custom-amount" type="number" placeholder="Masukkan jumlah" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} />
              </div>
            )}
            <div className="space-y-1 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Jumlah Pembayaran:</span>
                <span className="font-medium">Rp {paymentAmount.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Dalam IDRX:</span>
                <span className="font-medium">{paymentAmount.toLocaleString('id-ID')} IDRX</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>Batal</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handlePaymentSubmit}>Konfirmasi Pembayaran</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;