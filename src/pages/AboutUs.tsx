import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users, Target, Lightbulb, Heart, TrendingUp, Lock } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main content wrapper to constrain width and center it */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* "How It Started" Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Story */}
            <div className="space-y-6">
              <span className="text-sm font-semibold text-primary uppercase">
                Cerita Kami
              </span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                "Misi Kami Adalah Transformasi Finansial untuk UMKM"
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Dingdong Loans lahir dari pengalaman langsung melihat kesulitan
                yang dihadapi pelaku UMKM dalam mengakses modal usaha. Di satu
                sisi, banyak dari mereka yang telah berinvestasi dalam aset
                crypto, namun sulit untuk memanfaatkan aset tersebut sebagai
                modal usaha tanpa harus menjualnya. Dengan dedikasi tanpa henti,
                tim kami yang terdiri dari para profesional di bidang fintech,
                blockchain, dan UMKM, berkumpul untuk meluncurkan platform
                inovatif ini.
              </p>
            </div>

            {/* Right Column: Mission, Vision & Security Commitments */}
            <div className="space-y-8">
              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Misi Kami</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Menyediakan solusi pinjaman yang mudah diakses bagi UMKM
                      Indonesia dengan memanfaatkan aset crypto sebagai jaminan.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Visi Kami</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Menjadi platform pinjaman crypto terdepan yang
                      menghubungkan dunia tradisional dengan ekonomi digital.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Security Commitments as Stats */}
              <div className="grid grid-cols-2 gap-6 text-left pt-4">
                <div>
                  <h4 className="font-semibold mb-1">
                    🔐 Enkripsi Enterprise
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Semua data dienkripsi menggunakan standar keamanan
                    internasional.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    🏦 Multi-Signature Wallet
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Aset crypto disimpan dalam dompet multi-signature yang aman.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    🛡️ Audit Keamanan Rutin
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Platform kami diaudit secara berkala oleh firma keamanan
                    terkemuka.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">🔒 Compliance Regulasi</h4>
                  <p className="text-sm text-muted-foreground">
                    Kami mematuhi semua regulasi yang berlaku di Indonesia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nilai-Nilai Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Keamanan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Keamanan data dan aset pengguna adalah prioritas utama kami.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Transparansi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Kami berkomitmen untuk selalu transparan dalam setiap proses.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Fokus Pengguna</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Setiap fitur kami kembangkan untuk kemudahan pengguna.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Inovasi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Kami terus berinovasi untuk memberikan solusi finansial terbaik.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <div className="text-center">
            <Card className="bg-foreground text-background border-0">
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
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    Mulai Sekarang
                  </Button>
                  <Button size="lg" variant="secondary">
                    Pelajari Lebih Lanjut
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;