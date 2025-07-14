import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Copy,
  QrCode,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ManageCollateral = () => {
  //state untuk Popup konfirmasi Deposit & Tarik Jaminan
  const [isDepositConfirmOpen, setDepositConfirmOpen] = useState(false);
  const [isWithdrawConfirmOpen, setWithdrawConfirmOpen] = useState(false);

//state untuk Deposit Jaminan
  const [depositAmount, setDepositAmount] = useState("");
  const [depositCollateralType, setDepositCollateralType] = useState("");
  const [depositStatus, setDepositStatus] = useState("ready");

  //state untuk Tarik Jaminan
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalCollateralType, setWithdrawalCollateralType] = useState("");
  const [withdrawalStatus, setWithdrawalStatus] = useState("ready");
  const [withdrawalError, setWithdrawalError] = useState("");

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const depositAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

  const [availableCollateral, setAvailableCollateral] = useState([
    {
      type: "bitcoin",
      symbol: "BTC",
      name: "Bitcoin",
      amount: 0.25,
      valueIDR: 250000000,
    },
    {
      type: "ethereum",
      symbol: "ETH",
      name: "Ethereum",
      amount: 0.8,
      valueIDR: 30000000,
    },
  ]);

  const transactionHistory = [
    {
      id: "TX001",
      date: "10 Jun 2024",
      type: "Deposit",
      amount: "0.15 BTC",
      status: "Selesai",
    },
    {
      id: "TX002",
      date: "5 Jun 2024",
      type: "Deposit",
      amount: "0.8 ETH",
      status: "Selesai",
    },
    {
      id: "TX003",
      date: "1 Jun 2024",
      type: "Withdrawal",
      amount: "0.05 BTC",
      status: "Selesai",
    },
  ];

  const [dummyWalletBalances, setDummyWalletBalances] = useState({
    bitcoin: 2.5,
    ethereum: 15.75,
    usdt: 10000,
    usdc: 5000,
  });

  const cryptoRates = {
    bitcoin: 1000000000,
    ethereum: 37500000,
    usdt: 16000,
    usdc: 16000,
  };

  const formatNumber = (value: string) => {
    if (!value) return "";
    const cleanValue = value.replace(/[^0-9,]/g, "").replace(",", ".");
    const parts = cleanValue.split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.length > 1 ? `${integerPart},${parts[1]}` : integerPart;
  };

  const parseNumber = (value: string) => {
    return parseFloat(value.replace(/\./g, "").replace(",", "."));
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
    toast({
      title: "Alamat Disalin",
      description: "Alamat deposit telah disalin ke clipboard.",
    });
  };

  const handleDeposit = () => {
    const amount = parseNumber(depositAmount);
    if (
      !depositCollateralType ||
      !depositAmount ||
      isNaN(amount) ||
      amount <= 0
    ) {
      toast({
        variant: "destructive",
        title: "Deposit Gagal",
        description: (
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            <span>
              Silakan pilih jenis crypto dan masukkan jumlah yang valid.
            </span>
          </div>
        ),
        className:
          "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
      });
      return;
    }
    setDepositConfirmOpen(true);
  };

  const confirmDeposit = () => {
    setLoading(true);
    setDepositStatus("pending");
    setTimeout(() => {
      setAvailableCollateral((prevCollateral) => {
        const amount = parseNumber(depositAmount);
        const existingAssetIndex = prevCollateral.findIndex(
          (asset) => asset.type === depositCollateralType
        );
        const rate =
          cryptoRates[depositCollateralType as keyof typeof cryptoRates] || 0;

        if (existingAssetIndex > -1) {
          const updatedCollateral = [...prevCollateral];
          updatedCollateral[existingAssetIndex].amount += amount;
          updatedCollateral[existingAssetIndex].valueIDR += amount * rate;
          return updatedCollateral;
        } else {
          const newAsset = {
            type: depositCollateralType,
            symbol: depositCollateralType.toUpperCase(),
            name:
              depositCollateralType.charAt(0).toUpperCase() +
              depositCollateralType.slice(1),
            amount: amount,
            valueIDR: amount * rate,
          };
          return [...prevCollateral, newAsset];
        }
      });

      setDepositStatus("completed");
      setLoading(false);

      toast({
        title: "Deposit Berhasil",
        description: `Jaminan ${depositAmount} ${depositCollateralType.toUpperCase()} telah ditambahkan.`,
        className:
          "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
      });

      setDepositAmount("");
      setDepositCollateralType("");
      setDepositConfirmOpen(false);
    }, 2000);
  };

  const handleWithdrawal = () => {
    const selectedAsset = availableCollateral.find(
      (asset) => asset.type === withdrawalCollateralType
    );
    const amountToWithdraw = parseNumber(withdrawalAmount);

    if (
      !selectedAsset ||
      isNaN(amountToWithdraw) ||
      amountToWithdraw <= 0 ||
      amountToWithdraw > selectedAsset.amount
    ) {
      toast({
        variant: "destructive",
        title: "Penarikan Gagal",
        description:
          "Jumlah penarikan tidak valid atau melebihi jaminan yang tersedia.",
        className:
          "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
      });
      return;
    }
    setWithdrawConfirmOpen(true);
  };

  const confirmWithdrawal = () => {
    setLoading(true);
    setWithdrawalStatus("pending");
    setTimeout(() => {
      setAvailableCollateral((prevCollateral) => {
        const amountToWithdraw = parseNumber(withdrawalAmount);
        const rate =
          cryptoRates[withdrawalCollateralType as keyof typeof cryptoRates] ||
          0;
        return prevCollateral
          .map((asset) => {
            if (asset.type === withdrawalCollateralType) {
              return {
                ...asset,
                amount: asset.amount - amountToWithdraw,
                valueIDR: asset.valueIDR - amountToWithdraw * rate,
              };
            }
            return asset;
          })
          .filter((asset) => asset.amount > 0.00000001);
      });

      setWithdrawalStatus("completed");
      setLoading(false);
      toast({
        title: "Penarikan Berhasil",
        description: `Jaminan ${withdrawalAmount} ${withdrawalCollateralType.toUpperCase()} telah ditarik.`,
        className:
          "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
      });

      setWithdrawalAmount("");
      setWithdrawalCollateralType("");
      setWithdrawConfirmOpen(false);
    }, 2000);
  };

  const handleSetMaxWithdrawal = () => {
    const selectedAsset = availableCollateral.find(
      (asset) => asset.type === withdrawalCollateralType
    );
    if (selectedAsset) {
      setWithdrawalAmount(selectedAsset.amount.toString().replace(".", ","));
      setWithdrawalError("");
    }
  };

  const totalCollateralValue = availableCollateral.reduce(
    (sum, asset) => sum + asset.valueIDR,
    0
  );

  const handleSetMaxDeposit = () => {
    if (!depositCollateralType) {
      toast({
        variant: "destructive",
        title: "Pilih Jenis Crypto",
        description: "Silakan pilih jenis crypto terlebih dahulu.",
      });
      return;
    }

    const maxAmount = dummyWalletBalances[depositCollateralType as keyof typeof dummyWalletBalances] || 0;
    // Format angka dengan koma sebagai pemisah desimal jika diperlukan
    const formattedAmount = maxAmount.toString().replace(".", ",");
    setDepositAmount(formatNumber(formattedAmount));
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Kelola Jaminan</h1>
              <p className="text-muted-foreground">
                Deposit atau tarik jaminan crypto Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Tabs defaultValue="deposit" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="deposit">
                    <ArrowUpCircle className="w-4 h-4 mr-2" /> Deposit
                  </TabsTrigger>
                  <TabsTrigger value="withdraw">
                    <ArrowDownCircle className="w-4 h-4 mr-2" /> Tarik
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="deposit">
                  <Card>
                    <CardHeader>
                      <CardTitle>Deposit Jaminan</CardTitle>
                      <CardDescription>
                        Pilih crypto dan jumlah yang ingin dideposit.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="crypto-type">Jenis Crypto</Label>
                        <Select
                          value={depositCollateralType}
                          onValueChange={setDepositCollateralType}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis crypto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bitcoin">
                              Bitcoin (BTC)
                            </SelectItem>
                            <SelectItem value="ethereum">
                              Ethereum (ETH)
                            </SelectItem>
                            <SelectItem value="usdt">Tether (USDT)</SelectItem>
                            <SelectItem value="usdc">
                              USD Coin (USDC)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Jumlah</Label>
                        <div className="relative">
                          <Input
                            id="amount"
                            placeholder="0,001"
                            value={depositAmount}
                            onChange={(e) =>
                              setDepositAmount(formatNumber(e.target.value))
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3"
                            onClick={handleSetMaxDeposit}
                            disabled={!depositCollateralType}
                          >
                            Max
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <QrCode className="w-10 h-10 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <Label className="text-xs">Alamat Wallet</Label>
                          <div className="flex items-center">
                            <Input
                              value={depositAddress}
                              readOnly
                              className="font-mono text-xs h-8"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={copyAddress}
                              className="ml-2 h-8"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                        onClick={handleDeposit}
                        disabled={
                          !depositAmount || !depositCollateralType || loading
                        }
                      >
                        {loading && depositStatus === "pending"
                          ? "Memproses..."
                          : "Deposit Jaminan"}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="withdraw">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tarik Jaminan</CardTitle>
                      <CardDescription>
                        Pilih jaminan yang tersedia untuk ditarik.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="crypto-type-withdraw">
                          Jenis Crypto
                        </Label>
                        <Select
                          value={withdrawalCollateralType}
                          onValueChange={setWithdrawalCollateralType}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jaminan yang akan ditarik" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCollateral.map((asset) => (
                              <SelectItem key={asset.type} value={asset.type}>
                                {asset.name} - Tersedia:{" "}
                                {asset.amount.toLocaleString("id-ID", {
                                  maximumFractionDigits: 8,
                                })}{" "}
                                {asset.symbol.toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount-withdraw">Jumlah</Label>
                        <div className="relative">
                          <Input
                            id="amount-withdraw"
                            placeholder="0,001"
                            value={withdrawalAmount}
                            onChange={(e) => {
                              const value = formatNumber(e.target.value);
                              const amount = parseNumber(value);
                              setWithdrawalAmount(value);
                              const selectedAsset = availableCollateral.find(
                                (asset) =>
                                  asset.type === withdrawalCollateralType
                              );
                              if (
                                selectedAsset &&
                                amount > selectedAsset.amount
                              ) {
                                setWithdrawalError(
                                  `Jumlah melebihi jaminan yang tersedia.`
                                );
                              } else {
                                setWithdrawalError("");
                              }
                            }}
                            className={
                              withdrawalError
                                ? "border-red-500 focus-visible:ring-red-500"
                                : ""
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3"
                            onClick={handleSetMaxWithdrawal}
                            disabled={!withdrawalCollateralType}
                          >
                            Max
                          </Button>
                        </div>
                        {withdrawalError && (
                          <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                            <AlertTriangle className="h-4 w-4" />
                            {withdrawalError}
                          </p>
                        )}
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                        Penarikan akan mempengaruhi Health Factor pinjaman Anda.
                        Pastikan Health Factor tetap di atas ambang batas aman.
                      </div>
                      <Button
                        className="w-full text-white"
                        onClick={handleWithdrawal}
                        disabled={
                          !withdrawalAmount ||
                          !withdrawalCollateralType ||
                          loading ||
                          !!withdrawalError
                        }
                      >
                        {loading && withdrawalStatus === "pending"
                          ? "Memproses..."
                          : "Tarik Jaminan"}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="w-5 h-5 mr-2" />
                    Ringkasan Jaminan
                  </CardTitle>
                  <CardDescription>
                    Total jaminan yang Anda miliki saat ini.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <div className="space-y-2">
                    {availableCollateral.map((asset) => (
                      <div
                        key={asset.type}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              asset.symbol === "BTC"
                                ? "bg-orange-500"
                                : "bg-gray-500"
                            }`}
                          >
                            <span className="text-white text-xs font-bold">
                              {asset.symbol}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{asset.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {asset.amount.toLocaleString("id-ID", {
                                maximumFractionDigits: 8,
                              })}{" "}
                              {asset.symbol}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            Rp {asset.valueIDR.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mt-auto text-center">
                    <p className="text-sm font-medium">Total Nilai Jaminan</p>
                    <p className="text-2xl font-bold">
                      Rp {totalCollateralValue.toLocaleString("id-ID")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Riwayat Transaksi Jaminan</CardTitle>
                <CardDescription>
                  Daftar semua transaksi deposit dan penarikan jaminan Anda.
                </CardDescription>
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
                          <Badge
                            variant={
                              tx.type === "Deposit" ? "default" : "secondary"
                            }
                            className={
                              tx.type === "Deposit"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {tx.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {tx.amount}
                        </TableCell>
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

      {/* --- PERUBAHAN: Dialog Konfirmasi Deposit dengan struktur baru --- */}
      <Dialog open={isDepositConfirmOpen} onOpenChange={setDepositConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Konfirmasi Deposit</DialogTitle>
            <DialogDescription>
              Anda akan melakukan deposit jaminan sebesar{" "}
              <span className="font-bold">
                {depositAmount} {depositCollateralType.toUpperCase()}
              </span>
              . Tindakan ini tidak dapat dibatalkan setelah diproses.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            {/* --- PERUBAHAN: Tombol konfirmasi dengan warna primer --- */}
            <Button
              className="bg-primary text-white hover:bg-primary/90"
              onClick={confirmDeposit}
            >
              Ya, Lanjutkan Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- PERUBAHAN: Dialog Konfirmasi Penarikan dengan struktur baru --- */}
      <Dialog
        open={isWithdrawConfirmOpen}
        onOpenChange={setWithdrawConfirmOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Konfirmasi Penarikan</DialogTitle>
            <DialogDescription>
              Anda akan menarik jaminan sebesar{" "}
              <span className="font-bold">
                {withdrawalAmount} {withdrawalCollateralType.toUpperCase()}
              </span>
              . Pastikan Anda telah memahami risikonya.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            {/* --- PERUBAHAN: Tombol konfirmasi dengan warna primer --- */}
            <Button
              className="bg-primary text-white hover:bg-primary/90"
              onClick={confirmWithdrawal}
            >
              Ya, Lanjutkan Penarikan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageCollateral;
