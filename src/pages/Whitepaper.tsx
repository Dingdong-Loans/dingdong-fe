import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Languages
} from "lucide-react";
import { useState } from "react";

const Whitepaper = () => {
  const [language, setLanguage] = useState<'id' | 'en'>('id');

  const content = {
    id: {
      title: "Protokol Dingdong Loans",
      subtitle: "Protokol Lending Terdesentralisasi untuk UMKM Indonesia",
      description: "Dokumentasi teknis lengkap tentang protokol lending berbasis collateral crypto yang dirancang khusus untuk Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia.",
      downloadPdf: "Download PDF",
      viewOnGithub: "Lihat di GitHub",
      version: "Versi 1.0 | Diterbitkan: Desember 2024 | Terakhir Diperbarui: Desember 2024",
      tableOfContents: "Daftar Isi",
      sections: [
        { id: "abstract", title: "Abstrak", icon: BookOpen },
        { id: "introduction", title: "1. Pendahuluan", icon: Globe },
        { id: "problem", title: "2. Permasalahan", icon: TrendingUp },
        { id: "solution", title: "3. Solusi", icon: CheckCircle },
        { id: "architecture", title: "4. Arsitektur Teknis", icon: Settings },
        { id: "tokenomics", title: "5. Tokenomics IDRX", icon: TrendingUp },
        { id: "security", title: "6. Kerangka Keamanan", icon: Shield },
        { id: "governance", title: "7. Model Governance", icon: Users },
        { id: "roadmap", title: "8. Roadmap Pengembangan", icon: ArrowRight },
        { id: "conclusion", title: "9. Kesimpulan", icon: CheckCircle },
      ],
      abstract: {
        title: "Abstrak",
        content: [
          "Dingdong Loans memperkenalkan protokol lending terdesentralisasi yang mengatasi gap likuiditas yang dihadapi Usaha Mikro, Kecil, dan Menengah (UMKM) Indonesia yang memiliki aset cryptocurrency. Dengan memungkinkan pinjaman berkolateral crypto dalam IDRX (token yang dipatok ke Rupiah Indonesia), protokol ini memungkinkan UMKM untuk mengakses modal kerja tanpa melikuidasi kepemilikan crypto mereka, sehingga tetap mempertahankan eksposur terhadap potensi apresiasi sambil memenuhi kebutuhan bisnis langsung.",
          "Protokol ini mengimplementasikan sistem manajemen risiko yang robust dengan rasio kolateralisasi dinamis, pricing oracle real-time, dan mekanisme likuidasi otomatis. Dibangun di atas infrastruktur yang kompatibel dengan Ethereum, protokol ini memastikan transparansi, keamanan, dan governance terdesentralisasi sambil tetap user-friendly bagi pemilik bisnis tradisional yang memasuki ekosistem DeFi."
        ]
      },
      introduction: {
        title: "1. Pendahuluan",
        sections: [
          {
            subtitle: "1.1 Latar Belakang",
            content: "Sektor UMKM Indonesia berkontribusi lebih dari 60% terhadap PDB nasional dan mempekerjakan sekitar 97% tenaga kerja. Namun, akses terhadap pembiayaan tradisional tetap menjadi tantangan signifikan, dengan hanya 25% UMKM yang memiliki akses ke fasilitas kredit formal. Bersamaan dengan itu, adopsi cryptocurrency di Indonesia telah tumbuh eksponensial, dengan lebih dari 11 juta pengguna crypto aktif pada tahun 2024."
          },
          {
            subtitle: "1.2 Peluang Pasar",
            content: "Hal ini menciptakan peluang unik untuk menjembatani gap antara kepemilikan aset crypto dan kebutuhan likuiditas fiat. Banyak pemilik UMKM yang berinvestasi dalam cryptocurrency menghadapi dilema menjual aset mereka untuk mendanai operasi bisnis, kehilangan potensi keuntungan jangka panjang."
          },
          {
            subtitle: "1.3 Gambaran Solusi",
            content: "Protokol Dingdong Loans menyediakan solusi terdesentralisasi yang memungkinkan UMKM menggunakan kepemilikan cryptocurrency mereka sebagai kolateral untuk pinjaman IDRX, memungkinkan akses ke modal kerja sambil mempertahankan eksposur crypto."
          }
        ]
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
              "Tingkat bunga tinggi (15-25% per tahun untuk pinjaman UMKM)"
            ]
          },
          {
            subtitle: "2.2 Gap Pemanfaatan Aset Crypto",
            content: [
              "Likuidasi paksa aset crypto untuk memenuhi kebutuhan likuiditas bisnis",
              "Kehilangan potensi apresiasi selama periode pendanaan bisnis",
              "Kurangnya solusi DeFi institusional yang disesuaikan untuk pasar Indonesia",
              "Ketidakpastian regulasi yang membatasi solusi bridge crypto-fiat"
            ]
          },
          {
            subtitle: "2.3 Inefisiensi Pasar",
            content: "Solusi saat ini baik memerlukan likuidasi aset lengkap atau beroperasi di area abu-abu regulasi. Ada kebutuhan jelas akan protokol yang compliant, transparan, dan efisien yang mengatasi kebutuhan likuiditas pemegang crypto dan kebutuhan pembiayaan UMKM."
          }
        ]
      },
      getFullWhitepaper: {
        title: "Dapatkan Whitepaper Lengkap",
        description: "Download dokumentasi teknis lengkap termasuk tokenomics detail, analisis keamanan, kerangka governance, dan roadmap pengembangan.",
        downloadFull: "Download PDF Lengkap (2.5 MB)",
        viewGithub: "Lihat di GitHub"
      }
    },
    en: {
      title: "Dingdong Loans Protocol",
      subtitle: "Decentralized Lending Protocol for Indonesian SMEs",
      description: "A comprehensive technical documentation of the crypto-collateralized lending protocol designed specifically for Small and Medium Enterprises (SMEs) in Indonesia.",
      downloadPdf: "Download PDF",
      viewOnGithub: "View on GitHub",
      version: "Version 1.0 | Published: December 2024 | Last Updated: December 2024",
      tableOfContents: "Table of Contents",
      sections: [
        { id: "abstract", title: "Abstract", icon: BookOpen },
        { id: "introduction", title: "1. Introduction", icon: Globe },
        { id: "problem", title: "2. Problem Statement", icon: TrendingUp },
        { id: "solution", title: "3. Solution Overview", icon: CheckCircle },
        { id: "architecture", title: "4. Technical Architecture", icon: Settings },
        { id: "tokenomics", title: "5. IDRX Tokenomics", icon: TrendingUp },
        { id: "security", title: "6. Security Framework", icon: Shield },
        { id: "governance", title: "7. Governance Model", icon: Users },
        { id: "roadmap", title: "8. Development Roadmap", icon: ArrowRight },
        { id: "conclusion", title: "9. Conclusion", icon: CheckCircle },
      ],
      abstract: {
        title: "Abstract",
        content: [
          "Dingdong Loans introduces a novel decentralized lending protocol that addresses the liquidity gap faced by Indonesian Small and Medium Enterprises (SMEs) who hold cryptocurrency assets. By enabling crypto-collateralized loans in IDRX (Indonesian Rupiah-pegged token), the protocol allows SMEs to access working capital without liquidating their crypto holdings, thus maintaining exposure to potential appreciation while meeting immediate business needs.",
          "The protocol implements a robust risk management system with dynamic collateralization ratios, real-time oracle pricing, and automated liquidation mechanisms. Built on Ethereum-compatible infrastructure, it ensures transparency, security, and decentralized governance while remaining user-friendly for traditional business owners entering the DeFi ecosystem."
        ]
      },
      introduction: {
        title: "1. Introduction",
        sections: [
          {
            subtitle: "1.1 Background",
            content: "Indonesia's SME sector contributes over 60% to the national GDP and employs approximately 97% of the workforce. However, access to traditional financing remains a significant challenge, with only 25% of SMEs having access to formal credit facilities. Simultaneously, cryptocurrency adoption in Indonesia has grown exponentially, with over 11 million active crypto users as of 2024."
          },
          {
            subtitle: "1.2 Market Opportunity",
            content: "This creates a unique opportunity to bridge the gap between crypto asset ownership and fiat liquidity needs. Many SME owners who invested in cryptocurrency face the dilemma of selling their assets to fund business operations, missing potential long-term gains."
          },
          {
            subtitle: "1.3 Solution Overview",
            content: "Dingdong Loans Protocol provides a decentralized solution that allows SMEs to use their cryptocurrency holdings as collateral for IDRX loans, enabling access to working capital while maintaining crypto exposure."
          }
        ]
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
              "High interest rates (15-25% annually for SME loans)"
            ]
          },
          {
            subtitle: "2.2 Crypto Asset Utilization Gap",
            content: [
              "Forced liquidation of crypto assets to meet business liquidity needs",
              "Loss of potential appreciation during business funding periods",
              "Lack of institutional DeFi solutions tailored for Indonesian market",
              "Regulatory uncertainty limiting crypto-fiat bridge solutions"
            ]
          },
          {
            subtitle: "2.3 Market Inefficiencies",
            content: "Current solutions either require complete asset liquidation or operate in regulatory gray areas. There's a clear need for a compliant, transparent, and efficient protocol that addresses both crypto holders' liquidity needs and SMEs' financing requirements."
          }
        ]
      },
      getFullWhitepaper: {
        title: "Get the Complete Whitepaper",
        description: "Download the full technical documentation including detailed tokenomics, security analysis, governance framework, and development roadmap.",
        downloadFull: "Download Full PDF (2.5 MB)",
        viewGithub: "View on GitHub"
      }
    }
  };

  const currentContent = content[language];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
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
              variant={language === 'id' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('id')}
              className="h-8"
            >
              ID
            </Button>
            <Button
              variant={language === 'en' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('en')}
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
                  <CardTitle className="text-lg">{currentContent.tableOfContents}</CardTitle>
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
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">{currentContent.title}</h1>
              <h2 className="text-2xl text-muted-foreground mb-6">
                {currentContent.subtitle}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                {currentContent.description}
              </p>
              
              <div className="flex justify-center gap-4 mb-8">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500">
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
                    <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
                    {currentContent.abstract.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  {currentContent.abstract.content.map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
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
                    <Globe className="w-6 h-6 mr-2 text-blue-500" />
                    {currentContent.introduction.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none space-y-6">
                  {currentContent.introduction.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold mb-4">{section.subtitle}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Problem Statement */}
            <section id="problem" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-blue-500" />
                    {currentContent.problem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none space-y-6">
                  {currentContent.problem.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold mb-4">{section.subtitle}</h3>
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
                    <CheckCircle className="w-6 h-6 mr-2 text-blue-500" />
                    {language === 'id' ? '3. Solusi' : '3. Solution Overview'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'id' ? '3.1 Arsitektur Protokol' : '3.1 Protocol Architecture'}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {language === 'id' 
                        ? 'Protokol Dingdong Loans dibangun sebagai serangkaian smart contract yang memfasilitasi lending berkolateral crypto dengan komponen kunci berikut:'
                        : 'Dingdong Loans Protocol is built as a series of smart contracts that facilitate crypto-collateralized lending with the following key components:'
                      }
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                      <li><strong>{language === 'id' ? 'Manajer Kolateral:' : 'Collateral Manager:'}</strong> {language === 'id' ? 'Menangani deposit, valuasi, dan likuidasi aset crypto' : 'Handles deposit, valuation, and liquidation of crypto assets'}</li>
                      <li><strong>{language === 'id' ? 'Mesin Pinjaman:' : 'Loan Engine:'}</strong> {language === 'id' ? 'Mengelola originasi pinjaman, perhitungan bunga, dan pembayaran' : 'Manages loan origination, interest calculation, and repayment'}</li>
                      <li><strong>{language === 'id' ? 'Integrasi Oracle:' : 'Oracle Integration:'}</strong> {language === 'id' ? 'Menyediakan feed harga real-time untuk valuasi kolateral yang akurat' : 'Provides real-time price feeds for accurate collateral valuation'}</li>
                      <li><strong>{language === 'id' ? 'Manajer Risiko:' : 'Risk Manager:'}</strong> {language === 'id' ? 'Memantau faktor kesehatan dan memicu likuidasi saat diperlukan' : 'Monitors health factors and triggers liquidations when necessary'}</li>
                      <li><strong>{language === 'id' ? 'Token IDRX:' : 'IDRX Token:'}</strong> {language === 'id' ? 'Stablecoin yang dipatok ke Rupiah Indonesia untuk pencairan pinjaman' : 'Stablecoin pegged to Indonesian Rupiah for loan disbursement'}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'id' ? '3.2 Perjalanan Pengguna' : '3.2 User Journey'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold text-blue-600 mb-2">
                          {language === 'id' ? 'Untuk Peminjam (UMKM)' : 'For Borrowers (SMEs)'}
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                          <li>{language === 'id' ? 'Melengkapi verifikasi KYC' : 'Complete KYC verification'}</li>
                          <li>{language === 'id' ? 'Menyetor kolateral crypto' : 'Deposit crypto collateral'}</li>
                          <li>{language === 'id' ? 'Mengajukan pinjaman IDRX' : 'Request IDRX loan'}</li>
                          <li>{language === 'id' ? 'Menerima persetujuan pinjaman instan' : 'Receive instant loan approval'}</li>
                          <li>{language === 'id' ? 'Mendapat IDRX ditransfer ke wallet' : 'Get IDRX transferred to wallet'}</li>
                          <li>{language === 'id' ? 'Melunasi pinjaman untuk mengambil kolateral' : 'Repay loan to retrieve collateral'}</li>
                        </ol>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold text-green-600 mb-2">
                          {language === 'id' ? 'Untuk Pemberi Pinjaman (Penyedia Likuiditas)' : 'For Lenders (Liquidity Providers)'}
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                          <li>{language === 'id' ? 'Menyetor IDRX ke pool likuiditas' : 'Deposit IDRX into liquidity pool'}</li>
                          <li>{language === 'id' ? 'Memperoleh yield dari bunga pinjaman' : 'Earn yield from loan interest'}</li>
                          <li>{language === 'id' ? 'Berpartisipasi dalam governance protokol' : 'Participate in protocol governance'}</li>
                          <li>{language === 'id' ? 'Menarik likuiditas + bunga yang diperoleh' : 'Withdraw liquidity + earned interest'}</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Technical Architecture */}
            <section id="architecture" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Settings className="w-6 h-6 mr-2 text-blue-500" />
                    {language === 'id' ? '4. Arsitektur Teknis' : '4. Technical Architecture'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'id' ? '4.1 Arsitektur Smart Contract' : '4.1 Smart Contract Architecture'}
                    </h3>
                    <div className="bg-gray-50 p-6 rounded-lg font-mono text-sm">
                      <div className="text-center mb-4 font-bold">
                        {language === 'id' ? 'Smart Contract Protokol' : 'Protocol Smart Contracts'}
                      </div>
                      <div className="space-y-2">
                        <div>├── LendingPool.sol ({language === 'id' ? 'Logika lending utama' : 'Main lending logic'})</div>
                        <div>├── CollateralManager.sol ({language === 'id' ? 'Penanganan kolateral' : 'Collateral handling'})</div>
                        <div>├── PriceOracle.sol ({language === 'id' ? 'Agregasi feed harga' : 'Price feed aggregation'})</div>
                        <div>├── LiquidationEngine.sol ({language === 'id' ? 'Mekanisme likuidasi' : 'Liquidation mechanisms'})</div>
                        <div>├── InterestRateModel.sol ({language === 'id' ? 'Suku bunga dinamis' : 'Dynamic interest rates'})</div>
                        <div>├── IDRXToken.sol ({language === 'id' ? 'Implementasi stablecoin' : 'Stablecoin implementation'})</div>
                        <div>├── GovernanceToken.sol ({language === 'id' ? 'Governance protokol' : 'Protocol governance'})</div>
                        <div>└── AccessControl.sol ({language === 'id' ? 'Manajemen izin' : 'Permission management'})</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'id' ? '4.2 Sistem Manajemen Kolateral' : '4.2 Collateral Management System'}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {language === 'id' 
                        ? 'Sistem manajemen kolateral mendukung beberapa aset cryptocurrency dengan parameter risiko yang berbeda:'
                        : 'The collateral management system supports multiple cryptocurrency assets with different risk parameters:'
                      }
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 p-3 text-left">{language === 'id' ? 'Aset' : 'Asset'}</th>
                            <th className="border border-gray-300 p-3 text-left">Max LTV</th>
                            <th className="border border-gray-300 p-3 text-left">{language === 'id' ? 'Ambang Likuidasi' : 'Liquidation Threshold'}</th>
                            <th className="border border-gray-300 p-3 text-left">{language === 'id' ? 'Penalti Likuidasi' : 'Liquidation Penalty'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 p-3">Bitcoin (BTC)</td>
                            <td className="border border-gray-300 p-3">75%</td>
                            <td className="border border-gray-300 p-3">80%</td>
                            <td className="border border-gray-300 p-3">5%</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-3">Ethereum (ETH)</td>
                            <td className="border border-gray-300 p-3">70%</td>
                            <td className="border border-gray-300 p-3">75%</td>
                            <td className="border border-gray-300 p-3">7%</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-3">USDT</td>
                            <td className="border border-gray-300 p-3">90%</td>
                            <td className="border border-gray-300 p-3">95%</td>
                            <td className="border border-gray-300 p-3">2%</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-3">USDC</td>
                            <td className="border border-gray-300 p-3">90%</td>
                            <td className="border border-gray-300 p-3">95%</td>
                            <td className="border border-gray-300 p-3">2%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
            
            {/* Download Section */}
            <section className="mb-12">
              <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                <CardContent className="text-center py-12">
                  <h3 className="text-2xl font-bold mb-4">{currentContent.getFullWhitepaper.title}</h3>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    {currentContent.getFullWhitepaper.description}
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500">
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