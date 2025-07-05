
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users, Target, Lightbulb, Heart, TrendingUp, Lock, Globe } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Tentang Dingdong Loans</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Kami berkomitmen untuk memberdayakan UMKM Indonesia melalui akses
            finansial yang mudah, aman, dan inovatif menggunakan teknologi
            blockchain.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Misi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Menyediakan solusi pinjaman yang mudah diakses bagi UMKM
                Indonesia dengan memanfaatkan aset crypto sebagai jaminan,
                sehingga pelaku usaha dapat mengembangkan bisnis mereka tanpa
                prosedur yang rumit.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Visi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi platform pinjaman crypto terdepan di Asia Tenggara yang
                menghubungkan dunia tradisional dengan ekonomi digital,
                memberdayakan jutaan UMKM untuk berkembang di era Web3.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Cerita Kami</h2>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Dingdong Loans lahir dari pengalaman langsung melihat kesulitan
                yang dihadapi pelaku UMKM dalam mengakses modal usaha. Di satu
                sisi, banyak dari mereka yang telah berinvestasi dalam aset
                crypto, namun sulit untuk memanfaatkan aset tersebut sebagai
                modal usaha tanpa harus menjualnya.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Tim kami yang terdiri dari para profesional di bidang fintech,
                blockchain, dan UMKM, melihat peluang untuk menjembatani gap
                ini. Kami percaya bahwa teknologi blockchain dapat memberikan
                solusi yang lebih transparan, efisien, dan inklusif.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sejak diluncurkan pada 2024, Dingdong Loans telah membantu
                ratusan UMKM untuk mengakses modal usaha dengan mudah, sambil
                tetap mempertahankan kepemilikan aset crypto mereka.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nilai-Nilai Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Keamanan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Keamanan data dan aset pengguna adalah prioritas utama dalam
                  setiap keputusan yang kami buat.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">Transparansi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Kami berkomitmen untuk selalu transparan dalam setiap proses,
                  biaya, dan kebijakan platform.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Fokus Pengguna</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Setiap fitur yang kami kembangkan selalu mengutamakan
                  kemudahan dan kepuasan pengguna.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Inovasi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Kami terus berinovasi untuk memberikan solusi finansial
                  terbaik di era digital.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Assurance */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Komitmen Keamanan</CardTitle>
              <CardDescription className="text-lg">
                Keamanan aset dan data Anda adalah prioritas utama kami
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">
                    🔐 Enkripsi Tingkat Enterprise
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Semua data dienkripsi menggunakan standar AES-256 dan
                    protokol keamanan internasional.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    🏦 Multi-Signature Wallet
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Aset crypto disimpan dalam dompet multi-signature dengan
                    cold storage untuk keamanan maksimal.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    🛡️ Audit Keamanan Rutin
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Platform kami diaudit secara berkala oleh firm keamanan
                    siber terkemuka.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🔒 Compliance Regulasi</h4>
                  <p className="text-sm text-muted-foreground">
                    Kami mematuhi semua regulasi yang berlaku di Indonesia dan
                    standar internasional.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Future Outlook */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Masa Depan Bersama</CardTitle>
              <CardDescription className="text-lg">
                Rencana dan komitmen kami untuk komunitas UMKM Indonesia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center max-w-3xl mx-auto">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Kami memiliki visi jangka panjang untuk menjadi ekosistem
                  finansial terlengkap bagi UMKM di Indonesia. Dalam roadmap ke
                  depan, kami akan terus mengembangkan berbagai fitur inovatif.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold mb-2">💳 Payment Gateway</h4>
                  <p className="text-sm text-muted-foreground">
                    Sistem pembayaran terintegrasi untuk memudahkan transaksi
                    bisnis UMKM.
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">📊 Business Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Tools analitik bisnis untuk membantu UMKM mengoptimalkan
                    operasional.
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">
                    🤝 Marketplace Integration
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Integrasi dengan marketplace untuk memperluas jangkauan
                    penjualan.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-0">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">
                Bergabunglah dengan Ribuan UMKM Lainnya
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Mulai perjalanan finansial digital Anda bersama Dingdong Loans
                hari ini
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Mulai Sekarang
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
