import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet, LogOut } from "lucide-react";

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnectWallet = () => {
    // Simulasi koneksi wallet
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

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DD</span>
          </div>
          <span className="font-bold text-xl text-foreground">
            Dingdong Loans
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Beranda
          </Link>
          <Link
            to="/dashboard"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/faq"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
          <Link
            to="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Tentang Kami
          </Link>
          <Link
            to="/whitepaper"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Whitepaper
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          {!isConnected ? (
            <Button
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              size="sm"
              onClick={handleConnectWallet}
            >
              <Wallet className="w-4 h-4 mr-2" />
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
      </div>
    </nav>
  );
};

export default Navbar;
