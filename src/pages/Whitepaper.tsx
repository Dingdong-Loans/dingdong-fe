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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Download,
  BookOpen,
  Shield,
  TrendingUp,
  Users,
  Settings,
  Globe,
  ArrowRight,
  CheckCircle,
  Languages,
  Lock,
} from "lucide-react";
import { useState } from "react";

const Whitepaper = () => {
  const [language, setLanguage] = useState<"id" | "en">("id");

  const content = {
    id: {
      title: "Protokol Dingdong Loans",
      subtitle: "Protokol Lending Terdesentralisasi untuk UMKM Indonesia",
      description:
        "Dokumentasi teknis lengkap tentang protokol lending berbasis collateral crypto yang dirancang khusus untuk Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia.",
      downloadPdf: "Download PDF",
      viewOnGithub: "Lihat di GitHub",
      version:
        "Versi 1.0 | Diterbitkan: Desember 2024 | Terakhir Diperbarui: Desember 2024",
      tableOfContents: "Daftar Isi",
      sections: [
        { id: "abstract", title: "Abstrak", icon: BookOpen },
        { id: "introduction", title: "1. Pendahuluan", icon: Globe },
        { id: "problem", title: "2. Permasalahan", icon: TrendingUp },
        { id: "solution", title: "3. Solusi", icon: CheckCircle },
        { id: "architecture", title: "4. Arsitektur Teknis", icon: Settings },
        { id: "kyc", title: "5. Modul KYC/AML", icon: Shield },
        { id: "tokenomics", title: "6. Tokenomics IDRX", icon: TrendingUp },
        { id: "security", title: "7. Kerangka Keamanan", icon: Lock },
        { id: "governance", title: "8. Model Governance", icon: Users },
        { id: "roadmap", title: "9. Roadmap Pengembangan", icon: ArrowRight },
        { id: "conclusion", title: "10. Kesimpulan", icon: CheckCircle },
      ],
      abstract: {
        title: "Abstrak",
        content: [
          "Dingdong Loans memperkenalkan protokol lending terdesentralisasi yang mengatasi gap likuiditas yang dihadapi Usaha Mikro, Kecil, dan Menengah (UMKM) Indonesia yang memiliki aset cryptocurrency. Dengan memungkinkan pinjaman berkolateral crypto dalam IDRX (token yang dipatok ke Rupiah Indonesia), protokol ini memungkinkan UMKM untuk mengakses modal kerja tanpa melikuidasi kepemilikan crypto mereka, sehingga tetap mempertahankan eksposur terhadap potensi apresiasi sambil memenuhi kebutuhan bisnis langsung.",
          "Protokol ini mengimplementasikan sistem manajemen risiko yang robust dengan rasio kolateralisasi dinamis, pricing oracle real-time, dan mekanisme likuidasi otomatis. Dibangun di atas infrastruktur yang kompatibel dengan Ethereum, protokol ini memastikan transparansi, keamanan, dan governance terdesentralisasi sambil tetap user-friendly bagi pemilik bisnis tradisional yang memasuki ekosistem DeFi.",
        ],
      },
      introduction: {
        title: "1. Pendahuluan",
        sections: [
          {
            subtitle: "1.1 Latar Belakang",
            content:
              "Sektor UMKM Indonesia berkontribusi lebih dari 60% terhadap PDB nasional dan mempekerjakan sekitar 97% tenaga kerja. Namun, akses terhadap pembiayaan tradisional tetap menjadi tantangan signifikan, dengan hanya 25% UMKM yang memiliki akses ke fasilitas kredit formal. Bersamaan dengan itu, adopsi cryptocurrency di Indonesia telah tumbuh eksponensial, dengan lebih dari 11 juta pengguna crypto aktif pada tahun 2024.",
          },
          {
            subtitle: "1.2 Peluang Pasar",
            content:
              "Hal ini menciptakan peluang unik untuk menjembatani gap antara kepemilikan aset crypto dan kebutuhan likuiditas fiat. Banyak pemilik UMKM yang berinvestasi dalam cryptocurrency menghadapi dilema menjual aset mereka untuk mendanai operasi bisnis, kehilangan potensi keuntungan jangka panjang.",
          },
          {
            subtitle: "1.3 Gambaran Solusi",
            content:
              "Protokol Dingdong Loans menyediakan solusi terdesentralisasi yang memungkinkan UMKM menggunakan kepemilikan cryptocurrency mereka sebagai kolateral untuk pinjaman IDRX, memungkinkan akses ke modal kerja sambil mempertahankan eksposur crypto.",
          },
        ],
      },
      problem: {
        title: "2. Permasalahan",
        sections: [
          {
            subtitle: "2.1 Tantangan Lending Tradisional",
            content: [
              "Proses birokrasi yang kompleks membutuhkan dokumentasi ekstensif",
              "Persyaratan kolateral tinggi (sering 100-150% dari nilai pinjaman)",
              "Waktu persetujuan yang lama (rata-rata 2-8 minggu)",
              "Akses terbatas untuk bisnis tanpa riwayat kredit yang mapan",
              "Tingkat bunga tinggi (15-25% per tahun untuk pinjaman UMKM)",
            ],
          },
          {
            subtitle: "2.2 Gap Pemanfaatan Aset Crypto",
            content: [
              "Likuidasi paksa aset crypto untuk memenuhi kebutuhan likuiditas bisnis",
              "Kehilangan potensi apresiasi selama periode pendanaan bisnis",
              "Kurangnya solusi DeFi institusional yang disesuaikan untuk pasar Indonesia",
              "Ketidakpastian regulasi yang membatasi solusi bridge crypto-fiat",
            ],
          },
          {
            subtitle: "2.3 Inefisiensi Pasar",
            content:
              "Solusi saat ini baik memerlukan likuidasi aset lengkap atau beroperasi di area abu-abu regulasi. Ada kebutuhan jelas akan protokol yang compliant, transparan, dan efisien yang mengatasi kebutuhan likuiditas pemegang crypto dan kebutuhan pembiayaan UMKM.",
          },
        ],
      },
      solution: {
        title: "3. Solusi",
        sections: [
          {
            subtitle: "3.1 Arsitektur Protokol",
            content:
              "Protokol Dingdong Loans dibangun sebagai serangkaian smart contract yang memfasilitasi lending berkolateral crypto dengan komponen kunci berikut:",
            points: [
              "Manajer Kolateral: Menangani deposit, valuasi, dan likuidasi aset crypto",
              "Mesin Pinjaman: Mengelola originasi pinjaman, perhitungan bunga, dan pembayaran",
              "Integrasi Oracle: Menyediakan feed harga real-time untuk valuasi kolateral yang akurat",
              "Manajer Risiko: Memantau faktor kesehatan dan memicu likuidasi saat diperlukan",
              "Token IDRX: Stablecoin yang dipatok ke Rupiah Indonesia untuk pencairan pinjaman",
            ],
          },
          {
            subtitle: "3.2 Perjalanan Pengguna",
            borrowerJourney: [
              "Melengkapi verifikasi KYC",
              "Menyetor kolateral crypto",
              "Mengajukan pinjaman IDRX",
              "Menerima persetujuan pinjaman instan",
              "Mendapat IDRX ditransfer ke wallet",
              "Melunasi pinjaman untuk mengambil kolateral",
            ],
            lenderJourney: [
              "Menyetor IDRX ke pool likuiditas",
              "Memperoleh yield dari bunga pinjaman",
              "Berpartisipasi dalam governance protokol",
              "Menarik likuiditas + bunga yang diperoleh",
            ],
          },
        ],
      },
      architecture: {
        title: "4. Arsitektur Teknis",
        sections: [
          {
            subtitle: "4.1 Arsitektur Smart Contract",
            contracts: [
              "LendingPool.sol (Logika lending utama)",
              "CollateralManager.sol (Penanganan kolateral)",
              "PriceOracle.sol (Agregasi feed harga)",
              "LiquidationEngine.sol (Mekanisme likuidasi)",
              "InterestRateModel.sol (Suku bunga dinamis)",
              "IDRXToken.sol (Implementasi stablecoin)",
              "GovernanceToken.sol (Governance protokol)",
              "AccessControl.sol (Manajemen izin)",
            ],
          },
          {
            subtitle: "4.2 Sistem Manajemen Kolateral",
            collateralTable: [
              {
                asset: "Bitcoin (BTC)",
                maxLTV: "75%",
                liquidationThreshold: "80%",
                penalty: "5%",
              },
              {
                asset: "Ethereum (ETH)",
                maxLTV: "70%",
                liquidationThreshold: "75%",
                penalty: "7%",
              },
              {
                asset: "USDT",
                maxLTV: "90%",
                liquidationThreshold: "95%",
                penalty: "2%",
              },
              {
                asset: "USDC",
                maxLTV: "90%",
                liquidationThreshold: "95%",
                penalty: "2%",
              },
            ],
          },
        ],
      },
      kyc: {
        title: "5. Modul KYC/AML",
        sections: [
          {
            subtitle: "5.1 Arsitektur KYC Semi-Terdesentralisasi",
            description:
              "Protokol mengimplementasikan modul KYC/AML hybrid yang menggabungkan efisiensi blockchain dengan kepatuhan regulasi tradisional:",
            flow: [
              {
                actor: "Peminjam (UMKM)",
                function: "submitKYCData()",
                description:
                  "Peminjam mengirim dokumen KYC melalui antarmuka terenkripsi",
              },
              {
                actor: "Manajer Protokol",
                function: "Notify()",
                description:
                  "Admin memberi tahu kontrak tentang status verifikasi",
              },
              {
                actor: "Kontrak Utama",
                function: "KYCApproved()",
                description:
                  "Kontrak mengaktifkan akses peminjam setelah verifikasi",
              },
            ],
          },
          {
            subtitle: "5.2 Proses Kepatuhan",
            steps: [
              "Pengumpulan Data: Peminjam mengunggah dokumen identifikasi melalui portal aman",
              "Verifikasi Off-Chain: Provider KYC pihak ketiga memvalidasi dokumen sesuai regulasi BI",
              "Persetujuan On-Chain: Hasil verifikasi direkam di blockchain melalui event KYCApproved",
              "Pemantauan Berkelanjutan: Pemeriksaan AML otomatis pada semua transaksi pinjaman",
            ],
          },
        ],
      },
      tokenomics: {
        title: "6. Tokenomics IDRX",
        sections: [
          // Tokenomics content would go here
        ],
      },
      getFullWhitepaper: {
        title: "Dapatkan Whitepaper Lengkap",
        description:
          "Download dokumentasi teknis lengkap termasuk tokenomics detail, analisis keamanan, kerangka governance, dan roadmap pengembangan.",
        downloadFull: "Download PDF Lengkap (2.5 MB)",
        viewGithub: "Lihat di GitHub",
      },
    },
    en: {
      title: "Dingdong Loans Protocol",
      subtitle: "Decentralized Lending Protocol for Indonesian SMEs",
      description:
        "A comprehensive technical documentation of the crypto-collateralized lending protocol designed specifically for Small and Medium Enterprises (SMEs) in Indonesia.",
      downloadPdf: "Download PDF",
      viewOnGithub: "View on GitHub",
      version:
        "Version 1.0 | Published: December 2024 | Last Updated: December 2024",
      tableOfContents: "Table of Contents",
      sections: [
        { id: "abstract", title: "Abstract", icon: BookOpen },
        { id: "introduction", title: "1. Introduction", icon: Globe },
        { id: "problem", title: "2. Problem Statement", icon: TrendingUp },
        { id: "solution", title: "3. Solution Overview", icon: CheckCircle },
        {
          id: "architecture",
          title: "4. Technical Architecture",
          icon: Settings,
        },
        { id: "kyc", title: "5. KYC/AML Module", icon: Shield },
        { id: "tokenomics", title: "6. IDRX Tokenomics", icon: TrendingUp },
        { id: "security", title: "7. Security Framework", icon: Lock },
        { id: "governance", title: "8. Governance Model", icon: Users },
        { id: "roadmap", title: "9. Development Roadmap", icon: ArrowRight },
        { id: "conclusion", title: "10. Conclusion", icon: CheckCircle },
      ],
      abstract: {
        title: "Abstract",
        content: [
          "Dingdong Loans introduces a novel decentralized lending protocol that addresses the liquidity gap faced by Indonesian Small and Medium Enterprises (SMEs) who hold cryptocurrency assets. By enabling crypto-collateralized loans in IDRX (Indonesian Rupiah-pegged token), the protocol allows SMEs to access working capital without liquidating their crypto holdings, thus maintaining exposure to potential appreciation while meeting immediate business needs.",
          "The protocol implements a robust risk management system with dynamic collateralization ratios, real-time oracle pricing, and automated liquidation mechanisms. Built on Ethereum-compatible infrastructure, it ensures transparency, security, and decentralized governance while remaining user-friendly for traditional business owners entering the DeFi ecosystem.",
        ],
      },
      introduction: {
        title: "1. Introduction",
        sections: [
          {
            subtitle: "1.1 Background",
            content:
              "Indonesia's SME sector contributes over 60% to the national GDP and employs approximately 97% of the workforce. However, access to traditional financing remains a significant challenge, with only 25% of SMEs having access to formal credit facilities. Simultaneously, cryptocurrency adoption in Indonesia has grown exponentially, with over 11 million active crypto users as of 2024.",
          },
          {
            subtitle: "1.2 Market Opportunity",
            content:
              "This creates a unique opportunity to bridge the gap between crypto asset ownership and fiat liquidity needs. Many SME owners who invested in cryptocurrency face the dilemma of selling their assets to fund business operations, missing potential long-term gains.",
          },
          {
            subtitle: "1.3 Solution Overview",
            content:
              "Dingdong Loans Protocol provides a decentralized solution that allows SMEs to use their cryptocurrency holdings as collateral for IDRX loans, enabling access to working capital while maintaining crypto exposure.",
          },
        ],
      },
      problem: {
        title: "2. Problem Statement",
        sections: [
          {
            subtitle: "2.1 Traditional Lending Challenges",
            content: [
              "Complex bureaucratic processes requiring extensive documentation",
              "High collateral requirements (often 100-150% of loan value)",
              "Long approval times (2-8 weeks on average)",
              "Limited access for businesses without established credit history",
              "High interest rates (15-25% annually for SME loans)",
            ],
          },
          {
            subtitle: "2.2 Crypto Asset Utilization Gap",
            content: [
              "Forced liquidation of crypto assets to meet business liquidity needs",
              "Loss of potential appreciation during business funding periods",
              "Lack of institutional DeFi solutions tailored for Indonesian market",
              "Regulatory uncertainty limiting crypto-fiat bridge solutions",
            ],
          },
          {
            subtitle: "2.3 Market Inefficiencies",
            content:
              "Current solutions either require complete asset liquidation or operate in regulatory gray areas. There's a clear need for a compliant, transparent, and efficient protocol that addresses both crypto holders' liquidity needs and SMEs' financing requirements.",
          },
        ],
      },
      solution: {
        title: "3. Solution Overview",
        sections: [
          {
            subtitle: "3.1 Protocol Architecture",
            content:
              "Dingdong Loans Protocol is built as a series of smart contracts that facilitate crypto-collateralized lending with the following key components:",
            points: [
              "Collateral Manager: Handles deposit, valuation, and liquidation of crypto assets",
              "Loan Engine: Manages loan origination, interest calculation, and repayment",
              "Oracle Integration: Provides real-time price feeds for accurate collateral valuation",
              "Risk Manager: Monitors health factors and triggers liquidations when necessary",
              "IDRX Token: Stablecoin pegged to Indonesian Rupiah for loan disbursement",
            ],
          },
          {
            subtitle: "3.2 User Journey",
            borrowerJourney: [
              "Complete KYC verification",
              "Deposit crypto collateral",
              "Request IDRX loan",
              "Receive instant loan approval",
              "Get IDRX transferred to wallet",
              "Repay loan to retrieve collateral",
            ],
            lenderJourney: [
              "Deposit IDRX into liquidity pool",
              "Earn yield from loan interest",
              "Participate in protocol governance",
              "Withdraw liquidity + earned interest",
            ],
          },
        ],
      },
      architecture: {
        title: "4. Technical Architecture",
        sections: [
          {
            subtitle: "4.1 Smart Contract Architecture",
            contracts: [
              "LendingPool.sol (Main lending logic)",
              "CollateralManager.sol (Collateral handling)",
              "PriceOracle.sol (Price feed aggregation)",
              "LiquidationEngine.sol (Liquidation mechanisms)",
              "InterestRateModel.sol (Dynamic interest rates)",
              "IDRXToken.sol (Stablecoin implementation)",
              "GovernanceToken.sol (Protocol governance)",
              "AccessControl.sol (Permission management)",
            ],
          },
          {
            subtitle: "4.2 Collateral Management System",
            collateralTable: [
              {
                asset: "Bitcoin (BTC)",
                maxLTV: "75%",
                liquidationThreshold: "80%",
                penalty: "5%",
              },
              {
                asset: "Ethereum (ETH)",
                maxLTV: "70%",
                liquidationThreshold: "75%",
                penalty: "7%",
              },
              {
                asset: "USDT",
                maxLTV: "90%",
                liquidationThreshold: "95%",
                penalty: "2%",
              },
              {
                asset: "USDC",
                maxLTV: "90%",
                liquidationThreshold: "95%",
                penalty: "2%",
              },
            ],
          },
        ],
      },
      kyc: {
        title: "5. KYC/AML Module",
        sections: [
          {
            subtitle: "5.1 Semi-Decentralized KYC Architecture",
            description:
              "The protocol implements a hybrid KYC/AML module combining blockchain efficiency with traditional regulatory compliance:",
            flow: [
              {
                actor: "Borrower (SME)",
                function: "submitKYCData()",
                description:
                  "Borrowers submit KYC documents through encrypted interface",
              },
              {
                actor: "Protocol Manager",
                function: "Notify()",
                description: "Admin notifies contract of verification status",
              },
              {
                actor: "Core Contract",
                function: "KYCApproved()",
                description:
                  "Contract enables borrower access after verification",
              },
            ],
          },
          {
            subtitle: "5.2 Compliance Process",
            steps: [
              "Data Collection: Borrowers upload identification documents through secure portal",
              "Off-Chain Verification: Third-party KYC providers validate documents per BI regulations",
              "On-Chain Approval: Verification results recorded on blockchain via KYCApproved event",
              "Ongoing Monitoring: Automated AML screening on all loan transactions",
            ],
          },
        ],
      },
      tokenomics: {
        title: "6. IDRX Tokenomics",
        sections: [
          // Tokenomics content would go here
        ],
      },
      getFullWhitepaper: {
        title: "Get the Complete Whitepaper",
        description:
          "Download the full technical documentation including detailed tokenomics, security analysis, governance framework, and development roadmap.",
        downloadFull: "Download Full PDF (2.5 MB)",
        viewGithub: "View on GitHub",
      },
    },
  };

  const currentContent = content[language];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <Languages className="w-4 h-4 text-gray-600" />
            <Button
              variant={language === "id" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("id")}
              className="h-8"
            >
              ID
            </Button>
            <Button
              variant={language === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("en")}
              className="h-8"
            >
              EN
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
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
                            <Icon className="w-4 h-4 text-primary" />
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
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                {currentContent.title}
              </h1>
              <h2 className="text-2xl text-muted-foreground mb-6">
                {currentContent.subtitle}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                {currentContent.description}
              </p>

              <div className="flex justify-center gap-4 mb-8">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Download className="w-5 h-5 mr-2" />
                  {currentContent.downloadPdf}
                </Button>
                <Button variant="outline" size="lg">
                  <Globe className="w-5 h-5 mr-2" />
                  {currentContent.viewOnGithub}
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                {currentContent.version}
              </div>
            </div>

            {/* Abstract */}
            <section id="abstract" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary" />
                    {currentContent.abstract.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  {currentContent.abstract.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed mb-4"
                    >
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Introduction */}
            <section id="introduction" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-primary" />
                    {currentContent.introduction.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none space-y-6">
                  {currentContent.introduction.sections.map(
                    (section, index) => (
                      <div key={index}>
                        <h3 className="text-xl font-semibold mb-4">
                          {section.subtitle}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Problem Statement */}
            <section id="problem" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-primary" />
                    {currentContent.problem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none space-y-6">
                  {currentContent.problem.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold mb-4">
                        {section.subtitle}
                      </h3>
                      {Array.isArray(section.content) ? (
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          {section.content.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground leading-relaxed">
                          {section.content}
                        </p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Solution Overview */}
            <section id="solution" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2 text-primary" />
                    {currentContent.solution.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none space-y-6">
                  {currentContent.solution.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold mb-4">
                        {section.subtitle}
                      </h3>

                      {section.content && (
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {section.content}
                        </p>
                      )}

                      {section.points && (
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-5">
                          {section.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="mb-2">
                              <span className="font-semibold">
                                {point.split(":")[0]}:
                              </span>
                              {point.split(":").slice(1).join(":")}
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.borrowerJourney && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          <div className="border rounded-lg p-4 bg-accent">
                            <h4 className="font-semibold text-primary mb-2">
                              {language === "id"
                                ? "Untuk Peminjam (UMKM)"
                                : "For Borrowers (SMEs)"}
                            </h4>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                              {section.borrowerJourney.map(
                                (step, stepIndex) => (
                                  <li key={stepIndex}>{step}</li>
                                )
                              )}
                            </ol>
                          </div>
                          <div className="border rounded-lg p-4 bg-accent">
                            <h4 className="font-semibold text-primary mb-2">
                              {language === "id"
                                ? "Untuk Pemberi Pinjaman (Penyedia Likuiditas)"
                                : "For Lenders (Liquidity Providers)"}
                            </h4>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                              {section.lenderJourney.map((step, stepIndex) => (
                                <li key={stepIndex}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Technical Architecture */}
            <section id="architecture" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Settings className="w-6 h-6 mr-2 text-primary" />
                    {currentContent.architecture.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none space-y-6">
                  {currentContent.architecture.sections.map(
                    (section, index) => (
                      <div key={index}>
                        <h3 className="text-xl font-semibold mb-4">
                          {section.subtitle}
                        </h3>

                        {section.contracts && (
                          <div className="bg-gray-50 p-6 rounded-lg font-mono text-sm">
                            <div className="text-center mb-4 font-bold">
                              {language === "id"
                                ? "Smart Contract Protokol"
                                : "Protocol Smart Contracts"}
                            </div>
                            <div className="space-y-2">
                              {section.contracts.map(
                                (contract, contractIndex) => (
                                  <div key={contractIndex}>
                                    {contractIndex ===
                                      section.contracts.length - 1
                                      ? "└── "
                                      : "├── "}
                                    {contract}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {section.collateralTable && (
                          <>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              {language === "id"
                                ? "Sistem manajemen kolateral mendukung beberapa aset cryptocurrency dengan parameter risiko yang berbeda:"
                                : "The collateral management system supports multiple cryptocurrency assets with different risk parameters:"}
                            </p>
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                  <tr className="bg-gray-50">
                                    <th className="border border-gray-300 p-3 text-left">
                                      {language === "id" ? "Aset" : "Asset"}
                                    </th>
                                    <th className="border border-gray-300 p-3 text-left">
                                      Max LTV
                                    </th>
                                    <th className="border border-gray-300 p-3 text-left">
                                      {language === "id"
                                        ? "Ambang Likuidasi"
                                        : "Liquidation Threshold"}
                                    </th>
                                    <th className="border border-gray-300 p-3 text-left">
                                      {language === "id"
                                        ? "Penalti Likuidasi"
                                        : "Liquidation Penalty"}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {section.collateralTable.map(
                                    (row, rowIndex) => (
                                      <tr key={rowIndex}>
                                        <td className="border border-gray-300 p-3">
                                          {row.asset}
                                        </td>
                                        <td className="border border-gray-300 p-3">
                                          {row.maxLTV}
                                        </td>
                                        <td className="border border-gray-300 p-3">
                                          {row.liquidationThreshold}
                                        </td>
                                        <td className="border border-gray-300 p-3">
                                          {row.penalty}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </section>

            {/* KYC/AML Module */}
            <section id="kyc" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-primary" />
                    {currentContent.kyc.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none space-y-6">
                  {currentContent.kyc.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold mb-4">
                        {section.subtitle}
                      </h3>

                      {section.description && (
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {section.description}
                        </p>
                      )}

                      {section.flow && (
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <div className="mb-4 md:mb-0">
                              <h4 className="font-bold text-primary">
                                {section.flow[0].actor}
                              </h4>
                            </div>
                            <ArrowRight className="mx-4 text-gray-400 hidden md:block" />
                            <div className="mb-4 md:mb-0">
                              <h4 className="font-bold text-primary">
                                {section.flow[1].actor}
                              </h4>
                            </div>
                            <ArrowRight className="mx-4 text-gray-400 hidden md:block" />
                            <div>
                              <h4 className="font-bold text-primary">
                                {section.flow[2].actor}
                              </h4>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {section.flow.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-start">
                                <div
                                  className={`bg-primary/20 p-3 rounded-lg mr-4`}
                                >
                                  <span className="font-mono text-sm">
                                    {item.function}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="font-semibold">
                                    {itemIndex === 0
                                      ? language === "id"
                                        ? "Pengajuan Data"
                                        : "Data Submission"
                                      : itemIndex === 1
                                        ? language === "id"
                                          ? "Notifikasi Status"
                                          : "Status Notification"
                                        : "KYC Approved"}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {section.steps && (
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground pl-5">
                          {section.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="mb-2">
                              {step.split(":").length > 1 ? (
                                <>
                                  <span className="font-semibold">
                                    {step.split(":")[0]}:
                                  </span>
                                  {step.split(":").slice(1).join(":")}
                                </>
                              ) : (
                                step
                              )}
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Download Section */}
            <section className="mb-12">
              <Card className="bg-accent border-primary/20">
                <CardContent className="text-center py-12">
                  <h3 className="text-2xl font-bold mb-4">
                    {currentContent.getFullWhitepaper.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    {currentContent.getFullWhitepaper.description}
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      {currentContent.getFullWhitepaper.downloadFull}
                    </Button>
                    <Button variant="outline" size="lg">
                      <BookOpen className="w-5 h-5 mr-2" />
                      {currentContent.getFullWhitepaper.viewGithub}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Whitepaper;