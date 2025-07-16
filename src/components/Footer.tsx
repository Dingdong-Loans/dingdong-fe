import { Link } from "react-router-dom";
// --- PERUBAHAN: Mengimpor ikon-ikon baru yang dibutuhkan ---
import {
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

const Footer = () => {
  return (
    // --- PERUBAHAN: Menghapus bg-white dari sini agar setiap bagian bisa punya warna sendiri ---
    <footer className="mt-20">
      {/* ================================================================== */}
      {/* ================= BAGIAN BARU: "CONTACT US" (PUTIH) ================ */}
      {/* ================================================================== */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Kolom Kiri: Teks dan Info Kontak */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions contact us via email or phone call. We will
                be very happy to help you!
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-foreground">470-601-1911</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-foreground">
                    contact@moldexpertsofatlanta.com
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground">
                    2271 Rodeo Dr SW, Lilburn, GA 30047
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-foreground">
                    Monday - Friday: 8:00 am - 5:00 pm
                  </span>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Placeholder untuk Gambar */}
            <div>
              <div>
                <img
                  src="/images/footer-image(1).png"
                  alt="Tim kami siap membantu Anda"
                  className="w-full rounded-lg"
                  style={{ maxHeight: '384px', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* ======== FOOTER LAMA ANDA (SEKARANG DENGAN LATAR GELAP) ========= */}
      {/* ================================================================== */}
      <div className="bg-foreground text-background">
        <div className="container mx-auto px-20 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Bagian Kiri: Informasi Brand dan Media Sosial */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl text-white">
                  Dingdong <span className="text-primary">Loans</span>
                </span>
              </Link>
              {/* --- PERUBAHAN: Warna teks disesuaikan agar terlihat di latar gelap --- */}
              <p className="text-background/80 text-sm max-w-xs">
                Dingdong Loans memberdayakan UMKM untuk mengubah aset digital
                mereka menjadi modal usaha yang jelas dan bermanfaat.
              </p>
              <div className="flex items-center space-x-4 pt-2">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-background/80 hover:text-primary"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-background/80 hover:text-primary"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:support@dingdongloans.com"
                  aria-label="Email"
                  className="text-background/80 hover:text-primary"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  aria-label="WhatsApp"
                  className="text-background/80 hover:text-primary"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Bagian Kanan: Kolom Tautan Navigasi */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Produk</h3>
              {/* --- PERUBAHAN: Warna teks disesuaikan --- */}
              <ul className="space-y-3 text-sm text-background/80">
                <li>
                  <Link
                    to="/apply"
                    className="hover:text-primary transition-colors"
                  >
                    Ajukan Pinjaman
                  </Link>
                </li>
                {/* ... (item lainnya sama) ... */}
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
              <h3 className="font-semibold mb-4 text-white">Sumber</h3>
              <ul className="space-y-3 text-sm text-background/80">
                <li>
                  <Link
                    to="/whitepaper"
                    className="hover:text-primary transition-colors"
                  >
                    Whitepaper
                  </Link>
                </li>
                {/* ... (item lainnya sama) ... */}
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
              <h3 className="font-semibold mb-4 text-white">Perusahaan</h3>
              <ul className="space-y-3 text-sm text-background/80">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-primary transition-colors"
                  >
                    Tentang Kami
                  </Link>
                </li>
                {/* ... (item lainnya sama) ... */}
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

          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-background/80">
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
              <Link
                to="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;