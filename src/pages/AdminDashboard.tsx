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
  DialogFooter,
  DialogClose,
  DialogDescription,
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

  // --- State Management ---
  const [loanableAssets, setLoanableAssets] = useState([
    { id: 'asset-1', name: 'IDRX', symbol: 'IDRX', contractAddress: '0x123...', status: 'Active' },
  ]);

  const [collateralAssets, setCollateralAssets] = useState([
    { id: 'col-1', name: 'Bitcoin', symbol: 'BTC', contractAddress: '0x456...', status: 'Active', ltv: '70' },
    { id: 'col-2', name: 'Ethereum', symbol: 'ETH', contractAddress: '0x789...', status: 'Active', ltv: '65' },
    { id: 'col-3', name: 'Solana', symbol: 'SOL', contractAddress: '0xabc...', status: 'Paused', ltv: '60' },
  ]);

  const [globalParams, setGlobalParams] = useState({
    liquidationPenalty: '5',
    interestModel: 'Linear',
  });

  const [liquidityPool, setLiquidityPool] = useState([
    { id: 'pool-1', name: 'IDRX', amount: 15750000000, rate: 1 },
    { id: 'pool-2', name: 'Bitcoin', amount: 1.5, rate: 1050000000 },
    { id: 'pool-3', name: 'Ethereum', amount: 30, rate: 55000000 },
  ]);

  const [newAsset, setNewAsset] = useState({ name: '', symbol: '', contractAddress: '' });
  const [selectedLtvAsset, setSelectedLtvAsset] = useState('');
  const [newLtv, setNewLtv] = useState('');
  const [poolAction, setPoolAction] = useState({ type: '', asset: '', amount: '' });

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [loanToLiquidate, setLoanToLiquidate] = useState<string | null>(null);

  const [undercollateralizedLoans, setUndercollateralizedLoans] = useState([
    { id: 'LOAN-101', userName: 'Budi Santoso', healthFactor: 0.5 },
    { id: 'LOAN-102', userName: 'Citra Lestari', healthFactor: 0.4 },
  ]);

  // --- KODE YANG DIPERBAIKI ---
  // Variabel 'selectedAssetForLtv' dideklarasikan di sini setelah state yang menjadi dependensinya.
  // Ini memastikan variabel ini selalu tersedia di seluruh komponen sebelum digunakan.
  const selectedAssetForLtv = collateralAssets.find(a => a.symbol === selectedLtvAsset);
  const totalPoolValue = liquidityPool.reduce((sum, asset) => sum + asset.amount * asset.rate, 0);

  const liquidatedFunds = {
    amount: 12500000,
    asset: 'IDRX'
  };

  // --- Handler Functions ---
  const handleAddAsset = (type: 'collateral' | 'loanable') => {
    if (!newAsset.name || !newAsset.symbol || !newAsset.contractAddress) {
      toast({ title: "Error", description: "Semua kolom aset harus diisi.", variant: "destructive" });
      return;
    }
    const newEntry = { id: `new-${Date.now()}`, ...newAsset, status: 'Active', ...(type === 'collateral' && { ltv: '0' }) };
    if (type === 'collateral') {
      setCollateralAssets(prev => [...prev, newEntry]);
    } else {
      setLoanableAssets(prev => [...prev, newEntry]);
    }
    toast({ title: "Aset Ditambahkan", description: `Aset ${newAsset.name} telah berhasil ditambahkan.` });
    setNewAsset({ name: '', symbol: '', contractAddress: '' });
  };

  const handleDeleteAsset = (assetId: string, type: 'collateral' | 'loanable') => {
    if (type === 'collateral') {
      setCollateralAssets(prev => prev.filter(asset => asset.id !== assetId));
    } else {
      setLoanableAssets(prev => prev.filter(asset => asset.id !== assetId));
    }
    toast({ title: "Aset Dihapus", description: "Aset telah berhasil dihapus dari daftar." });
  };

  const handleSaveAssetParam = () => {
    if (!selectedLtvAsset || !newLtv) {
      toast({ title: "Error", description: "Pilih aset dan masukkan nilai LTV baru.", variant: "destructive" });
      return;
    }
    setCollateralAssets(prevAssets =>
      prevAssets.map(asset =>
        asset.symbol === selectedLtvAsset ? { ...asset, ltv: newLtv } : asset
      )
    );
    toast({
      title: "Parameter Aset Disimpan",
      description: `Parameter LTV untuk ${selectedLtvAsset} telah berhasil diperbarui ke ${newLtv}%.`,
    });
    setNewLtv('');
  };

  const handleSaveGlobalParams = () => {
    toast({ title: "Parameter Global Disimpan", description: `Model bunga dan penalti likuidasi telah diperbarui.` });
  };

  const handlePoolAction = () => {
    if (!poolAction.asset || !poolAction.amount) {
      toast({ title: "Error", description: "Pilih aset dan masukkan jumlah.", variant: "destructive" });
      return;
    }
    const actionText = poolAction.type === 'add' ? 'ditambahkan' : 'ditarik';
    toast({ title: `Likuiditas Berhasil Diperbarui`, description: `${poolAction.amount} ${poolAction.asset} telah ${actionText} dari pool.` });
    setPoolAction({ type: '', asset: '', amount: '' });
  };

  const handleLiquidate = (loanId: string) => {
    setUndercollateralizedLoans(prevLoans => prevLoans.filter(loan => loan.id !== loanId));
    toast({ title: "Likuidasi Berhasil", description: `Pinjaman ${loanId} telah berhasil dilikuidasi.` });
    setIsConfirmDialogOpen(false);
  };

  const handleWithdrawLiquidated = () => {
    toast({ title: "Penarikan Berhasil", description: `Dana hasil likuidasi telah ditarik.` });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background"><Navbar /><main className="container mx-auto px-4 py-8"><SkeletonLoader type="card" /><div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8"><SkeletonLoader type="form" /><SkeletonLoader type="form" /></div></main><Footer /></div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8"><h1 className="text-4xl font-bold text-foreground mb-2">Admin Control Panel</h1><p className="text-muted-foreground">Kelola aset, parameter pinjaman, dan fungsi kritis protokol.</p></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Manajemen Aset</CardTitle><CardDescription>Atur aset yang dapat dipinjamkan dan diterima sebagai jaminan.</CardDescription></CardHeader>
            <CardContent>
              <Tabs defaultValue="collateral">
                <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="collateral">Aset Jaminan</TabsTrigger><TabsTrigger value="lendable">Aset Pinjaman</TabsTrigger></TabsList>
                <TabsContent value="collateral" className="mt-4">
                  <Table><TableHeader><TableRow><TableHead>Aset</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                    <TableBody>{collateralAssets.map(asset => (<TableRow key={asset.id}><TableCell>{asset.name} ({asset.symbol})</TableCell><TableCell>{asset.status}</TableCell>
                      <TableCell className="text-right"><Button size="sm" variant="ghost" onClick={() => handleDeleteAsset(asset.id, 'collateral')}><Trash2 className="w-4 h-4" /></Button></TableCell>
                    </TableRow>))}</TableBody>
                  </Table>
                  <Dialog><DialogTrigger asChild><Button variant="outline" size="sm" className="mt-4 w-full"><PlusCircle className="w-4 h-4 mr-2" /> Tambah Aset Jaminan</Button></DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>Tambah Aset Jaminan Baru</DialogTitle></DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2"><Label htmlFor="collateral-name">Nama Aset</Label><Input id="collateral-name" placeholder="Contoh: Bitcoin" value={newAsset.name} onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })} /></div>
                        <div className="space-y-2"><Label htmlFor="collateral-symbol">Simbol</Label><Input id="collateral-symbol" placeholder="Contoh: BTC" value={newAsset.symbol} onChange={(e) => setNewAsset({ ...newAsset, symbol: e.target.value })} /></div>
                        <div className="space-y-2"><Label htmlFor="collateral-address">Contract Address</Label><Input id="collateral-address" placeholder="Contoh: 0x..." value={newAsset.contractAddress} onChange={(e) => setNewAsset({ ...newAsset, contractAddress: e.target.value })} /></div>
                      </div>
                      <DialogFooter><DialogClose asChild><Button variant="outline">Batal</Button></DialogClose><DialogClose asChild><Button onClick={() => handleAddAsset('collateral')}>Simpan</Button></DialogClose></DialogFooter></DialogContent>
                  </Dialog>
                </TabsContent>
                <TabsContent value="lendable" className="mt-4">
                  <Table><TableHeader><TableRow><TableHead>Aset</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                    <TableBody>{loanableAssets.map(asset => (<TableRow key={asset.id}><TableCell>{asset.name} ({asset.symbol})</TableCell><TableCell>{asset.status}</TableCell>
                      <TableCell className="text-right"><Button size="sm" variant="ghost" onClick={() => handleDeleteAsset(asset.id, 'loanable')}><Trash2 className="w-4 h-4" /></Button></TableCell>
                    </TableRow>))}</TableBody>
                  </Table>
                  <Dialog><DialogTrigger asChild><Button variant="outline" size="sm" className="mt-4 w-full"><PlusCircle className="w-4 h-4 mr-2" /> Tambah Aset Pinjaman</Button></DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>Tambah Aset Pinjaman Baru</DialogTitle></DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2"><Label htmlFor="loan-name">Nama Aset</Label><Input id="loan-name" placeholder="Contoh: Rupiah Token" value={newAsset.name} onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })} /></div>
                        <div className="space-y-2"><Label htmlFor="loan-symbol">Simbol</Label><Input id="loan-symbol" placeholder="Contoh: IDRX" value={newAsset.symbol} onChange={(e) => setNewAsset({ ...newAsset, symbol: e.target.value })} /></div>
                        <div className="space-y-2"><Label htmlFor="loan-address">Contract Address</Label><Input id="loan-address" placeholder="Contoh: 0x..." value={newAsset.contractAddress} onChange={(e) => setNewAsset({ ...newAsset, contractAddress: e.target.value })} /></div>
                      </div>
                      <DialogFooter><DialogClose asChild><Button variant="outline">Batal</Button></DialogClose><DialogClose asChild><Button onClick={() => handleAddAsset('loanable')}>Simpan</Button></DialogClose></DialogFooter></DialogContent>
                  </Dialog>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" />Parameter Pinjaman</CardTitle><CardDescription>Atur parameter global dan LTV spesifik untuk setiap aset jaminan.</CardDescription></CardHeader>
            <CardContent className="space-y-6">
              <div><h3 className="font-semibold mb-2 text-base">Parameter Global</h3><div className="p-4 rounded-lg bg-muted space-y-4"><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="interest-model">Model Bunga</Label><Select value={globalParams.interestModel} onValueChange={(value) => setGlobalParams({ ...globalParams, interestModel: value })}><SelectTrigger id="interest-model"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Linear">Linear</SelectItem><SelectItem value="Majemuk">Majemuk</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label htmlFor="liq-penalty">Penalti Likuidasi (%)</Label><Input id="liq-penalty" value={globalParams.liquidationPenalty} onChange={(e) => setGlobalParams({ ...globalParams, liquidationPenalty: e.target.value })} /></div></div><Button className="w-full text-white" onClick={handleSaveGlobalParams}>Simpan Parameter Global</Button></div></div>
              <div><h3 className="font-semibold mb-2 text-base">Parameter LTV per Aset</h3><div className="space-y-3 p-4 rounded-lg bg-muted"><div className="space-y-2"><Label>Pilih Aset</Label><Select onValueChange={setSelectedLtvAsset}><SelectTrigger><SelectValue placeholder="Pilih aset untuk diubah..." /></SelectTrigger><SelectContent>{collateralAssets.map(asset => (<SelectItem key={asset.symbol} value={asset.symbol}>{asset.name} ({asset.symbol})</SelectItem>))}</SelectContent></Select></div>
                {selectedAssetForLtv && (
                  <div className="space-y-4 pt-2">
                    <p className="text-sm">LTV saat ini untuk {selectedAssetForLtv.name}: <span className="font-bold">{selectedAssetForLtv.ltv}%</span></p>
                    <div className="flex items-center gap-2"><Label htmlFor="new-ltv" className="whitespace-nowrap">LTV Baru (%):</Label><Input id="new-ltv" placeholder="Contoh: 75" value={newLtv} onChange={(e) => setNewLtv(e.target.value)} /><Button size="sm" className="h-9" onClick={handleSaveAssetParam}>Simpan</Button></div>
                  </div>
                )}
              </div></div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-500" />Manajemen Likuiditas & Likuidasi</CardTitle><CardDescription>Kelola likuiditas pool dan lakukan tindakan likuidasi.</CardDescription></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><h3 className="font-semibold mb-2">Pinjaman Berisiko (Undercollateralized)</h3><Table><TableHeader><TableRow><TableHead>Pengguna</TableHead><TableHead>Health Factor</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader><TableBody>
                {undercollateralizedLoans.map(loan => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium text-muted-foreground">{loan.userName}</TableCell>
                    <TableCell className="font-mono text-muted-foreground">{loan.healthFactor}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-muted-foreground"
                        onClick={() => {
                          setLoanToLiquidate(loan.id);
                          setIsConfirmDialogOpen(true);
                        }}
                      >
                        Likuidasi
                      </Button>
                    </TableCell></TableRow>))}</TableBody></Table></div>
              <div className="space-y-4">
                <div><h3 className="font-semibold mb-2">Pool Likuiditas</h3>
                  <Card className="bg-muted"><CardContent className="pt-6">
                    <div className="space-y-1 mb-4"><p className="text-muted-foreground">Total Nilai Likuiditas</p><p className="text-2xl font-bold">Rp {totalPoolValue.toLocaleString('id-ID')}</p></div>
                    <div className="space-y-2 border-t pt-4">
                      {liquidityPool.map(asset => (
                        <div key={asset.id} className="flex justify-between items-center text-sm"><span className="text-muted-foreground">{asset.name}</span><div className="text-right"><p className="font-mono">{asset.amount.toLocaleString('id-ID', { maximumFractionDigits: 2 })}</p><p className="text-xs text-muted-foreground">≈ Rp {(asset.amount * asset.rate).toLocaleString('id-ID')}</p></div></div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Dialog><DialogTrigger asChild><Button className="w-full text-white" onClick={() => setPoolAction({ type: 'add', asset: '', amount: '' })}><PlusCircle className="w-4 h-4 mr-2 text-white" />Tambah</Button></DialogTrigger>
                        <DialogContent><DialogHeader><DialogTitle>Tambah Likuiditas ke Pool</DialogTitle></DialogHeader><div className="space-y-4 py-4"><div className="space-y-2"><Label>Aset</Label><Select onValueChange={(v) => setPoolAction({ ...poolAction, asset: v })}><SelectTrigger><SelectValue placeholder="Pilih aset..." /></SelectTrigger><SelectContent>{liquidityPool.map(a => <SelectItem key={a.id} value={a.name}>{a.name}</SelectItem>)}</SelectContent></Select></div><div className="space-y-2"><Label>Jumlah</Label><Input placeholder="Masukkan jumlah" value={poolAction.amount} onChange={(e) => setPoolAction({ ...poolAction, amount: e.target.value })} /></div></div><DialogFooter><DialogClose asChild><Button variant="outline">Batal</Button></DialogClose><DialogClose asChild><Button onClick={handlePoolAction}>Tambah</Button></DialogClose></DialogFooter></DialogContent>
                      </Dialog>
                      <Dialog><DialogTrigger asChild><Button className="w-full" variant="outline" onClick={() => setPoolAction({ type: 'withdraw', asset: '', amount: '' })}><MoveDownLeft className="w-4 h-4 mr-2" />Tarik</Button></DialogTrigger>
                        <DialogContent><DialogHeader><DialogTitle>Tarik Likuiditas dari Pool</DialogTitle></DialogHeader><div className="space-y-4 py-4"><div className="space-y-2"><Label>Aset</Label><Select onValueChange={(v) => setPoolAction({ ...poolAction, asset: v })}><SelectTrigger><SelectValue placeholder="Pilih aset..." /></SelectTrigger><SelectContent>{liquidityPool.map(a => <SelectItem key={a.id} value={a.name}>{a.name}</SelectItem>)}</SelectContent></Select></div><div className="space-y-2"><Label>Jumlah</Label><Input placeholder="Masukkan jumlah" value={poolAction.amount} onChange={(e) => setPoolAction({ ...poolAction, amount: e.target.value })} /></div></div><DialogFooter><DialogClose asChild><Button variant="outline">Batal</Button></DialogClose><DialogClose asChild><Button onClick={handlePoolAction} variant="destructive">Tarik</Button></DialogClose></DialogFooter></DialogContent>
                      </Dialog>
                    </div>
                  </CardContent></Card>
                </div>
                <div><h3 className="font-semibold mb-2">Aset Hasil Likuidasi</h3><Card className="bg-muted"><CardContent className="pt-6"><div className="flex justify-between items-center"><div><p className="text-muted-foreground">Dana Tersedia</p><p className="text-xl font-bold">Rp {liquidatedFunds.amount.toLocaleString()}</p></div><Button className="text-white" onClick={handleWithdrawLiquidated}><ChevronsRight className="w-4 h-4 mr-2 text-white" />Tarik Dana</Button></div></CardContent></Card></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Likuidasi Pinjaman</DialogTitle>
            <DialogDescription>
              Anda akan melakukan likuidasi untuk pinjaman <span className="font-bold">{loanToLiquidate}</span>.
              Tindakan ini tidak dapat dibatalkan. Pastikan Anda memahami risikonya.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batalkan</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                if (loanToLiquidate) {
                  handleLiquidate(loanToLiquidate);
                }
              }}
            >
              Konfirmasi Likuidasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;