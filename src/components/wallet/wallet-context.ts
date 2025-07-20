import { createContext } from "react";

export type WalletContextType = {
	address: string | undefined;
	isConnected: boolean;
	balance: string;
	connect: () => Promise<void>;
	disconnect: () => void;
};

export const WalletContext = createContext<WalletContextType>({
	address: undefined,
	isConnected: false,
	balance: "0",
	connect: async () => {
		console.warn(
			"Connect function should be triggered by XellarKit UI components."
		);
	},
	disconnect: () => {},
});
