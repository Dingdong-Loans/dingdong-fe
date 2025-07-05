
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Copy, QrCode, AlertTriangle, CheckCircle, Clock, CreditCard } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const RepayLoan = () => {
  const [loading, setLoading] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState("");   //menyimpan data pilihan pinjaman yang mau dibayarkan
  const [repaymentType, setRepaymentType] = useState("full");   //menyimpan data tipe pembayaran pinjaman (1 bulan, langsung lunas, atau custom)
  const [customAmount, setCustomAmount] = useState("");
  const [repaymentStatus, setRepaymentStatus] = useState("ready");
  const { toast } = useToast();

  const loans = [
    {
      id: "LOAN-001",
      outstanding: 42000000,
      monthlyPayment: 4375000
    },
    {
      id: "LOAN-002",
      outstanding: 18000000,
      monthlyPayment: 2187500
    }
  ];

  //address mockup untuk pembayaran pinjaman
  const repaymentAddress = "IDRXRepay1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

  //Menentukan jumlah yang perlu dibayarkan bedasarkan repaymentType.
  const getRepaymentAmount = () => {
    const loan = loans.find(l => l.id === selectedLoan);
    if (!loan) return 0;
    
    if (repaymentType === "full") {
      return loan.outstanding;
    } else if (repaymentType === "monthly") {
      return loan.monthlyPayment;
    } else {
      return parseFloat(customAmount) || 0;
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(repaymentAddress);
    toast({
      title: "Alamat Disalin",
      description: "Alamat pembayaran telah disalin ke clipboard",
    });
  };

  const handleRepayment = () => {
    setLoading(true);
    setRepaymentStatus("pending");
    
    setTimeout(() => {
      setRepaymentStatus("confirmed");
      setLoading(false);
    }, 3000);

    setTimeout(() => {
      setRepaymentStatus("completed");
      toast({
        title: "Pembayaran Berhasil",
        description: "Pembayaran pinjaman Anda telah berhasil diproses",
      });
    }, 6000);
  };

  const selectedLoanData = loans.find(l => l.id === selectedLoan);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Bayar Pinjaman</h1>
            <p className="text-muted-foreground">Lakukan pembayaran pinjaman menggunakan IDRX</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Repayment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Pembayaran</CardTitle>
                <CardDescription>Pilih pinjaman dan jumlah yang ingin dibayar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Pilih Pinjaman</Label>
                  <Select value={selectedLoan} onValueChange={setSelectedLoan}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih pinjaman yang ingin dibayar" />
                    </SelectTrigger>
                    <SelectContent>
                      {loans.map((loan) => (
                        <SelectItem key={loan.id} value={loan.id}>
                          {loan.id} - Sisa: {loan.outstanding.toLocaleString('id-ID')} IDRX
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedLoanData && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Informasi Pinjaman</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Sisa Hutang:</span>
                        <span className="font-medium">{selectedLoanData.outstanding.toLocaleString('id-ID')} IDRX</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cicilan Bulanan:</span>
                        <span className="font-medium">{selectedLoanData.monthlyPayment.toLocaleString('id-ID')} IDRX</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedLoan && (
                  <div className="space-y-4">
                    <Label>Jenis Pembayaran</Label>
                    <RadioGroup value={repaymentType} onValueChange={setRepaymentType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full" id="full" />
                        <Label htmlFor="full" className="cursor-pointer">
                          Pelunasan ({selectedLoanData?.outstanding.toLocaleString('id-ID')} IDRX)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly" className="cursor-pointer">
                          Cicilan Bulanan ({selectedLoanData?.monthlyPayment.toLocaleString('id-ID')} IDRX)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="custom" id="custom" />
                        <Label htmlFor="custom" className="cursor-pointer">
                          Jumlah Custom
                        </Label>
                      </div>
                    </RadioGroup>

                    {repaymentType === "custom" && (
                      <div className="space-y-2">
                        <Label htmlFor="custom-amount">Jumlah Pembayaran (IDRX)</Label>
                        <Input
                          id="custom-amount"
                          type="number"
                          placeholder="1000000"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          Minimum: 500,000 IDRX
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-2">Peringatan Penting:</p>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Hanya kirim IDRX ke alamat ini</li>
                        <li>• Mengirim token lain dapat menyebabkan kehilangan</li>
                        <li>• Pastikan jumlah yang dikirim sesuai</li>
                        <li>• Pembayaran akan diproses dalam 5-15 menit</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Alamat Pembayaran
                </CardTitle>
                <CardDescription>Kirim IDRX ke alamat berikut</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedLoan ? (
                  <>
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gray-100 border rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-gray-400" />
                      </div>
                      <p className="text-sm text-muted-foreground">QR Code untuk IDRX</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Alamat Wallet IDRX</Label>
                      <div className="flex items-center space-x-2">
                        <Input value={repaymentAddress} readOnly className="font-mono text-sm" />
                        <Button size="sm" variant="outline" onClick={copyAddress}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Jumlah Pembayaran:</span>
                          <span className="font-medium">{getRepaymentAmount().toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Dalam IDRX:</span>
                          <span className="font-medium">{getRepaymentAmount().toLocaleString('id-ID')} IDRX</span>
                        </div>
                      </div>
                    </div>

                    {repaymentStatus === "ready" && (
                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                        onClick={handleRepayment}
                        disabled={getRepaymentAmount() === 0 || loading}
                      >
                        Konfirmasi Pembayaran
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Pilih pinjaman yang ingin dibayar</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Payment Status */}
          {repaymentStatus !== "ready" && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Status Pembayaran
                </CardTitle>
                <CardDescription>Monitor status pembayaran Anda</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <SkeletonLoader type="card" />
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Status</span>
                      {repaymentStatus === "pending" && (
                        <Badge className="bg-yellow-100 text-yellow-800">Memproses Pembayaran</Badge>
                      )}
                      {repaymentStatus === "confirmed" && (
                        <Badge className="bg-blue-100 text-blue-800">Dikonfirmasi</Badge>
                      )}
                      {repaymentStatus === "completed" && (
                        <Badge className="bg-green-100 text-green-800">Selesai</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Pinjaman</span>
                      <span className="font-medium">{selectedLoan}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Jumlah Dibayar</span>
                      <span className="font-medium">{getRepaymentAmount().toLocaleString('id-ID')} IDRX</span>
                    </div>

                    {repaymentStatus === "completed" && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium text-green-900 mb-1">Pembayaran Berhasil!</p>
                            <p className="text-green-700">
                              {repaymentType === "full" 
                                ? "Pinjaman Anda telah lunas. Jaminan akan segera dikembalikan."
                                : "Pembayaran berhasil diproses. Saldo pinjaman telah diperbarui."
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RepayLoan;
