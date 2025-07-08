import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Download,
  BookOpen,
  Shield,
  AlertTriangle,
  Users,
  Gavel,
  Globe,
  FileText,
  CheckCircle,
  Languages,
  Eye,
  Scale,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const TermsAndGuidelines = () => {
  const [language, setLanguage] = useState<"id" | "en">("id");

  const content = {
    id: {
      title: "Syarat & Ketentuan Layanan",
      subtitle: "Ketentuan Penggunaan Platform Dingdong Loans",
      description:
        "Dokumen syarat dan ketentuan lengkap yang mengatur penggunaan platform lending terdesentralisasi Dingdong Loans sesuai dengan hukum Indonesia.",
      downloadPdf: "Download PDF",
      lastUpdated:
        "Terakhir Diperbarui: 9 Juli 2025 | Berlaku Efektif: 1 Januari 2025",
      tableOfContents: "Daftar Isi",
      riskWarning: "PERINGATAN RISIKO TINGGI",
      riskWarningDesc:
        "Platform ini melibatkan risiko tinggi kehilangan dana. Baca dan pahami semua risiko sebelum menggunakan layanan.",
      sections: [
        {
          id: "definitions",
          title: "1. Definisi dan Interpretasi",
          icon: BookOpen,
        },
        {
          id: "acceptance",
          title: "2. Penerimaan Ketentuan",
          icon: CheckCircle,
        },
        { id: "services", title: "3. Layanan Platform", icon: Globe },
        { id: "eligibility", title: "4. Kelayakan Pengguna", icon: Users },
        { id: "kyc", title: "5. Verifikasi Identitas (KYC)", icon: Eye },
        { id: "risks", title: "6. Pengakuan Risiko", icon: AlertTriangle },
        { id: "liquidation", title: "7. Proses Likuidasi", icon: XCircle },
        {
          id: "liability",
          title: "8. Pembatasan Tanggung Jawab",
          icon: Shield,
        },
        { id: "indonesian_law", title: "9. Hukum Indonesia", icon: Scale },
        { id: "dispute", title: "10. Penyelesaian Sengketa", icon: Gavel },
        { id: "termination", title: "11. Penghentian Layanan", icon: FileText },
        {
          id: "amendments",
          title: "12. Perubahan Ketentuan",
          icon: AlertCircle,
        },
      ],
      definitions: {
        title: "1. Definisi dan Interpretasi",
        content: [
          {
            term: "Platform",
            definition:
              "Aplikasi dan layanan Dingdong Loans yang menyediakan protokol lending terdesentralisasi berbasis blockchain.",
          },
          {
            term: "Pengguna",
            definition:
              "Setiap individu atau badan hukum yang menggunakan layanan Platform, termasuk Peminjam dan Pemberi Pinjaman.",
          },
          {
            term: "Peminjam",
            definition:
              "Pengguna yang mengajukan pinjaman dengan menyerahkan aset kripto sebagai jaminan (collateral).",
          },
          {
            term: "Collateral/Jaminan",
            definition:
              "Aset cryptocurrency yang diserahkan sebagai jaminan untuk mendapatkan pinjaman IDRX.",
          },
          {
            term: "IDRX",
            definition:
              "Token digital yang dipatok dengan nilai Rupiah Indonesia (IDR) yang digunakan sebagai mata uang pinjaman.",
          },
          {
            term: "LTV (Loan-to-Value)",
            definition:
              "Rasio nilai pinjaman terhadap nilai jaminan yang ditetapkan maksimal 66.7%.",
          },
          {
            term: "Health Factor",
            definition:
              "Indikator kesehatan pinjaman yang dihitung berdasarkan nilai collateral terhadap outstanding loan.",
          },
          {
            term: "Likuidasi",
            definition:
              "Proses otomatis penjualan collateral ketika Health Factor turun di bawah batas minimum (1.2).",
          },
        ],
      },
      acceptance: {
        title: "2. Penerimaan Ketentuan",
        content: [
          "Dengan mengakses atau menggunakan Platform Dingdong Loans, Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat dengan seluruh ketentuan dalam dokumen ini.",
          "Anda mengonfirmasi bahwa Anda memiliki kapasitas hukum penuh untuk mengikatkan diri dalam perjanjian ini sesuai dengan hukum Indonesia.",
          "Jika Anda tidak menyetujui ketentuan ini, Anda tidak diperkenankan menggunakan Platform.",
          "Penggunaan Platform setelah perubahan ketentuan dianggap sebagai persetujuan terhadap ketentuan yang telah diubah.",
        ],
      },
      services: {
        title: "3. Layanan Platform",
        content: [
          "Platform menyediakan infrastruktur teknologi untuk memfasilitasi pinjaman peer-to-peer berbasis smart contract.",
          "Layanan termasuk namun tidak terbatas pada: pengelolaan collateral, eksekusi smart contract, monitoring health factor, dan proses likuidasi otomatis.",
          "Platform BUKAN bank atau lembaga keuangan dan TIDAK menyediakan layanan perbankan.",
          "Platform berperan sebagai fasilitator teknologi dan TIDAK memberikan nasihat keuangan atau investasi.",
        ],
      },
      eligibility: {
        title: "4. Kelayakan Pengguna",
        content: [
          "Berusia minimal 21 tahun dan maksimal 65 tahun",
          "Warga Negara Indonesia (WNI) dengan KTP yang valid",
          "Memiliki rekening bank Indonesia yang aktif",
          "Pemilik usaha mikro, kecil, atau menengah (UMKM) yang terdaftar",
          "Tidak tercantum dalam daftar hitam BI/OJK atau sanctions list internasional",
          "Memiliki akses internet yang stabil dan wallet cryptocurrency yang kompatibel",
          "Tidak sedang dalam proses pailit atau memiliki catatan kredit macet",
        ],
      },
      kyc: {
        title: "5. Verifikasi Identitas (KYC)",
        content: [
          "Semua Pengguna wajib menyelesaikan proses Know Your Customer (KYC) sesuai dengan Peraturan Bank Indonesia No. 18/40/PBI/2016 tentang Penyelenggaraan Pemrosesan Transaksi Pembayaran.",
          "Dokumen yang diperlukan: KTP asli, foto selfie dengan KTP, NPWP (jika ada), dan dokumen usaha.",
          "Platform berhak meminta dokumen tambahan untuk verifikasi lebih lanjut.",
          "Informasi palsu atau menyesatkan akan mengakibatkan penutupan akun permanen.",
          "Data pribadi akan diproses sesuai dengan UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.",
        ],
      },
      risks: {
        title: "6. PENGAKUAN RISIKO",
        isHighRisk: true,
        content: [
          {
            subtitle: "6.1 Risiko Volatilitas Harga",
            points: [
              "Harga cryptocurrency sangat volatil dan dapat berubah drastis dalam waktu singkat",
              "Penurunan nilai collateral dapat memicu likuidasi otomatis",
              "Pengguna dapat kehilangan seluruh atau sebagian besar collateral yang disetor",
            ],
          },
          {
            subtitle: "6.2 Risiko Likuidasi",
            points: [
              "Likuidasi terjadi secara OTOMATIS ketika Health Factor < 1.2",
              "Proses likuidasi TIDAK DAPAT DIBATALKAN atau DIHENTIKAN",
              "Pengguna mungkin tidak memiliki waktu untuk menambah collateral saat market crash",
              "Slippage dan biaya gas dapat mengurangi nilai collateral yang dikembalikan",
            ],
          },
          {
            subtitle: "6.3 Risiko Teknologi",
            points: [
              "Smart contract dapat mengalami bug atau kerentanan keamanan",
              "Gangguan jaringan blockchain dapat mempengaruhi operasi Platform",
              "Risiko hacking atau serangan siber terhadap Platform atau wallet Pengguna",
            ],
          },
          {
            subtitle: "6.4 Risiko Regulasi",
            points: [
              "Perubahan regulasi cryptocurrency di Indonesia dapat mempengaruhi operasi Platform",
              "Platform dapat dihentikan atau dibatasi oleh otoritas regulasi",
              "Status legal cryptocurrency dapat berubah sewaktu-waktu",
            ],
          },
        ],
      },
      liquidation: {
        title: "7. Proses Likuidasi",
        isHighRisk: true,
        content: [
          {
            subtitle: "7.1 Kondisi Likuidasi",
            points: [
              "Likuidasi dipicu secara otomatis ketika Health Factor turun di bawah 1.2",
              "Perhitungan Health Factor menggunakan harga real-time dari oracle yang terintegrasi",
              "Tidak ada grace period atau pemberitahuan sebelum likuidasi",
            ],
          },
          {
            subtitle: "7.2 Proses Likuidasi",
            points: [
              "Smart contract akan menjual collateral secara otomatis di pasar terbuka",
              "Hasil penjualan digunakan untuk melunasi outstanding loan dan bunga",
              "Sisa hasil penjualan (jika ada) akan dikembalikan ke Pengguna",
              "Proses likuidasi dapat memakan waktu beberapa menit hingga jam tergantung kondisi pasar",
            ],
          },
          {
            subtitle: "7.3 Biaya Likuidasi",
            points: [
              "Biaya gas dan slippage trading akan dipotong dari hasil likuidasi",
              "Platform mengenakan biaya likuidasi sebesar 5% dari nilai collateral",
              "Pengguna bertanggung jawab atas semua biaya yang timbul",
            ],
          },
        ],
      },
      liability: {
        title: "8. PEMBATASAN TANGGUNG JAWAB",
        isHighRisk: true,
        content: [
          {
            subtitle: "8.1 Pengecualian Tanggung Jawab Platform",
            points: [
              "Platform TIDAK bertanggung jawab atas kerugian akibat likuidasi collateral",
              "Platform TIDAK bertanggung jawab atas fluktuasi harga cryptocurrency",
              "Platform TIDAK menjamin keuntungan atau hasil investasi tertentu",
              "Platform TIDAK bertanggung jawab atas gangguan teknis atau force majeure",
            ],
          },
          {
            subtitle: "8.2 Batasan Ganti Rugi",
            points: [
              "Ganti rugi maksimal Platform terbatas pada biaya layanan yang dibayar Pengguna",
              "Platform tidak bertanggung jawab atas kerugian tidak langsung atau konsekuensial",
              "Klaim ganti rugi harus diajukan dalam waktu 30 hari sejak kejadian",
            ],
          },
          {
            subtitle: "8.3 Tanggung Jawab Pengguna",
            points: [
              "Pengguna bertanggung jawab penuh atas keputusan investasi dan trading",
              "Pengguna wajib memahami risiko sebelum menggunakan Platform",
              "Pengguna bertanggung jawab atas keamanan wallet dan private key mereka",
            ],
          },
        ],
      },
      indonesian_law: {
        title: "9. Kepatuhan Hukum Indonesia",
        content: [
          {
            subtitle: "9.1 Regulasi Yang Berlaku",
            references: [
              "UU No. 19 Tahun 2016 tentang Informasi dan Transaksi Elektronik",
              "Peraturan Bank Indonesia No. 18/40/PBI/2016 tentang Penyelenggaraan Pemrosesan Transaksi Pembayaran",
              "Peraturan Bappebti No. 5 Tahun 2019 tentang Ketentuan Teknis Penyelenggaraan Pasar Fisik Aset Kripto",
              "UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi",
              "POJK No. 77/POJK.01/2016 tentang Layanan Pinjam Meminjam Uang Berbasis Teknologi Informasi",
            ],
          },
          {
            subtitle: "9.2 Kepatuhan Anti Pencucian Uang",
            points: [
              "Platform menerapkan kebijakan AML/CFT sesuai dengan Peraturan Bank Indonesia",
              "Transaksi yang mencurigakan akan dilaporkan kepada PPATK",
              "Platform berhak membekukan akun yang diduga terlibat aktivitas ilegal",
            ],
          },
          {
            subtitle: "9.3 Pajak",
            points: [
              "Pengguna bertanggung jawab atas kewajiban pajak yang timbul dari penggunaan Platform",
              "Keuntungan dari trading cryptocurrency dikenakan PPh sesuai ketentuan Dirjen Pajak",
              "Platform dapat memberikan laporan transaksi kepada otoritas pajak jika diminta",
            ],
          },
        ],
      },
      dispute: {
        title: "10. Penyelesaian Sengketa",
        content: [
          "Setiap sengketa yang timbul akan diselesaikan melalui musyawarah mufakat terlebih dahulu.",
          "Jika musyawarah tidak mencapai kesepakatan, sengketa akan diselesaikan melalui arbitrase di Badan Arbitrase Nasional Indonesia (BANI) di Jakarta.",
          "Putusan arbitrase bersifat final dan mengikat para pihak.",
          "Hukum yang berlaku adalah hukum Republik Indonesia.",
          "Yurisdiksi pengadilan untuk hal-hal di luar arbitrase adalah Pengadilan Negeri Jakarta Selatan.",
        ],
      },
      termination: {
        title: "11. Penghentian Layanan",
        content: [
          "Platform dapat menghentikan layanan kepada Pengguna yang melanggar ketentuan ini.",
          "Pengguna dapat menghentikan penggunaan Platform dengan melunasi seluruh kewajiban terlebih dahulu.",
          "Platform berhak menghentikan operasi dengan pemberitahuan 30 hari sebelumnya.",
          "Dalam hal penghentian operasi, Pengguna wajib melunasi pinjaman atau mengambil collateral sebelum tanggal penutupan.",
        ],
      },
      amendments: {
        title: "12. Perubahan Ketentuan",
        content: [
          "Platform berhak mengubah ketentuan ini sewaktu-waktu dengan pemberitahuan melalui Platform atau email.",
          "Perubahan berlaku efektif 7 hari setelah pemberitahuan.",
          "Penggunaan Platform setelah perubahan dianggap sebagai persetujuan terhadap ketentuan baru.",
          "Jika tidak menyetujui perubahan, Pengguna dapat menghentikan penggunaan Platform.",
        ],
      },
    },
    en: {
      title: "Terms & Conditions of Service",
      subtitle: "Terms of Use for Dingdong Loans Platform",
      description:
        "Complete terms and conditions document governing the use of Dingdong Loans decentralized lending platform in accordance with Indonesian law.",
      downloadPdf: "Download PDF",
      lastUpdated:
        "Last Updated: July 9, 2025 | Effective Date: January 1, 2025",
      tableOfContents: "Table of Contents",
      riskWarning: "HIGH RISK WARNING",
      riskWarningDesc:
        "This platform involves high risk of fund loss. Read and understand all risks before using the service.",
      sections: [
        {
          id: "definitions",
          title: "1. Definitions and Interpretation",
          icon: BookOpen,
        },
        {
          id: "acceptance",
          title: "2. Acceptance of Terms",
          icon: CheckCircle,
        },
        { id: "services", title: "3. Platform Services", icon: Globe },
        { id: "eligibility", title: "4. User Eligibility", icon: Users },
        { id: "kyc", title: "5. Identity Verification (KYC)", icon: Eye },
        { id: "risks", title: "6. Risk Acknowledgment", icon: AlertTriangle },
        { id: "liquidation", title: "7. Liquidation Process", icon: XCircle },
        { id: "liability", title: "8. Limitation of Liability", icon: Shield },
        {
          id: "indonesian_law",
          title: "9. Indonesian Law Compliance",
          icon: Scale,
        },
        { id: "dispute", title: "10. Dispute Resolution", icon: Gavel },
        { id: "termination", title: "11. Service Termination", icon: FileText },
        { id: "amendments", title: "12. Terms Amendments", icon: AlertCircle },
      ],
      definitions: {
        title: "1. Definitions and Interpretation",
        content: [
          {
            term: "Platform",
            definition:
              "Dingdong Loans application and services providing decentralized lending protocol based on blockchain technology.",
          },
          {
            term: "User",
            definition:
              "Any individual or legal entity using Platform services, including Borrowers and Lenders.",
          },
          {
            term: "Borrower",
            definition:
              "User who applies for loans by providing cryptocurrency assets as collateral.",
          },
          {
            term: "Collateral",
            definition:
              "Cryptocurrency assets provided as security to obtain IDRX loans.",
          },
          {
            term: "IDRX",
            definition:
              "Digital token pegged to Indonesian Rupiah (IDR) value used as loan currency.",
          },
          {
            term: "LTV (Loan-to-Value)",
            definition:
              "Ratio of loan value to collateral value set at maximum 66.7%.",
          },
          {
            term: "Health Factor",
            definition:
              "Loan health indicator calculated based on collateral value against outstanding loan.",
          },
          {
            term: "Liquidation",
            definition:
              "Automatic process of selling collateral when Health Factor drops below minimum threshold (1.2).",
          },
        ],
      },
      acceptance: {
        title: "2. Acceptance of Terms",
        content: [
          "By accessing or using the Dingdong Loans Platform, you acknowledge that you have read, understood, and agree to be bound by all terms in this document.",
          "You confirm that you have full legal capacity to enter into this agreement under Indonesian law.",
          "If you do not agree to these terms, you are not permitted to use the Platform.",
          "Use of the Platform after changes to terms is considered acceptance of the modified terms.",
        ],
      },
      services: {
        title: "3. Platform Services",
        content: [
          "The Platform provides technological infrastructure to facilitate peer-to-peer lending based on smart contracts.",
          "Services include but are not limited to: collateral management, smart contract execution, health factor monitoring, and automatic liquidation processes.",
          "The Platform is NOT a bank or financial institution and does NOT provide banking services.",
          "The Platform acts as a technology facilitator and does NOT provide financial or investment advice.",
        ],
      },
      eligibility: {
        title: "4. User Eligibility",
        content: [
          "Must be between 21 and 65 years of age",
          "Indonesian citizen (WNI) with valid ID card",
          "Must have an active Indonesian bank account",
          "Owner of registered micro, small, or medium enterprise (UMKM)",
          "Not listed in BI/OJK blacklist or international sanctions list",
          "Must have stable internet access and compatible cryptocurrency wallet",
          "Not in bankruptcy proceedings or have bad credit history",
        ],
      },
      kyc: {
        title: "5. Identity Verification (KYC)",
        content: [
          "All Users must complete Know Your Customer (KYC) process in accordance with Bank Indonesia Regulation No. 18/40/PBI/2016 on Payment Transaction Processing Services.",
          "Required documents: original ID card, selfie photo with ID, NPWP (if available), and business documents.",
          "Platform reserves the right to request additional documents for further verification.",
          "False or misleading information will result in permanent account closure.",
          "Personal data will be processed in accordance with Law No. 27 of 2022 on Personal Data Protection.",
        ],
      },
      risks: {
        title: "6. RISK ACKNOWLEDGMENT",
        isHighRisk: true,
        content: [
          {
            subtitle: "6.1 Price Volatility Risk",
            points: [
              "Cryptocurrency prices are highly volatile and can change drastically in short periods",
              "Decline in collateral value can trigger automatic liquidation",
              "Users may lose all or most of their deposited collateral",
            ],
          },
          {
            subtitle: "6.2 Liquidation Risk",
            points: [
              "Liquidation occurs AUTOMATICALLY when Health Factor < 1.2",
              "Liquidation process CANNOT BE CANCELLED or STOPPED",
              "Users may not have time to add collateral during market crashes",
              "Slippage and gas fees may reduce returned collateral value",
            ],
          },
          {
            subtitle: "6.3 Technology Risk",
            points: [
              "Smart contracts may experience bugs or security vulnerabilities",
              "Blockchain network disruptions may affect Platform operations",
              "Risk of hacking or cyber attacks on Platform or User wallets",
            ],
          },
          {
            subtitle: "6.4 Regulatory Risk",
            points: [
              "Changes in cryptocurrency regulations in Indonesia may affect Platform operations",
              "Platform may be suspended or restricted by regulatory authorities",
              "Legal status of cryptocurrency may change at any time",
            ],
          },
        ],
      },
      liquidation: {
        title: "7. Liquidation Process",
        isHighRisk: true,
        content: [
          {
            subtitle: "7.1 Liquidation Conditions",
            points: [
              "Liquidation is triggered automatically when Health Factor drops below 1.2",
              "Health Factor calculation uses real-time prices from integrated oracles",
              "No grace period or notification before liquidation",
            ],
          },
          {
            subtitle: "7.2 Liquidation Process",
            points: [
              "Smart contract will automatically sell collateral in open market",
              "Sale proceeds used to pay outstanding loan and interest",
              "Remaining proceeds (if any) will be returned to User",
              "Liquidation process may take several minutes to hours depending on market conditions",
            ],
          },
          {
            subtitle: "7.3 Liquidation Fees",
            points: [
              "Gas fees and trading slippage will be deducted from liquidation proceeds",
              "Platform charges 5% liquidation fee from collateral value",
              "Users are responsible for all arising costs",
            ],
          },
        ],
      },
      liability: {
        title: "8. LIMITATION OF LIABILITY",
        isHighRisk: true,
        content: [
          {
            subtitle: "8.1 Platform Liability Exclusion",
            points: [
              "Platform is NOT responsible for losses due to collateral liquidation",
              "Platform is NOT responsible for cryptocurrency price fluctuations",
              "Platform does NOT guarantee profits or specific investment returns",
              "Platform is NOT responsible for technical disruptions or force majeure",
            ],
          },
          {
            subtitle: "8.2 Damage Limitations",
            points: [
              "Platform's maximum liability is limited to service fees paid by User",
              "Platform is not responsible for indirect or consequential losses",
              "Damage claims must be filed within 30 days of occurrence",
            ],
          },
          {
            subtitle: "8.3 User Responsibility",
            points: [
              "Users are fully responsible for investment and trading decisions",
              "Users must understand risks before using Platform",
              "Users are responsible for wallet and private key security",
            ],
          },
        ],
      },
      indonesian_law: {
        title: "9. Indonesian Law Compliance",
        content: [
          {
            subtitle: "9.1 Applicable Regulations",
            references: [
              "Law No. 19 of 2016 on Electronic Information and Transactions",
              "Bank Indonesia Regulation No. 18/40/PBI/2016 on Payment Transaction Processing Services",
              "Bappebti Regulation No. 5 of 2019 on Technical Provisions for Crypto Asset Physical Market Operations",
              "Law No. 27 of 2022 on Personal Data Protection",
              "POJK No. 77/POJK.01/2016 on Information Technology-Based Money Lending Services",
            ],
          },
          {
            subtitle: "9.2 Anti-Money Laundering Compliance",
            points: [
              "Platform implements AML/CFT policies in accordance with Bank Indonesia Regulations",
              "Suspicious transactions will be reported to PPATK",
              "Platform reserves the right to freeze accounts suspected of illegal activities",
            ],
          },
          {
            subtitle: "9.3 Taxation",
            points: [
              "Users are responsible for tax obligations arising from Platform use",
              "Cryptocurrency trading profits are subject to income tax according to Tax Director General provisions",
              "Platform may provide transaction reports to tax authorities if requested",
            ],
          },
        ],
      },
      dispute: {
        title: "10. Dispute Resolution",
        content: [
          "Any disputes arising will be resolved through deliberation first.",
          "If deliberation does not reach agreement, disputes will be resolved through arbitration at the Indonesian National Arbitration Board (BANI) in Jakarta.",
          "Arbitration decisions are final and binding on the parties.",
          "The applicable law is the law of the Republic of Indonesia.",
          "Court jurisdiction for matters outside arbitration is the South Jakarta District Court.",
        ],
      },
      termination: {
        title: "11. Service Termination",
        content: [
          "Platform may terminate services to Users who violate these terms.",
          "Users may terminate Platform use by settling all obligations first.",
          "Platform reserves the right to cease operations with 30 days prior notice.",
          "In case of operation cessation, Users must settle loans or withdraw collateral before closure date.",
        ],
      },
      amendments: {
        title: "12. Terms Amendments",
        content: [
          "Platform reserves the right to change these terms at any time with notification through Platform or email.",
          "Changes become effective 7 days after notification.",
          "Platform use after changes is considered acceptance of new terms.",
          "If you disagree with changes, you may cease Platform use.",
        ],
      },
    },
  };

  const currentContent = content[language];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-foreground">
                {currentContent.title}
              </h1>
              <Toggle
                pressed={language === "en"}
                onPressedChange={(pressed) =>
                  setLanguage(pressed ? "en" : "id")
                }
                aria-label="Toggle language"
                className="data-[state=on]:bg-blue-600"
              >
                <Languages className="h-4 w-4 mr-2" />
                {language === "id" ? "EN" : "ID"}
              </Toggle>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                {currentContent.downloadPdf}
              </Button>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-4">
            {currentContent.description}
          </p>

          <Badge variant="secondary" className="text-sm">
            {currentContent.lastUpdated}
          </Badge>
        </div>

        {/* High Risk Warning */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              {currentContent.riskWarning}
            </h3>
            <AlertDescription className="text-red-700 text-base">
              {currentContent.riskWarningDesc}
            </AlertDescription>
          </div>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">
                  {currentContent.tableOfContents}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <nav className="space-y-2">
                    {currentContent.sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className="flex items-center gap-3 w-full text-left p-2 rounded-md hover:bg-muted transition-colors text-sm"
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span>{section.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Definitions Section */}
            <section id="definitions" className="scroll-mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {currentContent.definitions.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentContent.definitions.content.map((item, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-200 pl-4"
                    >
                      <h4 className="font-semibold text-blue-800">
                        {item.term}
                      </h4>
                      <p className="text-muted-foreground">{item.definition}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Acceptance Section */}
            <section id="acceptance" className="scroll-mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    {currentContent.acceptance.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentContent.acceptance.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Services Section */}
            <section id="services" className="scroll-mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {currentContent.services.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentContent.services.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Eligibility Section */}
            <section id="eligibility" className="scroll-mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {currentContent.eligibility.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {currentContent.eligibility.content.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* KYC Section */}
            <section id="kyc" className="scroll-mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    {currentContent.kyc.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentContent.kyc.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Risk Acknowledgment Section */}
            <section id="risks" className="scroll-mt-8">
              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <AlertTriangle className="h-5 w-5" />
                    {currentContent.risks.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 mt-6">
                  {currentContent.risks.content.map((section, index) => (
                    <div key={index} className="space-y-3">
                      <h4 className="font-semibold text-red-800">
                        {section.subtitle}
                      </h4>
                      <ul className="space-y-2">
                        {section.points.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="flex items-start gap-3"
                          >
                            <XCircle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Liquidation Section */}
            <section id="liquidation" className="scroll-mt-8">
              <Card className="border-orange-200">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <XCircle className="h-5 w-5" />
                    {currentContent.liquidation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 mt-6">
                  {currentContent.liquidation.content.map((section, index) => (
                    <div key={index} className="space-y-3">
                      <h4 className="font-semibold text-orange-800">
                        {section.subtitle}
                      </h4>
                      <ul className="space-y-2">
                        {section.points.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="flex items-start gap-3"
                          >
                            <AlertCircle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Liability Section */}
            <section id="liability" className="scroll-mt-8">
              <Card className="border-gray-300">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Shield className="h-5 w-5" />
                    {currentContent.liability.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 mt-6">
                  {currentContent.liability.content.map((section, index) => (
                    <div key={index} className="space-y-3">
                      <h4 className="font-semibold text-gray-800">
                        {section.subtitle}
                      </h4>
                      <ul className="space-y-2">
                        {section.points.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="flex items-start gap-3"
                          >
                            <Shield className="h-4 w-4 text-gray-600 mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Indonesian Law Section */}
            <section id="indonesian_law" className="scroll-mt-8">
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Scale className="h-5 w-5" />
                    {currentContent.indonesian_law.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 mt-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-800">
                      {currentContent.indonesian_law.content[0].subtitle}
                    </h4>
                    <ul className="space-y-2">
                      {currentContent.indonesian_law.content[0].references.map(
                        (ref, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Gavel className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground font-medium">
                              {ref}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {currentContent.indonesian_law.content
                    .slice(1)
                    .map((section, index) => (
                      <div key={index} className="space-y-3">
                        <h4 className="font-semibold text-blue-800">
                          {section.subtitle}
                        </h4>
                        <ul className="space-y-2">
                          {section.points.map((point, pointIndex) => (
                            <li
                              key={pointIndex}
                              className="flex items-start gap-3"
                            >
                              <Scale className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </section>

            {/* Dispute Resolution Section */}
            <section id="dispute" className="scroll-mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gavel className="h-5 w-5" />
                    {currentContent.dispute.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentContent.dispute.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Termination Section */}
            <section id="termination" className="scroll-mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {currentContent.termination.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentContent.termination.content.map(
                    (paragraph, index) => (
                      <p
                        key={index}
                        className="text-muted-foreground leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    )
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Amendments Section */}
            <section id="amendments" className="scroll-mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    {currentContent.amendments.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentContent.amendments.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Final Agreement */}
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Persetujuan Akhir:</strong> Dengan menggunakan Platform
                Dingdong Loans, Anda menyatakan telah membaca, memahami, dan
                menyetujui seluruh ketentuan di atas serta mengakui semua risiko
                yang terlibat.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndGuidelines;
