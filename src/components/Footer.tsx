import { Link } from "react-router-dom";
// --- PERUBAHAN: Mengimpor ikon media sosial yang dibutuhkan ---
import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    // --- PERUBAHAN: Padding diatur agar sesuai dengan desain baru ---
    <footer className="bg-white mt-20">
      <div className="container mx-auto px-20 py-12">
        {/* --- PERUBAHAN: Menggunakan grid untuk layout utama --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Bagian Kiri: Informasi Brand dan Media Sosial */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">
                Dingdong <span className="text-primary">Loans</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Dingdong Loans memberdayakan UMKM untuk mengubah aset digital
              mereka menjadi modal usaha yang jelas dan bermanfaat.
            </p>
            {/* --- PERUBAHAN: Menambahkan ikon media sosial --- */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="#"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@dingdongloans.com"
                aria-label="Email"
                className="text-muted-foreground hover:text-primary"
              >
                <Mail className="w-5 h-5" />
              </a>
              {/* NOTE: lucide-react tidak memiliki ikon WhatsApp, jadi kita gunakan MessageCircle sebagai placeholder */}
              <a
                href="#"
                aria-label="WhatsApp"
                className="text-muted-foreground hover:text-primary"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Bagian Kanan: Kolom Tautan Navigasi */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Produk</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/apply"
                  className="hover:text-primary transition-colors"
                >
                  Ajukan Pinjaman
                </Link>
              </li>
              <li>
                <Link
                  to="/loans"
                  className="hover:text-primary transition-colors"
                >
                  Kelola Pinjaman
                </Link>
              </li>
              <li>
                <Link
                  to="/manage-collateral"
                  className="hover:text-primary transition-colors"
                >
                  Jaminan
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Sumber</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/whitepaper"
                  className="hover:text-primary transition-colors"
                >
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privasi Data
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Perusahaan</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Karir
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Kontak
                </Link>
              </li>
              <li>
                <Link
                  to="/partner"
                  className="hover:text-primary transition-colors"
                >
                  Partner
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* --- PERUBAHAN: Menambahkan garis pemisah dan bagian bawah footer --- */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p className="mb-4 sm:mb-0">
            &copy; 2025 Dingdong Loans. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
