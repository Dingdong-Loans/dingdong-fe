import { useContext } from "react";
import { WalletContext } from "../components/wallet/wallet-context";

export const useWallet = () => useContext(WalletContext);
