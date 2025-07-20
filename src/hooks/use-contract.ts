import { useState, useEffect, useCallback } from "react";
import { useWallet } from "./use-wallet";
import {
	contractUtils,
	LOAN_CONTRACT_ABI,
	CONTRACT_ADDRESSES,
} from "@/lib/contract-utils";

// Re-export the comprehensive hook
export { useLendingCore, type Loan } from "./use-lending-core";

// Simplified hook for basic loan operations (backward compatibility)
export const useLoanContract = () => {
	const { address, isConnected } = useWallet();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Basic borrow function
	const createLoan = async (
		borrowToken: `0x${string}`,
		amount: bigint,
		collateralToken: `0x${string}`,
		duration: bigint
	) => {
		if (!isConnected || !address) {
			throw new Error("Wallet not connected");
		}

		if (
			!CONTRACT_ADDRESSES.LOAN_CONTRACT ||
			CONTRACT_ADDRESSES.LOAN_CONTRACT === "0x"
		) {
			throw new Error("Loan contract address not configured");
		}

		setLoading(true);
		setError(null);

		try {
			const result = await contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"borrow",
				[borrowToken, amount, collateralToken, duration]
			);
			setLoading(false);
			return result;
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Unknown error occurred";
			setError(errorMessage);
			setLoading(false);
			throw err;
		}
	};

	// Get available supply for a token
	const getAvailableSupply = async (borrowToken: `0x${string}`) => {
		if (
			!CONTRACT_ADDRESSES.LOAN_CONTRACT ||
			CONTRACT_ADDRESSES.LOAN_CONTRACT === "0x"
		) {
			throw new Error("Loan contract address not configured");
		}

		setLoading(true);
		setError(null);

		try {
			const result = await contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"getAvailableSupply",
				[borrowToken]
			);
			setLoading(false);
			return result;
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Unknown error occurred";
			setError(errorMessage);
			setLoading(false);
			throw err;
		}
	};

	return {
		loading,
		error,
		createLoan,
		getAvailableSupply,
		isConnected,
		address,
	};
};

// Custom hook for getting user's loan data
export const useUserLoans = () => {
	const { address, isConnected } = useWallet();
	const [loans, setLoans] = useState<unknown[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchUserLoans = useCallback(async () => {
		if (!isConnected || !address) {
			setLoans([]);
			return;
		}

		if (
			!CONTRACT_ADDRESSES.LOAN_CONTRACT ||
			CONTRACT_ADDRESSES.LOAN_CONTRACT === "0x"
		) {
			setError("Loan contract address not configured");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			// This is an example - you'll need to implement the actual contract method
			const userLoans = await contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"getUserLoans",
				[address]
			);

			setLoans(Array.isArray(userLoans) ? userLoans : []);
			setLoading(false);
		} catch (err) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "Failed to fetch user loans";
			setError(errorMessage);
			setLoading(false);
		}
	}, [address, isConnected]);

	useEffect(() => {
		fetchUserLoans();
	}, [fetchUserLoans]);

	return {
		loans,
		loading,
		error,
		refetch: fetchUserLoans,
	};
};
