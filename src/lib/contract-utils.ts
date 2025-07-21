import {
	createPublicClient,
	createWalletClient,
	custom,
	http,
	Abi,
} from "viem";
import { liskSepolia } from "viem/chains";

// Public client for reading from the blockchain
export const publicClient = createPublicClient({
	chain: liskSepolia,
	transport: http("https://rpc.sepolia-api.lisk.com"),
});

// Function to get wallet client for transactions
export const getWalletClient = () => {
	if (typeof window !== "undefined" && window.ethereum) {
		return createWalletClient({
			chain: liskSepolia,
			transport: custom(window.ethereum),
		});
	}
	throw new Error("No wallet detected");
};

// Example contract interaction functions
export const contractUtils = {
	// Read from contract (no gas required)
	async readContract(
		contractAddress: `0x${string}`,
		abi: Abi,
		functionName: string,
		args?: unknown[]
	) {
		try {
			const result = await publicClient.readContract({
				address: contractAddress,
				abi,
				functionName,
				args,
			});
			return result;
		} catch (error) {
			console.error("Error reading contract:", error);
			throw error;
		}
	},

	// Write to contract (requires gas and wallet signature)
	async writeContract(
		contractAddress: `0x${string}`,
		abi: Abi,
		functionName: string,
		args?: unknown[],
		value?: bigint
	) {
		try {
			const walletClient = getWalletClient();
			const [account] = await walletClient.getAddresses();

			const { request } = await publicClient.simulateContract({
				address: contractAddress,
				abi,
				functionName,
				args,
				account,
				value,
			});

			const hash = await walletClient.writeContract(request);

			// Wait for transaction confirmation
			const receipt = await publicClient.waitForTransactionReceipt({
				hash,
			});

			return { hash, receipt };
		} catch (error) {
			console.error("Error writing to contract:", error);
			throw error;
		}
	},

	// Get transaction receipt
	async getTransactionReceipt(hash: `0x${string}`) {
		try {
			return await publicClient.getTransactionReceipt({ hash });
		} catch (error) {
			console.error("Error getting transaction receipt:", error);
			throw error;
		}
	},

	// Get current block number
	async getBlockNumber() {
		try {
			return await publicClient.getBlockNumber();
		} catch (error) {
			console.error("Error getting block number:", error);
			throw error;
		}
	},
};

// Complete LendingCore contract ABI

// prettier-ignore-end

export const SUPPORTED_COLLATERAL_TOKENS = [
	{
		CONTRACT_ADDRESS:
			"0xE056112864e6cD267224AF53D03572761f6377ef" as `0x${string}`, // Replace with actual address
		TOKEN_SYMBOL: "wETH",
		TOKEN_NAME: "Wrapped Ethereum",
		DECIMALS: 18,
		// PRICE_FEED: "0x" as `0x${string}`, // Replace with actual price feed address
	},
	{
		CONTRACT_ADDRESS:
			"0xc5913494E2A6A0468d44C3110dFEEb82B334A25F" as `0x${string}`, // Replace with actual address
		TOKEN_SYMBOL: "wBTC",
		TOKEN_NAME: "Wrapped Bitcoin",
		DECIMALS: 8,
		// PRICE_FEED: "0x" as `0x${string}`, // Replace with actual price feed address
	},
] as const;

export const SUPPORTED_BORROW_TOKENS = [
	{
		CONTRACT_ADDRESS:
			"0x9C00f2e18463943817730024cb8FeD77310893CE" as `0x${string}`, // Replace with actual address
		TOKEN_SYMBOL: "USDT",
		TOKEN_NAME: "Tether USD",
		DECIMALS: 18,
	},
	{
		CONTRACT_ADDRESS:
			"0x5B1037d2237D55798eF4aba529cB77Cd215580dd" as `0x${string}`, // Replace with actual address
		TOKEN_SYMBOL: "IDRX",
		TOKEN_NAME: "IDRX",
		DECIMALS: 2,
	},
] as const;

export const SUPPORTED_TOKENS = [
	{
		CONTRACT_ADDRESS:
			"0x9C00f2e18463943817730024cb8FeD77310893CE" as `0x${string}`, // Replace with actual address
		TOKEN_SYMBOL: "USDT",
		TOKEN_NAME: "Tether USD",
		DECIMALS: 18,
		COLLATERAL_TOKEN: false,
		BORROW_TOKEN: true,
		LTV: 0,
	},
	{
		CONTRACT_ADDRESS:
			"0x5B1037d2237D55798eF4aba529cB77Cd215580dd" as `0x${string}`, // Replace with actual address
		TOKEN_SYMBOL: "IDRX",
		TOKEN_NAME: "IDRX",
		DECIMALS: 2,
		COLLATERAL_TOKEN: false,
		BORROW_TOKEN: true,
		LTV: 0,
	},
	{
		CONTRACT_ADDRESS:
			"0xE056112864e6cD267224AF53D03572761f6377ef" as `0x${string}`, // Replace with actual address
		TOKEN_SYMBOL: "wETH",
		TOKEN_NAME: "Wrapped Ethereum",
		DECIMALS: 18,
		COLLATERAL_TOKEN: true,
		BORROW_TOKEN: false,
		LTV: 0.7,
	},
	{
		CONTRACT_ADDRESS:
			"0xc5913494E2A6A0468d44C3110dFEEb82B334A25F" as `0x${string}`, // Replace with actual address
		TOKEN_SYMBOL: "wBTC",
		TOKEN_NAME: "Wrapped Bitcoin",
		DECIMALS: 8,
		COLLATERAL_TOKEN: true,
		BORROW_TOKEN: false,
		LTV: 0.8,
	},
];

// Example contract addresses (replace with your actual deployed contracts)
export const CONTRACT_ADDRESSES = {
	LOAN_CONTRACT:
		"0xC47B1331F77802E158e360374EFe7e00EBC114C3" as `0x${string}`, // Replace with actual address
	COLLATERAL_MANAGER:
		"0x6285324964E0Da94822bE2BcD0eDeB5126536B36" as `0x${string}`, // Replace with actual address
} as const;

// Function to fetch wallet token balances for all supported tokens
export async function getWalletTokenBalances() {
	const walletClient = getWalletClient();
	const [account] = await walletClient.getAddresses();
	try {
		// Fetch balances for all supported tokens (both collateral and borrow tokens)
		const walletBalances = await Promise.all(
			SUPPORTED_TOKENS.map(async (token) => {
				const balance = await contractUtils.readContract(
					token.CONTRACT_ADDRESS,
					[
						{
							name: "balanceOf",
							type: "function",
							inputs: [{ name: "account", type: "address" }],
							outputs: [{ name: "", type: "uint256" }],
							stateMutability: "view",
						},
					] as const,
					"balanceOf",
					[account]
				);

				return {
					symbol: token.TOKEN_SYMBOL,
					balance:
						Number(
							(BigInt(balance as string) * BigInt(1000000)) /
								BigInt(10 ** token.DECIMALS)
						) / 1000000,
					decimals: token.DECIMALS,
					address: token.CONTRACT_ADDRESS,
					isCollateralToken: token.COLLATERAL_TOKEN,
					isBorrowToken: token.BORROW_TOKEN,
				};
			})
		);

		return {
			walletBalances,
		};
	} catch (error) {
		console.error("Error fetching token balances:", error);
		throw error;
	}
}
