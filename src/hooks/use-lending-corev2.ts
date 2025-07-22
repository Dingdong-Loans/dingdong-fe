// hooks/useApproveToken.ts
import {
	useWriteContract,
	useWaitForTransactionReceipt,
	useAccount,
	useReadContract,
} from "wagmi";
import { erc20Abi, BaseError, type Address } from "viem";
import { LOAN_CONTRACT_ABI } from "@/abis/lending-core";
import { CONTRACT_ADDRESSES } from "@/lib/contract-utils";

type BorrowTokenParams = {
	borrowToken: Address; // _borrowToken parameter
	amount: bigint; // _amount parameter
	collateralToken: Address; // _collateralToken parameter
	duration: bigint; // _duration parameter - uint64
};

export function useBorrowToken() {
	const {
		data: regularTxHash,
		isPending: isRegularTxPending,
		writeContractAsync: writeRegularTx,
		error: regularTxError,
	} = useWriteContract();

	const {
		isLoading: isRegularTxConfirming,
		isSuccess: isRegularTxConfirmed,
		isError: isRegularTxFailed,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash: regularTxHash,
	});
	const borrow = async ({
		borrowToken,
		amount,
		collateralToken,
		duration,
	}: BorrowTokenParams) => {
		const borrowResult = await writeRegularTx({
			address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
			abi: LOAN_CONTRACT_ABI,
			functionName: "borrow",
			args: [borrowToken, amount, collateralToken, duration],
		});

		if (!borrowResult) {
			throw new Error("Failed to submit borrow transaction");
		}

		return borrowResult;
	};
	return {
		borrow,
		isPending: isRegularTxPending,
		isWaiting: isRegularTxConfirming,
		isSuccess: isRegularTxConfirmed,
		isError: isRegularTxFailed,
		error: regularTxError as BaseError | null,
		receipt,
		txHash: regularTxHash,
	};
}

// Read-only hooks
export function useGetBorrowTokens() {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "getBorrowTokens",
	});

	return {
		borrowTokens: data as Address[] | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useGetAvailableSupply(borrowToken: Address) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "getAvailableSupply",
		args: [borrowToken],
	});

	return {
		availableSupply: data as bigint | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useGetUserLoan(user: Address, collateralToken: Address) {
	const { data, error, isLoading } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "getUserLoan",
		args: [user, collateralToken],
	});

	return {
		loan: data as
			| {
					principal: bigint;
					interestAccrued: bigint;
					repaidAmount: bigint;
					totalLiquidated: bigint;
					borrowToken: Address;
					startTime: number;
					dueDate: number;
					active: boolean;
			  }
			| undefined,
		isLoading,
		error: error as BaseError | null,
	};
}

export function useGetCurrentInterestRate(
	borrowToken: Address,
	duration: bigint
) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "getCurrentInterestRateBPS",
		args: [borrowToken, duration],
	});

	return {
		interestRate: data as bigint | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

// Liquidity Management Hooks
export function useAddLiquidity() {
	const {
		data: regularTxHash,
		isPending: isRegularTxPending,
		writeContractAsync: writeRegularTx,
		error: regularTxError,
	} = useWriteContract();

	const {
		isLoading: isRegularTxConfirming,
		isSuccess: isRegularTxConfirmed,
		isError: isRegularTxFailed,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash: regularTxHash,
	});
	const addLiquidity = async ({
		borrowToken,
		amount,
	}: {
		borrowToken: Address;
		amount: bigint;
	}) => {
		const addLiquidityResult = await writeRegularTx({
			address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
			abi: LOAN_CONTRACT_ABI,
			functionName: "addLiquidity",
			args: [borrowToken, amount],
		});

		if (!addLiquidityResult) {
			throw new Error("Failed to submit add liquidity transaction");
		}

		return addLiquidityResult;
	};

	return {
		addLiquidity,
		isPending: isRegularTxPending,
		isWaiting: isRegularTxConfirming,
		isSuccess: isRegularTxConfirmed,
		isError: isRegularTxFailed,
		error: regularTxError as BaseError | null,
		receipt,
		txHash: regularTxHash,
	};
}

export function useRemoveLiquidity() {
	const {
		data: regularTxHash,
		isPending: isRegularTxPending,
		writeContractAsync: writeRegularTx,
		error: regularTxError,
	} = useWriteContract();

	const {
		isLoading: isRegularTxConfirming,
		isSuccess: isRegularTxConfirmed,
		isError: isRegularTxFailed,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash: regularTxHash,
	});
	const removeLiquidity = async ({
		borrowToken,
		amount,
	}: {
		borrowToken: Address;
		amount: bigint;
	}) => {
		const removeLiquidityResult = await writeRegularTx({
			address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
			abi: LOAN_CONTRACT_ABI,
			functionName: "removeLiquidity",
			args: [borrowToken, amount],
		});

		if (!removeLiquidityResult) {
			throw new Error("Failed to submit remove liquidity transaction");
		}

		return removeLiquidityResult;
	};

	return {
		removeLiquidity,
		isPending: isRegularTxPending,
		isWaiting: isRegularTxConfirming,
		isSuccess: isRegularTxConfirmed,
		isError: isRegularTxFailed,
		error: regularTxError as BaseError | null,
		receipt,
		txHash: regularTxHash,
	};
}

// Collateral Management Hooks
export function useDepositCollateral() {
	const {
		data: regularTxHash,
		isPending: isRegularTxPending,
		writeContractAsync: writeRegularTx,
		error: regularTxError,
	} = useWriteContract();

	const {
		isLoading: isRegularTxConfirming,
		isSuccess: isRegularTxConfirmed,
		isError: isRegularTxFailed,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash: regularTxHash,
	});
	const depositCollateral = async ({
		collateralToken,
		amount,
	}: {
		collateralToken: Address;
		amount: bigint;
	}) => {
		const depositResult = await writeRegularTx({
			address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
			abi: LOAN_CONTRACT_ABI,
			functionName: "depositCollateral",
			args: [collateralToken, amount],
		});

		if (!depositResult) {
			throw new Error("Failed to submit deposit transaction");
		}

		return depositResult;
	};

	return {
		depositCollateral,
		isPending: isRegularTxPending,
		isWaiting: isRegularTxConfirming,
		isSuccess: isRegularTxConfirmed,
		isError: isRegularTxFailed,
		error: regularTxError as BaseError | null,
		receipt,
		txHash: regularTxHash,
	};
}

export function useWithdrawCollateral() {
	const {
		data: regularTxHash,
		isPending: isRegularTxPending,
		writeContractAsync: writeRegularTx,
		error: regularTxError,
	} = useWriteContract();

	const {
		isLoading: isRegularTxConfirming,
		isSuccess: isRegularTxConfirmed,
		isError: isRegularTxFailed,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash: regularTxHash,
	});
	const withdrawCollateral = async ({
		collateralToken,
		amount,
	}: {
		collateralToken: Address;
		amount: bigint;
	}) => {
		const withdrawResult = await writeRegularTx({
			address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
			abi: LOAN_CONTRACT_ABI,
			functionName: "withdrawCollateral",
			args: [collateralToken, amount],
		});

		if (!withdrawResult) {
			throw new Error("Failed to submit withdraw transaction");
		}

		return withdrawResult;
	};

	return {
		withdrawCollateral,
		isPending: isRegularTxPending,
		isWaiting: isRegularTxConfirming,
		isSuccess: isRegularTxConfirmed,
		isError: isRegularTxFailed,
		error: regularTxError as BaseError | null,
		receipt,
		txHash: regularTxHash,
	};
}

// Loan Repayment Hook
export function useRepayLoan() {
	const {
		data: regularTxHash,
		isPending: isRegularTxPending,
		writeContractAsync: writeRegularTx,
		error: regularTxError,
	} = useWriteContract();

	const {
		isLoading: isRegularTxConfirming,
		isSuccess: isRegularTxConfirmed,
		isError: isRegularTxFailed,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash: regularTxHash,
	});
	const repayLoan = async ({
		collateralToken,
		amount,
	}: {
		collateralToken: Address;
		amount: bigint;
	}) => {
		const repayResult = await writeRegularTx({
			address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
			abi: LOAN_CONTRACT_ABI,
			functionName: "repay",
			args: [collateralToken, amount],
		});

		if (!repayResult) {
			throw new Error("Failed to submit repay transaction");
		}

		return repayResult;
	};

	return {
		repayLoan,
		isPending: isRegularTxPending,
		isWaiting: isRegularTxConfirming,
		isSuccess: isRegularTxConfirmed,
		isError: isRegularTxFailed,
		error: regularTxError as BaseError | null,
		receipt,
		txHash: regularTxHash,
	};
}

// Liquidation Hooks
export function useLiquidateLoan() {
	const {
		data: regularTxHash,
		isPending: isRegularTxPending,
		writeContractAsync: writeRegularTx,
		error: regularTxError,
	} = useWriteContract();

	const {
		isLoading: isRegularTxConfirming,
		isSuccess: isRegularTxConfirmed,
		isError: isRegularTxFailed,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash: regularTxHash,
	});
	const liquidateLoan = async ({
		user,
		collateralToken,
	}: {
		user: Address;
		collateralToken: Address;
	}) => {
		const liquidateResult = await writeRegularTx({
			address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
			abi: LOAN_CONTRACT_ABI,
			functionName: "liquidate",
			args: [user, collateralToken],
		});

		if (!liquidateResult) {
			throw new Error("Failed to submit liquidate transaction");
		}

		return liquidateResult;
	};

	return {
		liquidateLoan,
		isPending: isRegularTxPending,
		isWaiting: isRegularTxConfirming,
		isSuccess: isRegularTxConfirmed,
		isError: isRegularTxFailed,
		error: regularTxError as BaseError | null,
		receipt,
		txHash: regularTxHash,
	};
}

// Note: withdrawLiquidatedCollateral function was removed as it's not present in the contract ABI

// Admin Hooks
export function useContractPause() {
	const {
		data: txHash,
		isPending,
		writeContractAsync: writeTx,
		error,
	} = useWriteContract();

	const {
		isLoading: isConfirming,
		isSuccess: isConfirmed,
		isError: isFailed,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash: txHash,
	});

	const pause = async () => {
		const result = await writeTx({
			address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
			abi: LOAN_CONTRACT_ABI,
			functionName: "pause",
		});

		if (!result) {
			throw new Error("Failed to submit pause transaction");
		}

		return result;
	};

	return {
		pause,
		isPending,
		isWaiting: isConfirming,
		isSuccess: isConfirmed,
		isError: isFailed,
		error: error as BaseError | null,
		receipt,
		txHash,
	};
}

export function useContractUnpause() {
	const {
		data: txHash,
		isPending,
		writeContractAsync: writeTx,
		error,
	} = useWriteContract();

	const {
		isLoading: isConfirming,
		isSuccess: isConfirmed,
		isError: isFailed,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash: txHash,
	});

	const unpause = async () => {
		const result = await writeTx({
			address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
			abi: LOAN_CONTRACT_ABI,
			functionName: "unpause",
		});

		if (!result) {
			throw new Error("Failed to submit unpause transaction");
		}

		return result;
	};

	return {
		unpause,
		isPending,
		isWaiting: isConfirming,
		isSuccess: isConfirmed,
		isError: isFailed,
		error: error as BaseError | null,
		receipt,
		txHash,
	};
}

// Parameter Management Hooks
export function useSetLTV(collateralToken: Address, ltvBps: number) {
	const {
		data: txHash,
		isPending,
		writeContractAsync: writeTx,
		error,
	} = useWriteContract();

	const {
		isLoading: isConfirming,
		isSuccess: isConfirmed,
		isError: isFailed,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash: txHash,
	});

	const setLTV = async () => {
		const result = await writeTx({
			address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
			abi: LOAN_CONTRACT_ABI,
			functionName: "setLTV",
			args: [collateralToken, ltvBps],
		});

		if (!result) {
			throw new Error("Failed to submit setLTV transaction");
		}

		return result;
	};

	return {
		setLTV,
		isPending,
		isWaiting: isConfirming,
		isSuccess: isConfirmed,
		isError: isFailed,
		error: error as BaseError | null,
		receipt,
		txHash,
	};
}

export function useSetGracePeriod(period: number) {
	const {
		data: txHash,
		isPending,
		writeContractAsync: writeTx,
		error,
	} = useWriteContract();

	const {
		isLoading: isConfirming,
		isSuccess: isConfirmed,
		isError: isFailed,
		data: receipt,
	} = useWaitForTransactionReceipt({
		hash: txHash,
	});

	const setGracePeriod = async () => {
		const result = await writeTx({
			address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
			abi: LOAN_CONTRACT_ABI,
			functionName: "setGracePeriod",
			args: [period],
		});

		if (!result) {
			throw new Error("Failed to submit setGracePeriod transaction");
		}

		return result;
	};

	return {
		setGracePeriod,
		isPending,
		isWaiting: isConfirming,
		isSuccess: isConfirmed,
		isError: isFailed,
		error: error as BaseError | null,
		receipt,
		txHash,
	};
}

// Additional Read-only hooks
export function useGetTotalSupply(borrowToken: Address) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "getTotalSupply",
		args: [borrowToken],
	});

	return {
		totalSupply: data as bigint | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useGetUtilizationBPS(borrowToken: Address) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "getUtilizationBPS",
		args: [borrowToken],
	});

	return {
		utilizationBPS: data as bigint | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useGetLiquidatedCollateral(token: Address) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "s_liquidatedCollateral",
		args: [token],
	});

	return {
		liquidatedCollateral: data as bigint | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useGetLiquidationPenaltyBPS(token: Address) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "s_liquidationPenaltyBPS",
		args: [token],
	});

	return {
		liquidationPenaltyBPS: data as bigint | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useGetLtvBPS(token: Address) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "s_ltvBPS",
		args: [token],
	});

	return {
		ltvBPS: data as bigint | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useGetMaxBorrowAmount(token: Address) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "s_maxBorrowAmount",
		args: [token],
	});

	return {
		maxBorrowAmount: data as bigint | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useGetMinBorrowAmount(token: Address) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "s_minBorrowAmount",
		args: [token],
	});

	return {
		minBorrowAmount: data as bigint | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useGetBorrowDurations() {
	const {
		data: minDuration,
		error: minError,
		isLoading: minLoading,
		refetch: refetchMin,
	} = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "s_minBorrowDuration",
	});

	const {
		data: maxDuration,
		error: maxError,
		isLoading: maxLoading,
		refetch: refetchMax,
	} = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "s_maxBorrowDuration",
	});

	return {
		minBorrowDuration: minDuration as bigint | undefined,
		maxBorrowDuration: maxDuration as bigint | undefined,
		isLoading: minLoading || maxLoading,
		error: (minError || maxError) as BaseError | null,
		refetch: () => {
			refetchMin();
			refetchMax();
		},
	};
}

export function useGetGracePeriod() {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "s_gracePeriod",
	});

	return {
		gracePeriod: data as bigint | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useGetPriceOracle() {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "s_priceOracle",
	});

	return {
		priceOracle: data as Address | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useGetTotalDebt(token: Address) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "s_totalDebt",
		args: [token],
	});

	return {
		totalDebt: data as bigint | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}

export function useGetContractState() {
	const {
		data: isPausedData,
		error: pausedError,
		isLoading: pausedLoading,
		refetch: refetchPaused,
	} = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "paused",
	});

	const {
		data: collateralManager,
		error: collateralError,
		isLoading: collateralLoading,
		refetch: refetchCollateral,
	} = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "s_collateralManager",
	});

	const {
		data: interestRateModel,
		error: interestError,
		isLoading: interestLoading,
		refetch: refetchInterest,
	} = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "s_interestRateModel",
	});

	return {
		isPaused: isPausedData as boolean | undefined,
		collateralManager: collateralManager as Address | undefined,
		interestRateModel: interestRateModel as Address | undefined,
		isLoading: pausedLoading || collateralLoading || interestLoading,
		error: (pausedError ||
			collateralError ||
			interestError) as BaseError | null,
		refetch: () => {
			refetchPaused();
			refetchCollateral();
			refetchInterest();
		},
	};
}

// Role Management Hooks
export function useGetRoles() {
	const {
		data: defaultAdmin,
		error: adminError,
		isLoading: adminLoading,
		refetch: refetchAdmin,
	} = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "DEFAULT_ADMIN_ROLE",
	});

	const {
		data: liquidator,
		error: liquidatorError,
		isLoading: liquidatorLoading,
		refetch: refetchLiquidator,
	} = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "LIQUIDATOR_ROLE",
	});

	const {
		data: provider,
		error: providerError,
		isLoading: providerLoading,
		refetch: refetchProvider,
	} = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "LIQUIDITY_PROVIDER_ROLE",
	});

	const {
		data: paramManager,
		error: paramError,
		isLoading: paramLoading,
		refetch: refetchParam,
	} = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "PARAMETER_MANAGER_ROLE",
	});

	return {
		roles: {
			defaultAdmin: defaultAdmin as `0x${string}` | undefined,
			liquidator: liquidator as `0x${string}` | undefined,
			liquidityProvider: provider as `0x${string}` | undefined,
			parameterManager: paramManager as `0x${string}` | undefined,
		},
		isLoading:
			adminLoading ||
			liquidatorLoading ||
			providerLoading ||
			paramLoading,
		error: (adminError ||
			liquidatorError ||
			providerError ||
			paramError) as BaseError | null,
		refetch: () => {
			refetchAdmin();
			refetchLiquidator();
			refetchProvider();
			refetchParam();
		},
	};
}

export function useCheckRole(role: `0x${string}`, account: Address) {
	const { data, error, isLoading, refetch } = useReadContract({
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LOAN_CONTRACT_ABI,
		functionName: "hasRole",
		args: [role, account],
	});

	return {
		hasRole: data as boolean | undefined,
		isLoading,
		error: error as BaseError | null,
		refetch,
	};
}
