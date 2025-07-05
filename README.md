# Dingdong Loans - Web App Lending Protocol

Selamat datang di proyek Dingdong Loans! Aplikasi web ini adalah mockup untuk sebuah protokol pinjaman berbasis collateral kripto, dirancang khusus untuk memenuhi kebutuhan UMKM di Indonesia. Proyek ini dibangun menggunakan Next.js dan Shadcn UI untuk antarmuka yang bersih, modern, dan user-friendly.

**URL Proyek Lovable:** [https://lovable.dev/projects/8e05a2a4-80f0-4b01-924c-67f77c69121a](https://lovable.dev/projects/8e05a2a4-80f0-4b01-924c-67f77c69121a)

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Memulai Proyek (Inisiasi)](#memulai-proyek-inisiasi)
  - [Persyaratan Sistem](#persyaratan-sistem)
  - [Langkah-langkah Instalasi](#langkah-langkah-instalasi)
- [Penggunaan](#penggunaan)
- [Gaya Desain](#gaya-desain)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Fitur Utama

Aplikasi Dingdong Loans mencakup fungsionalitas inti untuk simulasi lending protocol, dengan fokus pada pengalaman pengguna UMKM:

1.  **Registrasi & Login Pengguna:**
    * Halaman pendaftaran yang sederhana dan intuitif.
    * Halaman login untuk pengguna yang sudah terdaftar.

2.  **Proses KYC (Know Your Customer) Bertahap:**
    * **Akses Terbatas:** Halaman KYC hanya dapat diakses setelah pendaftaran berhasil, sebagai langkah selanjutnya dalam alur pengguna.
    * **Verifikasi Identitas:** Input untuk NIK dan unggah foto KTP serta selfie dengan KTP.
    * **Informasi Usaha:** Input untuk nama dan jenis usaha UMKM, serta opsi untuk NPWP dan surat izin usaha.
    * **Konfirmasi & Persetujuan:** Ringkasan data yang diisi dan persetujuan syarat & ketentuan.
    * **Indikator Progres:** Menampilkan langkah-langkah yang sedang berjalan dan yang sudah selesai.

3.  **Dashboard Pengguna:**
    * Ringkasan total jaminan, pinjaman aktif, dan Health Factor.
    * Akses cepat ke fitur-fitur penting seperti pengajuan pinjaman baru, tambah jaminan, bayar pinjaman, kelola pinjaman, dan tarik jaminan.
    * Ikhtisar portofolio jaminan kripto.
    * Tabel transaksi terbaru untuk memantau aktivitas akun.

4.  **Ajukan Pinjaman:**
    * Formulir pengajuan pinjaman dengan input jumlah IDRX yang diinginkan, jenis jaminan kripto, dan jangka waktu pinjaman.
    * Perhitungan real-time untuk estimasi jaminan yang diperlukan, suku bunga, dan pembayaran bulanan.
    * **Alur Pemberian Jaminan:** Setelah aplikasi disetujui secara simulasi, pengguna diarahkan langsung ke halaman `Deposit Collateral` untuk menyetorkan jaminan. Status pinjaman akan diperbarui sesuai progres deposit jaminan.

5.  **Tambah Jaminan (Deposit Collateral):**
    * Memungkinkan pengguna untuk menambahkan jaminan kripto ke pinjaman yang sudah ada atau yang baru diajukan.
    * Pilihan jenis kripto dan jumlah yang akan disetorkan.
    * Menampilkan alamat deposit wallet (dan QR Code simulasi) yang unik untuk setiap jenis kripto.
    * Peringatan penting untuk memastikan pengguna hanya mengirim aset yang benar.
    * Pelacakan status transaksi deposit secara simulasi (Menunggu Konfirmasi, Dikonfirmasi, Selesai).

6.  **Bayar Pinjaman (Repay Loan):**
    * Memungkinkan pengguna untuk melunasi pinjaman aktif mereka.
    * Opsi pembayaran: pelunasan penuh, cicilan bulanan, atau jumlah kustom.
    * Menampilkan alamat pembayaran IDRX (dan QR Code simulasi).
    * Peringatan penting untuk memastikan pengguna hanya mengirim IDRX.
    * Pelacakan status transaksi pembayaran secara simulasi.

7.  **Kelola Pinjaman:**
    * Halaman untuk melihat detail semua pinjaman aktif, termasuk sisa hutang, nilai jaminan, Health Factor, dan tanggal jatuh tempo.
    * Indikator Health Factor dengan warna yang berbeda untuk status aman, peringatan, dan bahaya.
    * Tautan langsung untuk membayar cicilan atau menambah jaminan pada pinjaman tertentu.
    * Jadwal pembayaran yang akan datang.

8.  **Halaman FAQ (Frequently Asked Questions):**
    * Kumpulan pertanyaan dan jawaban umum mengenai platform, proses pinjaman, jaminan, pembayaran, dan keamanan.
    * Fitur pencarian untuk mempermudah pengguna menemukan jawaban.
    * Desain akordeon untuk tampilan yang ringkas dan mudah dinavigasi.

9.  **Halaman About Us (Tentang Kami):**
    * Menjelaskan misi, visi, dan cerita di balik Dingdong Loans.
    * Menyajikan nilai-nilai inti perusahaan (Keamanan, Transparansi, Fokus Pengguna, Inovasi).
    * Bagian tentang komitmen keamanan dan rencana masa depan (roadmap).

10. **Komponen UI Umum:** Navbar, Hero Section, Buttons, Cards, Footer, Input Fields, Skeleton Loaders, dan improvisasi komponen Shadcn UI lainnya (tabel, alert, dll.) untuk pengalaman pengguna yang komprehensif.

## Teknologi yang Digunakan

Proyek ini dibangun dengan teknologi modern untuk memastikan kinerja dan skalabilitas:

* **Framework:** Vite (Sebagai bundler dan dev server untuk React)
* **Library:** React (Untuk membangun antarmuka pengguna)
* **Bahasa:** TypeScript (Untuk penulisan kode yang lebih aman dan terstruktur)
* **Komponen UI:** Shadcn UI (Koleksi komponen UI yang dapat diakses dan dapat disesuaikan)
* **Styling:** Tailwind CSS (Framework CSS untuk styling cepat dan responsif)
* **Routing:** React Router DOM (Untuk navigasi di dalam aplikasi)
* **State Management/Data Fetching:** React Query (atau Tanstack Query) (Untuk pengelolaan state server dan caching data)

## Memulai Proyek (Inisiasi)

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek Dingdong Loans di lingkungan lokal Anda.

### Persyaratan Sistem

Pastikan Anda memiliki:

* **Node.js:** Versi 18.0.0 atau lebih tinggi.
* **npm:** Biasanya terinstal bersama Node.js.

### Langkah-langkah Instalasi

1.  **Clone Repositori:**
    Buka terminal atau command prompt Anda dan clone repositori ini:

    ```bash
    git clone <URL_REPO_ANDA>
    cd dingdong-pinjam-dulu-loan
    ```

2.  **Instal Dependensi:**
    Navigasikan ke direktori proyek dan instal semua dependensi yang diperlukan:

    ```bash
    npm install
    ```
    Atau jika Anda menggunakan Yarn:
    ```bash
    yarn install
    ```

3.  **Jalankan Aplikasi:**
    Setelah semua dependensi terinstal, Anda bisa menjalankan aplikasi dalam mode pengembangan:

    ```bash
    npm run dev
    ```
    Ini akan memulai server pengembangan dan biasanya akan membuka aplikasi di browser Anda (misalnya, `http://localhost:8080`).

## Penggunaan

Aplikasi ini adalah mockup, sehingga tidak ada fungsionalitas backend yang sebenarnya. Namun, Anda bisa menjelajahi alur dan interaksi UI:

* **Registrasi:** Kunjungi `/register` untuk membuat akun simulasi. Setelah berhasil, Anda akan diarahkan ke halaman KYC.
* **Login:** Gunakan `/login` untuk masuk. Anda bisa menggunakan kredensial demo: `user@example.com` / `password`.
* **KYC:** Ikuti langkah-langkah verifikasi identitas dan usaha.
* **Dashboard:** Setelah login (atau melewati KYC), Anda akan melihat ringkasan akun dan opsi untuk berbagai fitur.
* **Ajukan Pinjaman:** Isi detail pinjaman dan ikuti alur untuk "menyetorkan jaminan".
* **Tambah Jaminan / Bayar Pinjaman:** Jelajahi simulasi proses transaksi deposit dan pembayaran.

## Gaya Desain

Dingdong Loans menggunakan gaya desain **simple dan bersih** dengan dominasi **warna putih**, diperkaya dengan **sedikit gradasi biru dan hijau** pada elemen-elemen penting seperti tombol dan ikon. Tampilan ini dirancang agar sangat **user-friendly** dan mudah dipahami oleh **UMKM serta orang awam Web3**, meminimalkan kompleksitas visual.

## Kontribusi

Proyek ini adalah mockup. Jika Anda memiliki saran atau ingin berkontribusi pada pengembangan lebih lanjut (misalnya, menambahkan fitur baru atau meningkatkan UI/UX), silakan buka issue atau ajukan pull request.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
