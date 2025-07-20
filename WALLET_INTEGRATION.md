# Wallet Integration Setup Guide

This guide explains how to set up and use the integrated wallet functionality in your Dingdong Loans application.

## Environment Setup

1. Create a `.env` file in your project root with the following variables:

```env
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id_here
VITE_XELLAR_APP_ID=your_xellar_app_id_here
VITE_API_URL=https://api.dingdong.loans
```

2. Get your project IDs:
    - **WalletConnect Project ID**: Visit [WalletConnect Cloud](https://cloud.walletconnect.com/) and create a new project
    - **Xellar App ID**: Contact Xellar team or check their documentation for app registration

## Features Integrated

### 1. Wallet Provider (`WalletProvider`)

-   Wraps the entire application with wallet functionality
-   Handles wallet connection/disconnection
-   Manages user authentication with backend
-   Provides wallet context to all components

### 2. Updated Navbar

-   Real wallet connection using Xellar Kit
-   Shows actual wallet address and balance
-   Proper disconnect functionality
-   Dropdown with wallet information

### 3. Smart Contract Utilities

-   Pre-configured for Lisk Sepolia testnet
-   Contract interaction functions (read/write)
-   Transaction handling and receipt waiting
-   Error handling and loading states

### 4. Custom Hooks

#### `useWallet()`

```typescript
const { address, isConnected, balance, connect, disconnect } = useWallet();
```

#### `useLoanContract()`

```typescript
const { loading, error, getTotalLoans, createLoan } = useLoanContract();
```

#### `useUserLoans()`

```typescript
const { loans, loading, error, refetch } = useUserLoans();
```

## How to Use

### Basic Wallet Connection

The wallet connection is now handled through the Navbar. Users can:

1. Click "Connect Wallet" to open the wallet selection modal
2. Choose their preferred wallet (MetaMask, WalletConnect, etc.)
3. Sign the authentication message for backend access
4. View their address and balance in the navbar dropdown

### Contract Interactions

```typescript
import { useLoanContract } from "@/hooks/use-contract";

function MyComponent() {
	const { createLoan, loading, error } = useLoanContract();

	const handleCreateLoan = async () => {
		try {
			const result = await createLoan(
				BigInt("1000000000000000000"), // 1 ETH in wei
				BigInt("2000000000000000000") // 2 ETH collateral in wei
			);
			console.log("Loan created:", result);
		} catch (err) {
			console.error("Failed to create loan:", err);
		}
	};

	return (
		<button onClick={handleCreateLoan} disabled={loading}>
			{loading ? "Creating..." : "Create Loan"}
		</button>
	);
}
```

### Reading Contract Data

```typescript
import {
	contractUtils,
	LOAN_CONTRACT_ABI,
	CONTRACT_ADDRESSES,
} from "@/lib/contract-utils";

// Read total loans
const totalLoans = await contractUtils.readContract(
	CONTRACT_ADDRESSES.LOAN_CONTRACT,
	LOAN_CONTRACT_ABI,
	"totalLoans"
);
```

## Important Configuration

### Contract Addresses

Update the contract addresses in `src/lib/contract-utils.ts`:

```typescript
export const CONTRACT_ADDRESSES = {
	LOAN_CONTRACT: "0xYourLoanContractAddress" as `0x${string}`,
	COLLATERAL_CONTRACT: "0xYourCollateralContractAddress" as `0x${string}`,
} as const;
```

### Contract ABIs

Replace the example ABI in `src/lib/contract-utils.ts` with your actual contract ABI:

```typescript
export const LOAN_CONTRACT_ABI = [
	// Your actual contract ABI here
] as const;
```

## Network Configuration

The application is currently configured for **Lisk Sepolia Testnet**:

-   Chain ID: 4202
-   RPC URL: https://rpc.sepolia-api.lisk.com
-   Block Explorer: https://sepolia-blockscout.lisk.com

To change networks, modify the chain configuration in `src/components/wallet/wallet-provider.tsx`.

## Authentication Flow

1. User connects wallet through Xellar Kit UI
2. Application requests authentication message from backend
3. User signs the message with their wallet
4. Application sends signed message to backend for verification
5. Backend returns access token
6. Token is stored in localStorage for API calls

## Error Handling

The wallet integration includes comprehensive error handling:

-   Network connection errors
-   Transaction failures
-   Authentication errors
-   Contract interaction errors

Errors are displayed through the toast notification system.

## Testing

1. Make sure you have test ETH on Lisk Sepolia testnet
2. Connect your wallet through the navbar
3. Try contract interactions through the provided hooks
4. Check console logs for detailed transaction information

## Security Notes

-   Access tokens are stored in localStorage
-   Tokens are automatically cleared on wallet disconnect
-   Always validate user permissions before contract interactions
-   Use proper error handling for failed transactions

## Next Steps

1. Deploy your smart contracts to Lisk Sepolia
2. Update contract addresses and ABIs
3. Configure your backend API endpoints
4. Test all wallet interactions thoroughly
5. Add proper loading states and error messages to your UI
