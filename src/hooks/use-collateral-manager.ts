import { useState } from "react";
import { contractUtils, CONTRACT_ADDRESSES } from "@/lib/contract-utils";
import { COLLATERAL_MANAGER_ABI } from "@/abis/collateral-manager";
import { useWallet } from "./use-wallet";
import { useToast } from "./use-toast";

// Simple cache for read operations to prevent spam
const readCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5000; // 5 seconds cache


// Custom hook for all CollateralManager contract interactions
export const useCollateralManager = () => {
	const { address, isConnected } = useWallet();
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleError = (err: unknown, operation: string) => {
		const errorMessage =
			err instanceof Error ? err.message : `${operation} failed`;
		setError(errorMessage);
		setLoading(false);
		toast({
			variant: "destructive",
			title: "Transaction Failed",
			description: errorMessage,
		});
		throw err;
	};

	const executeTransaction = async (
		operation: string,
		fn: () => Promise<unknown>
	) => {
		if (!isConnected || !address) {
			throw new Error("Wallet not connected");
		}

		if (
			!CONTRACT_ADDRESSES.COLLATERAL_MANAGER ||
			CONTRACT_ADDRESSES.COLLATERAL_MANAGER === "0x"
		) {
			throw new Error("Contract address not configured");
		}

		setLoading(true);
		setError(null);

		try {
			const result = await fn();
			setLoading(false);
			toast({
				title: "Transaction Successful",
				description: `${operation} completed successfully`,
			});
			return result;
		} catch (err) {
			handleError(err, operation);
		}
	};

	const executeRead = async (
		operation: string,
		fn: () => Promise<unknown>,
		cacheKey?: string
	) => {
		if (
			!CONTRACT_ADDRESSES.COLLATERAL_MANAGER ||
			CONTRACT_ADDRESSES.COLLATERAL_MANAGER === "0x"
		) {
			throw new Error("Contract address not configured");
		}

		// Check cache if cache key is provided
		if (cacheKey) {
			const cached = readCache.get(cacheKey);
			if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
				return cached.data;
			}
		}

		setError(null);

		try {
			const result = await fn();

			// Cache the result if cache key is provided
			if (cacheKey) {
				readCache.set(cacheKey, {
					data: result,
					timestamp: Date.now(),
				});
			}

			return result;
		} catch (err) {
			handleError(err, operation);
		}
	};

	// READ FUNCTIONS (No gas required)

	// Contract state getters
	const getDepositedCollateral = (
		user: `0x${string}`,
		token: `0x${string}`
	) =>
		executeRead("Get Deposited Collateral", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"getDepositedCollateral",
				[user, token]
			)
		);

	const getOwner = () =>
		executeRead("Get Owner", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"owner"
			)
		);

	const getProxiableUUID = () =>
		executeRead("Get Proxiable UUID", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"proxiableUUID"
			)
		);

	const getUpgradeInterfaceVersion = () =>
		executeRead("Get Upgrade Interface Version", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"UPGRADE_INTERFACE_VERSION"
			)
		);

	// Storage getters
	const getCollateralBalance = (user: `0x${string}`, token: `0x${string}`) =>
		executeRead("Get Collateral Balance", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"s_collateralBalance",
				[user, token]
			)
		);

	const getCollateralToken = (index: bigint | number) =>
		executeRead("Get Collateral Token", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"s_collateralTokens",
				[BigInt(index)]
			)
		);

	const isCollateralTokenSupported = (token: `0x${string}`) =>
		executeRead("Check Collateral Token Support", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"s_isCollateralTokenSupported",
				[token]
			)
		);

	// WRITE FUNCTIONS (Require gas and wallet signature)

	// Token management (Owner required)
	const addCollateralToken = (token: `0x${string}`) =>
		executeTransaction("Add Collateral Token", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"addCollateralToken",
				[token]
			)
		);

	const removeCollateralToken = (token: `0x${string}`) =>
		executeTransaction("Remove Collateral Token", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"removeCollateralToken",
				[token]
			)
		);

	// Ownership functions
	const initialize = (initialOwner: `0x${string}`) =>
		executeTransaction("Initialize", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"initialize",
				[initialOwner]
			)
		);

	const renounceOwnership = () =>
		executeTransaction("Renounce Ownership", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"renounceOwnership"
			)
		);

	const transferOwnership = (newOwner: `0x${string}`) =>
		executeTransaction("Transfer Ownership", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"transferOwnership",
				[newOwner]
			)
		);

	const upgradeToAndCall = (
		newImplementation: `0x${string}`,
		data: `0x${string}`
	) =>
		executeTransaction("Upgrade To And Call", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"upgradeToAndCall",
				[newImplementation, data]
			)
		);

	// User operations
	const deposit = (
		user: `0x${string}`,
		token: `0x${string}`,
		amount: bigint
	) =>
		executeTransaction("Deposit Collateral", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"deposit",
				[user, token, amount]
			)
		);

	const withdraw = (
		user: `0x${string}`,
		token: `0x${string}`,
		amount: bigint
	) =>
		executeTransaction("Withdraw Collateral", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
				COLLATERAL_MANAGER_ABI,
				"withdraw",
				[user, token, amount]
			)
		);

	return {
		// State
		loading,
		error,

		// Read functions
		getDepositedCollateral,
		getOwner,
		getProxiableUUID,
		getUpgradeInterfaceVersion,
		getCollateralBalance,
		getCollateralToken,
		isCollateralTokenSupported,

		// Write functions
		addCollateralToken,
		removeCollateralToken,
		initialize,
		renounceOwnership,
		transferOwnership,
		upgradeToAndCall,
		deposit,
		withdraw,
	};
};
