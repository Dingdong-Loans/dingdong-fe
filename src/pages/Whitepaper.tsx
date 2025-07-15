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
        { id: "introduction", title: "Pendahuluan", icon: Globe },
        { id: "problem", title: "Permasalahan", icon: TrendingUp },
        { id: "solution", title: "Solusi", icon: CheckCircle },
        { id: "architecture", title: "Arsitektur Teknis", icon: Settings },
        { id: "kyc", title: "Modul KYC/AML", icon: Shield },
        { id: "tokenomics", title: "Tokenomics IDRX", icon: TrendingUp },
        { id: "security", title: "Kerangka Keamanan", icon: Lock },
        { id: "governance", title: "Model Governance", icon: Users },
        { id: "roadmap", title: "Roadmap Pengembangan", icon: ArrowRight },
        { id: "conclusion", title: "Kesimpulan", icon: CheckCircle },
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
          {
            subtitle: "6.1 Ikhtisar Token",
            content: "IDRX adalah stablecoin yang dipatok ke Rupiah Indonesia (IDR) dengan rasio 1:1, dirancang khusus untuk ekosistem lending Dingdong Loans. Token ini berfungsi sebagai mata uang pinjaman utama dalam protokol, memungkinkan UMKM mengakses likuiditas dalam denominasi yang familiar sambil memanfaatkan efisiensi blockchain.",
            features: [
              "Peg 1:1 dengan Rupiah Indonesia",
              "Didukung oleh cadangan fiat dan crypto",
              "Dapat ditukar kembali ke IDR melalui partner perbankan",
              "Transparansi cadangan real-time melalui oracle",
              "Kepatuhan dengan regulasi Bank Indonesia"
            ]
          },
          {
            subtitle: "6.2 Mekanisme Stabilitas",
            content: "Stabilitas IDRX dipertahankan melalui sistem cadangan bertingkat dan mekanisme arbitrase otomatis:",
            mechanisms: [
              "Cadangan Fiat: 60% dalam rekening bank partner",
              "Cadangan Crypto: 30% dalam aset stabil (USDT/USDC)",
              "Emergency Fund: 10% untuk menjaga stabilitas ekstrem",
              "Automated Rebalancing: Smart contract yang menyesuaikan cadangan",
              "Oracle Price Feed: Pemantauan harga IDR real-time"
            ]
          },
          {
            subtitle: "6.3 Distribusi dan Utility",
            distribution: [
              { category: "Pool Likuiditas", percentage: "40%", description: "Pool likuiditas untuk lending" },
              { category: "Treasury", percentage: "25%", description: "Cadangan protokol dan pengembangan" },
              { category: "Partner Banks", percentage: "20%", description: "Alokasi untuk partner perbankan" },
              { category: "Team & Advisors", percentage: "10%", description: "Tim dan penasihat (vested 2 tahun)" },
              { category: "Community Rewards", percentage: "5%", description: "Insentif adopsi dan governance" }
            ]
          }
        ]
      },
      security: {
        title: "7. Kerangka Keamanan",
        sections: [
          {
            subtitle: "7.1 Arsitektur Keamanan Multi-Layer",
            content: "Protokol Dingdong Loans mengimplementasikan kerangka keamanan berlapis untuk melindungi aset pengguna dan menjaga integritas sistem:",
            layers: [
              "Smart Contract Security: Audit independen dan formal verification",
              "Oracle Security: Multiple price feeds dengan median filtering",
              "Access Control: Role-based permissions dengan multi-sig",
              "Liquidation Protection: Automated monitoring dan early warning",
              "Compliance Layer: KYC/AML terintegrasi dengan monitoring"
            ]
          },
          {
            subtitle: "7.2 Manajemen Risiko",
            content: "Sistem manajemen risiko komprehensif memantau dan memitigasi berbagai jenis risiko:",
            riskTypes: [
              {
                type: "Risiko Kolateral",
                mitigation: "Dynamic LTV ratios, real-time monitoring, automated liquidation"
              },
              {
                type: "Risiko Oracle",
                mitigation: "Multiple oracle providers, price deviation checks, fallback mechanisms"
              },
              {
                type: "Risiko Likuiditas",
                mitigation: "Reserve requirements, emergency funding, partner bank integration"
              },
              {
                type: "Risiko Smart Contract",
                mitigation: "Formal verification, audit trails, upgrade governance"
              }
            ]
          },
          {
            subtitle: "7.3 Audit dan Compliance",
            content: "Protokol menjalani audit keamanan reguler dan mematuhi standar compliance Indonesia:",
            measures: [
              "Audit Smart Contract oleh firm keamanan blockchain terkemuka",
              "Penetration testing infrastruktur secara berkala",
              "Compliance dengan regulasi Bank Indonesia dan OJK",
              "ISO 27001 certification untuk data security",
              "Regular security updates dan incident response plan"
            ]
          }
        ]
      },
      governance: {
        title: "8. Model Governance",
        sections: [
          {
            subtitle: "8.1 Governance Terpusat dengan Oversight Regulasi",
            content: "Mengikuti kerangka regulasi Indonesia, Dingdong Loans mengadopsi model governance terpusat yang memungkinkan kepatuhan penuh terhadap peraturan Bank Indonesia dan OJK sambil mempertahankan transparansi operasional.",
            rationale: "Model terpusat dipilih untuk memastikan compliance dengan UU No. 7 Tahun 2011 tentang Mata Uang dan peraturan terkait cryptocurrency di Indonesia."
          },
          {
            subtitle: "8.2 Struktur Governance",
            structure: [
              {
                entity: "Board of Directors",
                role: "Pengambilan keputusan strategis dan oversight protokol",
                composition: "CEO, CTO, Chief Compliance Officer, Independent Directors"
              },
              {
                entity: "Risk Committee",
                role: "Evaluasi dan mitigasi risiko sistemik",
                composition: "Risk Manager, Legal Counsel, External Risk Advisor"
              },
              {
                entity: "Compliance Committee",
                role: "Memastikan kepatuhan regulasi dan AML/KYC",
                composition: "Chief Compliance Officer, Legal Team, External Compliance Advisor"
              },
              {
                entity: "Technical Committee",
                role: "Pengembangan protokol dan keamanan sistem",
                composition: "CTO, Lead Developers, Security Auditors"
              }
            ]
          },
          {
            subtitle: "8.3 Proses Pengambilan Keputusan",
            process: [
              "Proposal: Usulan perubahan protokol dari tim internal atau stakeholder",
              "Review: Evaluasi teknis dan legal oleh committee terkait",
              "Risk Assessment: Analisis dampak terhadap sistem dan compliance",
              "Board Approval: Persetujuan final dari Board of Directors",
              "Implementation: Eksekusi perubahan dengan monitoring ketat",
              "Reporting: Transparansi kepada regulator dan stakeholder"
            ]
          }
        ]
      },
      roadmap: {
        title: "9. Roadmap Pengembangan",
        sections: [
          {
            subtitle: "9.1 Fase 1: Foundation (Q1-Q2 2025)",
            milestones: [
              {
                title: "KYC Integration",
                description: "Implementasi sistem KYC/AML yang fully compliant dengan regulasi BI",
                timeline: "Q1 2025",
                status: "In Progress"
              },
              {
                title: "Core Protocol Launch",
                description: "Peluncuran protokol lending dengan fitur dasar",
                timeline: "Q2 2025",
                status: "Planned"
              },
              {
                title: "Security Audit",
                description: "Audit keamanan komprehensif oleh firm internasional",
                timeline: "Q2 2025",
                status: "Planned"
              }
            ]
          },
          {
            subtitle: "9.2 Fase 2: Partnership Expansion (Q3-Q4 2025)",
            milestones: [
              {
                title: "Bank Perkreditan Rakyat (BPR) Partnership",
                description: "Kemitraan dengan BPR untuk ekspansi akses dan compliance",
                timeline: "Q3 2025",
                status: "Planned"
              },
              {
                title: "Toko Gadai Integration",
                description: "Integrasi dengan jaringan toko gadai untuk verifikasi kolateral fisik",
                timeline: "Q3 2025",
                status: "Planned"
              },
              {
                title: "Lending Partner Network",
                description: "Ekspansi jaringan partner lending tradisional",
                timeline: "Q4 2025",
                status: "Planned"
              }
            ]
          },
          {
            subtitle: "9.3 Fase 3: Scale & Innovation (2026)",
            milestones: [
              {
                title: "Advanced Risk Management",
                description: "AI-powered risk assessment dan predictive analytics",
                timeline: "Q1 2026",
                status: "Research"
              },
              {
                title: "Cross-Chain Integration",
                description: "Support untuk multiple blockchain networks",
                timeline: "Q2 2026",
                status: "Research"
              },
              {
                title: "Institutional Products",
                description: "Produk lending untuk korporasi dan institusi",
                timeline: "Q3 2026",
                status: "Research"
              }
            ]
          }
        ]
      },
      conclusion: {
        title: "10. Kesimpulan",
        sections: [
          {
            subtitle: "10.1 Ringkasan Inovasi",
            content: "Dingdong Loans Protocol memperkenalkan solusi lending terdesentralisasi yang dirancang khusus untuk mengatasi tantangan akses pembiayaan UMKM Indonesia. Dengan menggabungkan teknologi blockchain dengan kepatuhan regulasi lokal, protokol ini menjembatani gap antara kepemilikan aset crypto dan kebutuhan likuiditas bisnis tradisional."
          },
          {
            subtitle: "10.2 Dampak Ekonomi yang Diharapkan",
            impacts: [
              "Meningkatkan akses pembiayaan untuk 64 juta UMKM Indonesia",
              "Mengurangi ketergantungan pada sistem perbankan tradisional",
              "Menciptakan utility nyata untuk aset cryptocurrency",
              "Mendorong adopsi teknologi blockchain di sektor UMKM",
              "Berkontribusi pada inklusi keuangan digital Indonesia"
            ]
          },
          {
            subtitle: "10.3 Visi Jangka Panjang",
            content: "Kami memproyeksikan Dingdong Loans akan menjadi infrastruktur lending utama untuk ekosistem crypto-fiat Indonesia, memproses lebih dari $100 juta dalam pinjaman pada tahun 2027 dan melayani lebih dari 10,000 UMKM aktif. Dengan roadmap yang jelas dan kemitraan strategis, protokol ini berpotensi mentransformasi landscape pembiayaan UMKM Indonesia."
          },
          {
            subtitle: "10.4 Call to Action",
            content: "Kami mengundang stakeholder ekosistem - dari UMKM, investor, hingga regulator - untuk bergabung dalam menciptakan masa depan pembiayaan yang lebih inklusif dan efisien. Bersama-sama, kita dapat membangun jembatan antara ekonomi digital dan tradisional untuk kemajuan Indonesia."
          }
        ]
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
          {
            subtitle: "6.1 Token Overview",
            content: "IDRX is a stablecoin pegged to the Indonesian Rupiah (IDR) at a 1:1 ratio, specifically designed for the Dingdong Loans lending ecosystem. It serves as the primary loan currency in the protocol, enabling SMEs to access liquidity in a familiar denomination while leveraging blockchain efficiency.",
            features: [
              "1:1 peg with Indonesian Rupiah",
              "Backed by fiat and crypto reserves",
              "Redeemable to IDR through banking partners",
              "Real-time reserve transparency via oracles",
              "Compliant with Bank Indonesia regulations"
            ]
          },
          {
            subtitle: "6.2 Stability Mechanism",
            content: "IDRX stability is maintained through a multi-tiered reserve system and automated arbitrage mechanisms:",
            mechanisms: [
              "Fiat Reserves: 60% in partner bank accounts",
              "Crypto Reserves: 30% in stable assets (USDT/USDC)",
              "Emergency Fund: 10% for extreme stability maintenance",
              "Automated Rebalancing: Smart contracts adjusting reserves",
              "Oracle Price Feed: Real-time IDR price monitoring"
            ]
          },
          {
            subtitle: "6.3 Distribution and Utility",
            distribution: [
              { category: "Liquidity Pool", percentage: "40%", description: "Lending liquidity pools" },
              { category: "Treasury", percentage: "25%", description: "Protocol reserves and development" },
              { category: "Partner Banks", percentage: "20%", description: "Banking partner allocation" },
              { category: "Team & Advisors", percentage: "10%", description: "Team and advisors (2-year vesting)" },
              { category: "Community Rewards", percentage: "5%", description: "Adoption incentives and governance" }
            ]
          }
        ]
      },
      security: {
        title: "7. Security Framework",
        sections: [
          {
            subtitle: "7.1 Multi-Layer Security Architecture",
            content: "Dingdong Loans Protocol implements a layered security framework to protect user assets and maintain system integrity:",
            layers: [
              "Smart Contract Security: Independent audits and formal verification",
              "Oracle Security: Multiple price feeds with median filtering",
              "Access Control: Role-based permissions with multi-sig",
              "Liquidation Protection: Automated monitoring and early warning",
              "Compliance Layer: Integrated KYC/AML with monitoring"
            ]
          },
          {
            subtitle: "7.2 Risk Management",
            content: "A comprehensive risk management system monitors and mitigates various types of risks:",
            riskTypes: [
              {
                type: "Collateral Risk",
                mitigation: "Dynamic LTV ratios, real-time monitoring, automated liquidation"
              },
              {
                type: "Oracle Risk",
                mitigation: "Multiple oracle providers, price deviation checks, fallback mechanisms"
              },
              {
                type: "Liquidity Risk",
                mitigation: "Reserve requirements, emergency funding, partner bank integration"
              },
              {
                type: "Smart Contract Risk",
                mitigation: "Formal verification, audit trails, upgrade governance"
              }
            ]
          },
          {
            subtitle: "7.3 Audit and Compliance",
            content: "The protocol undergoes regular security audits and complies with Indonesian standards:",
            measures: [
              "Smart Contract audits by leading blockchain security firms",
              "Regular infrastructure penetration testing",
              "Compliance with Bank Indonesia and OJK regulations",
              "ISO 27001 certification for data security",
              "Regular security updates and incident response plan"
            ]
          }
        ]
      },
      governance: {
        title: "8. Governance Model",
        sections: [
          {
            subtitle: "8.1 Centralized Governance with Regulatory Oversight",
            content: "Following Indonesian regulatory frameworks, Dingdong Loans adopts a centralized governance model that ensures full compliance with Bank Indonesia and OJK regulations while maintaining operational transparency.",
            rationale: "The centralized model is chosen to ensure compliance with Law No. 7 of 2011 on Currency and related cryptocurrency regulations in Indonesia."
          },
          {
            subtitle: "8.2 Governance Structure",
            structure: [
              {
                entity: "Board of Directors",
                role: "Strategic decision-making and protocol oversight",
                composition: "CEO, CTO, Chief Compliance Officer, Independent Directors"
              },
              {
                entity: "Risk Committee",
                role: "Risk evaluation and systemic risk mitigation",
                composition: "Risk Manager, Legal Counsel, External Risk Advisor"
              },
              {
                entity: "Compliance Committee",
                role: "Regulatory compliance and AML/KYC oversight",
                composition: "Chief Compliance Officer, Legal Team, External Compliance Advisor"
              },
              {
                entity: "Technical Committee",
                role: "Protocol development and system security",
                composition: "CTO, Lead Developers, Security Auditors"
              }
            ]
          },
          {
            subtitle: "8.3 Decision-Making Process",
            process: [
              "Proposal: Change proposals from internal team or stakeholders",
              "Review: Technical and legal evaluation by relevant committees",
              "Risk Assessment: Impact analysis on system and compliance",
              "Board Approval: Final approval from Board of Directors",
              "Implementation: Change execution with strict monitoring",
              "Reporting: Transparency to regulators and stakeholders"
            ]
          }
        ]
      },
      roadmap: {
        title: "9. Development Roadmap",
        sections: [
          {
            subtitle: "9.1 Phase 1: Foundation (Q1-Q2 2025)",
            milestones: [
              {
                title: "KYC Integration",
                description: "Implementation of fully compliant KYC/AML system with BI regulations",
                timeline: "Q1 2025",
                status: "In Progress"
              },
              {
                title: "Core Protocol Launch",
                description: "Launch of lending protocol with basic features",
                timeline: "Q2 2025",
                status: "Planned"
              },
              {
                title: "Security Audit",
                description: "Comprehensive security audit by international firm",
                timeline: "Q2 2025",
                status: "Planned"
              }
            ]
          },
          {
            subtitle: "9.2 Phase 2: Partnership Expansion (Q3-Q4 2025)",
            milestones: [
              {
                title: "Bank Perkreditan Rakyat (BPR) Partnership",
                description: "Partnership with BPR for access expansion and compliance",
                timeline: "Q3 2025",
                status: "Planned"
              },
              {
                title: "Pawn Shop Integration",
                description: "Integration with pawn shop networks for physical collateral verification",
                timeline: "Q3 2025",
                status: "Planned"
              },
              {
                title: "Lending Partner Network",
                description: "Traditional lending partner network expansion",
                timeline: "Q4 2025",
                status: "Planned"
              }
            ]
          },
          {
            subtitle: "9.3 Phase 3: Scale & Innovation (2026)",
            milestones: [
              {
                title: "Advanced Risk Management",
                description: "AI-powered risk assessment and predictive analytics",
                timeline: "Q1 2026",
                status: "Research"
              },
              {
                title: "Cross-Chain Integration",
                description: "Support for multiple blockchain networks",
                timeline: "Q2 2026",
                status: "Research"
              },
              {
                title: "Institutional Products",
                description: "Lending products for corporations and institutions",
                timeline: "Q3 2026",
                status: "Research"
              }
            ]
          }
        ]
      },
      conclusion: {
        title: "10. Conclusion",
        sections: [
          {
            subtitle: "10.1 Innovation Summary",
            content: "Dingdong Loans Protocol introduces a decentralized lending solution specifically designed to address Indonesian SME financing challenges. By combining blockchain technology with local regulatory compliance, the protocol bridges the gap between crypto asset ownership and traditional business liquidity needs."
          },
          {
            subtitle: "10.2 Expected Economic Impact",
            impacts: [
              "Improve financing access for 64 million Indonesian SMEs",
              "Reduce dependence on traditional banking systems",
              "Create real utility for cryptocurrency assets",
              "Drive blockchain technology adoption in SME sector",
              "Contribute to Indonesian digital financial inclusion"
            ]
          },
          {
            subtitle: "10.3 Long-term Vision",
            content: "We project Dingdong Loans will become the primary lending infrastructure for Indonesia's crypto-fiat ecosystem, processing over $100 million in loans by 2027 and serving more than 10,000 active SMEs. With a clear roadmap and strategic partnerships, this protocol has the potential to transform Indonesia's SME financing landscape."
          },
          {
            subtitle: "10.4 Call to Action",
            content: "We invite ecosystem stakeholders - from SMEs, investors, to regulators - to join in creating a more inclusive and efficient financing future. Together, we can build bridges between digital and traditional economies for Indonesia's advancement."
          }
        ]
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

      <div className="container mx-auto px-20 py-8">
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
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
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

            {/* Tokenomics */}
            <section id="tokenomics" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-primary" />
                    {currentContent.tokenomics.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none space-y-6">
                  {currentContent.tokenomics.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold mb-4">
                        {section.subtitle}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {section.content}
                      </p>

                      {section.features && (
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                          {section.features.map((feature, featureIndex) => (
                            <li key={featureIndex}>{feature}</li>
                          ))}
                        </ul>
                      )}

                      {section.mechanisms && (
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                          {section.mechanisms.map((mechanism, mechanismIndex) => (
                            <li key={mechanismIndex}>{mechanism}</li>
                          ))}
                        </ul>
                      )}

                      {section.distribution && (
                        <div className="overflow-x-auto mt-4">
                          <table className="w-full border-collapse border border-gray-300">
                            <caption>
                              {language === "id" ? "Distribusi Token" : "Token Distribution"}
                            </caption>
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-300 p-3 text-left">
                                  {language === "id" ? "Kategori" : "Category"}
                                </th>
                                <th className="border border-gray-300 p-3 text-left">
                                  {language === "id" ? "Persentase" : "Percentage"}
                                </th>
                                <th className="border border-gray-300 p-3 text-left">
                                  {language === "id" ? "Deskripsi" : "Description"}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.distribution.map((item, itemIndex) => (
                                <tr key={itemIndex}>
                                  <td className="border border-gray-300 p-3">
                                    {item.category}
                                  </td>
                                  <td className="border border-gray-300 p-3">
                                    {item.percentage}
                                  </td>
                                  <td className="border border-gray-300 p-3">
                                    {item.description}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Security Framework */}
            <section id="security" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Lock className="w-6 h-6 mr-2 text-primary" />
                    {currentContent.security.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none space-y-6">
                  {currentContent.security.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold mb-4">
                        {section.subtitle}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {section.content}
                      </p>

                      {section.layers && (
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                          {section.layers.map((layer, layerIndex) => (
                            <li key={layerIndex}>{layer}</li>
                          ))}
                        </ul>
                      )}

                      {section.riskTypes && (
                        <div className="space-y-4">
                          {section.riskTypes.map((risk, riskIndex) => (
                            <div key={riskIndex} className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-primary mb-2">
                                {risk.type}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {risk.mitigation}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.measures && (
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                          {section.measures.map((measure, measureIndex) => (
                            <li key={measureIndex}>{measure}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Governance Model */}
            <section id="governance" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Users className="w-6 h-6 mr-2 text-primary" />
                    {currentContent.governance.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none space-y-6">
                  {currentContent.governance.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold mb-4">
                        {section.subtitle}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {section.content}
                      </p>

                      {section.rationale && (
                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                          <p className="text-sm text-blue-800 italic">
                            {section.rationale}
                          </p>
                        </div>
                      )}

                      {section.structure && (
                        <div className="space-y-4">
                          {section.structure.map((entity, entityIndex) => (
                            <div key={entityIndex} className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-primary mb-2">
                                {entity.entity}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                <strong>Role:</strong> {entity.role}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                <strong>Composition:</strong> {entity.composition}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.process && (
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                          {section.process.map((step, stepIndex) => (
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

            {/* Development Roadmap */}
            <section id="roadmap" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <ArrowRight className="w-6 h-6 mr-2 text-primary" />
                    {currentContent.roadmap.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none space-y-6">
                  {currentContent.roadmap.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold mb-4">
                        {section.subtitle}
                      </h3>
                      
                      <div className="space-y-4">
                        {section.milestones.map((milestone, milestoneIndex) => (
                          <div key={milestoneIndex} className="border rounded-lg p-4 bg-accent">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-primary">
                                {milestone.title}
                              </h4>
                              <Badge 
                                variant={
                                  milestone.status === "In Progress" ? "default" :
                                  milestone.status === "Planned" ? "secondary" : 
                                  "outline"
                                }
                              >
                                {milestone.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {milestone.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <strong>Timeline:</strong> {milestone.timeline}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Conclusion */}
            <section id="conclusion" className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2 text-primary" />
                    {currentContent.conclusion.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none space-y-6">
                  {currentContent.conclusion.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold mb-4">
                        {section.subtitle}
                      </h3>
                      
                      {section.content && (
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {section.content}
                        </p>
                      )}

                      {section.impacts && (
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          {section.impacts.map((impact, impactIndex) => (
                            <li key={impactIndex}>{impact}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Download Section */}
            <section className="mb-12">
              <Card className="bg-muted-foreground border-primary/20 text-white">
                <CardContent className="text-center py-12">
                  <h3 className="text-2xl font-bold mb-4">
                    {currentContent.getFullWhitepaper.title}
                  </h3>
                  <p className="text-white mb-8 max-w-2xl mx-auto">
                    {currentContent.getFullWhitepaper.description}
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      {currentContent.getFullWhitepaper.downloadFull}
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg"
                      className="text-muted-foreground">
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