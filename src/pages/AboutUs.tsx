import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Clock, TrendingUp, CheckCircle } from "lucide-react";

const AboutUs = () => {
  // Data untuk bagian Keunggulan Kami
  const advantages = [
    {
      icon: Clock,
      title: "Proses Cepat",
      description: "Persetujuan dalam hitungan menit, bukan berhari-hari.",
    },
    {
      icon: Shield,
      title: "Keamanan Terjamin",
      description: "Aset Anda dilindungi dengan teknologi blockchain terenkripsi.",
    },
    {
      icon: TrendingUp,
      title: "Bunga Kompetitif",
      description: "Kami menawarkan suku bunga yang rendah dan transparan tanpa biaya tersembunyi.",
    },
    {
      icon: CheckCircle,
      title: "Akses Mudah",
      description: "Tidak memerlukan pengecekan skor kredit tradisional yang rumit.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section - Desain Baru dengan Teks di Atas Gambar */}
        <section className="relative h-[60vh] min-h-[450px] w-full flex items-center justify-center text-white">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/about-us-hero.jpg')" }}
          ></div>

          {/* Overlay Gelap untuk Keterbacaan Teks */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Konten Teks */}
          <div className="relative z-10 text-center px-6 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Tentang Dingdong Loans
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              Misi kami adalah menyediakan bisnis dan UMKM dengan alat keuangan inovatif yang mereka butuhkan untuk berkembang di pasar digital yang dinamis saat ini.
            </p>
          </div>
        </section>

        {/* Our Story / Mission / Vision Section */}
        <section className="bg-muted/40 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold">Cerita Kami</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center md:text-left">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Sejarah Kami</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dingdong Loans lahir dari pengalaman langsung melihat kesulitan UMKM dalam mengakses modal. Kami hadir untuk menjembatani kesenjangan antara keuangan tradisional dan potensi aset digital.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Misi Kami</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Menyediakan solusi pinjaman yang mudah, cepat, dan aman bagi UMKM di Indonesia dengan memanfaatkan teknologi blockchain dan aset crypto sebagai jaminan.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Visi Kami</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi platform pinjaman crypto terdepan yang menghubungkan dunia keuangan tradisional dengan ekonomi digital untuk mendorong pertumbuhan ekonomi inklusif.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Keunggulan Kami</h2>
            <p className="text-muted-foreground mt-2">Mengapa memilih Dingdong Loans untuk kebutuhan finansial Anda.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((item, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;