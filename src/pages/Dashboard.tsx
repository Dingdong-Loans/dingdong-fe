import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, CreditCard, ArrowRight } from "lucide-react";
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

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userName] = useState("Andro");
  const { toast } = useToast();

  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<any | null>(null);

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
      monthlyPayment: "4,500,000"
    },
    {
      id: "Pinjaman Modal Kerja #002",
      date: "28 Okt 2024",
      collateral: "8 ETH",
      tenor: "24 Bulan",
      amount: "30,000,000",
      size: "25,000,000",
      status: "inactive",
    },
    {
      id: "Pinjaman Ekspansi #003",
      date: "15 Sep 2024",
      collateral: "15 BTC",
      tenor: "18 Bulan",
      amount: "75,000,000",
      size: "70,000,000",
      status: "active",
      monthlyPayment: "6,875,000"
    },
    {
      id: "Pinjaman Darurat #004",
      date: "01 Agu 2024",
      collateral: "50 SOL",
      tenor: "6 Bulan",
      amount: "15,000,000",
      size: "15,000,000",
      status: "inactive",
    },
  ];

  const portfolioItems = [
    { name: "Bitcoin", value: "$125,000" },
    { name: "Ethereum", value: "$62,000" },
    { name: "Solana", value: "$100,000,000" },
  ];

  const healthFactor = 51.2;
  const healthFactorData = [{ name: 'Health Factor', value: healthFactor, fill: 'hsl(var(--primary))' }];

  const handlePaymentClick = (e: React.MouseEvent, loan: any) => {
    e.stopPropagation();
    setSelectedLoan(loan);
    setIsPaymentDialogOpen(true);
  };

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
          {loading ? (
            <Skeleton className="h-10 w-1/2 mb-8" />
          ) : (
            <h1 className="text-4xl font-bold text-foreground mb-8">
              Welcome back <span className="text-primary">{userName}</span>
            </h1>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Top Info Cards */}
              {loading ? (
                <SkeletonLoader type="stats_row" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border shadow-sm"><CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Total Jaminan Aktif</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">Rp 125,000,000</p><p className="text-xs text-muted-foreground">+5.2% dari bulan lalu</p></CardContent></Card>
                  <Card className="border shadow-sm"><CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Nilai Jaminan</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">$187,500</p><p className="text-xs text-muted-foreground">+13.2% dari bulan lalu</p></CardContent></Card>
                  <Card className="border shadow-sm"><CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Tersedia untuk Pinjam</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">Rp 75,000,000</p><p className="text-xs text-muted-foreground">Berdasarkan jaminan saat ini</p></CardContent></Card>
                </div>
              )}

              {/* Active Loans Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Pinjaman Aktif</h2>
                  <Link to="/apply"><Button variant="outline" size="sm"><PlusCircle className="w-4 h-4 mr-2" />Tambah Pinjaman</Button></Link>
                </div>
                {loading ? (
                  <div className="space-y-4"><SkeletonLoader type="loan_card" /><SkeletonLoader type="loan_card" /></div>
                ) : (
                  <div className="space-y-4">
                    {activeLoans.map((loan) => (
                      <Card
                        key={loan.id}
                        className={`group transition-all duration-300 rounded-lg overflow-hidden ${loan.status === 'active' ? 'cursor-pointer bg-white hover:bg-gray-100' : 'bg-white'}`}
                      >
                        <CardContent className="p-0 flex justify-between items-stretch">
                          {/* Main Content */}
                          <div className="p-4 flex-1 flex items-center justify-between min-w-0">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-md flex-shrink-0 ${loan.status === 'inactive' ? 'bg-[#48524A]' : 'bg-gray-200'}`} />
                              <div className="min-w-0">
                                <p className="font-bold truncate">{loan.id}</p>
                                <p className={`text-xs text-black truncate `}>Dibuat: {loan.date}</p>
                                <p className={`text-xs truncate `}>{loan.collateral} &middot; Tenor: {loan.tenor}</p>
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <p className="font-bold text-lg">Rp {loan.amount}</p>
                              <p className={`text-xs ${loan.status === 'inactive' ? 'text-gray-300' : 'text-muted-foreground'}`}>Size: Rp {loan.size}</p>
                              <div className="mt-2 flex items-center gap-2 justify-end">
                                {loan.status === 'active' ? (
                                  <Badge className="bg-primary/20 text-primary border-primary/30">Aktif</Badge>
                                ) : (
                                  <Badge className="bg-muted text-muted-foreground">Non-aktif</Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons Panel */}
                          <div
                            className={`flex transition-all duration-300 ease-in-out w-0 ${loan.status === 'active' ? 'group-hover:w-32' : ''}`}
                          >
                            <Button variant="ghost" className="h-full flex-1 flex-col space-y-1 rounded-none text-muted-foreground bg-accent hover:bg-primary/90 " onClick={(e) => handlePaymentClick(e, loan)}>
                              <CreditCard className="w-5 h-5" />
                              <span className="text-xs">Bayar</span>
                            </Button>
                            <Button variant="ghost" className="h-full flex-1 flex-col space-y-1 rounded-none hover:bg-primary/90">
                              <ArrowRight className="w-5 h-5" />
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
            <aside className="space-y-8">
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
                  <CardHeader className="p-0 mb-4"><CardTitle>Health Factor</CardTitle><p className="text-xs text-gray-300">Lorem ipsum etc whether yes</p></CardHeader>
                  <CardContent className="p-0 flex flex-col items-center justify-center h-48 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart innerRadius="80%" outerRadius="100%" data={healthFactorData} startAngle={180} endAngle={0} barSize={30}>
                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <RadialBar background={{ fill: '#48524A' }} dataKey="value" cornerRadius={10} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <p className="text-4xl font-bold text-primary">{healthFactor}%</p>
                      <p className="text-xs text-gray-300 mt-1">Not bad health yknow</p>
                    </div>
                    <Button className="absolute bottom-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">Learn More</Button>
                  </CardContent>
                </Card>
              )}
            </aside>
          </div>
        </main>
        <Footer />
      </div>

      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bayar Cicilan untuk {selectedLoan?.id}</DialogTitle>
            <DialogDescription>Konfirmasi detail pembayaran Anda. Pembayaran akan dilakukan menggunakan saldo IDRX Anda.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-gray-100 rounded-md"><div className="flex justify-between text-sm"><span className="text-muted-foreground">Cicilan Bulanan</span><span className="font-medium">Rp {selectedLoan?.monthlyPayment}</span></div></div>
            <div className="space-y-2"><Label htmlFor="payment-amount">Jumlah Pembayaran</Label><Input id="payment-amount" value={`Rp ${selectedLoan?.monthlyPayment}`} readOnly /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>Batal</Button>
            <Button className="bg-primary text-primary-foreground" onClick={handlePaymentSubmit}>Konfirmasi Pembayaran</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;