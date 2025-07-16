import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Bitcoin,
  Shield,
  TrendingUp,
  Globe,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  CheckCircle,
  Loader2,
} from "lucide-react";

interface PartnerFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  businessType: string;
  cryptoLoanAmount: string;
  partnershipType: string;
  message: string;
}

const Partner: React.FC = () => {
  const [formData, setFormData] = useState<PartnerFormData>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    businessType: "",
    cryptoLoanAmount: "",
    partnershipType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert("Partnership application submitted successfully!");
      setIsSubmitting(false);
      // Reset form
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        businessType: "",
        cryptoLoanAmount: "",
        partnershipType: "",
        message: "",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-20">
        <img
          src="/images/about-us-hero.jpg"
          alt="Deskripsi gambar hero Anda"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 opacity-70"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Bermitra dengan Kami
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/90">
            Bergabunglah dengan platform pinjaman kripto terdepan yang didukung
            teknologi blockchain
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                1000+
              </h3>
              <p className="text-lg text-white/80">Mitra Aktif</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                50M+
              </h3>
              <p className="text-lg text-white/80">USD Tersalurkan</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                99%
              </h3>
              <p className="text-lg text-white/80">Kepuasan Mitra</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Layanan Kami
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Solusi komprehensif untuk kebutuhan pinjaman cryptocurrency
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bitcoin className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">
                  Penyedia Pinjaman Kripto
                </CardTitle>
                <CardDescription>
                  Solusi pinjaman cryptocurrency yang aman dan terpercaya dengan
                  teknologi blockchain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Bitcoin (BTC) Lending</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Ethereum (ETH) Lending</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Stablecoin Lending (IDRX)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Layanan Blockchain</CardTitle>
                <CardDescription>
                  Teknologi blockchain terdepan untuk keamanan dan transparansi
                  dalam pinjaman kripto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Smart Contract untuk Lending</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Multi-Chain Support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>DeFi Integration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Crypto Custody Solutions</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href="https://brixblockchain.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Kunjungi BrixBlockchain.com
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Jenis Kemitraan
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Pilih jenis kemitraan yang sesuai dengan kebutuhan bisnis Anda
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Mitra Penyalur Kripto</CardTitle>
                <CardDescription>
                  Bergabung sebagai agen penyalur pinjaman cryptocurrency dengan
                  komisi menarik
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Komisi hingga 8%
                  </span>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Crypto Training
                  </span>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    24/7 Support
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">
                  Mitra Teknologi Blockchain
                </CardTitle>
                <CardDescription>
                  Integrasikan sistem Anda dengan platform blockchain crypto
                  lending kami
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Blockchain API
                  </span>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Smart Contract
                  </span>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    DeFi Integration
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">
                  Mitra Liquidity Provider
                </CardTitle>
                <CardDescription>
                  Menyediakan likuiditas cryptocurrency untuk portfolio lending
                  berkualitas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Yield hingga 15%
                  </span>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Multi-Asset Support
                  </span>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Risk Management
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Form Info */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Mari Berkolaborasi
              </h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Isi formulir di bawah ini untuk memulai kemitraan strategis
                dalam dunia crypto lending
              </p>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">
                        partnership@dingdong.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-muted-foreground">+62 21 1234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-muted-foreground">+62 812 3456 7890</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="companyName">Nama Perusahaan *</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="mt-2"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="contactPerson">Nama Kontak *</Label>
                        <Input
                          id="contactPerson"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleInputChange}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Nomor Telepon *</Label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessType">Jenis Bisnis *</Label>
                        <Select
                          onValueChange={(value) =>
                            handleSelectChange("businessType", value)
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Pilih Jenis Bisnis" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="crypto-exchange">
                              Crypto Exchange
                            </SelectItem>
                            <SelectItem value="defi-protocol">
                              DeFi Protocol
                            </SelectItem>
                            <SelectItem value="blockchain-startup">
                              Blockchain Startup
                            </SelectItem>
                            <SelectItem value="fintech">Fintech</SelectItem>
                            <SelectItem value="crypto-fund">
                              Crypto Fund
                            </SelectItem>
                            <SelectItem value="other">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="cryptoLoanAmount">
                          Estimasi Nilai Pinjaman Kripto
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleSelectChange("cryptoLoanAmount", value)
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Pilih Range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-1-5m">
                              {" "}
                              Rp1.500.000.000
                            </SelectItem>
                            <SelectItem value="1-5m-7-5m">
                              Rp1.500.000.000 - Rp7.500.000.000
                            </SelectItem>
                            <SelectItem value="7-5m-15m">
                              Rp7.500.000.000 - Rp15.000.000.000
                            </SelectItem>
                            <SelectItem value="15m-75m">
                              Rp15.000.000.000 - Rp75.000.000.000
                            </SelectItem>
                            <SelectItem value="over-75m">
                              {" "}
                              Rp75.000.000.000
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="partnershipType">
                          Jenis Kemitraan *
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleSelectChange("partnershipType", value)
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Pilih Jenis Kemitraan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="crypto-distributor">
                              Mitra Penyalur Kripto
                            </SelectItem>
                            <SelectItem value="blockchain-technology">
                              Mitra Teknologi Blockchain
                            </SelectItem>
                            <SelectItem value="liquidity-provider">
                              Liquidity Provider
                            </SelectItem>
                            <SelectItem value="institutional-client">
                              Institutional Client
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Pesan Tambahan</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Ceritakan lebih detail tentang rencana kemitraan crypto lending Anda..."
                        className="mt-2"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-white"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        "Kirim Aplikasi Kemitraan"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mengapa Bermitra dengan Kami?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Keunggulan yang membuat kami menjadi pilihan terbaik untuk
              kemitraan
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bitcoin className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Crypto Lending Expert</CardTitle>
                <CardDescription>
                  Pengalaman mendalam dalam cryptocurrency lending dengan track
                  record terpercaya
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Keamanan Blockchain</CardTitle>
                <CardDescription>
                  Teknologi blockchain terdepan untuk keamanan dan transparansi
                  dalam setiap transaksi
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Yield Kompetitif</CardTitle>
                <CardDescription>
                  Tingkat pengembalian yang kompetitif dalam industri crypto
                  lending
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Multi-Chain Support</CardTitle>
                <CardDescription>
                  Dukungan untuk berbagai blockchain dan cryptocurrency populer
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partner;
