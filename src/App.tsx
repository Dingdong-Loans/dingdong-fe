// import komponen yang dibutuhkan
import { Toaster } from "@/components/ui/toaster"; //komponen untuk menampilkan notifikasi pada web
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WalletProvider } from "@/components/wallet/wallet-provider";

// @tanstack/react-query untuk mengambil dan mengolah data dari server.
// Tapi, karena ini cmn mockup, dia dipake karena best practice yang ada,
// dia juga buat simulasi gimana nanti kalau kita sudah pasang backendnya.
// Library ini juga bantu state management supaya lebih gampang kalau berurusan dengan
// data, seperti loading, error, dan success/
// NOTE: QueryClient is now handled by WalletProvider which includes wagmi integration

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
import AdminDashboard from "./pages/AdminDashboard";
import TermsAndGuidelines from "./pages/TermsAndGuidelines";
import PrivacyPolicy from "./pages/Privacy";
import Partner from "./pages/Partner";
import LendingDashboard from "./components/LendingDashboard";

// NOTE: QueryClient is now handled by WalletProvider which includes wagmi integration
// queryClient dibuat di file App.tsx supaya bisa menyimpan cache secara
// global (menyimpan seluruh cache dari web)
// queryClient dibuat di file App.tsx supaya bisa menyimpan cache secara
// global (menyimpan seluruh cache dari web)

const App = () => (
  // WalletProvider wraps everything to provide wallet functionality
  <WalletProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lendingdashboard" element={<LendingDashboard />} />
          <Route path="/apply" element={<ApplyLoan />} />
          <Route path="/loans" element={<ManageLoans />} />
          <Route path="/manage-collateral" element={<ManageCollateral />} />
          <Route path="/repay-loan" element={<RepayLoan />} />
          <Route path="/kyc" element={<KYC />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/terms" element={<TermsAndGuidelines />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/partner" element={<Partner />} />
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </WalletProvider>
);

export default App;
