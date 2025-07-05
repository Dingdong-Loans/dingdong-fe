
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MessageCircle, Phone, Mail } from "lucide-react";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      title: "Pertanyaan Umum",
      questions: [
        {
          question: "Apa itu Dingdong Loans?",
          answer: "Dingdong Loans adalah platform pinjaman yang memungkinkan UMKM untuk mendapatkan pinjaman dalam bentuk IDRX (stablecoin rupiah) dengan menggunakan aset crypto sebagai jaminan. Platform kami dirancang khusus untuk membantu UMKM mengakses modal dengan mudah dan cepat."
        },
        {
          question: "Apakah Dingdong Loans aman digunakan?",
          answer: "Ya, keamanan adalah prioritas utama kami. Semua transaksi menggunakan teknologi blockchain yang aman, data pengguna dienkripsi, dan kami menerapkan standar keamanan internasional. Platform kami juga mengikuti regulasi yang berlaku di Indonesia."
        },
        {
          question: "Siapa yang bisa menggunakan Dingdong Loans?",
          answer: "Dingdong Loans ditujukan untuk pelaku UMKM (Usaha Mikro, Kecil, dan Menengah) di Indonesia yang memiliki aset crypto dan membutuhkan modal untuk mengembangkan usaha. Anda harus berusia minimal 21 tahun dan memiliki identitas yang valid."
        }
      ]
    },
    {
      title: "Proses Pinjaman",
      questions: [
        {
          question: "Bagaimana cara mengajukan pinjaman?",
          answer: "1) Daftar dan lengkapi verifikasi KYC, 2) Deposit aset crypto sebagai jaminan, 3) Pilih jumlah IDRX yang ingin dipinjam, 4) Konfirmasi syarat dan ketentuan, 5) Terima IDRX di wallet Anda. Proses ini biasanya memakan waktu 1-2 jam setelah verifikasi."
        },
        {
          question: "Berapa lama proses persetujuan pinjaman?",
          answer: "Setelah Anda menyelesaikan KYC dan menyetor jaminan, pinjaman biasanya disetujui dalam 1-2 jam. Untuk pengguna yang sudah terverifikasi, proses bisa lebih cepat, sekitar 15-30 menit."
        },
        {
          question: "Apa syarat minimum untuk mendapatkan pinjaman?",
          answer: "Anda harus memiliki aset crypto senilai minimal Rp 5.000.000 sebagai jaminan, telah menyelesaikan verifikasi KYC, dan memiliki usaha UMKM yang aktif. Rasio jaminan minimum adalah 150% dari nilai pinjaman."
        }
      ]
    },
    {
      title: "Jaminan & Collateral",
      questions: [
        {
          question: "Aset crypto apa saja yang bisa dijadikan jaminan?",
          answer: "Kami menerima Bitcoin (BTC), Ethereum (ETH), Binance Coin (BNB), dan beberapa stablecoin utama seperti USDT dan USDC. Daftar lengkap aset yang diterima dapat dilihat di halaman Apply for Loan."
        },
        {
          question: "Berapa rasio jaminan yang diperlukan?",
          answer: "Rasio jaminan minimum adalah 150%, artinya jika Anda ingin meminjam IDRX senilai Rp 10.000.000, Anda harus menyetor crypto senilai minimal Rp 15.000.000. Rasio ini membantu melindungi dari volatilitas harga crypto."
        },
        {
          question: "Apa yang terjadi jika nilai jaminan turun?",
          answer: "Jika nilai jaminan mendekati batas minimum (130%), Anda akan mendapat notifikasi untuk menambah jaminan. Jika rasio turun di bawah 120%, sebagian jaminan mungkin akan dilikuidasi otomatis untuk melunasi pinjaman."
        }
      ]
    },
    {
      title: "Pembayaran & Bunga",
      questions: [
        {
          question: "Berapa suku bunga pinjaman?",
          answer: "Suku bunga bervariasi mulai dari 8% hingga 15% per tahun, tergantung pada jumlah pinjaman, jenis jaminan, dan durasi pinjaman. Bunga dihitung secara harian dan dapat dilunasi kapan saja tanpa penalti."
        },
        {
          question: "Bagaimana cara melunasi pinjaman?",
          answer: "Anda dapat melunasi pinjaman melalui dashboard dengan mentransfer IDRX ke alamat yang disediakan. Pelunasan dapat dilakukan sebagian atau seluruhnya. Setelah pelunasan penuh, jaminan akan dikembalikan ke wallet Anda."
        },
        {
          question: "Apakah ada biaya tambahan?",
          answer: "Tidak ada biaya tersembunyi. Kami hanya mengenakan bunga sesuai yang tertera dan biaya gas blockchain yang minimal untuk transaksi. Semua biaya akan dijelaskan secara transparan sebelum Anda mengkonfirmasi pinjaman."
        }
      ]
    },
    {
      title: "Akun & Verifikasi KYC",
      questions: [
        {
          question: "Dokumen apa saja yang diperlukan untuk KYC?",
          answer: "Anda memerlukan: KTP yang masih berlaku, foto selfie dengan KTP, informasi usaha UMKM, dan opsional NPWP atau surat izin usaha. Semua dokumen harus jelas dan mudah dibaca."
        },
        {
          question: "Berapa lama proses verifikasi KYC?",
          answer: "Proses verifikasi KYC biasanya memakan waktu 1-2 hari kerja setelah Anda mengirimkan semua dokumen yang diperlukan. Kami akan mengirim notifikasi email setelah verifikasi selesai."
        },
        {
          question: "Apakah data pribadi saya aman?",
          answer: "Absolut. Semua data pribadi dienkripsi dan disimpan sesuai standar keamanan internasional. Kami tidak akan membagikan data Anda kepada pihak ketiga tanpa persetujuan eksplisit dari Anda."
        }
      ]
    },
    {
      title: "Keamanan",
      questions: [
        {
          question: "Bagaimana Dingdong Loans melindungi aset saya?",
          answer: "Aset crypto Anda disimpan dalam multi-signature wallet yang aman, dengan sebagian besar dana disimpan dalam cold storage. Kami menggunakan protokol keamanan tingkat enterprise dan audit rutin oleh pihak ketiga."
        },
        {
          question: "Apa yang harus dilakukan jika lupa password?",
          answer: "Gunakan fitur 'Lupa Password' di halaman login. Kami akan mengirimkan link reset ke email terdaftar Anda. Pastikan untuk menggunakan password yang kuat dan aktifkan two-factor authentication (2FA) untuk keamanan tambahan."
        },
        {
          question: "Apakah ada asuransi untuk dana yang disimpan?",
          answer: "Ya, kami bekerja sama dengan penyedia asuransi untuk melindungi sebagian dana pengguna dari risiko teknis dan keamanan. Detail lengkap tentang cakupan asuransi dapat dilihat di Syarat & Ketentuan."
        }
      ]
    }
  ];

  const filteredFAQ = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Temukan jawaban untuk pertanyaan yang paling sering ditanyakan tentang Dingdong Loans. 
            Jika Anda tidak menemukan jawaban yang dicari, jangan ragu untuk menghubungi tim support kami.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari pertanyaan atau kata kunci..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQ.length > 0 ? (
            filteredFAQ.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`${categoryIndex}-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tidak ada hasil yang ditemukan</h3>
                <p className="text-muted-foreground">
                  Coba gunakan kata kunci yang berbeda atau hubungi tim support kami.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Support Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Masih Ada Pertanyaan?</CardTitle>
              <CardDescription>
                Tim support kami siap membantu Anda 24/7
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Live Chat</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Chat langsung dengan tim support
                  </p>
                  <Button variant="outline" size="sm">
                    Mulai Chat
                  </Button>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">WhatsApp</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    +62 812-3456-7890
                  </p>
                  <Button variant="outline" size="sm">
                    Hubungi WhatsApp
                  </Button>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    support@dingdongloans.com
                  </p>
                  <Button variant="outline" size="sm">
                    Kirim Email
                  </Button>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-muted-foreground">
                  <strong>Jam Operasional:</strong> Senin - Minggu, 24 jam | 
                  <strong> Response Time:</strong> Maksimal 2 jam
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
