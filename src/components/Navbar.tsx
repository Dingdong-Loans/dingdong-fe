import { Button } from "@/components/ui/button";
import { NavLink, Link } from "react-router-dom";
import { useWallet } from "@/hooks/use-wallet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConnectModal } from "@xellar/kit";

const Navbar = () => {
  const { address, isConnected, balance, disconnect } = useWallet();
  const { open } = useConnectModal();

  const handleConnectWallet = () => {
    open();
  };

  const getShortenedAddress = () => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "FAQ", path: "/faq" },
    { name: "Tentang Kami", path: "/about" },
    { name: "Whitepaper", path: "/whitepaper" },
    // { name: "Admin Dashboard", path: "/admindashboard" }
    // { name: "Syarat & Ketentuan", path: "/terms" },
  ];

  return (
    <header className="bg-white">
      {/* PERUBAHAN: Mengubah padding horizontal dari px-20 menjadi px-4 agar sama dengan halaman lain. 
    Ini akan membuat lebar konten di dalam Navbar sejajar dengan konten halaman. */}
      <nav className="container mx-auto px-20 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-foreground">
          Dingdong <span className="text-primary">Loans</span>
        </Link>

        {/* Navigation Links */}
        <div className=" md:flex items-center space-x-1 bg-muted p-2 rounded-md">
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
              className="bg-primary hover:bg-primary/90 text-white font-semibold"
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
                <DropdownMenuItem className="font-medium text-sm">
                  Balance: {parseFloat(balance).toFixed(4)} ETH
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={disconnect}
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
