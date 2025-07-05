import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Copy, QrCode, AlertTriangle, CheckCircle, Clock, ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ManageCollateral = () => {
  // State untuk deposit
  const [depositAmount, setDepositAmount] = useState("");
  const [depositCollateralType, setDepositCollateralType] = useState("");
  const [depositStatus, setDepositStatus] = useState("ready");

  // State untuk penarikan
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalCollateralType, setWithdrawalCollateralType] = useState("");
  const [withdrawalStatus, setWithdrawalStatus] = useState("ready");

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const depositAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

  // Data Mockup
  const availableCollateral = [
    { type: 'bitcoin', symbol: 'BTC', amount: 0.25, valueUSD: 10500 },
    { type: 'ethereum', symbol: 'ETH', amount: 0.8, valueUSD: 2000 },
  ];

  const transactionHistory = [
    { id: 'TX001', date: '10 Jun 2024', type: 'Deposit', amount: '0.15 BTC', status: 'Selesai' },
    { id: 'TX002', date: '5 Jun 2024', type: 'Deposit', amount: '0.8 ETH', status: 'Selesai' },
    { id: 'TX003', date: '1 Jun 2024', type: 'Withdrawal', amount: '0.05 BTC', status: 'Selesai' },
  ];

  const cryptoRates = {
    bitcoin: 42000,
    ethereum: 2500,
    usdt: 1,
    usdc: 1
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
    toast({
      title: "Alamat Disalin",
      description: "Alamat deposit telah disalin ke clipboard.",
    });
  };

  const handleDeposit = () => {
    setLoading(true);
    setDepositStatus("pending");
    setTimeout(() => {
      setDepositStatus("completed");
      setLoading(false);
      toast({
        title: "Deposit Berhasil",
        description: `Jaminan ${depositAmount} ${depositCollateralType.toUpperCase()} telah ditambahkan.`,
      });
    }, 2000);
  };
  
  const handleWithdrawal = () => {
    setLoading(true);
    setWithdrawalStatus("pending");
    setTimeout(() => {
      setWithdrawalStatus("completed");
      setLoading(false);
      toast({
        title: "Penarikan Berhasil",
        description: `Jaminan ${withdrawalAmount} ${withdrawalCollateralType.toUpperCase()} telah ditarik.`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Kelola Jaminan</h1>
            <p className="text-muted-foreground">Deposit atau tarik jaminan crypto Anda.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Deposit and Withdraw Forms */}
            <Tabs defaultValue="deposit" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="deposit">
                  <ArrowUpCircle className="w-4 h-4 mr-2"/> Deposit
                </TabsTrigger>
                <TabsTrigger value="withdraw">
                  <ArrowDownCircle className="w-4 h-4 mr-2"/> Tarik
                </TabsTrigger>
              </TabsList>
              
              {/* Deposit Tab */}
              <TabsContent value="deposit">
                <Card>
                  <CardHeader>
                    <CardTitle>Deposit Jaminan</CardTitle>
                    <CardDescription>Pilih crypto dan jumlah yang ingin dideposit.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="crypto-type">Jenis Crypto</Label>
                      <Select value={depositCollateralType} onValueChange={setDepositCollateralType}>
                        <SelectTrigger><SelectValue placeholder="Pilih jenis crypto" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                          <SelectItem value="usdt">Tether (USDT)</SelectItem>
                          <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Jumlah</Label>
                      <Input id="amount" type="number" placeholder="0.001" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <QrCode className="w-10 h-10 text-gray-400" />
                        </div>
                        <div className="flex-1">
                            <Label className="text-xs">Alamat Wallet</Label>
                            <div className="flex items-center">
                                <Input value={depositAddress} readOnly className="font-mono text-xs h-8" />
                                <Button size="sm" variant="outline" onClick={copyAddress} className="ml-2 h-8">
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Button className="w-full" onClick={handleDeposit} disabled={!depositAmount || !depositCollateralType || loading}>
                      {loading && depositStatus === 'pending' ? 'Memproses...' : 'Deposit Jaminan'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Withdraw Tab */}
              <TabsContent value="withdraw">
                <Card>
                  <CardHeader>
                    <CardTitle>Tarik Jaminan</CardTitle>
                    <CardDescription>Pilih jaminan yang tersedia untuk ditarik.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="space-y-2">
                      <Label htmlFor="crypto-type-withdraw">Jenis Crypto</Label>
                      <Select value={withdrawalCollateralType} onValueChange={setWithdrawalCollateralType}>
                        <SelectTrigger><SelectValue placeholder="Pilih jaminan yang akan ditarik" /></SelectTrigger>
                        <SelectContent>
                          {availableCollateral.map(asset => (
                            <SelectItem key={asset.type} value={asset.type}>
                              {asset.symbol} - Tersedia: {asset.amount} {asset.symbol}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount-withdraw">Jumlah</Label>
                      <Input id="amount-withdraw" type="number" placeholder="0.001" value={withdrawalAmount} onChange={(e) => setWithdrawalAmount(e.target.value)} />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                      Penarikan akan mempengaruhi Health Factor pinjaman Anda. Pastikan Health Factor tetap di atas ambang batas aman.
                    </div>
                    <Button variant="destructive" className="w-full" onClick={handleWithdrawal} disabled={!withdrawalAmount || !withdrawalCollateralType || loading}>
                      {loading && withdrawalStatus === 'pending' ? 'Memproses...' : 'Tarik Jaminan'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Collateral Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="w-5 h-5 mr-2" />
                  Ringkasan Jaminan
                </CardTitle>
                <CardDescription>Total jaminan yang Anda miliki saat ini.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableCollateral.map(asset => (
                   <div key={asset.type} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${asset.symbol === 'BTC' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                        <span className="text-white text-xs font-bold">{asset.symbol}</span>
                      </div>
                      <div>
                        <p className="font-medium">{asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}</p>
                        <p className="text-sm text-muted-foreground">{asset.amount} {asset.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${asset.valueUSD.toLocaleString('en-US')}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4 text-center">
                    <p className="text-sm font-medium">Total Nilai Jaminan</p>
                    <p className="text-2xl font-bold">
                        ${availableCollateral.reduce((sum, asset) => sum + asset.valueUSD, 0).toLocaleString('en-US')}
                    </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Riwayat Transaksi Jaminan</CardTitle>
              <CardDescription>Daftar semua transaksi deposit dan penarikan jaminan Anda.</CardDescription>
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
                        <Badge variant={tx.type === 'Deposit' ? 'default' : 'secondary'}
                           className={tx.type === 'Deposit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {tx.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{tx.amount}</TableCell>
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
  );
};

export default ManageCollateral;