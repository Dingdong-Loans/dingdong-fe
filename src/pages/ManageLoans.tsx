import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, TrendingUp, Wallet, CreditCard, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

const ManageLoans = () => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // State untuk dialog pembayaran
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [repaymentType, setRepaymentType] = useState("monthly");
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Data pinjaman mockup
  const loans = [
    {
      id: "LOAN-001",
      amount: 50000000,
      outstanding: 42000000,
      monthlyPayment: 4375000,
      collateral: "0.15 BTC",
      collateralValue: 6300,
      healthFactor: 1.8,
      dueDate: "2024-07-15",
      interestRate: 8.5
    },
    {
      id: "LOAN-002",
      amount: 25000000,
      outstanding: 18000000,
      monthlyPayment: 2187500,
      collateral: "0.6 ETH",
      collateralValue: 1200,
      healthFactor: 2.2,
      dueDate: "2024-08-20",
      interestRate: 8.5
    },
  ];

  // Data riwayat transaksi mockup
  const transactionHistory = [
    { id: 'TRX-001', date: '15 Juni 2025', type: 'Pembayaran Cicilan', amount: 'Rp 4,375,000', status: 'Selesai' },
    { id: 'TRX-002', date: '10 Juni 2025', type: 'Pengajuan Pinjaman', amount: 'Rp 25,000,000', status: 'Selesai' },
    { id: 'TRX-003', date: '1 Juni 2025', type: 'Pengajuan Pinjaman', amount: 'Rp 50,000,000', status: 'Selesai' },
  ];
  
  // Data agregat untuk kartu ringkasan
  const totalOutstanding = loans.reduce((sum, loan) => sum + loan.outstanding, 0);
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalCollateralValue = loans.reduce((sum, loan) => sum + loan.collateralValue, 0);
  const averageHealthFactor = loans.length > 0 ? (loans.reduce((sum, loan) => sum + loan.healthFactor, 0) / loans.length) : 0;


  // Helper functions
  const getHealthFactorColor = (factor: number) => {
    if (factor >= 2.0) return "text-green-600";
    if (factor >= 1.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getHealthFactorBadge = (factor: number) => {
    if (factor >= 2.0) return <Badge className="bg-green-100 text-green-800">Aman</Badge>;
    if (factor >= 1.5) return <Badge className="bg-yellow-100 text-yellow-800">Peringatan</Badge>;
    return <Badge className="bg-red-100 text-red-800">Bahaya</Badge>;
  };
  
  const getRepaymentAmount = () => {
    if (!selectedLoan) return 0;
    if (repaymentType === "full") return selectedLoan.outstanding;
    if (repaymentType === "monthly") return selectedLoan.monthlyPayment;
    return parseFloat(customAmount) || 0;
  };

  const handlePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      toast({
        title: "Pembayaran Berhasil",
        description: `Pembayaran untuk pinjaman ${selectedLoan?.id} telah berhasil diproses.`,
      });
      setIsProcessingPayment(false);
      setIsPaymentDialogOpen(false); // Menutup dialog setelah berhasil
    }, 2000);
  };

  return (
    <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Kelola Pinjaman</h1>
            <p className="text-muted-foreground">Monitor dan kelola semua pinjaman aktif Anda.</p>
          </div>

          {/* Bagian Ringkasan yang Ditambahkan Kembali */}
          {loading ? (
            <SkeletonLoader type="stats" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Pinjaman</CardTitle><CreditCard className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">Rp {totalLoanAmount.toLocaleString('id-ID')}</div><p className="text-xs text-muted-foreground">{loans.length} pinjaman aktif</p></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Sisa Hutang</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">Rp {totalOutstanding.toLocaleString('id-ID')}</div><p className="text-xs text-muted-foreground">{Math.round((totalOutstanding/totalLoanAmount) * 100)}% dari total pinjaman</p></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Jaminan</CardTitle><Wallet className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">${totalCollateralValue.toLocaleString('en-US')}</div><p className="text-xs text-muted-foreground">Nilai jaminan saat ini</p></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Rata-rata Health Factor</CardTitle><AlertTriangle className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className={`text-2xl font-bold ${getHealthFactorColor(averageHealthFactor)}`}>{averageHealthFactor.toFixed(2)}</div><p className="text-xs text-muted-foreground">Status {averageHealthFactor >= 1.8 ? 'aman' : 'peringatan'}</p></CardContent>
                </Card>
            </div>
          )}

          {/* Active Loans */}
          <Card className="mb-8">
            <CardHeader><CardTitle>Pinjaman Aktif</CardTitle><CardDescription>Detail semua pinjaman yang sedang berjalan.</CardDescription></CardHeader>
            <CardContent>
              {loading ? <SkeletonLoader type="table" /> : (
                <div className="space-y-6">
                  {loans.map((loan) => (
                    <Card key={loan.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between"><h3 className="text-lg font-semibold">{loan.id}</h3>{getHealthFactorBadge(loan.healthFactor)}</div>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between"><span>Jumlah Pinjaman:</span> <span className="font-medium">Rp {loan.amount.toLocaleString('id-ID')}</span></div>
                              <div className="flex justify-between"><span>Sisa Hutang:</span> <span className="font-medium">Rp {loan.outstanding.toLocaleString('id-ID')}</span></div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-2"><span className="text-sm text-muted-foreground">Progress Pembayaran</span><span className="text-sm">{Math.round((1 - loan.outstanding/loan.amount) * 100)}%</span></div>
                              <Progress value={(1 - loan.outstanding/loan.amount) * 100} className="h-2" />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div><p className="text-sm text-muted-foreground">Jaminan</p><p className="font-medium">{loan.collateral}</p></div>
                              <div><p className="text-sm text-muted-foreground">Health Factor</p><p className={`font-medium ${getHealthFactorColor(loan.healthFactor)}`}>{loan.healthFactor}</p></div>
                              <div><p className="text-sm text-muted-foreground">Suku Bunga</p><p className="font-medium">{loan.interestRate}%</p></div>
                              <div><p className="text-sm text-muted-foreground">Jatuh Tempo</p><p className="font-medium">{new Date(loan.dueDate).toLocaleDateString('id-ID', {day:'2-digit', month:'short', year:'numeric'})}</p></div>
                            </div>
                            <div className="flex space-x-2">
                              <DialogTrigger asChild><Button size="sm" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600" onClick={() => setSelectedLoan(loan)}>Bayar Cicilan</Button></DialogTrigger>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader><CardTitle className="flex items-center"><Calendar className="w-5 h-5 mr-2" /> Riwayat Transaksi Pinjaman</CardTitle><CardDescription>Aktivitas terbaru terkait pinjaman Anda.</CardDescription></CardHeader>
            <CardContent>
              {loading ? <SkeletonLoader type="table" /> : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead><TableHead>Tipe</TableHead><TableHead>Jumlah</TableHead><TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionHistory.map(tx => (<TableRow key={tx.id}><TableCell>{tx.date}</TableCell><TableCell>{tx.type}</TableCell><TableCell className="font-medium">{tx.amount}</TableCell><TableCell><Badge variant="outline" className="text-green-700 border-green-200">{tx.status}</Badge></TableCell></TableRow>))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>

      <DialogContent>
        <DialogHeader><DialogTitle>Pembayaran Pinjaman: {selectedLoan?.id}</DialogTitle><DialogDescription>Pilih jenis pembayaran dan lakukan pembayaran menggunakan IDRX.</DialogDescription></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Jenis Pembayaran</Label>
            <RadioGroup value={repaymentType} onValueChange={setRepaymentType} className="space-y-2">
              <div className="flex items-center space-x-2"><RadioGroupItem value="full" id="full" /><Label htmlFor="full" className="cursor-pointer">Pelunasan (Rp {selectedLoan?.outstanding.toLocaleString('id-ID')})</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="monthly" id="monthly" /><Label htmlFor="monthly" className="cursor-pointer">Cicilan Bulanan (Rp {selectedLoan?.monthlyPayment.toLocaleString('id-ID')})</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="custom" id="custom" /><Label htmlFor="custom" className="cursor-pointer">Jumlah Custom</Label></div>
            </RadioGroup>
          </div>
          {repaymentType === "custom" && (<div className="space-y-2"><Label htmlFor="custom-amount">Jumlah Pembayaran (IDRX)</Label><Input id="custom-amount" type="number" placeholder="1000000" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} /></div>)}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Jumlah Pembayaran:</span><span className="font-medium">Rp {getRepaymentAmount().toLocaleString('id-ID')}</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Dalam IDRX:</span><span className="font-medium">{getRepaymentAmount().toLocaleString('id-ID')} IDRX</span></div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline">Batal</Button></DialogClose>
          <Button onClick={handlePayment} disabled={getRepaymentAmount() <= 0 || isProcessingPayment}>{isProcessingPayment ? "Memproses..." : "Konfirmasi Pembayaran"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageLoans;