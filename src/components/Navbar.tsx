import { Button } from "@/components/ui/button";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnectWallet = () => {
    const mockAddress = "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t";
    setWalletAddress(mockAddress);
    setIsConnected(true);
    toast({
      title: "Wallet Terhubung",
      description: `Alamat Anda: ${mockAddress.substring(
        0,
        6
      )}...${mockAddress.substring(mockAddress.length - 4)}`,
    });
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress(null);
    toast({
      title: "Koneksi Terputus",
      description: "Wallet Anda telah diputuskan.",
    });
  };

  const getShortenedAddress = () => {
    if (!walletAddress) return "";
    return `${walletAddress.substring(0, 6)}...${walletAddress.substring(
      walletAddress.length - 4
    )}`;
  };

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "FAQ", path: "/faq" },
    { name: "Tentang Kami", path: "/about" },
    { name: "Whitepaper", path: "/whitepaper" },
    { name: "Admin Dashboard", path: "/admindashboard" }
    // { name: "Syarat & Ketentuan", path: "/terms" },
  ];

  return (
    <header className="bg-white">
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-foreground">
          Dingdong Loans
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-2 bg-white p-1 rounded-md">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white" // Warna teks putih untuk link aktif
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Wallet Button */}
        <div className="flex items-center space-x-3">
          {!isConnected ? (
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {getShortenedAddress()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleDisconnect}
                  className="text-red-600 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
