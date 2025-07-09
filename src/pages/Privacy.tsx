import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  Lock,
  Users,
  Globe,
  FileText,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const sections = [
    { id: "introduction", title: "1. Pendahuluan", icon: Globe },
    {
      id: "data-collection",
      title: "2. Data Pribadi yang Kami Kumpulkan",
      icon: FileText,
    },
    { id: "purpose", title: "3. Tujuan Pengumpulan Data", icon: Users },
    { id: "legal-basis", title: "4. Dasar Hukum Pemrosesan", icon: Shield },
    { id: "data-sharing", title: "5. Pembagian Data", icon: Users },
    { id: "security", title: "6. Keamanan Data", icon: Lock },
    { id: "storage", title: "7. Penyimpanan Data", icon: Globe },
    { id: "rights", title: "8. Hak-Hak Anda", icon: Users },
    { id: "cookies", title: "9. Cookies dan Teknologi Pelacakan", icon: Globe },
    { id: "transfer", title: "10. Transfer Data Lintas Negara", icon: Globe },
    { id: "changes", title: "11. Perubahan Kebijakan", icon: FileText },
    { id: "contact", title: "12. Kontak", icon: Phone },
    { id: "complaints", title: "13. Pengaduan", icon: FileText },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Daftar Isi
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-1 p-4">
                      {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                          <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
                          >
                            <Icon className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">{section.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-8">
              <Button variant="ghost" size="sm" asChild className="mb-6">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Kembali
                </Link>
              </Button>

              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">Kebijakan Privasi</h1>
                <p className="text-muted-foreground text-lg mb-4">
                  Perlindungan data pribadi sesuai dengan hukum Indonesia
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Terakhir diperbarui:</strong> 9 Juli 2025
                </div>
              </div>
            </div>

            {/* Introduction */}
            <section id="introduction" className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-blue-500" />
                    1. Pendahuluan
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    PT Dingdong Financial Technology ("Dingdong Loans", "kami",
                    "kita") berkomitmen untuk melindungi privasi dan data
                    pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana
                    kami mengumpulkan, menggunakan, menyimpan, dan melindungi
                    informasi pribadi Anda sesuai dengan Undang-Undang
                    Perlindungan Data Pribadi (UU PDP) No. 27 Tahun 2022 dan
                    peraturan terkait lainnya di Indonesia.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Data Collection */}
            <section id="data-collection" className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-500" />
                    2. Data Pribadi yang Kami Kumpulkan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 bg-blue-50">
                      <h4 className="font-semibold text-blue-600 mb-2">
                        2.1 Data Pribadi Umum
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Nama lengkap</li>
                        <li>Nomor Induk Kependudukan (NIK)</li>
                        <li>Alamat email</li>
                        <li>Nomor telepon</li>
                        <li>Alamat tempat tinggal</li>
                        <li>Tanggal lahir</li>
                        <li>Jenis kelamin</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4 bg-green-50">
                      <h4 className="font-semibold text-green-600 mb-2">
                        2.2 Data Finansial
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Informasi rekening bank</li>
                        <li>Riwayat transaksi</li>
                        <li>Informasi pendapatan</li>
                        <li>Data crypto wallet</li>
                        <li>Riwayat kredit</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4 bg-purple-50">
                      <h4 className="font-semibold text-purple-600 mb-2">
                        2.3 Data Biometrik
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Foto selfie untuk verifikasi identitas</li>
                        <li>Foto KTP/dokumen identitas</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Purpose */}
            <section id="purpose" className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Users className="w-6 h-6 mr-2 text-blue-500" />
                    3. Tujuan Pengumpulan Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Kami mengumpulkan data pribadi Anda untuk:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Verifikasi identitas dan Know Your Customer (KYC)</li>
                    <li>Pemrosesan aplikasi pinjaman</li>
                    <li>Penilaian risiko kredit</li>
                    <li>Monitoring transaksi untuk mencegah fraud</li>
                    <li>Komunikasi terkait layanan</li>
                    <li>Pemenuhan kewajiban hukum dan regulasi</li>
                    <li>Peningkatan layanan platform</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Legal Basis */}
            <section id="legal-basis" className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-blue-500" />
                    4. Dasar Hukum Pemrosesan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Pemrosesan data pribadi Anda didasarkan pada:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Persetujuan eksplisit dari Anda</li>
                    <li>Pelaksanaan kontrak layanan</li>
                    <li>Pemenuhan kewajiban hukum</li>
                    <li>Kepentingan yang sah untuk mencegah fraud</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Data Sharing */}
            <section id="data-sharing" className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Users className="w-6 h-6 mr-2 text-blue-500" />
                    5. Pembagian Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Kami dapat membagikan data Anda kepada:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Penyedia layanan teknologi yang bekerja sama dengan kami
                    </li>
                    <li>Lembaga keuangan partner</li>
                    <li>Otoritas regulasi sesuai permintaan resmi</li>
                    <li>Penyedia layanan KYC dan credit scoring</li>
                    <li>Auditor eksternal</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Semua pihak ketiga terikat perjanjian kerahasiaan dan wajib
                    melindungi data Anda.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Security */}
            <section id="security" className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Lock className="w-6 h-6 mr-2 text-blue-500" />
                    6. Keamanan Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Kami menerapkan langkah-langkah keamanan meliputi:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Enkripsi data end-to-end</li>
                      <li>Sistem autentikasi multi-faktor</li>
                      <li>Monitoring keamanan 24/7</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Akses terbatas berdasarkan prinsip need-to-know</li>
                      <li>Audit keamanan berkala</li>
                      <li>Backup data yang aman</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Storage */}
            <section id="storage" className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-blue-500" />
                    7. Penyimpanan Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Data pribadi Anda disimpan di server yang berlokasi di
                    Indonesia dan/atau negara dengan tingkat perlindungan data
                    yang memadai. Data akan disimpan selama periode yang
                    diperlukan untuk memenuhi tujuan pengumpulan atau sesuai
                    ketentuan hukum yang berlaku.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Rights */}
            <section id="rights" className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Users className="w-6 h-6 mr-2 text-blue-500" />
                    8. Hak-Hak Anda
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Sesuai UU PDP, Anda memiliki hak untuk:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Mengetahui data pribadi yang kami miliki</li>
                      <li>Mengakses dan memperoleh salinan data pribadi</li>
                      <li>
                        Memperbarui atau memperbaiki data yang tidak akurat
                      </li>
                      <li>Menghapus data pribadi dalam kondisi tertentu</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Membatasi pemrosesan data</li>
                      <li>Memindahkan data ke penyedia layanan lain</li>
                      <li>Menarik persetujuan</li>
                      <li>Mengajukan keberatan atas pemrosesan</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Cookies */}
            <section id="cookies" className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-blue-500" />
                    9. Cookies dan Teknologi Pelacakan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Kami menggunakan cookies dan teknologi serupa untuk
                    meningkatkan pengalaman pengguna, menganalisis penggunaan
                    platform, dan untuk tujuan keamanan. Anda dapat mengatur
                    preferensi cookies melalui pengaturan browser Anda.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Transfer */}
            <section id="transfer" className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-blue-500" />
                    10. Transfer Data Lintas Negara
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Jika kami mentransfer data Anda ke luar Indonesia, kami akan
                    memastikan bahwa negara tujuan memiliki tingkat perlindungan
                    data yang memadai atau menerapkan safeguard yang sesuai
                    sesuai ketentuan UU PDP.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Changes */}
            <section id="changes" className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-500" />
                    11. Perubahan Kebijakan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke
                    waktu. Perubahan material akan diberitahukan kepada Anda
                    melalui email atau notifikasi di platform kami.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Contact */}
            <section id="contact" className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Phone className="w-6 h-6 mr-2 text-blue-500" />
                    12. Kontak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Untuk pertanyaan, keluhan, atau permintaan terkait data
                    pribadi Anda, hubungi:
                  </p>
                  <Card className="bg-muted/50 border-2 border-blue-200">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-4 text-blue-600">
                        Data Protection Officer
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">
                            privacy@dingdongloans.com
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">+62-21-1234-5678</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-blue-500 mt-0.5" />
                          <span className="text-sm">
                            Jl. Sudirman No. 123, Jakarta Pusat 10220
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </section>

            {/* Complaints */}
            <section id="complaints" className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-500" />
                    13. Pengaduan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Jika Anda tidak puas dengan penanganan data pribadi Anda,
                    Anda dapat mengajukan pengaduan kepada Kementerian
                    Komunikasi dan Informatika RI atau lembaga pengawas yang
                    berwenang lainnya.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Footer Notice */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="text-center py-8">
                <p className="text-sm text-muted-foreground">
                  Dengan menggunakan layanan Dingdong Loans, Anda menyatakan
                  telah membaca, memahami, dan menyetujui Kebijakan Privasi ini.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
