// import komponen yang dibutuhkan
import { Toaster } from "@/components/ui/toaster"; //komponen untuk menampilkan notifikasi pada web
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// @tanstack/react-query untuk mengambil dan mengolah data dari server.
// Tapi, karena ini cmn mockup, dia dipake karena best practice yang ada,
// dia juga buat simulasi gimana nanti kalau kita sudah pasang backendnya.
// Library ini juga bantu state management supaya lebih gampang kalau berurusan dengan
// data, seperti loading, error, dan success/
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// react-router-dom digunakan untuk routing di react
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import semua halaman yang ada pada web
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import ApplyLoan from "./pages/ApplyLoan";
import ManageLoans from "./pages/ManageLoans";
import ManageCollateral from "./pages/ManageCollateral";
import RepayLoan from "./pages/RepayLoan";
import KYC from "./pages/KYC";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Whitepaper from "./pages/Whitepaper";

// queryClient digunakan untuk management data, walaupun ini hanya mockup.
// Variabel ini berfungsi untuk menyimpan cache dari web,
// sehingga pengambilan data yang sama akan lebih cepat.
// queryClient dibuat di file App.tsx supaya bisa menyimpan cache secara
// global (menyimpan seluruh cache dari web)
const queryClient = new QueryClient(); //inisiasi library

const App = () => (
  // QueryClientProvider membungkus semuanya supaya seluruh halaman yang
  // ada di web ini dapat menggunakan management data yang sama. Sehingga mereka
  // bisa menggunakan queryClient yang ada dengan satu kali inisiasi di file ini
  <QueryClientProvider client={queryClient}>
    {/* tooltip provider digunakan disini untuk membungkus keseluruhan web
     supaya keseluruhan bagian di web ini dapat menggunakan fungsionalitas 
     dari tootip dengan satu kali inisiasi. tooltip digunakan untuk memberikan 
     informasi jika kita mengarahkan kursor ke ikon atau tombol yang ada 
     di web ini. */}
    <TooltipProvider>
      {/* Toaster dan Sonner digunakan disini supaya keseluruhan halaman dari web
      dapat menerima notifikasi yang ada dari web */}
      <Toaster />
      <Sonner />

      {/* BrowserRouter digunakan untuk menavigasi keseluruhan link aktif yang
      ada di web ini. Komponen ini yang menghubungkan web dengan URL di 
      address bar browser. */}
      <BrowserRouter>
        {/* kumpulan route yang ada di web ini */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apply" element={<ApplyLoan />} />
          <Route path="/loans" element={<ManageLoans />} />
          <Route path="/manage-collateral" element={<ManageCollateral />} />
          <Route path="/repay-loan" element={<RepayLoan />} />
          <Route path="/kyc" element={<KYC />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
