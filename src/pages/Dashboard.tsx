import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { TrendingUp, Wallet, CreditCard, Plus, Eye } from "lucide-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Saya</h1>
          <p className="text-muted-foreground">Kelola pinjaman dan jaminan crypto Anda</p>
        </div>

        {/* Stats Overview */}
        {loading ? (
          <SkeletonLoader type="stats" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jaminan</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,734,000.00 IDRX</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+5.2%</span> dari bulan lalu
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pinjaman Aktif</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">75,000,000 IDRX</div>
                <p className="text-xs text-muted-foreground">2 pinjaman aktif</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Health Factor</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">2.45</div>
                <p className="text-xs text-muted-foreground">Status aman</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions (Updated) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link to="/apply">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Pinjaman
            </Button>
          </Link>
          <Link to="/loans">
            <Button variant="outline" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Kelola Pinjaman
            </Button>
          </Link>
          <Link to="/manage-collateral">
            <Button variant="outline" className="w-full">
              <Wallet className="w-4 h-4 mr-2" />
              Kelola Jaminan
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Jaminan</CardTitle>
              <CardDescription>Aset crypto yang digunakan sebagai jaminan</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonLoader type="card" />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">BTC</span>
                      </div>
                      <div>
                        <p className="font-medium">Bitcoin</p>
                        <p className="text-sm text-muted-foreground">0.25 BTC</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">1,700,000.00 IDRX</p>
                      <p className="text-sm text-green-500">+2.3%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">ETH</span>
                      </div>
                      <div>
                        <p className="font-medium">Ethereum</p>
                        <p className="text-sm text-muted-foreground">0.8 ETH</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">30,000,000.00 IDRX</p>
                      <p className="text-sm text-red-500">-1.2%</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Transaksi Terbaru</CardTitle>
              <CardDescription>Aktivitas terbaru pada akun Anda</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonLoader type="table" />
              ) : (
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
                    <TableRow>
                      <TableCell>10 Jun 2024</TableCell>
                      <TableCell>Pinjaman</TableCell>
                      <TableCell>50,000,000 IDRX</TableCell>
                      <TableCell><Badge variant="default">Berhasil</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>8 Jun 2024</TableCell>
                      <TableCell>Deposit</TableCell>
                      <TableCell>0.15 BTC</TableCell>
                      <TableCell><Badge variant="default">Berhasil</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>5 Jun 2024</TableCell>
                      <TableCell>Pembayaran</TableCell>
                      <TableCell>2,500,000 IDRX</TableCell>
                      <TableCell><Badge variant="default">Berhasil</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;