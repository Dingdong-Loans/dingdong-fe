import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageCircle, Phone, Mail } from "lucide-react";

const FAQ = () => {
  const mainFaqs = [
    {
      question: "Apa itu Dingdong Loans?",
      answer: "Dingdong Loans adalah platform pinjaman yang memungkinkan UMKM untuk mendapatkan pinjaman dalam bentuk IDRX (stablecoin rupiah) dengan menggunakan aset crypto sebagai jaminan. Platform kami dirancang khusus untuk membantu UMKM mengakses modal dengan mudah dan cepat."
    },
    {
      question: "Bagaimana cara kerja platform ini?",
      answer: "Prosesnya sederhana: 1) Anda menyetorkan aset crypto (seperti Bitcoin atau Ethereum) sebagai jaminan. 2) Anda dapat langsung mengajukan pinjaman IDRX hingga batas tertentu dari nilai jaminan Anda. 3) Setelah pinjaman dilunasi, jaminan crypto Anda dapat ditarik kembali sepenuhnya."
    },
    {
      question: "Apakah platform ini aman digunakan?",
      answer: "Tentu. Keamanan adalah prioritas utama kami. Kami menggunakan teknologi multi-signature wallet untuk menyimpan aset, enkripsi data standar industri, dan melakukan audit keamanan secara berkala oleh pihak ketiga untuk memastikan dana dan data Anda selalu aman."
    },
    {
      question: "Aset crypto apa saja yang bisa dijadikan jaminan?",
      answer: "Saat ini kami menerima aset kripto utama seperti Bitcoin (BTC) dan Ethereum (ETH). Kami berencana untuk terus menambah daftar aset yang diterima di masa mendatang. Pantau terus pengumuman kami untuk informasi terbaru."
    },
    {
      question: "Berapa suku bunga dan biaya yang dikenakan?",
      answer: "Kami menawarkan suku bunga yang kompetitif dan transparan, mulai dari 8% per tahun. Tidak ada biaya tersembunyi. Semua biaya, termasuk bunga dan potensi biaya likuidasi, akan ditampilkan dengan jelas sebelum Anda menyetujui pinjaman."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        {/* Header Section - Diperbaiki agar tidak tumpang tindih */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-muted-foreground dark:text-white/10 select-none">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-2">
            Temukan jawaban untuk pertanyaan yang paling sering ditanyakan tentang Dingdong Loans.
          </p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {mainFaqs.map((faq, index) => (
              /* Perubahan 2: Menambahkan kelas Tailwind untuk mengubah border saat item akordion terbuka.
                 - `data-[state=open]:border-primary` akan mengubah warna border menjadi warna primer.
                 - `data-[state=open]:border-2` akan membuat border sedikit lebih tebal agar lebih terlihat.
                 - `transition-colors` ditambahkan untuk memberikan efek transisi yang halus. */
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b-0 rounded-lg bg-white shadow-sm border border-gray-200/80 transition-colors data-[state=open]:border-primary data-[state=open]:border-2"
              >
                {/* Perubahan 1: Menghapus `data-[state=open]:text-primary` agar warna teks tidak berubah saat dibuka. */}
                <AccordionTrigger className="p-6 text-left font-semibold text-base hover:no-underline data-[state=open]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-0 px-6 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support Section */}
        <div className="max-w-4xl mx-auto mt-24">
          <Card className="bg-foreground text-background">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Masih Ada Pertanyaan?</CardTitle>
              <CardDescription className="text-background/80">
                Tim support kami siap membantu Anda 24/7
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Live Chat</h4>
                  <p className="text-sm text-background/70 mb-3">
                    Chat langsung dengan tim support
                  </p>
                  <Button variant="secondary" size="sm">
                    Mulai Chat
                  </Button>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">WhatsApp</h4>
                  <p className="text-sm text-background/70 mb-3">
                    +62 812-3456-7890
                  </p>
                  <Button variant="secondary" size="sm">
                    Hubungi WhatsApp
                  </Button>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-sm text-background/70 mb-3">
                    support@dingdongloans.com
                  </p>
                  <Button variant="secondary" size="sm">
                    Kirim Email
                  </Button>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-background/70">
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