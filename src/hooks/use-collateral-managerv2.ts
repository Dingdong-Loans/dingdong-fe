import {
	useWriteContract,
	useWaitForTransactionReceipt,
	useReadContract,
	type Address,
	useReadContracts,
} from "wagmi";
import { BaseError } from "viem";
import { COLLATERAL_MANAGER_ABI } from "@/abis/collateral-manager";
import {
	CONTRACT_ADDRESSES,
	contractUtils,
	SUPPORTED_TOKENS,
	publicClient,
} from "@/lib/contract-utils";
import { useState, useEffect, useCallback } from "react";

// Types for parameters
type DepositParams = {
	user: Address;
	token: Address;
	amount: bigint;
};

type WithdrawParams = {
	user: Address;
	token: Address;
	amount: bigint;
};

type TokenManagementParams = {
	token: Address;
};

type OwnershipParams = {
	newOwner: Address;
};

type UpgradeParams = {
	newImplementation: Address;
	data: `0x${string}`;
};

// Write Functions
export function useDeposit() {
	const {
		data: hash,
		isPending,
		writeContractAsync,
		error,
	} = useWriteContract();

	const {
		isLoading: isConfirming,
		isSuccess,
		isError,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash,
	});

	const deposit = async ({ user, token, amount }: DepositParams) => {
		const result = await writeContractAsync({
			address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
			abi: COLLATERAL_MANAGER_ABI,
			functionName: "deposit",
			args: [user, token, amount],
		});

		if (!result) {
			throw new Error("Failed to submit deposit transaction");
		}

		return result;
	};

	return {
		deposit,
		isPending,
		isWaiting: isConfirming,
		isSuccess,
		isError,
		error: error as BaseError | null,
		receipt,
		txHash: hash,
	};
}

export function useWithdraw() {
	const {
		data: hash,
		isPending,
		writeContractAsync,
		error,
	} = useWriteContract();

	const {
		isLoading: isConfirming,
		isSuccess,
		isError,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash,
	});

	const withdraw = async ({ user, token, amount }: WithdrawParams) => {
		const result = await writeContractAsync({
			address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
			abi: COLLATERAL_MANAGER_ABI,
			functionName: "withdraw",
			args: [user, token, amount],
		});

		if (!result) {
			throw new Error("Failed to submit withdraw transaction");
		}

		return result;
	};

	return {
		withdraw,
		isPending,
		isWaiting: isConfirming,
		isSuccess,
		isError,
		error: error as BaseError | null,
		receipt,
		txHash: hash,
	};
}

export function useAddCollateralToken() {
	const {
		data: hash,
		isPending,
		writeContractAsync,
		error,
	} = useWriteContract();

	const {
		isLoading: isConfirming,
		isSuccess,
		isError,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash,
	});

	const addToken = async ({ token }: TokenManagementParams) => {
		const result = await writeContractAsync({
			address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
			abi: COLLATERAL_MANAGER_ABI,
			functionName: "addCollateralToken",
			args: [token],
		});

		if (!result) {
			throw new Error(
				"Failed to submit add collateral token transaction"
			);
		}

		return result;
	};

	return {
		addToken,
		isPending,
		isWaiting: isConfirming,
		isSuccess,
		isError,
		error: error as BaseError | null,
		receipt,
		txHash: hash,
	};
}

export function useRemoveCollateralToken() {
	const {
		data: hash,
		isPending,
		writeContractAsync,
		error,
	} = useWriteContract();

	const {
		isLoading: isConfirming,
		isSuccess,
		isError,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash,
	});

	const removeToken = async ({ token }: TokenManagementParams) => {
		const result = await writeContractAsync({
			address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
			abi: COLLATERAL_MANAGER_ABI,
			functionName: "removeCollateralToken",
			args: [token],
		});

		if (!result) {
			throw new Error(
				"Failed to submit remove collateral token transaction"
			);
		}

		return result;
	};

	return {
		removeToken,
		isPending,
		isWaiting: isConfirming,
		isSuccess,
		isError,
		error: error as BaseError | null,
		receipt,
		txHash: hash,
	};
}

export function useTransferOwnership() {
	const {
		data: hash,
		isPending,
		writeContractAsync,
		error,
	} = useWriteContract();

	const {
		isLoading: isConfirming,
		isSuccess,
		isError,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash,
	});

	const transferOwnership = async ({ newOwner }: OwnershipParams) => {
		const result = await writeContractAsync({
			address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
			abi: COLLATERAL_MANAGER_ABI,
			functionName: "transferOwnership",
			args: [newOwner],
		});

		if (!result) {
			throw new Error("Failed to submit transfer ownership transaction");
		}

		return result;
	};

	return {
		transferOwnership,
		isPending,
		isWaiting: isConfirming,
		isSuccess,
		isError,
		error: error as BaseError | null,
		receipt,
		txHash: hash,
	};
}

export function useUpgradeToAndCall() {
	const {
		data: hash,
		isPending,
		writeContractAsync,
		error,
	} = useWriteContract();

	const {
		isLoading: isConfirming,
		isSuccess,
		isError,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash,
	});

	const upgrade = async ({ newImplementation, data }: UpgradeParams) => {
		const result = await writeContractAsync({
			address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
			abi: COLLATERAL_MANAGER_ABI,
			functionName: "upgradeToAndCall",
			args: [newImplementation, data],
		});

		if (!result) {
			throw new Error("Failed to submit upgrade transaction");
		}

		return result;
	};

	return {
		upgrade,
		isPending,
		isWaiting: isConfirming,
		isSuccess,
		isError,
		error: error as BaseError | null,
		receipt,
		txHash: hash,
	};
}

// Read-only hooks
export function useGetDepositedCollateral(user: Address, token: Address) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
		abi: COLLATERAL_MANAGER_ABI,
		functionName: "getDepositedCollateral",
		args: [user, token],
	});

	return {
		depositedCollateral: data as bigint | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

// Alternative approach using publicClient directly
export function useBatchGetDepositedCollateral(user: Address) {
	const collateralTokens = SUPPORTED_TOKENS.filter(
		(token) => token.COLLATERAL_TOKEN === true
	);

	const contracts = collateralTokens.map((token) => ({
		address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
		abi: COLLATERAL_MANAGER_ABI,
		functionName: "getDepositedCollateral",
		args: [user, token.CONTRACT_ADDRESS],
	}));
	console.log(contracts);

	const {
		data,
		isLoading,
		error,
		refetch: internalRefetch,
	} = useReadContracts({
		contracts,
		account: user,
		query: {
			refetchInterval: 1000,
			refetchIntervalInBackground: true,
			retry: 3,
		},
	});

	const [collaterals, setCollaterals] = useState<
		(SupportedToken & { depositedCollateral: bigint | undefined })[]
	>(() => {
		return collateralTokens.map((token) => ({
			...token,
			depositedCollateral: undefined,
		}));
	});

	// transform data when data updates
	useEffect(() => {
		if (!data) return;
		console.log("getdepositedcollateral", data);
		const transformed = data.map((result, index) => ({
			...collateralTokens[index],
			depositedCollateral:
				result.status === "success"
					? (result.result as unknown as bigint)
					: undefined,
		}));

		setCollaterals(transformed);
	}, [data]);

	// Expose a manual refetch wrapper
	const refetch = async () => {
		const res = await internalRefetch();
		if (!res.data) return;

		const transformed = res.data.map((result, index) => ({
			...collateralTokens[index],
			depositedCollateral:
				result.status === "success"
					? (result.result as unknown as bigint)
					: undefined,
		}));

		setCollaterals(transformed);
	};

	return {
		collaterals,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

// Advanced version using multicall for better efficiency
export function useMulticallDepositedCollateral(user: Address) {
	const collateralTokens = SUPPORTED_TOKENS.filter(
		(token) => token.COLLATERAL_TOKEN === true
	);
	const [collateralsWithBalance, setCollateralsWithBalance] = useState<
		(SupportedToken & { depositedCollateral?: bigint })[]
	>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<BaseError | null>(null);

	// Effect to load all collateral balances using multicall
	useEffect(() => {
		if (!user) {
			setIsLoading(false);
			return;
		}

		const CACHE_TIME = 10000; // 10 seconds cache
		let lastFetchTime = 0;
		let cachedResults:
			| (SupportedToken & { depositedCollateral?: bigint })[]
			| null = null;

		const fetchCollateralsWithMulticall = async () => {
			try {
				setIsLoading(true);

				// Check if we have valid cached data
				const now = Date.now();
				if (cachedResults && now - lastFetchTime < CACHE_TIME) {
					setCollateralsWithBalance(cachedResults);
					setIsLoading(false);
					return;
				}

				// Prepare contract calls for multicall
				const calls = collateralTokens.map((token) => ({
					address:
						CONTRACT_ADDRESSES.COLLATERAL_MANAGER as `0x${string}`,
					abi: COLLATERAL_MANAGER_ABI,
					functionName: "getDepositedCollateral",
					args: [user, token.CONTRACT_ADDRESS],
				}));

				// Execute multicall
				const results = await publicClient.multicall({
					contracts: calls,
					allowFailure: true,
				});

				// Process results
				const balances = results.map((result, index) => {
					const token = collateralTokens[index];
					return {
						...token,
						depositedCollateral:
							result.status === "success"
								? BigInt(String(result.result))
								: undefined,
					};
				});

				// Update cache
				cachedResults = balances;
				lastFetchTime = now;

				setCollateralsWithBalance(balances);
				setError(null);
			} catch (err) {
				console.error(
					"Error in multicall for collateral balances:",
					err
				);
				setError(err as BaseError);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCollateralsWithMulticall();
	}, [user, collateralTokens]);

	// Function to refetch balances with multicall
	const refetch = useCallback(async () => {
		if (!user) return;

		setIsLoading(true);
		try {
			// Prepare contract calls for multicall
			const calls = collateralTokens.map((token) => ({
				address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER as `0x${string}`,
				abi: COLLATERAL_MANAGER_ABI,
				functionName: "getDepositedCollateral",
				args: [user, token.CONTRACT_ADDRESS],
			}));

			// Execute multicall
			const results = await publicClient.multicall({
				contracts: calls,
				allowFailure: true,
			});

			// Process results
			const balances = results.map((result, index) => {
				const token = collateralTokens[index];
				return {
					...token,
					depositedCollateral:
						result.status === "success"
							? BigInt(String(result.result))
							: undefined,
				};
			});

			setCollateralsWithBalance(balances);
			setError(null);
		} catch (err) {
			console.error(
				"Error refetching collateral balances with multicall:",
				err
			);
			setError(err as BaseError);
		} finally {
			setIsLoading(false);
		}
	}, [user, collateralTokens]);

	return {
		collaterals: collateralsWithBalance,
		isLoading,
		error,
		refetch,
	};
}

// Define a type for the collateral token with deposited amount
interface SupportedToken {
	CONTRACT_ADDRESS: `0x${string}`;
	TOKEN_SYMBOL: string;
	TOKEN_NAME: string;
	DECIMALS: number;
	COLLATERAL_TOKEN: boolean;
	BORROW_TOKEN: boolean;
	LTV: number;
}

type CollateralWithDeposit = SupportedToken & {
	depositedCollateral?: bigint;
	error?: BaseError;
};

// New hook to get multiple deposited collaterals at once
export function useGetAllDepositedCollaterals(user: Address) {
	// Filter only collateral tokens
	const collateralTokens = SUPPORTED_TOKENS.filter(
		(token) => token.COLLATERAL_TOKEN === true
	);

	// This is just to store the state of all the queries
	const [isLoadingAll, setIsLoadingAll] = useState(true);
	const [errorAll, setErrorAll] = useState<BaseError[] | null>(null);
	const [collateralsData, setCollateralsData] = useState<
		CollateralWithDeposit[]
	>([]);

	// Create an effect to handle the queries and combine results
	useEffect(() => {
		const fetchCollaterals = async () => {
			try {
				const results = await Promise.all(
					collateralTokens.map(async (token) => {
						try {
							const result = await contractUtils.readContract(
								CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
								COLLATERAL_MANAGER_ABI,
								"getDepositedCollateral",
								[user, token.CONTRACT_ADDRESS]
							);

							return {
								...token,
								depositedCollateral: result as bigint,
							};
						} catch (error) {
							console.error(
								`Error fetching collateral for ${token.TOKEN_SYMBOL}:`,
								error
							);
							return {
								...token,
								depositedCollateral: undefined,
								error: error as BaseError,
							};
						}
					})
				);

				// Extract errors from results
				const errors: BaseError[] = [];
				for (const result of results) {
					if (
						"error" in result &&
						result.error instanceof BaseError
					) {
						errors.push(result.error);
					}
				}
				setCollateralsData(results);
				setErrorAll(errors.length > 0 ? errors : null);
				setIsLoadingAll(false);
			} catch (error) {
				console.error("Error fetching collaterals:", error);
				setErrorAll([error as BaseError]);
				setIsLoadingAll(false);
			}
		};

		fetchCollaterals();
	}, [user, collateralTokens]);

	// Function to refetch all data
	const refetchAll = useCallback(async () => {
		setIsLoadingAll(true);

		try {
			const results = await Promise.all(
				collateralTokens.map(async (token) => {
					try {
						const result = await contractUtils.readContract(
							CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
							COLLATERAL_MANAGER_ABI,
							"getDepositedCollateral",
							[user, token.CONTRACT_ADDRESS]
						);

						return {
							...token,
							depositedCollateral: result as bigint,
						};
					} catch (error) {
						console.error(
							`Error fetching collateral for ${token.TOKEN_SYMBOL}:`,
							error
						);
						return {
							...token,
							depositedCollateral: undefined,
							error: error as BaseError,
						};
					}
				})
			);

			// Extract errors from results
			const errors: BaseError[] = [];
			for (const result of results) {
				if ("error" in result && result.error instanceof BaseError) {
					errors.push(result.error);
				}
			}

			setCollateralsData(results);
			setErrorAll(errors.length > 0 ? errors : null);
		} catch (error) {
			console.error("Error refetching collaterals:", error);
			setErrorAll([error as BaseError]);
		} finally {
			setIsLoadingAll(false);
		}
	}, [user, collateralTokens]);

	return {
		collaterals: collateralsData,
		isLoading: isLoadingAll,
		error: errorAll,
		refetch: refetchAll,
	};
}

export function useGetCollateralBalance(user: Address, token: Address) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
		abi: COLLATERAL_MANAGER_ABI,
		functionName: "s_collateralBalance",
		args: [user, token],
	});

	return {
		balance: data as bigint | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useIsCollateralTokenSupported(token: Address) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
		abi: COLLATERAL_MANAGER_ABI,
		functionName: "s_isCollateralTokenSupported",
		args: [token],
	});

	return {
		isSupported: data as boolean | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useGetOwner() {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
		abi: COLLATERAL_MANAGER_ABI,
		functionName: "owner",
	});

	return {
		owner: data as Address | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useGetCollateralToken(index: bigint) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
		abi: COLLATERAL_MANAGER_ABI,
		functionName: "s_collateralTokens",
		args: [index],
	});

	return {
		token: data as Address | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}
