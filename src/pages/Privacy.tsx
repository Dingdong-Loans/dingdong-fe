import { Link } from "react-router-dom";
import { useState } from "react";
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
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const [language, setLanguage] = useState<"id" | "en">("id");

  const toggleLanguage = () => {
    setLanguage(language === "id" ? "en" : "id");
  };

  const content = {
    id: {
      title: "Kebijakan Privasi",
      subtitle: "Perlindungan data pribadi sesuai dengan hukum Indonesia",
      lastUpdated: "Terakhir diperbarui:",
      backButton: "Kembali",
      tableOfContents: "Daftar Isi",
      sections: [
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
        {
          id: "cookies",
          title: "9. Cookies dan Teknologi Pelacakan",
          icon: Globe,
        },
        {
          id: "transfer",
          title: "10. Transfer Data Lintas Negara",
          icon: Globe,
        },
        { id: "changes", title: "11. Perubahan Kebijakan", icon: FileText },
        { id: "contact", title: "12. Kontak", icon: Phone },
        { id: "complaints", title: "13. Pengaduan", icon: FileText },
      ],
      sectionContent: {
        introduction: {
          title: "1. Pendahuluan",
          content:
            'PT Brix Blockchain Solution, selaku pemilik hak atas nama dagang Dingdong Loans ("Dingdong Loans", "kami", "kita") berkomitmen untuk melindungi privasi dan data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda sesuai dengan Undang-Undang Perlindungan Data Pribadi (UU PDP) No. 27 Tahun 2022 dan peraturan terkait lainnya di Indonesia.',
        },
        dataCollection: {
          title: "2. Data Pribadi yang Kami Kumpulkan",
          generalData: {
            title: "2.1 Data Pribadi Umum",
            items: [
              "Nama lengkap",
              "Nomor Induk Kependudukan (NIK)",
              "Alamat email",
              "Nomor telepon",
              "Alamat tempat tinggal",
              "Tanggal lahir",
              "Jenis kelamin",
            ],
          },
          financialData: {
            title: "2.2 Data Finansial",
            items: [
              "Informasi rekening bank",
              "Riwayat transaksi",
              "Informasi pendapatan",
              "Data crypto wallet",
              "Riwayat kredit",
            ],
          },
          biometricData: {
            title: "2.3 Data Biometrik",
            items: [
              "Foto selfie untuk verifikasi identitas",
              "Foto KTP/dokumen identitas",
            ],
          },
        },
        purpose: {
          title: "3. Tujuan Pengumpulan Data",
          intro: "Kami mengumpulkan data pribadi Anda untuk:",
          items: [
            "Verifikasi identitas dan Know Your Customer (KYC)",
            "Pemrosesan aplikasi pinjaman",
            "Penilaian risiko kredit",
            "Monitoring transaksi untuk mencegah fraud",
            "Komunikasi terkait layanan",
            "Pemenuhan kewajiban hukum dan regulasi",
            "Peningkatan layanan platform",
          ],
        },
        legalBasis: {
          title: "4. Dasar Hukum Pemrosesan",
          intro: "Pemrosesan data pribadi Anda didasarkan pada:",
          items: [
            "Persetujuan eksplisit dari Anda",
            "Pelaksanaan kontrak layanan",
            "Pemenuhan kewajiban hukum",
            "Kepentingan yang sah untuk mencegah fraud",
          ],
        },
        dataSharing: {
          title: "5. Pembagian Data",
          intro: "Kami dapat membagikan data Anda kepada:",
          items: [
            "Penyedia layanan teknologi yang bekerja sama dengan kami",
            "Lembaga keuangan partner",
            "Otoritas regulasi sesuai permintaan resmi",
            "Penyedia layanan KYC dan credit scoring",
            "Auditor eksternal",
          ],
          note: "Semua pihak ketiga terikat perjanjian kerahasiaan dan wajib melindungi data Anda.",
        },
        security: {
          title: "6. Keamanan Data",
          intro: "Kami menerapkan langkah-langkah keamanan meliputi:",
          items: [
            "Enkripsi data end-to-end",
            "Sistem autentikasi multi-faktor",
            "Monitoring keamanan 24/7",
            "Akses terbatas berdasarkan prinsip need-to-know",
            "Audit keamanan berkala",
            "Backup data yang aman",
          ],
        },
        storage: {
          title: "7. Penyimpanan Data",
          content:
            "Data pribadi Anda disimpan di server yang berlokasi di Indonesia dan/atau negara dengan tingkat perlindungan data yang memadai. Data akan disimpan selama periode yang diperlukan untuk memenuhi tujuan pengumpulan atau sesuai ketentuan hukum yang berlaku.",
        },
        rights: {
          title: "8. Hak-Hak Anda",
          intro: "Sesuai UU PDP, Anda memiliki hak untuk:",
          items: [
            "Mengetahui data pribadi yang kami miliki",
            "Mengakses dan memperoleh salinan data pribadi",
            "Memperbarui atau memperbaiki data yang tidak akurat",
            "Menghapus data pribadi dalam kondisi tertentu",
            "Membatasi pemrosesan data",
            "Memindahkan data ke penyedia layanan lain",
            "Menarik persetujuan",
            "Mengajukan keberatan atas pemrosesan",
          ],
        },
        cookies: {
          title: "9. Cookies dan Teknologi Pelacakan",
          content:
            "Kami menggunakan cookies dan teknologi serupa untuk meningkatkan pengalaman pengguna, menganalisis penggunaan platform, dan untuk tujuan keamanan. Anda dapat mengatur preferensi cookies melalui pengaturan browser Anda.",
        },
        transfer: {
          title: "10. Transfer Data Lintas Negara",
          content:
            "Jika kami mentransfer data Anda ke luar Indonesia, kami akan memastikan bahwa negara tujuan memiliki tingkat perlindungan data yang memadai atau menerapkan safeguard yang sesuai sesuai ketentuan UU PDP.",
        },
        changes: {
          title: "11. Perubahan Kebijakan",
          content:
            "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan material akan diberitahukan kepada Anda melalui email atau notifikasi di platform kami.",
        },
        contact: {
          title: "12. Kontak",
          intro:
            "Untuk pertanyaan, keluhan, atau permintaan terkait data pribadi Anda, hubungi:",
          dpoTitle: "Data Protection Officer",
        },
        complaints: {
          title: "13. Pengaduan",
          content:
            "Jika Anda tidak puas dengan penanganan data pribadi Anda, Anda dapat mengajukan pengaduan kepada Kementerian Komunikasi dan Informatika RI atau lembaga pengawas yang berwenang lainnya.",
        },
      },
      footerNotice:
        "Dengan menggunakan layanan Dingdong Loans, Anda menyatakan telah membaca, memahami, dan menyetujui Kebijakan Privasi ini.",
    },
    en: {
      title: "Privacy Policy",
      subtitle: "Personal data protection in accordance with Indonesian law",
      lastUpdated: "Last updated:",
      backButton: "Back",
      tableOfContents: "Table of Contents",
      sections: [
        { id: "introduction", title: "1. Introduction", icon: Globe },
        {
          id: "data-collection",
          title: "2. Personal Data We Collect",
          icon: FileText,
        },
        { id: "purpose", title: "3. Purpose of Data Collection", icon: Users },
        {
          id: "legal-basis",
          title: "4. Legal Basis for Processing",
          icon: Shield,
        },
        { id: "data-sharing", title: "5. Data Sharing", icon: Users },
        { id: "security", title: "6. Data Security", icon: Lock },
        { id: "storage", title: "7. Data Storage", icon: Globe },
        { id: "rights", title: "8. Your Rights", icon: Users },
        {
          id: "cookies",
          title: "9. Cookies and Tracking Technologies",
          icon: Globe,
        },
        {
          id: "transfer",
          title: "10. Cross-Border Data Transfer",
          icon: Globe,
        },
        { id: "changes", title: "11. Policy Changes", icon: FileText },
        { id: "contact", title: "12. Contact", icon: Phone },
        { id: "complaints", title: "13. Complaints", icon: FileText },
      ],
      sectionContent: {
        introduction: {
          title: "1. Introduction",
          content:
            'PT Brix Blockchain Solution, as the owner of the trade name Dingdong Loans ("Dingdong Loans", "we", "us") is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, store, and protect your personal information in accordance with the Personal Data Protection Law (UU PDP) No. 27 of 2022 and other related regulations in Indonesia.',
        },
        dataCollection: {
          title: "2. Personal Data We Collect",
          generalData: {
            title: "2.1 General Personal Data",
            items: [
              "Full name",
              "National Identity Number (NIK)",
              "Email address",
              "Phone number",
              "Home address",
              "Date of birth",
              "Gender",
            ],
          },
          financialData: {
            title: "2.2 Financial Data",
            items: [
              "Bank account information",
              "Transaction history",
              "Income information",
              "Crypto wallet data",
              "Credit history",
            ],
          },
          biometricData: {
            title: "2.3 Biometric Data",
            items: [
              "Selfie photo for identity verification",
              "ID card/identity document photo",
            ],
          },
        },
        purpose: {
          title: "3. Purpose of Data Collection",
          intro: "We collect your personal data for:",
          items: [
            "Identity verification and Know Your Customer (KYC)",
            "Loan application processing",
            "Credit risk assessment",
            "Transaction monitoring to prevent fraud",
            "Service-related communication",
            "Compliance with legal and regulatory obligations",
            "Platform service improvement",
          ],
        },
        legalBasis: {
          title: "4. Legal Basis for Processing",
          intro: "The processing of your personal data is based on:",
          items: [
            "Your explicit consent",
            "Performance of service contract",
            "Compliance with legal obligations",
            "Legitimate interest to prevent fraud",
          ],
        },
        dataSharing: {
          title: "5. Data Sharing",
          intro: "We may share your data with:",
          items: [
            "Technology service providers who work with us",
            "Partner financial institutions",
            "Regulatory authorities upon official request",
            "KYC and credit scoring service providers",
            "External auditors",
          ],
          note: "All third parties are bound by confidentiality agreements and are required to protect your data.",
        },
        security: {
          title: "6. Data Security",
          intro: "We implement security measures including:",
          items: [
            "End-to-end data encryption",
            "Multi-factor authentication system",
            "24/7 security monitoring",
            "Limited access based on need-to-know principle",
            "Regular security audits",
            "Secure data backup",
          ],
        },
        storage: {
          title: "7. Data Storage",
          content:
            "Your personal data is stored on servers located in Indonesia and/or countries with adequate data protection levels. Data will be stored for the period necessary to fulfill the purpose of collection or in accordance with applicable legal provisions.",
        },
        rights: {
          title: "8. Your Rights",
          intro: "In accordance with the PDP Law, you have the right to:",
          items: [
            "Know the personal data we hold",
            "Access and obtain copies of personal data",
            "Update or correct inaccurate data",
            "Delete personal data under certain conditions",
            "Restrict data processing",
            "Transfer data to other service providers",
            "Withdraw consent",
            "Object to processing",
          ],
        },
        cookies: {
          title: "9. Cookies and Tracking Technologies",
          content:
            "We use cookies and similar technologies to improve user experience, analyze platform usage, and for security purposes. You can set your cookie preferences through your browser settings.",
        },
        transfer: {
          title: "10. Cross-Border Data Transfer",
          content:
            "If we transfer your data outside Indonesia, we will ensure that the destination country has an adequate level of data protection or implement appropriate safeguards in accordance with PDP Law provisions.",
        },
        changes: {
          title: "11. Policy Changes",
          content:
            "We may update this Privacy Policy from time to time. Material changes will be notified to you via email or notifications on our platform.",
        },
        contact: {
          title: "12. Contact",
          intro:
            "For questions, complaints, or requests regarding your personal data, contact:",
          dpoTitle: "Data Protection Officer",
        },
        complaints: {
          title: "13. Complaints",
          content:
            "If you are not satisfied with the handling of your personal data, you can file a complaint with the Ministry of Communication and Information Technology of the Republic of Indonesia or other competent supervisory bodies.",
        },
      },
      footerNotice:
        "By using Dingdong Loans services, you declare that you have read, understood, and agreed to this Privacy Policy.",
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const currentContent = content[language];

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
                    {currentContent.tableOfContents}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-1 p-4">
                      {currentContent.sections.map((section) => {
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
              <div className="flex justify-between items-center mb-6">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    {currentContent.backButton}
                  </Link>
                </Button>

                {/* Language Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex items-center gap-2"
                >
                  <Languages className="h-4 w-4" />
                  {language === "id" ? "EN" : "ID"}
                </Button>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">
                  {currentContent.title}
                </h1>
                <p className="text-muted-foreground text-lg mb-4">
                  {currentContent.subtitle}
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>{currentContent.lastUpdated}</strong>{" "}
                  {language === "id" ? "9 Juli 2025" : "July 9, 2025"}
                </div>
              </div>
            </div>

            {/* Introduction */}
            <section id="introduction" className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-blue-500" />
                    {currentContent.sectionContent.introduction.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {currentContent.sectionContent.introduction.content}
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
                    {currentContent.sectionContent.dataCollection.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 bg-blue-50">
                      <h4 className="font-semibold text-blue-600 mb-2">
                        {
                          currentContent.sectionContent.dataCollection
                            .generalData.title
                        }
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {currentContent.sectionContent.dataCollection.generalData.items.map(
                          (item, index) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4 bg-green-50">
                      <h4 className="font-semibold text-green-600 mb-2">
                        {
                          currentContent.sectionContent.dataCollection
                            .financialData.title
                        }
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {currentContent.sectionContent.dataCollection.financialData.items.map(
                          (item, index) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4 bg-purple-50">
                      <h4 className="font-semibold text-purple-600 mb-2">
                        {
                          currentContent.sectionContent.dataCollection
                            .biometricData.title
                        }
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {currentContent.sectionContent.dataCollection.biometricData.items.map(
                          (item, index) => (
                            <li key={index}>{item}</li>
                          )
                        )}
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
                    {currentContent.sectionContent.purpose.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {currentContent.sectionContent.purpose.intro}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {currentContent.sectionContent.purpose.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
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
                    {currentContent.sectionContent.legalBasis.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {currentContent.sectionContent.legalBasis.intro}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {currentContent.sectionContent.legalBasis.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
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
                    {currentContent.sectionContent.dataSharing.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {currentContent.sectionContent.dataSharing.intro}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {currentContent.sectionContent.dataSharing.items.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    {currentContent.sectionContent.dataSharing.note}
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
                    {currentContent.sectionContent.security.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {currentContent.sectionContent.security.intro}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {currentContent.sectionContent.security.items
                        .slice(0, 3)
                        .map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {currentContent.sectionContent.security.items
                        .slice(3)
                        .map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
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
                    {currentContent.sectionContent.storage.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {currentContent.sectionContent.storage.content}
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
                    {currentContent.sectionContent.rights.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {currentContent.sectionContent.rights.intro}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {currentContent.sectionContent.rights.items
                        .slice(0, 4)
                        .map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {currentContent.sectionContent.rights.items
                        .slice(4)
                        .map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
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
                    {currentContent.sectionContent.cookies.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {currentContent.sectionContent.cookies.content}
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
                    {currentContent.sectionContent.transfer.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {currentContent.sectionContent.transfer.content}
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
                    {currentContent.sectionContent.changes.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {currentContent.sectionContent.changes.content}
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
                    {currentContent.sectionContent.contact.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {currentContent.sectionContent.contact.intro}
                  </p>
                  <Card className="bg-muted/50 border-2 border-blue-200">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-4 text-blue-600">
                        {currentContent.sectionContent.contact.dpoTitle}
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
                    {currentContent.sectionContent.complaints.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {currentContent.sectionContent.complaints.content}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Footer Notice */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="text-center py-8">
                <p className="text-sm text-muted-foreground">
                  {currentContent.footerNotice}
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
