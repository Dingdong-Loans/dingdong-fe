import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Shield,
  Settings,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  BarChart3,
  Activity,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isLoanDialogOpen, setIsLoanDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for admin dashboard
  const systemStats = {
    totalUsers: 1247,
    activeLoans: 89,
    totalLoanValue: 2450000000, // 2.45B IDRX
    pendingApplications: 12,
    averageHealthFactor: 1.8,
    systemUptime: "99.9%",
  };

  const recentUsers = [
    {
      id: "USR-001",
      name: "Andro Wijaya",
      email: "andro@email.com",
      kycStatus: "verified",
      joinDate: "2024-07-01",
      totalBorrowed: 50000000,
      status: "active",
    },
    {
      id: "USR-002",
      name: "Sari Indah",
      email: "sari@email.com",
      kycStatus: "pending",
      joinDate: "2024-07-05",
      totalBorrowed: 0,
      status: "new",
    },
    {
      id: "USR-003",
      name: "Budi Santoso",
      email: "budi@email.com",
      kycStatus: "verified",
      joinDate: "2024-06-15",
      totalBorrowed: 25000000,
      status: "active",
    },
  ];

  const pendingLoans = [
    {
      id: "LOAN-456",
      userId: "USR-004",
      userName: "Maya Putri",
      amount: 75000000,
      collateral: "0.2 BTC",
      collateralValue: 8500,
      requestDate: "2024-07-08",
      status: "pending_review",
      riskScore: "low",
    },
    {
      id: "LOAN-457",
      userId: "USR-005",
      userName: "Rahmat Hidayat",
      amount: 30000000,
      collateral: "1.2 ETH",
      collateralValue: 2400,
      requestDate: "2024-07-07",
      status: "pending_approval",
      riskScore: "medium",
    },
  ];

  const systemLogs = [
    {
      timestamp: "2024-07-09 14:30",
      action: "User Registration",
      user: "Maya Putri",
      status: "success",
    },
    {
      timestamp: "2024-07-09 14:15",
      action: "Loan Approved",
      user: "Andro Wijaya",
      status: "success",
    },
    {
      timestamp: "2024-07-09 13:45",
      action: "KYC Submitted",
      user: "Sari Indah",
      status: "pending",
    },
    {
      timestamp: "2024-07-09 13:20",
      action: "Payment Processed",
      user: "Budi Santoso",
      status: "success",
    },
  ];

  const handleUserAction = (action: string, user: any) => {
    if (action === "view") {
      setSelectedUser(user);
      setIsUserDialogOpen(true);
    } else if (action === "approve_kyc") {
      toast({
        title: "KYC Disetujui",
        description: `KYC untuk ${user.name} telah disetujui.`,
      });
    } else if (action === "suspend") {
      toast({
        title: "User Disuspend",
        description: `${user.name} telah disuspend sementara.`,
        variant: "destructive",
      });
    }
  };

  const handleLoanAction = (action: string, loan: any) => {
    if (action === "view") {
      setSelectedLoan(loan);
      setIsLoanDialogOpen(true);
    } else if (action === "approve") {
      toast({
        title: "Pinjaman Disetujui",
        description: `Pinjaman ${
          loan.id
        } sebesar Rp ${loan.amount.toLocaleString()} telah disetujui.`,
      });
    } else if (action === "reject") {
      toast({
        title: "Pinjaman Ditolak",
        description: `Pinjaman ${loan.id} telah ditolak.`,
        variant: "destructive",
      });
    }
  };

  const getKYCStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800">Terverifikasi</Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Menunggu</Badge>
        );
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Ditolak</Badge>;
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">Belum Submit</Badge>
        );
    }
  };

  const getRiskScoreBadge = (score: string) => {
    switch (score) {
      case "low":
        return <Badge className="bg-green-100 text-green-800">Rendah</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Sedang</Badge>;
      case "high":
        return <Badge className="bg-red-100 text-red-800">Tinggi</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">-</Badge>;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          {loading ? (
            <SkeletonLoader type="card" />
          ) : (
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Kelola pengguna, pinjaman, dan monitor sistem Dingdong Loans
              </p>
            </div>
          )}

          {/* System Statistics */}
          {loading ? (
            <SkeletonLoader type="stats_row" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
              <Card className="border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {systemStats.totalUsers.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +12% dari bulan lalu
                  </p>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pinjaman Aktif
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {systemStats.activeLoans}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +5% dari minggu lalu
                  </p>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Pinjaman
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    Rp {(systemStats.totalLoanValue / 1000000000).toFixed(2)}B
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Volume keseluruhan
                  </p>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Aplikasi Menunggu
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {systemStats.pendingApplications}
                  </div>
                  <p className="text-xs text-muted-foreground">Butuh review</p>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Health Factor
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {systemStats.averageHealthFactor}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Rata-rata sistem
                  </p>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    System Uptime
                  </CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {systemStats.systemUptime}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    30 hari terakhir
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Pengguna</TabsTrigger>
              <TabsTrigger value="loans">Pinjaman</TabsTrigger>
              <TabsTrigger value="system">Sistem</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent User Registrations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Registrasi Terbaru
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <SkeletonLoader type="table" />
                    ) : (
                      <div className="space-y-4">
                        {recentUsers.slice(0, 3).map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                            <div className="text-right">
                              {getKYCStatusBadge(user.kycStatus)}
                              <p className="text-xs text-muted-foreground mt-1">
                                {user.joinDate}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Pending Loan Applications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Aplikasi Pinjaman Menunggu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <SkeletonLoader type="table" />
                    ) : (
                      <div className="space-y-4">
                        {pendingLoans.map((loan) => (
                          <div
                            key={loan.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{loan.userName}</p>
                              <p className="text-sm text-muted-foreground">
                                Rp {loan.amount.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              {getRiskScoreBadge(loan.riskScore)}
                              <div className="flex gap-2 mt-2">
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleLoanAction("approve", loan)
                                  }
                                >
                                  <CheckCircle className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleLoanAction("reject", loan)
                                  }
                                >
                                  <XCircle className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* System Activity Log */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Log Aktivitas Sistem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <SkeletonLoader type="table" />
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Waktu</TableHead>
                          <TableHead>Aksi</TableHead>
                          <TableHead>Pengguna</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {systemLogs.map((log, index) => (
                          <TableRow key={index}>
                            <TableCell>{log.timestamp}</TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell>{log.user}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  log.status === "success"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {log.status === "success"
                                  ? "Berhasil"
                                  : "Menunggu"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manajemen Pengguna</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <SkeletonLoader type="table" />
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Nama</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Status KYC</TableHead>
                          <TableHead>Total Pinjaman</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell className="font-medium">
                              {user.name}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              {getKYCStatusBadge(user.kycStatus)}
                            </TableCell>
                            <TableCell>
                              Rp {user.totalBorrowed.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  user.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }
                              >
                                {user.status === "active" ? "Aktif" : "Baru"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUserAction("view", user)}
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                                {user.kycStatus === "pending" && (
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleUserAction("approve_kyc", user)
                                    }
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    handleUserAction("suspend", user)
                                  }
                                >
                                  <AlertTriangle className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="loans" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Aplikasi Pinjaman</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <SkeletonLoader type="table" />
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID Pinjaman</TableHead>
                          <TableHead>Peminjam</TableHead>
                          <TableHead>Jumlah</TableHead>
                          <TableHead>Jaminan</TableHead>
                          <TableHead>Risk Score</TableHead>
                          <TableHead>Tanggal</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingLoans.map((loan) => (
                          <TableRow key={loan.id}>
                            <TableCell className="font-medium">
                              {loan.id}
                            </TableCell>
                            <TableCell>{loan.userName}</TableCell>
                            <TableCell>
                              Rp {loan.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>{loan.collateral}</TableCell>
                            <TableCell>
                              {getRiskScoreBadge(loan.riskScore)}
                            </TableCell>
                            <TableCell>{loan.requestDate}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleLoanAction("view", loan)}
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleLoanAction("approve", loan)
                                  }
                                >
                                  <CheckCircle className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    handleLoanAction("reject", loan)
                                  }
                                >
                                  <XCircle className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Pengaturan Sistem
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="max-ltv">Maksimal LTV Ratio</Label>
                      <Input id="max-ltv" value="66.7%" readOnly />
                    </div>
                    <div>
                      <Label htmlFor="interest-rate">Suku Bunga Default</Label>
                      <Input id="interest-rate" value="8.5%" readOnly />
                    </div>
                    <div>
                      <Label htmlFor="min-health">Minimum Health Factor</Label>
                      <Input id="min-health" value="1.2" readOnly />
                    </div>
                    <Button className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Update Pengaturan
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Peringatan Sistem
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                        <p className="text-sm font-medium">
                          Health Factor Rendah
                        </p>
                        <p className="text-xs text-muted-foreground">
                          3 pinjaman memiliki health factor dibawah 1.5
                        </p>
                      </div>
                      <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                        <p className="text-sm font-medium">KYC Pending</p>
                        <p className="text-xs text-muted-foreground">
                          12 aplikasi KYC menunggu review
                        </p>
                      </div>
                      <div className="p-3 border-l-4 border-green-500 bg-green-50">
                        <p className="text-sm font-medium">Sistem Normal</p>
                        <p className="text-xs text-muted-foreground">
                          Semua service berjalan dengan baik
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>

        <Footer />
      </div>

      {/* User Detail Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Pengguna: {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              Informasi lengkap tentang pengguna dan aktivitas pinjaman
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>ID Pengguna</Label>
                  <p className="text-sm">{selectedUser.id}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-sm">{selectedUser.email}</p>
                </div>
                <div>
                  <Label>Status KYC</Label>
                  <div className="mt-1">
                    {getKYCStatusBadge(selectedUser.kycStatus)}
                  </div>
                </div>
                <div>
                  <Label>Tanggal Bergabung</Label>
                  <p className="text-sm">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <Label>Total Pinjaman</Label>
                  <p className="text-sm">
                    Rp {selectedUser.totalBorrowed.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p className="text-sm">{selectedUser.status}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUserDialogOpen(false)}
            >
              Tutup
            </Button>
            <Button>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Loan Detail Dialog */}
      <Dialog open={isLoanDialogOpen} onOpenChange={setIsLoanDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Pinjaman: {selectedLoan?.id}</DialogTitle>
            <DialogDescription>
              Review detail aplikasi pinjaman dan berikan keputusan
            </DialogDescription>
          </DialogHeader>
          {selectedLoan && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Peminjam</Label>
                  <p className="text-sm">{selectedLoan.userName}</p>
                </div>
                <div>
                  <Label>Jumlah Pinjaman</Label>
                  <p className="text-sm">
                    Rp {selectedLoan.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label>Jaminan</Label>
                  <p className="text-sm">{selectedLoan.collateral}</p>
                </div>
                <div>
                  <Label>Nilai Jaminan</Label>
                  <p className="text-sm">
                    ${selectedLoan.collateralValue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label>Risk Score</Label>
                  <div className="mt-1">
                    {getRiskScoreBadge(selectedLoan.riskScore)}
                  </div>
                </div>
                <div>
                  <Label>Tanggal Aplikasi</Label>
                  <p className="text-sm">{selectedLoan.requestDate}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="admin-notes">Catatan Admin</Label>
                <Textarea
                  id="admin-notes"
                  placeholder="Tambahkan catatan untuk keputusan ini..."
                  className="mt-1"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsLoanDialogOpen(false)}
            >
              Tutup
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleLoanAction("reject", selectedLoan)}
            >
              Tolak
            </Button>
            <Button onClick={() => handleLoanAction("approve", selectedLoan)}>
              Setujui
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminDashboard;
