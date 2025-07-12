import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Shield, Settings, PlusCircle, Trash2, AlertTriangle, MoveDownLeft, ChevronsRight, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    { id: 'pool-1', name: 'IDRX', symbol: 'IDRX', amount: 15750000000, rate: 1, color: 'bg-blue-900' },
    { id: 'pool-2', name: 'Bitcoin', symbol: 'BTC', amount: 1.5, rate: 1050000000, color: 'bg-orange-500' },
    { id: 'pool-3', name: 'Ethereum', symbol: 'ETH', amount: 30, rate: 55000000, color: 'bg-gray-500' },
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

  const [liquidatedFunds, setLiquidatedFunds] = useState({
    amount: 12500000,
    asset: 'IDRX',
    bankInfo: {
      bankName: 'Bank Central Asia (BCA)',
      accountNumber: '8880123456',
      accountHolder: 'PT Dingdong Finansial'
    }
  });

  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);

  const [withdrawalError, setWithdrawalError] = useState("");

  // Perubahan 3: State baru untuk input jumlah penarikan dana likuidasi dan validasinya
  const [liquidatedWithdrawalAmount, setLiquidatedWithdrawalAmount] = useState("");
  const [liquidatedWithdrawalError, setLiquidatedWithdrawalError] = useState("");

  const selectedAssetForLtv = collateralAssets.find(a => a.symbol === selectedLtvAsset);
  const totalPoolValue = liquidityPool.reduce((sum, asset) => sum + asset.amount * asset.rate, 0);

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

    const amount = parseFloat(poolAction.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({ title: "Error", description: "Jumlah tidak valid.", variant: "destructive" });
      return;
    }

    // Perubahan 2: Filter aset yang jumlahnya habis setelah penarikan
    setLiquidityPool(prevPool => {
      const newPool = [...prevPool];
      const assetIndex = newPool.findIndex(a => a.name === poolAction.asset);

      if (assetIndex > -1) {
        if (poolAction.type === 'add') {
          newPool[assetIndex].amount += amount;
        } else if (poolAction.type === 'withdraw') {
          if (newPool[assetIndex].amount < amount) {
            toast({ title: "Gagal Menarik Likuiditas", description: "Jumlah melebihi saldo yang tersedia.", variant: "destructive" });
            return prevPool;
          }
          newPool[assetIndex].amount -= amount;
        }
      }
      // Perubahan 2: Filter aset dengan jumlah <= 0
      return newPool.filter(asset => asset.amount > 0);
    });

    const actionText = poolAction.type === 'add' ? 'ditambahkan' : 'ditarik';
    toast({ title: `Likuiditas Berhasil Diperbarui`, description: `${poolAction.amount} ${poolAction.asset} telah ${actionText} dari pool.` });
    setPoolAction({ type: '', asset: '', amount: '' });
    setWithdrawalError("");
  };

  const handleMaxWithdrawal = () => {
    const selectedAsset = liquidityPool.find(a => a.name === poolAction.asset);
    if (selectedAsset) {
      setPoolAction({ ...poolAction, amount: selectedAsset.amount.toString() });
    }
  };

  const handleLiquidate = (loanId: string) => {
    setUndercollateralizedLoans(prevLoans => prevLoans.filter(loan => loan.id !== loanId));
    toast({ title: "Likuidasi Berhasil", description: `Pinjaman ${loanId} telah berhasil dilikuidasi.` });
    setIsConfirmDialogOpen(false);
  };

  // Perubahan 3: Handler untuk input penarikan dana likuidasi
  const handleLiquidatedWithdrawalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value);
    setLiquidatedWithdrawalAmount(e.target.value);

    // Lakukan validasi
    if (amount > liquidatedFunds.amount) {
      setLiquidatedWithdrawalError(`Jumlah melebihi dana yang tersedia (Rp ${liquidatedFunds.amount.toLocaleString('id-ID')}).`);
    } else {
      setLiquidatedWithdrawalError("");
    }
  };

  // Perubahan 3: Handler untuk tombol "Max" pada penarikan dana likuidasi
  const handleMaxLiquidatedWithdrawal = () => {
    setLiquidatedWithdrawalAmount(liquidatedFunds.amount.toString());
    setLiquidatedWithdrawalError(""); // Hapus pesan error jika ada
  };

  const handleWithdrawLiquidated = () => {
    toast({ title: "Penarikan Berhasil", description: `Dana hasil likuidasi telah ditarik.` });
    setLiquidatedFunds(prev => ({ ...prev, amount: 0 }));
    setIsWithdrawDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background"><Navbar /><main className="container mx-auto px-4 py-8"><SkeletonLoader type="card" /><div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8"><SkeletonLoader type="form" /><SkeletonLoader type="form" /></div></main><Footer /></div>
    );
  }

  return (
    <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-20 py-8">
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
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Parameter Pinjaman
                </CardTitle>
                <CardDescription>Atur parameter global dan LTV spesifik untuk setiap aset jaminan.</CardDescription>
              </CardHeader>
              {/* Perubahan 1: Mengatur padding di sini agar jarak CardHeader dan CardContent tidak terlalu jauh. */}
              {/* Anda bisa mengubah nilai 'p-6' jika jaraknya masih terlalu jauh atau terlalu dekat. */}
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-base">Parameter Global</h3>
                  <div className="p-6 rounded-lg bg-muted space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="interest-model">Model Bunga</Label>
                        <Select value={globalParams.interestModel} onValueChange={(value) => setGlobalParams({ ...globalParams, interestModel: value })}>
                          <SelectTrigger id="interest-model">
                            <SelectValue />
                          </SelectTrigger>
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
                    <Button className="w-full text-white" onClick={handleSaveGlobalParams}>Simpan Parameter Global</Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-base">Parameter LTV per Aset</h3>
                  <div className="space-y-3 p-6 rounded-lg bg-muted">
                    <div className="space-y-2">
                      <Label>Pilih Aset</Label>
                      <Select onValueChange={setSelectedLtvAsset}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih aset untuk diubah..." />
                        </SelectTrigger>
                        <SelectContent>
                          {collateralAssets.map(asset => (
                            <SelectItem key={asset.symbol} value={asset.symbol}>
                              {asset.name} ({asset.symbol})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {selectedAssetForLtv && (
                      <div className="space-y-4 pt-2">
                        <p className="text-sm">LTV saat ini untuk {selectedAssetForLtv.name}: <span className="font-bold">{selectedAssetForLtv.ltv}%</span></p>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="new-ltv" className="whitespace-nowrap">LTV Baru (%):</Label>
                          <Input id="new-ltv" placeholder="Contoh: 75" value={newLtv} onChange={(e) => setNewLtv(e.target.value)} />
                          <Button size="sm" className="h-9" onClick={handleSaveAssetParam}>Simpan</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-500" />Manajemen Likuiditas & Likuidasi</CardTitle><CardDescription>Kelola likuiditas pool dan lakukan tindakan likuidasi.</CardDescription></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Pinjaman Berisiko (Undercollateralized)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pengguna</TableHead>
                        <TableHead>Health Factor</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {undercollateralizedLoans.map(loan => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium text-foreground">{loan.userName}</TableCell>
                          <TableCell className="font-mono text-destructive">{loan.healthFactor}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setLoanToLiquidate(loan.id);
                                setIsConfirmDialogOpen(true);
                              }}
                            >
                              Likuidasi
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Pool Likuiditas</h3>
                    <Card className="bg-muted">
                      <CardContent className="pt-6">
                        <div className="space-y-1 mb-4">
                          <p className="text-muted-foreground">Total Nilai Likuiditas</p>
                          <p className="text-2xl font-bold">Rp {totalPoolValue.toLocaleString('id-ID')}</p>
                        </div>
                        <div className="space-y-4 border-t pt-4">
                          {/* Perubahan 2: Filter aset yang tidak memiliki jumlah (amount) untuk tidak ditampilkan */}
                          {liquidityPool.filter(asset => asset.amount > 0).map(asset => (
                            <div key={asset.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold ${asset.color}`}>
                                  {asset.symbol}
                                </div>
                                <div>
                                  <p className="font-semibold text-foreground">{asset.symbol}</p>
                                  <p className="text-sm text-muted-foreground">{asset.name}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-foreground tabular-nums">{asset.amount.toLocaleString('id-ID', { maximumFractionDigits: 8 })}</p>
                                <p className="text-sm text-muted-foreground tabular-nums">Rp {(asset.amount * asset.rate).toLocaleString('id-ID')}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full text-white" onClick={() => setPoolAction({ type: 'add', asset: '', amount: '' })}>
                                <PlusCircle className="w-4 h-4 mr-2 text-white" />Tambah
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader><DialogTitle>Tambah Likuiditas ke Pool</DialogTitle></DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2"><Label>Aset</Label><Select onValueChange={(v) => setPoolAction({ ...poolAction, asset: v })}><SelectTrigger><SelectValue placeholder="Pilih aset..." /></SelectTrigger><SelectContent>{liquidityPool.map(a => <SelectItem key={a.id} value={a.name}>{a.name}</SelectItem>)}</SelectContent></Select></div>
                                <div className="space-y-2"><Label>Jumlah</Label><Input placeholder="Masukkan jumlah" value={poolAction.amount} onChange={(e) => setPoolAction({ ...poolAction, amount: e.target.value })} /></div>
                              </div>
                              <DialogFooter><DialogClose asChild><Button variant="outline">Batal</Button></DialogClose><DialogClose asChild><Button onClick={handlePoolAction}>Tambah</Button></DialogClose></DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full" variant="outline" onClick={() => setPoolAction({ type: 'withdraw', asset: '', amount: '' })}>
                                <MoveDownLeft className="w-4 h-4 mr-2" />Tarik
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader><DialogTitle>Tarik Likuiditas dari Pool</DialogTitle></DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2"><Label>Aset</Label><Select onValueChange={(v) => setPoolAction({ ...poolAction, asset: v })}><SelectTrigger><SelectValue placeholder="Pilih aset..." /></SelectTrigger><SelectContent>{liquidityPool.map(a => <SelectItem key={a.id} value={a.name}>{a.name}</SelectItem>)}</SelectContent></Select></div>
                                <div className="space-y-2"><Label>Jumlah</Label>
                                  <div className="relative">
                                    <Input
                                      placeholder="Masukkan jumlah"
                                      value={poolAction.amount}
                                      onChange={(e) => {
                                        const amount = parseFloat(e.target.value);
                                        const selectedAsset = liquidityPool.find(a => a.name === poolAction.asset);
                                        setPoolAction({ ...poolAction, amount: e.target.value });
                                        if (selectedAsset && amount > selectedAsset.amount) {
                                          setWithdrawalError(`Jumlah melebihi batas yang tersedia (${selectedAsset.amount.toLocaleString('id-ID')} ${selectedAsset.symbol}).`);
                                        } else {
                                          setWithdrawalError("");
                                        }
                                      }}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3"
                                      onClick={handleMaxWithdrawal}
                                      disabled={!poolAction.asset}
                                    >
                                      Max
                                    </Button>
                                  </div>
                                  {withdrawalError && (
                                    <Alert variant="destructive" className="mt-2 text-xs">
                                      <AlertCircle className="h-4 w-4" />
                                      <AlertDescription>{withdrawalError}</AlertDescription>
                                    </Alert>
                                  )}
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Batal</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button onClick={handlePoolAction} variant="default" disabled={!!withdrawalError}>Tarik</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Aset Hasil Likuidasi</h3>
                    <Card className="bg-muted">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-muted-foreground">Dana Tersedia</p>
                            <p className="text-xl font-bold">Rp {liquidatedFunds.amount.toLocaleString('id-ID')}</p>
                          </div>
                          {/* Perubahan 3: Tambahkan DialogTrigger untuk pop-up penarikan dana likuidasi */}
                          <DialogTrigger asChild>
                            <Button className="text-white" onClick={() => {
                              // Reset input saat membuka dialog
                              setLiquidatedWithdrawalAmount("");
                              setLiquidatedWithdrawalError("");
                            }}>
                              <ChevronsRight className="w-4 h-4 mr-2 text-white" />Tarik Dana
                            </Button>
                          </DialogTrigger>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />

        {/* Perubahan 3: DialogContent untuk penarikan dana likuidasi */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Penarikan Dana</DialogTitle>
            <DialogDescription>
              Masukkan jumlah dana yang ingin Anda tarik.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>Jumlah Penarikan (Rupiah)</Label>
              <div className="relative">
                <Input
                  id="liquidated-amount"
                  type="number"
                  placeholder="Masukkan jumlah"
                  value={liquidatedWithdrawalAmount}
                  onChange={handleLiquidatedWithdrawalChange}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3"
                  onClick={handleMaxLiquidatedWithdrawal}
                >
                  Max
                </Button>
              </div>
              {liquidatedWithdrawalError && (
                <Alert variant="destructive" className="mt-2 text-xs">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{liquidatedWithdrawalError}</AlertDescription>
                </Alert>
              )}
            </div>
            <div className="space-y-1 border-t pt-4">
              <p className="text-sm text-muted-foreground">Akan Ditarik ke Akun Bank:</p>
              <div className="p-3 border rounded-md bg-background">
                <p className="font-semibold">{liquidatedFunds.bankInfo.bankName}</p>
                <p className="text-sm text-muted-foreground">{liquidatedFunds.bankInfo.accountNumber} a.n. {liquidatedFunds.bankInfo.accountHolder}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleWithdrawLiquidated}
              // Perubahan 3: Nonaktifkan tombol jika ada error atau jumlah input tidak valid
              disabled={!!liquidatedWithdrawalError || parseFloat(liquidatedWithdrawalAmount) <= 0 || !liquidatedWithdrawalAmount}
            >
              Konfirmasi Penarikan
            </Button>
          </DialogFooter>
        </DialogContent>

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
    </Dialog>
  );
};

export default AdminDashboard;