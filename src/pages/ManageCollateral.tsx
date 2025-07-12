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
// --- PERUBAHAN: Menambahkan ikon CheckCircle dan XCircle untuk notifikasi ---
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
  // State untuk deposit
  const [depositAmount, setDepositAmount] = useState("");
  const [depositCollateralType, setDepositCollateralType] = useState("");
  const [depositStatus, setDepositStatus] = useState("ready");

  // State untuk penarikan
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

  const cryptoRates = {
    bitcoin: 1000000000,
    ethereum: 37500000,
    usdt: 16000,
    usdc: 16000,
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
      setAvailableCollateral((prevCollateral) => {
        const existingAssetIndex = prevCollateral.findIndex(
          (asset) => asset.type === depositCollateralType
        );
        const amount = parseFloat(depositAmount);
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

      // --- PERUBAHAN: Notifikasi berhasil dengan border hijau dan ikon ceklis ---
      toast({
        title: "Deposit Berhasil",
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>
              Jaminan {depositAmount} {depositCollateralType.toUpperCase()}{" "}
              telah ditambahkan.
            </span>
          </div>
        ),
        className:
          "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
      });

      setDepositAmount("");
      setDepositCollateralType("");
    }, 2000);
  };

  const handleWithdrawal = () => {
    // Validasi penarikan di sisi client sebelum mengirim
    const selectedAsset = availableCollateral.find(
      (asset) => asset.type === withdrawalCollateralType
    );
    const amountToWithdraw = parseFloat(withdrawalAmount);

    if (!selectedAsset || amountToWithdraw > selectedAsset.amount) {
      // --- PERUBAHAN: Notifikasi gagal dengan border merah dan ikon silang ---
      toast({
        variant: "destructive",
        title: "Penarikan Gagal",
        description: (
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            <span>Jumlah penarikan melebihi jaminan yang tersedia.</span>
          </div>
        ),
        className:
          "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
      });
      return;
    }

    setLoading(true);
    setWithdrawalStatus("pending");
    setTimeout(() => {
      setAvailableCollateral((prevCollateral) => {
        return prevCollateral
          .map((asset) => {
            if (asset.type === withdrawalCollateralType) {
              const rate =
                cryptoRates[
                withdrawalCollateralType as keyof typeof cryptoRates
                ] || 0;
              return {
                ...asset,
                amount: asset.amount - amountToWithdraw,
                valueIDR: asset.valueIDR - amountToWithdraw * rate,
              };
            }
            return asset;
          })
          .filter((asset) => asset.amount > 0);
      });

      setWithdrawalStatus("completed");
      setLoading(false);
      // --- PERUBAHAN: Notifikasi berhasil dengan border hijau dan ikon ceklis ---
      toast({
        title: "Penarikan Berhasil",
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>
              Jaminan {withdrawalAmount}{" "}
              {withdrawalCollateralType.toUpperCase()} telah ditarik.
            </span>
          </div>
        ),
        className:
          "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
      });

      setWithdrawalAmount("");
      setWithdrawalCollateralType("");
    }, 2000);
  };

  const handleSetMaxWithdrawal = () => {
    const selectedAsset = availableCollateral.find(
      (asset) => asset.type === withdrawalCollateralType
    );
    if (selectedAsset) {
      setWithdrawalAmount(selectedAsset.amount.toString());
      setWithdrawalError(""); // Hapus error saat max di-klik
    }
  };

  const totalCollateralValue = availableCollateral.reduce(
    (sum, asset) => sum + asset.valueIDR,
    0
  );

  return (
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
                          <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="ethereum">
                            Ethereum (ETH)
                          </SelectItem>
                          <SelectItem value="usdt">Tether (USDT)</SelectItem>
                          <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Jumlah</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.001"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
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
                      className="w-full text-white"
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
                      <Label htmlFor="crypto-type-withdraw">Jenis Crypto</Label>
                      <Select
                        value={withdrawalCollateralType}
                        onValueChange={(value) => {
                          setWithdrawalCollateralType(value);
                          setWithdrawalError("");
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jaminan yang akan ditarik" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCollateral.map((asset) => (
                            <SelectItem key={asset.type} value={asset.type}>
                              {asset.name} - Tersedia: {asset.amount}{" "}
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
                          type="number"
                          placeholder="0.001"
                          value={withdrawalAmount}
                          onChange={(e) => {
                            const amount = e.target.value;
                            setWithdrawalAmount(amount);
                            const selectedAsset = availableCollateral.find(
                              (asset) => asset.type === withdrawalCollateralType
                            );
                            if (
                              selectedAsset &&
                              parseFloat(amount) > selectedAsset.amount
                            ) {
                              setWithdrawalError(
                                `Jumlah melebihi jaminan yang tersedia (${selectedAsset.amount} ${selectedAsset.symbol.toUpperCase()}).`
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
                      className="w-full bg-primary text-white"
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
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${asset.symbol === "BTC"
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
                            {asset.amount} {asset.symbol}
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