import { useState, useRef } from "react";
import { contractUtils, CONTRACT_ADDRESSES } from "@/lib/contract-utils";
import { LOAN_CONTRACT_ABI } from "@/abis/lending-core";
import { useWallet } from "./use-wallet";
import { useToast } from "./use-toast";

// Simple cache for read operations to prevent spam
const readCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5000; // 5 seconds cache

// Type definitions based on the contract
export interface Loan {
	principal: bigint;
	interestAccrued: bigint;
	repaidAmount: bigint;
	totalLiquidated: bigint;
	borrowToken: `0x${string}`;
	startTime: number;
	dueDate: number;
	active: boolean;
}

// Custom hook for all LendingCore contract interactions
export const useLendingCore = () => {
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
			!CONTRACT_ADDRESSES.LOAN_CONTRACT ||
			CONTRACT_ADDRESSES.LOAN_CONTRACT === "0x"
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
				className:
					"border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
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
			!CONTRACT_ADDRESSES.LOAN_CONTRACT ||
			CONTRACT_ADDRESSES.LOAN_CONTRACT === "0x"
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

	// Role constants
	const getBpsDenominator = () =>
		executeRead("Get BPS Denominator", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"BPS_DENOMINATOR"
			)
		);

	const getDefaultAdminRole = () =>
		executeRead("Get Default Admin Role", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"DEFAULT_ADMIN_ROLE"
			)
		);

	const getLiquidatorRole = () =>
		executeRead("Get Liquidator Role", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"LIQUIDATOR_ROLE"
			)
		);

	const getLiquidityProviderRole = () =>
		executeRead("Get Liquidity Provider Role", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"LIQUIDITY_PROVIDER_ROLE"
			)
		);

	const getParameterManagerRole = () =>
		executeRead("Get Parameter Manager Role", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"PARAMETER_MANAGER_ROLE"
			)
		);

	const getPauserRole = () =>
		executeRead("Get Pauser Role", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"PAUSER_ROLE"
			)
		);

	const getTokenManagerRole = () =>
		executeRead("Get Token Manager Role", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"TOKEN_MANAGER_ROLE"
			)
		);

	const getUpgraderRole = () =>
		executeRead("Get Upgrader Role", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"UPGRADER_ROLE"
			)
		);

	// Contract state getters
	const getAvailableSupply = (borrowToken: `0x${string}`) =>
		executeRead("Get Available Supply", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"getAvailableSupply",
				[borrowToken]
			)
		);

	const getBorrowTokens = () =>
		executeRead(
			"Get Borrow Tokens",
			() =>
				contractUtils.readContract(
					CONTRACT_ADDRESSES.LOAN_CONTRACT,
					LOAN_CONTRACT_ABI,
					"getBorrowTokens"
				),
			"getBorrowTokens" // Cache key
		);

	const getCurrentInterestRateBPS = (
		borrowToken: `0x${string}`,
		duration: bigint
	) =>
		executeRead("Get Current Interest Rate", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"getCurrentInterestRateBPS",
				[borrowToken, duration]
			)
		);

	const getMaxBorrowBeforeInterest = (
		user: `0x${string}`,
		borrowToken: `0x${string}`,
		collateralToken: `0x${string}`
	) =>
		executeRead("Get Max Borrow", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"getMaxBorrowBeforeInterest",
				[user, borrowToken, collateralToken]
			)
		);

	const getTotalSupply = (borrowToken: `0x${string}`) =>
		executeRead("Get Total Supply", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"getTotalSupply",
				[borrowToken]
			)
		);

	const getUserLoan = (user: `0x${string}`, collateralToken: `0x${string}`) =>
		executeRead("Get User Loan", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"getUserLoan",
				[user, collateralToken]
			)
		);

	const getUtilizationBPS = (borrowToken: `0x${string}`) =>
		executeRead("Get Utilization BPS", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"getUtilizationBPS",
				[borrowToken]
			)
		);

	const hasRole = (role: `0x${string}`, account: `0x${string}`) =>
		executeRead("Check Role", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"hasRole",
				[role, account]
			)
		);

	const isPaused = () =>
		executeRead("Check Paused State", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"paused"
			)
		);

	// Admin write functions
	const pause = () =>
		executeTransaction("Pause Contract", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"pause"
			)
		);

	const unpause = () =>
		executeTransaction("Unpause Contract", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"unpause"
			)
		);

	// Storage getters
	const getCollateralManager = () =>
		executeRead("Get Collateral Manager", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"s_collateralManager"
			)
		);

	const getGracePeriod = () =>
		executeRead("Get Grace Period", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"s_gracePeriod"
			)
		);

	const getInterestRateModel = () =>
		executeRead("Get Interest Rate Model", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"s_interestRateModel"
			)
		);

	const isBorrowTokenSupported = (token: `0x${string}`) =>
		executeRead("Check Token Support", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"s_isBorrowTokenSupported",
				[token]
			)
		);

	const getLiquidatedCollateral = (token: `0x${string}`) =>
		executeRead("Get Liquidated Collateral", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"s_liquidatedCollateral",
				[token]
			)
		);

	const getLiquidationPenaltyBPS = (token: `0x${string}`) =>
		executeRead("Get Liquidation Penalty", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"s_liquidationPenaltyBPS",
				[token]
			)
		);

	const getLtvBPS = (token: `0x${string}`) =>
		executeRead("Get LTV BPS", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"s_ltvBPS",
				[token]
			)
		);

	const getMaxBorrowAmount = (token: `0x${string}`) =>
		executeRead("Get Max Borrow Amount", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"s_maxBorrowAmount",
				[token]
			)
		);

	const getMaxBorrowDuration = () =>
		executeRead("Get Max Borrow Duration", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"s_maxBorrowDuration"
			)
		);

	const getMinBorrowAmount = (token: `0x${string}`) =>
		executeRead("Get Min Borrow Amount", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"s_minBorrowAmount",
				[token]
			)
		);

	const getMinBorrowDuration = () =>
		executeRead("Get Min Borrow Duration", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"s_minBorrowDuration"
			)
		);

	const getPriceOracle = () =>
		executeRead("Get Price Oracle", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"s_priceOracle"
			)
		);

	const getTotalDebt = (token: `0x${string}`) =>
		executeRead("Get Total Debt", () =>
			contractUtils.readContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"s_totalDebt",
				[token]
			)
		);

	// WRITE FUNCTIONS (Require gas and wallet signature)

	// Token management (TOKEN_MANAGER_ROLE required)
	const addBorrowToken = (
		borrowToken: `0x${string}`,
		priceFeed: `0x${string}`
	) =>
		executeTransaction("Add Borrow Token", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"addBorrowToken",
				[borrowToken, priceFeed]
			)
		);

	const addCollateralToken = (
		collateralToken: `0x${string}`,
		priceFeed: `0x${string}`
	) =>
		executeTransaction("Add Collateral Token", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"addCollateralToken",
				[collateralToken, priceFeed]
			)
		);

	const removeBorrowToken = (borrowToken: `0x${string}`) =>
		executeTransaction("Remove Borrow Token", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"removeBorrowToken",
				[borrowToken]
			)
		);

	const removeCollateralToken = (collateralToken: `0x${string}`) =>
		executeTransaction("Remove Collateral Token", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"removeCollateralToken",
				[collateralToken]
			)
		);

	// Liquidity management (LIQUIDITY_PROVIDER_ROLE required)
	const addLiquidity = (borrowToken: `0x${string}`, amount: bigint) =>
		executeTransaction("Add Liquidity", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"addLiquidity",
				[borrowToken, amount]
			)
		);

	const removeLiquidity = (borrowToken: `0x${string}`, amount: bigint) =>
		executeTransaction("Remove Liquidity", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"removeLiquidity",
				[borrowToken, amount]
			)
		);

	// User operations
	const borrow = (
		borrowToken: `0x${string}`,
		amount: bigint,
		collateralToken: `0x${string}`,
		duration: bigint
	) =>
		executeTransaction("Borrow", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"borrow",
				[borrowToken, amount, collateralToken, duration]
			)
		);

	const depositCollateral = (
		collateralToken: `0x${string}`,
		amount: bigint
	) => {
		executeTransaction("Deposit Collateral", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"depositCollateral",
				[collateralToken, amount]
			)
		);
	};

	const repay = (collateralToken: `0x${string}`, amount: bigint) =>
		executeTransaction("Repay Loan", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"repay",
				[collateralToken, amount]
			)
		);

	const withdrawCollateral = (
		collateralToken: `0x${string}`,
		amount: bigint
	) =>
		executeTransaction("Withdraw Collateral", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"withdrawCollateral",
				[collateralToken, amount]
			)
		);

	// Liquidation (LIQUIDATOR_ROLE required for liquidate function)
	const liquidate = (user: `0x${string}`, collateralToken: `0x${string}`) =>
		executeTransaction("Liquidate", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"liquidate",
				[user, collateralToken]
			)
		);

	const withdrawLiquidatedCollateral = (
		collateralToken: `0x${string}`,
		amount: bigint
	) =>
		executeTransaction("Withdraw Liquidated Collateral", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"withdrawLiquidatedCollateral",
				[collateralToken, amount]
			)
		);

	// Parameter management (PARAMETER_MANAGER_ROLE required)
	const setLTV = (collateralToken: `0x${string}`, ltvBps: number) =>
		executeTransaction("Set LTV", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"setLTV",
				[collateralToken, ltvBps]
			)
		);

	const setLiquidationPenalty = (
		collateralToken: `0x${string}`,
		penaltyBps: number
	) =>
		executeTransaction("Set Liquidation Penalty", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"setLiquidationPenalty",
				[collateralToken, penaltyBps]
			)
		);

	const setMaxBorrowAmount = (
		borrowToken: `0x${string}`,
		maxAmount: bigint
	) =>
		executeTransaction("Set Max Borrow Amount", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"setMaxBorrowAmount",
				[borrowToken, maxAmount]
			)
		);

	const setMinBorrowAmount = (
		borrowToken: `0x${string}`,
		minAmount: bigint
	) =>
		executeTransaction("Set Min Borrow Amount", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"setMinBorrowAmount",
				[borrowToken, minAmount]
			)
		);

	const setMaxBorrowDuration = (duration: number) =>
		executeTransaction("Set Max Borrow Duration", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"setMaxBorrowDuration",
				[duration]
			)
		);

	const setMinBorrowDuration = (duration: number) =>
		executeTransaction("Set Min Borrow Duration", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"setMinBorrowDuration",
				[duration]
			)
		);

	const setGracePeriod = (period: number) =>
		executeTransaction("Set Grace Period", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"setGracePeriod",
				[period]
			)
		);

	const setCollateralManager = (manager: `0x${string}`) =>
		executeTransaction("Set Collateral Manager", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"setCollateralManager",
				[manager]
			)
		);

	const setInterestRateModel = (model: `0x${string}`) =>
		executeTransaction("Set Interest Rate Model", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"setInterestRateModel",
				[model]
			)
		);

	const setPriceOracle = (oracle: `0x${string}`) =>
		executeTransaction("Set Price Oracle", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"setPriceOracle",
				[oracle]
			)
		);

	// Pause/unpause (PAUSER_ROLE required)
	const pauseContract = () =>
		executeTransaction("Pause Contract", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"pause",
				[]
			)
		);

	const unpauseContract = () =>
		executeTransaction("Unpause Contract", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"unpause",
				[]
			)
		);

	// Role management (Admin functions)
	const grantRole = (role: `0x${string}`, account: `0x${string}`) =>
		executeTransaction("Grant Role", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"grantRole",
				[role, account]
			)
		);

	const revokeRole = (role: `0x${string}`, account: `0x${string}`) =>
		executeTransaction("Revoke Role", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"revokeRole",
				[role, account]
			)
		);

	const renounceRole = (
		role: `0x${string}`,
		callerConfirmation: `0x${string}`
	) =>
		executeTransaction("Renounce Role", () =>
			contractUtils.writeContract(
				CONTRACT_ADDRESSES.LOAN_CONTRACT,
				LOAN_CONTRACT_ABI,
				"renounceRole",
				[role, callerConfirmation]
			)
		);

	return {
		// State
		loading,
		error,
		isConnected,
		address,

		// Read functions
		getBpsDenominator,
		getDefaultAdminRole,
		getLiquidatorRole,
		getLiquidityProviderRole,
		getParameterManagerRole,
		getPauserRole,
		getTokenManagerRole,
		getUpgraderRole,
		getAvailableSupply,
		getBorrowTokens,
		getCurrentInterestRateBPS,
		getMaxBorrowBeforeInterest,
		getTotalSupply,
		getUserLoan,
		getUtilizationBPS,
		hasRole,
		isPaused,
		getCollateralManager,
		getGracePeriod,
		getInterestRateModel,
		isBorrowTokenSupported,
		getLiquidatedCollateral,
		getLiquidationPenaltyBPS,
		getLtvBPS,
		getMaxBorrowAmount,
		getMaxBorrowDuration,
		getMinBorrowAmount,
		getMinBorrowDuration,
		getPriceOracle,
		getTotalDebt,

		// Write functions - Token Management
		addBorrowToken,
		addCollateralToken,
		removeBorrowToken,
		removeCollateralToken,

		// Write functions - Liquidity Management
		addLiquidity,
		removeLiquidity,

		// Write functions - User Operations
		borrow,
		depositCollateral,
		repay,
		withdrawCollateral,

		// Write functions - Liquidation
		liquidate,
		withdrawLiquidatedCollateral,

		// Write functions - Parameter Management
		setLTV,
		setLiquidationPenalty,
		setMaxBorrowAmount,
		setMinBorrowAmount,
		setMaxBorrowDuration,
		setMinBorrowDuration,
		setGracePeriod,
		setCollateralManager,
		setInterestRateModel,
		setPriceOracle,

		// Write functions - Pause/Unpause
		pause,
		unpause,
		pauseContract,
		unpauseContract,

		// Write functions - Role Management
		grantRole,
		revokeRole,
		renounceRole,
	};
};
