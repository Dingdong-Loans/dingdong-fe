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
export const LOAN_CONTRACT_ABI = [
	{ inputs: [], stateMutability: "nonpayable", type: "constructor" },
	{ inputs: [], name: "AccessControlBadConfirmation", type: "error" },
	{
		inputs: [
			{ internalType: "address", name: "account", type: "address" },
			{ internalType: "bytes32", name: "neededRole", type: "bytes32" },
		],
		name: "AccessControlUnauthorizedAccount",
		type: "error",
	},
	{
		inputs: [{ internalType: "address", name: "target", type: "address" }],
		name: "AddressEmptyCode",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "implementation",
				type: "address",
			},
		],
		name: "ERC1967InvalidImplementation",
		type: "error",
	},
	{ inputs: [], name: "ERC1967NonPayable", type: "error" },
	{ inputs: [], name: "EnforcedPause", type: "error" },
	{ inputs: [], name: "ExpectedPause", type: "error" },
	{ inputs: [], name: "FailedCall", type: "error" },
	{ inputs: [], name: "InvalidInitialization", type: "error" },
	{
		inputs: [
			{ internalType: "uint256", name: "max", type: "uint256" },
			{ internalType: "uint256", name: "attempted", type: "uint256" },
		],
		name: "LendingCore__AmountExceedsLimit",
		type: "error",
	},
	{
		inputs: [],
		name: "LendingCore__CollateralManagerAlreadySet",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "max", type: "uint256" },
			{ internalType: "uint256", name: "attemted", type: "uint256" },
		],
		name: "LendingCore__DurationExceedsLimit",
		type: "error",
	},
	{
		inputs: [
			{ internalType: "address", name: "token", type: "address" },
			{ internalType: "uint256", name: "available", type: "uint256" },
		],
		name: "LendingCore__InsufficientBalance",
		type: "error",
	},
	{ inputs: [], name: "LendingCore__InvalidAddress", type: "error" },
	{ inputs: [], name: "LendingCore__LoanIsActive", type: "error" },
	{ inputs: [], name: "LendingCore__LoanIsInactive", type: "error" },
	{ inputs: [], name: "LendingCore__LoanParamViolated", type: "error" },
	{ inputs: [], name: "LendingCore__MathOverflow", type: "error" },
	{ inputs: [], name: "LendingCore__NotLiquidateable", type: "error" },
	{
		inputs: [{ internalType: "address", name: "token", type: "address" }],
		name: "LendingCore__UnsupportedToken",
		type: "error",
	},
	{ inputs: [], name: "LendingCore__ZeroAmountNotAllowed", type: "error" },
	{ inputs: [], name: "NotInitializing", type: "error" },
	{ inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
	{
		inputs: [{ internalType: "address", name: "token", type: "address" }],
		name: "SafeERC20FailedOperation",
		type: "error",
	},
	{ inputs: [], name: "UUPSUnauthorizedCallContext", type: "error" },
	{
		inputs: [{ internalType: "bytes32", name: "slot", type: "bytes32" }],
		name: "UUPSUnsupportedProxiableUUID",
		type: "error",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "manager",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address",
			},
		],
		name: "BorrowTokenAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "manager",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address",
			},
		],
		name: "BorrowTokenRemoved",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "collateral",
				type: "address",
			},
		],
		name: "Borrowed",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "CollateralDeposited",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "manager",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address",
			},
		],
		name: "CollateralTokenAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "manager",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address",
			},
		],
		name: "CollateralTokenRemoved",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "CollateralWithdrawn",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint64",
				name: "version",
				type: "uint64",
			},
		],
		name: "Initialized",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "seizedAmount",
				type: "uint256",
			},
		],
		name: "Liquidated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "Paused",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "Repaid",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "previousAdminRole",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "newAdminRole",
				type: "bytes32",
			},
		],
		name: "RoleAdminChanged",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "RoleGranted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "RoleRevoked",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "provider",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "SupplyAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "withdrawer",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "SupplyRemoved",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "Unpaused",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "implementation",
				type: "address",
			},
		],
		name: "Upgraded",
		type: "event",
	},
	{
		inputs: [],
		name: "BPS_DENOMINATOR",
		outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "LIQUIDATOR_ROLE",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "LIQUIDITY_PROVIDER_ROLE",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "PARAMETER_MANAGER_ROLE",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "PAUSER_ROLE",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "TOKEN_MANAGER_ROLE",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "UPGRADER_ROLE",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "UPGRADE_INTERFACE_VERSION",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_borrowToken", type: "address" },
			{ internalType: "address", name: "_priceFeed", type: "address" },
		],
		name: "addBorrowToken",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_collateralToken",
				type: "address",
			},
			{ internalType: "address", name: "_priceFeed", type: "address" },
		],
		name: "addCollateralToken",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_borrowToken", type: "address" },
			{ internalType: "uint256", name: "_amount", type: "uint256" },
		],
		name: "addLiquidity",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_borrowToken", type: "address" },
			{ internalType: "uint256", name: "_amount", type: "uint256" },
			{
				internalType: "address",
				name: "_collateralToken",
				type: "address",
			},
			{ internalType: "uint64", name: "_duration", type: "uint64" },
		],
		name: "borrow",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_collatearlToken",
				type: "address",
			},
			{ internalType: "uint256", name: "_amount", type: "uint256" },
		],
		name: "depositCollateral",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_borrowToken", type: "address" },
		],
		name: "getAvailableSupply",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getBorrowTokens",
		outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_borrowToken", type: "address" },
			{ internalType: "uint256", name: "_duration", type: "uint256" },
		],
		name: "getCurrentInterestRateBPS",
		outputs: [
			{
				internalType: "uint256",
				name: "interestRateBPS",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_user", type: "address" },
			{ internalType: "address", name: "_borrowToken", type: "address" },
			{
				internalType: "address",
				name: "_collateralToken",
				type: "address",
			},
		],
		name: "getMaxBorrowBeforeInterest",
		outputs: [
			{ internalType: "uint256", name: "maxBorrow", type: "uint256" },
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
		name: "getRoleAdmin",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_borrowToken", type: "address" },
		],
		name: "getTotalSupply",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_user", type: "address" },
			{
				internalType: "address",
				name: "_collateralToken",
				type: "address",
			},
		],
		name: "getUserLoan",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "principal",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "interestAccrued",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "repaidAmount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "totalLiquidated",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "borrowToken",
						type: "address",
					},
					{
						internalType: "uint40",
						name: "startTime",
						type: "uint40",
					},
					{ internalType: "uint40", name: "dueDate", type: "uint40" },
					{ internalType: "bool", name: "active", type: "bool" },
				],
				internalType: "struct LendingCoreV1.Loan",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_borrowToken", type: "address" },
		],
		name: "getUtilizationBPS",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes32", name: "role", type: "bytes32" },
			{ internalType: "address", name: "account", type: "address" },
		],
		name: "grantRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes32", name: "role", type: "bytes32" },
			{ internalType: "address", name: "account", type: "address" },
		],
		name: "hasRole",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "defaultAdmin", type: "address" },
			{ internalType: "address[6]", name: "role", type: "address[6]" },
		],
		name: "initialize",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_user", type: "address" },
			{
				internalType: "address",
				name: "_collateralToken",
				type: "address",
			},
		],
		name: "liquidate",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "pause",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "paused",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "proxiableUUID",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_borrowToken", type: "address" },
		],
		name: "removeBorrowToken",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_collateralToken",
				type: "address",
			},
		],
		name: "removeCollateralToken",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_borrowToken", type: "address" },
			{ internalType: "uint256", name: "_amount", type: "uint256" },
		],
		name: "removeLiquidity",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes32", name: "role", type: "bytes32" },
			{
				internalType: "address",
				name: "callerConfirmation",
				type: "address",
			},
		],
		name: "renounceRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_collateralToken",
				type: "address",
			},
			{ internalType: "uint256", name: "_amount", type: "uint256" },
		],
		name: "repay",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes32", name: "role", type: "bytes32" },
			{ internalType: "address", name: "account", type: "address" },
		],
		name: "revokeRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		name: "s_borrowTokens",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "s_collateralManager",
		outputs: [
			{
				internalType: "contract ICollateralManager",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "s_gracePeriod",
		outputs: [{ internalType: "uint40", name: "", type: "uint40" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "s_interestRateModel",
		outputs: [
			{
				internalType: "contract IInterestRateModel",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "", type: "address" }],
		name: "s_isBorrowTokenSupported",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "", type: "address" }],
		name: "s_liquidatedCollateral",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "", type: "address" }],
		name: "s_liquidationPenaltyBPS",
		outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "", type: "address" }],
		name: "s_ltvBPS",
		outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "", type: "address" }],
		name: "s_maxBorrowAmount",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "s_maxBorrowDuration",
		outputs: [{ internalType: "uint40", name: "", type: "uint40" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "", type: "address" }],
		name: "s_minBorrowAmount",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "s_minBorrowDuration",
		outputs: [{ internalType: "uint40", name: "", type: "uint40" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "s_priceOracle",
		outputs: [
			{
				internalType: "contract IPriceOracle",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "", type: "address" }],
		name: "s_totalDebt",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "", type: "address" },
			{ internalType: "address", name: "", type: "address" },
		],
		name: "s_userLoans",
		outputs: [
			{ internalType: "uint256", name: "principal", type: "uint256" },
			{
				internalType: "uint256",
				name: "interestAccrued",
				type: "uint256",
			},
			{ internalType: "uint256", name: "repaidAmount", type: "uint256" },
			{
				internalType: "uint256",
				name: "totalLiquidated",
				type: "uint256",
			},
			{ internalType: "address", name: "borrowToken", type: "address" },
			{ internalType: "uint40", name: "startTime", type: "uint40" },
			{ internalType: "uint40", name: "dueDate", type: "uint40" },
			{ internalType: "bool", name: "active", type: "bool" },
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_collateralManager",
				type: "address",
			},
		],
		name: "setCollateralManager",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint40", name: "_period", type: "uint40" }],
		name: "setGracePeriod",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_interestRateModel",
				type: "address",
			},
		],
		name: "setInterestRateModel",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_collateralToken",
				type: "address",
			},
			{ internalType: "uint16", name: "_ltvBps", type: "uint16" },
		],
		name: "setLTV",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_collateralToken",
				type: "address",
			},
			{ internalType: "uint16", name: "_penaltyBps", type: "uint16" },
		],
		name: "setLiquidationPenalty",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_borrowToken", type: "address" },
			{ internalType: "uint256", name: "_maxAmount", type: "uint256" },
		],
		name: "setMaxBorrowAmount",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint40", name: "_duration", type: "uint40" }],
		name: "setMaxBorrowDuration",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_borrowToken", type: "address" },
			{ internalType: "uint256", name: "_minAmount", type: "uint256" },
		],
		name: "setMinBorrowAmount",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint40", name: "_duration", type: "uint40" }],
		name: "setMinBorrowDuration",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_priceOracle", type: "address" },
		],
		name: "setPriceOracle",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes4", name: "interfaceId", type: "bytes4" },
		],
		name: "supportsInterface",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "unpause",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newImplementation",
				type: "address",
			},
			{ internalType: "bytes", name: "data", type: "bytes" },
		],
		name: "upgradeToAndCall",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_collateralToken",
				type: "address",
			},
			{ internalType: "uint256", name: "_amount", type: "uint256" },
		],
		name: "withdrawCollateral",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_collateralToken",
				type: "address",
			},
			{ internalType: "uint256", name: "_amount", type: "uint256" },
		],
		name: "withdrawLiquidatedCollateral",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
] as const;

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

// Example contract addresses (replace with your actual deployed contracts)
export const CONTRACT_ADDRESSES = {
	LOAN_CONTRACT:
		"0xC47B1331F77802E158e360374EFe7e00EBC114C3" as `0x${string}`, // Replace with actual address
	COLLATERAL_CONTRACT: "0x" as `0x${string}`, // Replace with actual address
} as const;

// Function to fetch token balances for both borrow and collateral tokens
export async function getWalletTokenBalances() {
	const walletClient = getWalletClient();
	const [account] = await walletClient.getAddresses();
	try {
		// Fetch balances for all supported collateral tokens
		const collateralBalances = await Promise.all(
			SUPPORTED_COLLATERAL_TOKENS.map(async (token) => {
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
							(BigInt(balance) * BigInt(1000000)) /
								BigInt(10 ** token.DECIMALS)
						) / 1000000,
					decimals: token.DECIMALS,
					address: token.CONTRACT_ADDRESS,
				};
			})
		);

		// Fetch balances for all supported borrow tokens
		const borrowBalances = await Promise.all(
			SUPPORTED_BORROW_TOKENS.map(async (token) => {
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
							(BigInt(balance) * BigInt(1000000)) /
								BigInt(10 ** token.DECIMALS)
						) / 1000000,
					decimals: token.DECIMALS,
					address: token.CONTRACT_ADDRESS,
				};
			})
		);

		return {
			collateralBalances,
			borrowBalances,
		};
	} catch (error) {
		console.error("Error fetching token balances:", error);
		throw error;
	}
}
