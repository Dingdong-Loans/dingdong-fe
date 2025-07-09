import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Settings,
  PlusCircle,
  Trash2,
  AlertTriangle,
  MoveDownLeft,
  ChevronsRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // --- Mock Data ---
  const [loanableAssets, setLoanableAssets] = useState([
    { id: 'asset-1', name: 'IDRX', symbol: 'IDRX', status: 'Active' },
  ]);

  const [collateralAssets, setCollateralAssets] = useState([
    { id: 'col-1', name: 'Bitcoin', symbol: 'BTC', status: 'Active', ltv: '70' },
    { id: 'col-2', name: 'Ethereum', symbol: 'ETH', status: 'Active', ltv: '65' },
    { id: 'col-3', name: 'Solana', symbol: 'SOL', status: 'Paused', ltv: '60' },
  ]);

  const [globalParams, setGlobalParams] = useState({
    liquidationPenalty: '5',
    interestModel: 'Linear',
  });

  const undercollateralizedLoans = [
    { id: 'LOAN-101', userName: 'Budi Santoso', healthFactor: 1.15 },
    { id: 'LOAN-102', userName: 'Citra Lestari', healthFactor: 1.05 },
  ];

  const liquidatedFunds = {
    amount: 12500000,
    asset: 'IDRX'
  };

  // --- Handler Functions ---
  const handleLtvChange = (symbol: string, value: string) => {
    setCollateralAssets(prevAssets =>
      prevAssets.map(asset =>
        asset.symbol === symbol ? { ...asset, ltv: value } : asset
      )
    );
  };

  const handleSaveAssetParam = (symbol: string) => {
    toast({
      title: "Parameter Aset Disimpan",
      description: `Parameter LTV untuk ${symbol} telah berhasil diperbarui.`,
    });
  };

  const handleSaveGlobalParams = () => {
    toast({
      title: "Parameter Global Disimpan",
      description: `Model bunga dan penalti likuidasi telah diperbarui.`,
    });
  };

  const handleLiquidate = (loanId: string) => {
    toast({
      title: "Likuidasi Berhasil",
      description: `Pinjaman ${loanId} telah berhasil dilikuidasi.`,
    });
  };

  const handleWithdrawLiquidated = () => {
    toast({
      title: "Penarikan Berhasil",
      description: `Dana hasil likuidasi sebesar ${liquidatedFunds.amount.toLocaleString()} ${liquidatedFunds.asset} telah ditarik.`,
    });
  };

  // --- Render ---
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <SkeletonLoader type="card" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <SkeletonLoader type="form" />
            <SkeletonLoader type="form" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Control Panel
          </h1>
          <p className="text-muted-foreground">
            Kelola aset, parameter pinjaman, dan fungsi kritis protokol.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Asset Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Manajemen Aset
              </CardTitle>
              <CardDescription>
                Atur aset yang dapat dipinjamkan dan diterima sebagai jaminan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="collateral">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="collateral">Aset Jaminan</TabsTrigger>
                  <TabsTrigger value="lendable">Aset Pinjaman</TabsTrigger>
                </TabsList>
                <TabsContent value="collateral" className="mt-4">
                  <Table>
                    <TableHeader><TableRow><TableHead>Aset</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {collateralAssets.map(asset => (
                        <TableRow key={asset.id}><TableCell>{asset.name} ({asset.symbol})</TableCell><TableCell>{asset.status}</TableCell><TableCell className="text-right"><Button size="sm" variant="ghost"><Trash2 className="w-4 h-4" /></Button></TableCell></TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Dialog><DialogTrigger asChild><Button variant="outline" size="sm" className="mt-4 w-full"><PlusCircle className="w-4 h-4 mr-2" /> Tambah Aset Jaminan</Button></DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>Tambah Aset Jaminan Baru</DialogTitle></DialogHeader><div className="space-y-4 py-4"><div className="space-y-2"><Label>Nama Aset</Label><Input placeholder="Contoh: Bitcoin" /></div><div className="space-y-2"><Label>Simbol</Label><Input placeholder="Contoh: BTC" /></div></div><DialogFooter><Button variant="outline">Batal</Button><Button>Simpan</Button></DialogFooter></DialogContent>
                  </Dialog>
                </TabsContent>
                <TabsContent value="lendable" className="mt-4">
                  <Table>
                    <TableHeader><TableRow><TableHead>Aset</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {loanableAssets.map(asset => (
                        <TableRow key={asset.id}><TableCell>{asset.name} ({asset.symbol})</TableCell><TableCell>{asset.status}</TableCell><TableCell className="text-right"><Button size="sm" variant="ghost"><Trash2 className="w-4 h-4" /></Button></TableCell></TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Dialog><DialogTrigger asChild><Button variant="outline" size="sm" className="mt-4 w-full"><PlusCircle className="w-4 h-4 mr-2" /> Tambah Aset Pinjaman</Button></DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>Tambah Aset Pinjaman Baru</DialogTitle></DialogHeader><div className="space-y-4 py-4"><div className="space-y-2"><Label>Nama Aset</Label><Input placeholder="Contoh: Rupiah Token" /></div><div className="space-y-2"><Label>Simbol</Label><Input placeholder="Contoh: IDRX" /></div></div><DialogFooter><Button variant="outline">Batal</Button><Button>Simpan</Button></DialogFooter></DialogContent>
                  </Dialog>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* ========== KODE PARAMETER PINJAMAN YANG DIPERBARUI ========== */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Parameter Pinjaman
              </CardTitle>
              <CardDescription>
                Atur parameter global dan LTV spesifik untuk setiap aset jaminan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-base">Parameter Global</h3>
                <div className="p-4 rounded-lg bg-muted space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="interest-model">Model Bunga</Label>
                      <Select value={globalParams.interestModel} onValueChange={(value) => setGlobalParams({ ...globalParams, interestModel: value })}>
                        <SelectTrigger id="interest-model"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Linear">Linear</SelectItem>
                          <SelectItem value="Majemuk">Majemuk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="liq-penalty">Penalti Likuidasi (%)</Label>
                      <Input id="liq-penalty" value={globalParams.liquidationPenalty} onChange={(e) => setGlobalParams({ ...globalParams, liquidationPenalty: e.target.value })} />
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleSaveGlobalParams}>Simpan Parameter Global</Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-base">Parameter LTV per Aset</h3>
                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                  {collateralAssets.map(asset => (
                    <Card key={asset.symbol} className="bg-background">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <Label htmlFor={`ltv-${asset.symbol}`} className="font-semibold">{asset.name} ({asset.symbol})</Label>
                          <div className="flex items-center gap-2 w-1/2">
                            <Input id={`ltv-${asset.symbol}`} className="h-8" value={asset.ltv} onChange={(e) => handleLtvChange(asset.symbol, e.target.value)} />
                            <span className="text-muted-foreground">%</span>
                            <Button size="sm" className="h-8" onClick={() => handleSaveAssetParam(asset.symbol)}>Simpan</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liquidity and Liquidation Management */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Manajemen Likuiditas & Likuidasi
              </CardTitle>
              <CardDescription>
                Kelola likuiditas pool dan lakukan tindakan likuidasi.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Pinjaman Berisiko (Undercollateralized)</h3>
                <Table>
                  <TableHeader><TableRow><TableHead>Pengguna</TableHead><TableHead>Health Factor</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {undercollateralizedLoans.map(loan => (
                      <TableRow key={loan.id} className="text-red-600">
                        <TableCell className="font-medium">{loan.userName}</TableCell>
                        <TableCell className="font-mono">{loan.healthFactor}</TableCell>
                        <TableCell className="text-right"><Button size="sm" variant="destructive" onClick={() => handleLiquidate(loan.id)}>Lakukan Likuidasi</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Pool Likuiditas</h3>
                  <Card className="bg-muted"><CardContent className="pt-6">
                    <div className="flex justify-between items-center"><p className="text-muted-foreground">Total Likuiditas IDRX</p><p className="text-xl font-bold">Rp 15,750,000,000</p></div>
                    <div className="flex gap-2 mt-4"><Button className="w-full"><PlusCircle className="w-4 h-4 mr-2" />Tambah</Button><Button className="w-full" variant="outline"><MoveDownLeft className="w-4 h-4 mr-2" />Tarik</Button></div>
                  </CardContent></Card>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Aset Hasil Likuidasi</h3>
                  <Card className="bg-muted"><CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div><p className="text-muted-foreground">Dana Tersedia</p><p className="text-xl font-bold">Rp {liquidatedFunds.amount.toLocaleString()}</p></div>
                      <Button onClick={handleWithdrawLiquidated}><ChevronsRight className="w-4 h-4 mr-2" />Tarik Dana</Button>
                    </div>
                  </CardContent></Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;