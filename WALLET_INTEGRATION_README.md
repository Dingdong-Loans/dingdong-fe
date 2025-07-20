# DingDong Frontend - Wallet & Smart Contract Integration

This project is a React + TypeScript + Vite application with complete wallet integration and smart contract interaction capabilities for a lending protocol on Lisk Sepolia testnet.

## 🚀 Features

-   **Wallet Integration**: Complete wallet connection using wagmi v2 and XellarKit
-   **Smart Contract Interaction**: Full integration with LendingCore contract (80+ functions)
-   **Type Safety**: Comprehensive TypeScript support for all contract interactions
-   **UI Components**: Modern UI built with Tailwind CSS and shadcn/ui
-   **Error Handling**: Robust error handling and user feedback
-   **Role-Based Access**: Admin dashboard with role management
-   **Real-time Data**: Live contract data updates and transaction status

## 🛠 Tech Stack

-   **Frontend**: React 18, TypeScript, Vite
-   **Wallet**: wagmi v2, viem, XellarKit
-   **UI**: Tailwind CSS, shadcn/ui components
-   **Blockchain**: Lisk Sepolia Testnet (Chain ID: 4202)

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── wallet/
│   │   └── wallet-provider.tsx # Global wallet state management
│   ├── AdminDashboard.tsx      # Admin interface for contract management
│   ├── LendingDashboard.tsx    # Main lending interface
│   ├── Navbar.tsx              # Navigation with wallet connection
│   └── ...
├── hooks/
│   ├── use-wallet.ts           # Wallet state hook
│   └── use-lending-core.ts     # Smart contract interaction hook
├── lib/
│   ├── utils.ts                # Utility functions
│   ├── wallet-context.ts       # Wallet context definition
│   └── contract-utils.ts       # Contract utilities and ABI
└── pages/
    └── ...                     # Application pages
```

## ⚙️ Setup & Installation

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd dingdong-frontend-proto
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# Required for XellarKit
VITE_XELLAR_APP_ID=your_xellar_app_id_here

# Required for WalletConnect
VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id_here

# Optional: Backend API URL
VITE_API_URL=https://your-backend-api.com
```

**Get Required IDs:**

-   **XellarKit App ID**: Register at [XellarKit](https://xellar.co)
-   **WalletConnect Project ID**: Register at [WalletConnect Cloud](https://cloud.walletconnect.com)

### 3. Contract Configuration

Update contract addresses in `src/lib/contract-utils.ts`:

```typescript
export const CONTRACT_ADDRESSES = {
	LOAN_CONTRACT: "0xYourDeployedContractAddress" as const,
} as const;
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🔗 Smart Contract Integration

### Contract Functions Available

The `useLendingCore` hook provides access to all contract functions:

#### **Read Functions (View/Pure)**

-   `getBorrowTokens()` - Get list of supported borrow tokens
-   `getAvailableSupply(token)` - Get available liquidity for token
-   `getUserLoan(user, collateralToken)` - Get user's loan details
-   `getCurrentInterestRateBPS(token, duration)` - Get current interest rate
-   `getUtilizationBPS(token)` - Get token utilization rate
-   `getTotalSupply(token)` - Get total token supply
-   `isPaused()` - Check if contract is paused
-   `getLTV()` - Get loan-to-value ratio
-   `getMaxBorrowAmount()` - Get maximum borrow amount
-   `getLiquidationPenalty()` - Get liquidation penalty

#### **Write Functions (State-Changing)**

-   `borrow(token, amount, collateral, duration)` - Borrow tokens
-   `repay(collateralToken, amount)` - Repay loan
-   `depositCollateral(token, amount)` - Deposit collateral
-   `withdrawCollateral(token, amount)` - Withdraw collateral
-   `addLiquidity(token, amount)` - Add liquidity to pool
-   `removeLiquidity(token, amount)` - Remove liquidity from pool

#### **Admin Functions**

-   `pause()` / `unpause()` - Pause/unpause contract
-   `grantRole(role, account)` - Grant admin roles
-   `revokeRole(role, account)` - Revoke admin roles
-   `setLTV(ltv)` - Set loan-to-value ratio
-   `setMaxBorrowAmount(amount)` - Set maximum borrow amount
-   `setLiquidationPenalty(penalty)` - Set liquidation penalty
-   `addBorrowToken(token)` - Add supported token
-   `removeBorrowToken(token)` - Remove supported token

### Usage Examples

#### Basic Contract Interaction

```typescript
import { useLendingCore } from "@/hooks/use-lending-core";
import { parseEther } from "viem";

function MyComponent() {
	const {
		isConnected,
		loading,
		error,
		borrow,
		getUserLoan,
		getAvailableSupply,
	} = useLendingCore();

	const handleBorrow = async () => {
		if (!isConnected) return;

		try {
			await borrow(
				"0xTokenAddress" as `0x${string}`,
				parseEther("1.0"), // 1 ETH
				"0xCollateralToken" as `0x${string}`,
				BigInt(30 * 24 * 60 * 60) // 30 days in seconds
			);
		} catch (err) {
			console.error("Borrow failed:", err);
		}
	};

	// Component JSX...
}
```

#### Reading Contract Data

```typescript
import { useEffect, useState } from "react";
import { useLendingCore } from "@/hooks/use-lending-core";

function TokenInfo({ tokenAddress }: { tokenAddress: string }) {
	const { getAvailableSupply, getCurrentInterestRateBPS } = useLendingCore();
	const [supply, setSupply] = useState("0");
	const [interestRate, setInterestRate] = useState("0");

	useEffect(() => {
		const loadData = async () => {
			try {
				const [supplyResult, rateResult] = await Promise.all([
					getAvailableSupply(tokenAddress as `0x${string}`),
					getCurrentInterestRateBPS(
						tokenAddress as `0x${string}`,
						BigInt(30 * 24 * 60 * 60) // 30 days
					),
				]);

				setSupply(formatEther(supplyResult as bigint));
				setInterestRate(((rateResult as bigint) / 100n).toString());
			} catch (err) {
				console.error("Failed to load token data:", err);
			}
		};

		loadData();
	}, [tokenAddress]);

	return (
		<div>
			<p>Available Supply: {supply} ETH</p>
			<p>Interest Rate: {interestRate}%</p>
		</div>
	);
}
```

## 📱 Components

### Main Components

#### `LendingDashboard`

-   Complete lending interface
-   Borrow, repay, collateral management
-   Liquidity provision
-   Real-time market data
-   User loan information

#### `AdminDashboard`

-   Contract administration
-   Parameter management (LTV, max borrow, penalties)
-   Role management
-   Token management
-   Pause/unpause functionality

#### `Navbar`

-   Wallet connection interface
-   Account information display
-   Network status
-   Balance display

### Wallet Integration

#### `WalletProvider`

-   Global wallet state management
-   Authentication with backend
-   Network configuration
-   Transaction handling

#### `useWallet` Hook

-   Access wallet connection state
-   User account information
-   Connection methods

## 🔐 Security Features

-   **Type Safety**: Full TypeScript coverage for contract interactions
-   **Error Handling**: Comprehensive error catching and user feedback
-   **Role-Based Access**: Admin functions protected by role checks
-   **Transaction Validation**: Input validation before contract calls
-   **Network Verification**: Ensures correct network connection

## 🌐 Network Configuration

The application is configured for **Lisk Sepolia Testnet**:

-   **Chain ID**: 4202
-   **RPC URL**: https://rpc.sepolia-api.lisk.com
-   **Block Explorer**: https://sepolia-blockscout.lisk.com

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel/Netlify

The built files in `dist/` can be deployed to any static hosting service.

## 🔧 Development

### Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build
-   `npm run lint` - Run ESLint

### Adding New Contract Functions

1. Add function to ABI in `src/lib/contract-utils.ts`
2. Add hook implementation in `src/hooks/use-lending-core.ts`
3. Export from hook interface
4. Use in components

Example:

```typescript
// In use-lending-core.ts
const newFunction = useCallback(async (param: string) => {
	return await readContract(wagmiConfig, {
		address: CONTRACT_ADDRESSES.LOAN_CONTRACT,
		abi: LENDING_CORE_ABI,
		functionName: "newFunction",
		args: [param],
	});
}, []);

return {
	// ... other functions
	newFunction,
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Wallet Connection Issues**

    - Ensure environment variables are set correctly
    - Check network configuration
    - Verify XellarKit and WalletConnect project IDs

2. **Contract Interaction Fails**

    - Verify contract address is correct
    - Ensure wallet is connected to Lisk Sepolia
    - Check if contract is paused
    - Verify sufficient gas and token balances

3. **TypeScript Errors**

    - Ensure all addresses use `0x${string}` type
    - Check ABI function signatures match usage
    - Verify import paths

4. **Build Errors**
    - Clear node_modules and reinstall dependencies
    - Check for missing dependencies
    - Verify TypeScript configuration

### Getting Help

-   Check browser console for error messages
-   Verify transaction details on block explorer
-   Review contract events for failed transactions

## 📄 License

This project is licensed under the MIT License.
