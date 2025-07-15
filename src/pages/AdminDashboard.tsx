import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// --- PERUBAHAN: Menambahkan ikon untuk notifikasi ---
import {
  Shield,
  Settings,
  PlusCircle,
  Trash2,
  AlertTriangle,
  MoveDownLeft,
  ChevronsRight,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
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
    {
      id: "asset-1",
      name: "IDRX",
      symbol: "IDRX",
      contractAddress: "0x123...",
      status: "Aktif",
    },
  ]);

  const [collateralAssets, setCollateralAssets] = useState([
    {
      id: "col-1",
      name: "Bitcoin",
      symbol: "BTC",
      contractAddress: "0x456...",
      status: "Aktif",
      ltv: "70",
    },
    {
      id: "col-2",
      name: "Ethereum",
      symbol: "ETH",
      contractAddress: "0x789...",
      status: "Non-aktif",
      ltv: "65",
    },
    {
      id: "col-3",
      name: "Solana",
      symbol: "SOL",
      contractAddress: "0xabc...",
      status: "Dijeda",
      ltv: "60",
    },
  ]);

  const [globalParams, setGlobalParams] = useState({
    liquidationPenalty: "5",
    interestModel: "Linear",
  });

  const [liquidityPool, setLiquidityPool] = useState([
    {
      id: "pool-1",
      name: "IDRX",
      symbol: "IDRX",
      amount: 15750000000,
      rate: 1,
      color: "bg-blue-900",
    },
    {
      id: "pool-2",
      name: "Bitcoin",
      symbol: "BTC",
      amount: 1.5,
      rate: 1050000000,
      color: "bg-orange-500",
    },
    {
      id: "pool-3",
      name: "Ethereum",
      symbol: "ETH",
      amount: 30,
      rate: 55000000,
      color: "bg-gray-500",
    },
  ]);

  const [newAsset, setNewAsset] = useState({
    name: "",
    symbol: "",
    contractAddress: "",
  });

  const [selectedLtvAsset, setSelectedLtvAsset] = useState("");
  const [newLtv, setNewLtv] = useState("");
  const [poolAction, setPoolAction] = useState({
    type: "",
    asset: "",
    amount: "",
  });

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [loanToLiquidate, setLoanToLiquidate] = useState<string | null>(null);

  const [undercollateralizedLoans, setUndercollateralizedLoans] = useState([
    { id: "LOAN-101", userName: "Budi Santoso", healthFactor: 0.5 },
    { id: "LOAN-102", userName: "Citra Lestari", healthFactor: 0.4 },
  ]);

  const [liquidatedFunds, setLiquidatedFunds] = useState({
    amount: 12500000,
    asset: "IDRX",
    bankInfo: {
      bankName: "Bank Central Asia (BCA)",
      accountNumber: "8880123456",
      accountHolder: "PT Dingdong Finansial",
    },
  });

  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);

  const [withdrawalError, setWithdrawalError] = useState("");
  const [liquidatedWithdrawalAmount, setLiquidatedWithdrawalAmount] = useState("");
  const [liquidatedWithdrawalError, setLiquidatedWithdrawalError] = useState("");

  const selectedAssetForLtv = collateralAssets.find(
    (a) => a.symbol === selectedLtvAsset
  );

  const totalPoolValue = liquidityPool.reduce(
    (sum, asset) => sum + asset.amount * asset.rate,
    0
  );

  // --- PERUBAHAN: Fungsi helper untuk format angka dengan dukungan desimal (koma) ---
  const formatNumber = (value: string) => {
    if (!value) return "";
    // Bersihkan nilai dari karakter selain digit dan koma, lalu ubah koma menjadi titik untuk pemrosesan
    const cleanValue = value.replace(/[^0-9,]/g, "").replace(",", ".");
    const parts = cleanValue.split(".");
    // Format bagian integer dengan titik sebagai pemisah ribuan
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Jika ada bagian desimal, gabungkan kembali dengan koma
    if (parts.length > 1) {
      return `${integerPart},${parts[1]}`;
    }
    return integerPart;
  };

  // --- PERUBAHAN: Fungsi untuk mengubah string format kembali menjadi angka float ---
  const parseFormattedNumber = (value: string) => {
    // Hapus titik pemisah ribuan, lalu ubah koma desimal menjadi titik
    return parseFloat(value.replace(/\./g, "").replace(",", "."));
  };

  // --- Handler Functions ---
  const handleAddAsset = (type: "collateral" | "loanable") => {
    if (!newAsset.name || !newAsset.symbol || !newAsset.contractAddress) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            <span>Semua kolom aset harus diisi.</span>
          </div>
        ),
        className: "border-red-500 bg-red-50 text-red-700",
      });
      return;
    }
    const newEntry = {
      id: `new-${Date.now()}`,
      ...newAsset,
      status: "Aktif",
      ...(type === "collateral" && { ltv: "0" }),
    };
    if (type === "collateral") {
      setCollateralAssets((prev) => [...prev, newEntry]);
    } else {
      setLoanableAssets((prev) => [...prev, newEntry]);
    }
    toast({
      title: "Aset Ditambahkan",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>Aset {newAsset.name} telah berhasil ditambahkan.</span>
        </div>
      ),
      className: "border-green-500 bg-green-50 text-green-700",
    });
    setNewAsset({ name: "", symbol: "", contractAddress: "" });
  };

  const handleDeleteAsset = (
    assetId: string,
    type: "collateral" | "loanable"
  ) => {
    if (type === "collateral") {
      setCollateralAssets((prev) =>
        prev.filter((asset) => asset.id !== assetId)
      );
    } else {
      setLoanableAssets((prev) =>
        prev.filter((asset) => asset.id !== assetId)
      );
    }
    toast({
      title: "Aset Dihapus",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>Aset telah berhasil dihapus dari daftar.</span>
        </div>
      ),
      className: "border-green-500 bg-green-50 text-green-700",
    });
  };

  const handleSaveAssetParam = () => {
    if (!selectedLtvAsset || !newLtv) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            <span>Pilih aset dan masukkan nilai LTV baru.</span>
          </div>
        ),
        className: "border-red-500 bg-red-50 text-red-700",
      });
      return;
    }
    setCollateralAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.symbol === selectedLtvAsset ? { ...asset, ltv: newLtv.replace(/\./g, '') } : asset
      )
    );
    toast({
      title: "Parameter Aset Disimpan",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>Parameter LTV untuk {selectedLtvAsset} telah berhasil diperbarui.</span>
        </div>
      ),
      className: "border-green-500 bg-green-50 text-green-700",
    });
    setNewLtv("");
  };

  const handleSaveGlobalParams = () => {
    toast({
      title: "Parameter Global Disimpan",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>Model bunga dan penalti likuidasi telah diperbarui.</span>
        </div>
      ),
      className: "border-green-500 bg-green-50 text-green-700",
    });
  };

  const handlePoolAction = () => {
    if (!poolAction.asset || !poolAction.amount) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            <span>Pilih aset dan masukkan jumlah.</span>
          </div>
        ),
        className: "border-red-500 bg-red-50 text-red-700",
      });
      return;
    }

    const amount = parseFormattedNumber(poolAction.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            <span>Jumlah tidak valid.</span>
          </div>
        ),
        className: "border-red-500 bg-red-50 text-red-700",
      });
      return;
    }

    setLiquidityPool((prevPool) => {
      const newPool = [...prevPool];
      const assetIndex = newPool.findIndex((a) => a.name === poolAction.asset);

      if (assetIndex > -1) {
        if (poolAction.type === "add") {
          newPool[assetIndex].amount += amount;
        } else if (poolAction.type === "withdraw") {
          if (newPool[assetIndex].amount < amount) {
            toast({
              variant: "destructive",
              title: "Gagal Menarik Likuiditas",
              description: (
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  <span>Jumlah melebihi saldo yang tersedia.</span>
                </div>
              ),
              className: "border-red-500 bg-red-50 text-red-700",
            });
            return prevPool;
          }
          newPool[assetIndex].amount -= amount;
        }
      }
      return newPool.filter((asset) => asset.amount > 0);
    });

    const actionText = poolAction.type === "add" ? "ditambahkan" : "ditarik";
    toast({
      title: `Likuiditas Berhasil Diperbarui`,
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>{poolAction.amount} {poolAction.asset} telah {actionText} dari pool.</span>
        </div>
      ),
      className: "border-green-500 bg-green-50 text-green-700",
    });
    setPoolAction({ type: "", asset: "", amount: "" });
    setWithdrawalError("");
  };

  const handleLiquidate = (loanId: string) => {
    setUndercollateralizedLoans((prevLoans) =>
      prevLoans.filter((loan) => loan.id !== loanId)
    );
    toast({
      title: "Likuidasi Berhasil",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>Pinjaman {loanId} telah berhasil dilikuidasi.</span>
        </div>
      ),
      className: "border-green-500 bg-green-50 text-green-700",
    });
    setIsConfirmDialogOpen(false);
  };

  const handleWithdrawLiquidated = () => {
    const amountToWithdraw = parseFormattedNumber(liquidatedWithdrawalAmount);

    if (
      isNaN(amountToWithdraw) ||
      amountToWithdraw <= 0 ||
      amountToWithdraw > liquidatedFunds.amount
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            <span>Jumlah penarikan tidak valid.</span>
          </div>
        ),
        className: "border-red-500 bg-red-50 text-red-700",
      });
      return;
    }

    toast({
      title: "Penarikan Berhasil",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>Dana sebesar Rp {formatNumber(amountToWithdraw.toString())} telah ditarik.</span>
        </div>
      ),
      className: "border-green-500 bg-green-50 text-green-700",
    });

    setLiquidatedFunds((prev) => ({
      ...prev,
      amount: prev.amount - amountToWithdraw,
    }));

    setIsWithdrawDialogOpen(false);
  };

  // --- FUNGSI BARU: Fungsi untuk mengatur jumlah maksimum likuiditas yang bisa ditambahkan ---
  const handleSetMaxPool = () => {
    // Pastikan sudah ada aset yang dipilih
    if (!poolAction.asset) {
      toast({
        variant: "destructive",
        title: "Pilih Aset Terlebih Dahulu",
        description: "Anda harus memilih aset untuk dapat menggunakan tombol MAX.",
        className: "border-red-500 bg-red-50 text-red-700",
      });
      return;
    }

    // Cari aset yang dipilih di dalam state liquidityPool
    const selectedAsset = liquidityPool.find(a => a.name === poolAction.asset);

    if (selectedAsset) {
      // Ubah angka menjadi string dengan format ribuan (titik) dan koma untuk desimal
      const maxAmountStr = selectedAsset.amount.toString().replace('.', ',');
      setPoolAction({
        ...poolAction,
        // Gunakan fungsi formatNumber yang sudah ada untuk memformat tampilan
        amount: formatNumber(maxAmountStr)
      });
      // Kosongkan pesan error jika ada
      setWithdrawalError("");
    }
  };

  const numericLiquidatedWithdrawalAmount = parseFormattedNumber(liquidatedWithdrawalAmount);

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
    <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-20 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Admin Control Panel
            </h1>
            <p className="text-muted-foreground">
              Kelola aset, parameter pinjaman, dan fungsi kritis protokol.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card Manajemen Aset */}
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
                        {collateralAssets.map((asset) => (
                          <TableRow key={asset.id}>
                            <TableCell>{asset.name} ({asset.symbol})</TableCell>
                            <TableCell>
                              {/* --- PERUBAHAN: Badge dengan warna dinamis berdasarkan status --- */}
                              <Badge variant={
                                asset.status === 'Aktif' ? 'default' :
                                  asset.status === 'Dijeda' ? 'secondary' :
                                    'destructive'
                              } className={
                                asset.status === 'Aktif' ? 'bg-primary/20 text-primary-foreground border border-primary/30' :
                                  asset.status === 'Dijeda' ? 'bg-gray-200 text-gray-800' :
                                    'bg-red-200 text-red-800'
                              }>{asset.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right"><Button size="sm" variant="ghost" onClick={() => handleDeleteAsset(asset.id, 'collateral')}><Trash2 className="w-4 h-4" /></Button></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {/* ... (Dialog tambah aset tidak berubah) */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full mt-4">
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Tambah Aset Jaminan
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Tambah Aset Jaminan Baru</DialogTitle>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="collateral-name">Nama Aset</Label>
                            <Input
                              id="collateral-name"
                              placeholder="Contoh: Bitcoin"
                              value={newAsset.name}
                              onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="collateral-symbol">Simbol</Label>
                            <Input
                              id="collateral-symbol"
                              placeholder="Contoh: BTC"
                              value={newAsset.symbol}
                              onChange={(e) =>
                                setNewAsset({ ...newAsset, symbol: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="collateral-address">Contract Address</Label>
                            <Input
                              id="collateral-address"
                              placeholder="Contoh: 0x..."
                              value={newAsset.contractAddress}
                              onChange={(e) =>
                                setNewAsset({
                                  ...newAsset,
                                  contractAddress: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              className="text-white"
                              onClick={() => handleAddAsset("collateral")}
                            >
                              Simpan
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TabsContent>

                  <TabsContent value="lendable" className="mt-4">
                    <Table>
                      <TableHeader><TableRow><TableHead>Aset</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                      <TableBody>
                        {loanableAssets.map((asset) => (
                          <TableRow key={asset.id}>
                            <TableCell>{asset.name} ({asset.symbol})</TableCell>
                            <TableCell>
                              {/* --- PERUBAHAN: Badge dengan warna dinamis berdasarkan status --- */}
                              <Badge variant={
                                asset.status === 'Aktif' ? 'default' :
                                  asset.status === 'Dijeda' ? 'secondary' :
                                    'destructive'
                              } className={
                                asset.status === 'Aktif' ? 'bg-primary/20 text-primary-foreground border border-primary/30' :
                                  asset.status === 'Dijeda' ? 'bg-gray-200 text-gray-800' :
                                    'bg-red-200 text-red-800'
                              }>{asset.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right"><Button size="sm" variant="ghost" onClick={() => handleDeleteAsset(asset.id, 'loanable')}><Trash2 className="w-4 h-4" /></Button></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {/* ... (Dialog tambah aset pinjaman tidak berubah) */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full mt-4">
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Tambah Aset Pinjaman
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Tambah Aset Pinjaman Baru</DialogTitle>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="loan-name">Nama Aset</Label>
                            <Input
                              id="loan-name"
                              placeholder="Contoh: Rupiah Token"
                              value={newAsset.name}
                              onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="loan-symbol">Simbol</Label>
                            <Input
                              id="loan-symbol"
                              placeholder="Contoh: IDRX"
                              value={newAsset.symbol}
                              onChange={(e) =>
                                setNewAsset({ ...newAsset, symbol: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="loan-address">Contract Address</Label>
                            <Input
                              id="loan-address"
                              placeholder="Contoh: 0x..."
                              value={newAsset.contractAddress}
                              onChange={(e) =>
                                setNewAsset({
                                  ...newAsset,
                                  contractAddress: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              className="text-white"
                              onClick={() => handleAddAsset("loanable")}
                            >
                              Simpan
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Card Parameter Pinjaman */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Parameter Pinjaman
                </CardTitle>
                <CardDescription>
                  Atur parameter global dan LTV spesifik untuk setiap aset jaminan.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 space-y-6">
                <div>
                  <h3 className="mb-2 text-base font-semibold">Parameter Global</h3>
                  <div className="p-6 space-y-4 rounded-lg bg-muted">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="interest-model">Model Bunga</Label>
                        <Select
                          value={globalParams.interestModel}
                          onValueChange={(value) =>
                            setGlobalParams({ ...globalParams, interestModel: value })
                          }
                        >
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
                        {/* --- PERUBAHAN: Input dengan format angka otomatis --- */}
                        <Input
                          id="liq-penalty"
                          value={formatNumber(globalParams.liquidationPenalty)}
                          onChange={(e) =>
                            setGlobalParams({
                              ...globalParams,
                              liquidationPenalty: e.target.value.replace(/[^0-9]/g, ""),
                            })
                          }
                        />
                      </div>
                    </div>
                    <Button className="w-full text-white" onClick={handleSaveGlobalParams}>
                      Simpan Parameter Global
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-base font-semibold">Parameter LTV per Aset</h3>
                  <div className="p-6 space-y-3 rounded-lg bg-muted">
                    <div className="space-y-2">
                      <Label>Pilih Aset</Label>
                      <Select onValueChange={setSelectedLtvAsset}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih aset untuk diubah..." />
                        </SelectTrigger>
                        <SelectContent>
                          {collateralAssets.map((asset) => (
                            <SelectItem key={asset.symbol} value={asset.symbol}>
                              {asset.name} ({asset.symbol})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedAssetForLtv && (
                      <div className="pt-2 space-y-4">
                        <p className="text-sm">
                          LTV saat ini untuk {selectedAssetForLtv.name}:{" "}
                          <span className="font-bold">{selectedAssetForLtv.ltv}%</span>
                        </p>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="new-ltv" className="whitespace-nowrap">
                            LTV Baru (%):
                          </Label>
                          {/* --- PERUBAHAN: Input dengan format angka otomatis --- */}
                          <Input
                            id="new-ltv"
                            placeholder="Contoh: 75"
                            value={formatNumber(newLtv)}
                            onChange={(e) =>
                              setNewLtv(e.target.value.replace(/[^0-9]/g, ""))
                            }
                          />
                          <Button
                            size="sm"
                            className="h-9 text-white"
                            onClick={handleSaveAssetParam}
                          >
                            Simpan
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card Manajemen Likuiditas */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle 
                    className="h-5 w-5 text-red-500" 
                  />Manajemen Likuiditas & Likuidasi
                </CardTitle>
                <CardDescription>
                  Kelola likuiditas pool dan lakukan tindakan likuidasi.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="mb-2 font-semibold">Pinjaman Berisiko (Undercollateralized)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pengguna</TableHead>
                        <TableHead>Health Factor</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {undercollateralizedLoans.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium text-foreground">
                            {loan.userName}
                          </TableCell>
                          <TableCell className="font-mono text-destructive">
                            {loan.healthFactor}
                          </TableCell>
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
                          <p className="text-2xl font-bold">Rp {totalPoolValue.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="space-y-4 border-t pt-4">
                          {liquidityPool
                            .filter((asset) => asset.amount > 0)
                            .map((asset) => (
                              <div key={asset.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full text-base font-bold text-white ${asset.color}`}
                                  >
                                    {asset.symbol}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-foreground">{asset.symbol}</p>
                                    <p className="text-sm text-muted-foreground">{asset.name}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-foreground tabular-nums">
                                    {asset.amount.toLocaleString("id-ID", {
                                      maximumFractionDigits: 8,
                                    })}
                                  </p>
                                  <p className="text-sm text-muted-foreground tabular-nums">
                                    Rp{" "}
                                    {(asset.amount * asset.rate).toLocaleString("id-ID")}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                          {/* Dialog untuk Tambah Likuiditas */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full text-white" onClick={() => setPoolAction({ type: "add", asset: "", amount: "" })}>
                                <PlusCircle className="w-4 h-4 mr-2 text-white" />
                                Tambah
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Tambah Likuiditas ke Pool</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>Aset</Label>
                                  <Select onValueChange={(v) => setPoolAction({ ...poolAction, asset: v })}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Pilih aset..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {liquidityPool.map((a) => (
                                        <SelectItem key={a.id} value={a.name}>{a.name}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Label htmlFor="add-liquidity-amount" className="text-right">
                                      Jumlah
                                    </Label>
                                  </div>
                                  <div className="relative">
                                    <Input
                                      id="add-liquidity-amount"
                                      placeholder="Masukkan jumlah"
                                      value={poolAction.amount}
                                      onChange={(e) => setPoolAction({ ...poolAction, amount: formatNumber(e.target.value) })}
                                      className="pr-14"
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-1 top-1/2 h-8 -translate-y-1/2 px-3"
                                      onClick={handleSetMaxPool}
                                      disabled={!poolAction.asset}
                                    >
                                      Max
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Batal</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button className="text-white" onClick={handlePoolAction}>Tambah</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          {/* Dialog untuk Tarik Likuiditas */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full" variant="outline" onClick={() => setPoolAction({ type: "withdraw", asset: "", amount: "" })}>
                                <MoveDownLeft className="w-4 h-4 mr-2" />
                                Tarik
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Tarik Likuiditas dari Pool</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>Aset</Label>
                                  <Select onValueChange={(v) => setPoolAction({ ...poolAction, asset: v })}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Pilih aset..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {liquidityPool.map((a) => (
                                        <SelectItem key={a.id} value={a.name}>{a.name}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Jumlah</Label>
                                  <div className="relative">
                                    {/* --- PERUBAHAN: Menggunakan formatNumber dan validasi dengan parseFormattedNumber --- */}
                                    <Input
                                      placeholder="Masukkan jumlah"
                                      value={poolAction.amount}
                                      onChange={(e) => {
                                        const formattedValue = formatNumber(e.target.value);
                                        setPoolAction({ ...poolAction, amount: formattedValue });

                                        const amount = parseFormattedNumber(formattedValue);
                                        const selectedAsset = liquidityPool.find((a) => a.name === poolAction.asset);
                                        if (selectedAsset && amount > selectedAsset.amount) {
                                          setWithdrawalError(`Jumlah melebihi batas yang tersedia (${formatNumber(selectedAsset.amount.toString().replace('.', ','))} ${selectedAsset.symbol}).`);
                                        } else {
                                          setWithdrawalError("");
                                        }
                                      }}
                                    />
                                    {/* --- PERUBAHAN: Logika tombol Max untuk menangani angka desimal --- */}
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3"
                                      onClick={() => {
                                        const selectedAsset = liquidityPool.find(a => a.name === poolAction.asset);
                                        if (selectedAsset) {
                                          // Mengubah titik desimal menjadi koma untuk ditampilkan di input
                                          const maxAmountStr = selectedAsset.amount.toString().replace('.', ',');
                                          setPoolAction({ ...poolAction, amount: formatNumber(maxAmountStr) });
                                          setWithdrawalError("");
                                        }
                                      }}
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
                                  <Button className="text-white" onClick={handlePoolAction} variant="default" disabled={!!withdrawalError}>
                                    Tarik
                                  </Button>
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
                          <div><p className="text-muted-foreground">Dana Tersedia</p><p className="text-xl font-bold">Rp {liquidatedFunds.amount.toLocaleString("id-ID")}</p></div>
                          <DialogTrigger asChild>
                            <Button className="text-white" onClick={() => { setLiquidatedWithdrawalAmount(""); setLiquidatedWithdrawalError(""); }}>
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

        {/* Dialog Tarik Dana Likuidasi */}
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
                  type="text"
                  inputMode="numeric"
                  placeholder="Masukkan jumlah"
                  value={liquidatedWithdrawalAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    const numericValue = parseFormattedNumber(value);
                    setLiquidatedWithdrawalAmount(formatNumber(value));
                    if (numericValue > liquidatedFunds.amount) {
                      setLiquidatedWithdrawalError(
                        `Jumlah melebihi dana yang tersedia (Rp ${formatNumber(
                          liquidatedFunds.amount.toString()
                        )}).`
                      );
                    } else {
                      setLiquidatedWithdrawalError("");
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 h-8 -translate-y-1/2 px-3"
                  onClick={() => {
                    setLiquidatedWithdrawalAmount(
                      formatNumber(liquidatedFunds.amount.toString())
                    );
                    setLiquidatedWithdrawalError("");
                  }}
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
              <p className="text-sm text-muted-foreground">
                Akan Ditarik ke Akun Bank:
              </p>
              <div className="rounded-md border bg-background p-3">
                <p className="font-semibold">{liquidatedFunds.bankInfo.bankName}</p>
                <p className="text-sm text-muted-foreground">
                  {liquidatedFunds.bankInfo.accountNumber} a.n.{" "}
                  {liquidatedFunds.bankInfo.accountHolder}
                </p>
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
              disabled={
                !!liquidatedWithdrawalError ||
                numericLiquidatedWithdrawalAmount <= 0 ||
                !liquidatedWithdrawalAmount
              }
            >
              Konfirmasi Penarikan
            </Button>
          </DialogFooter>
        </DialogContent>

        {/* Dialog Konfirmasi Likuidasi */}
        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-2.5">Konfirmasi Likuidasi Pinjaman</DialogTitle>
              <DialogDescription>
                Anda akan melakukan likuidasi untuk pinjaman{" "}
                <span className="font-bold">{loanToLiquidate}</span>. Tindakan ini
                tidak dapat dibatalkan. Pastikan Anda memahami risikonya.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-2.5">
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