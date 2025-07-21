import { useContractPolling } from "./use-contract-polling";
import { CONTRACT_ADDRESSES } from "@/lib/contract-utils";
import { COLLATERAL_MANAGER_ABI } from "@/abis/collateral-manager";
import { useWallet } from "./use-wallet";
import { useToast } from "./use-toast";

/**
 * Hook to poll for collateral balance changes
 * @param token Token address to check the balance for
 * @param pollingInterval How frequently to poll (default: 5000ms)
 * @param enabled Whether to enable polling (default: true)
 */
export const useCollateralBalancePolling = (
  token: `0x${string}`,
  pollingInterval = 5000,
  enabled = true
) => {
  const { address } = useWallet();
  const { toast } = useToast();
  
  const {
    data: balance,
    isLoading,
    error,
    lastUpdated,
    refetch,
    startPolling,
    stopPolling,
  } = useContractPolling(
    CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
    COLLATERAL_MANAGER_ABI,
    "getDepositedCollateral",
    address ? [address, token] : undefined,
    {
      interval: pollingInterval,
      enabled: Boolean(enabled && address && token),
      onError: (err) => {
        toast({
          variant: "destructive",
          title: "Balance Polling Failed",
          description: err.message,
        });
      },
      // Create a cache key based on address and token
      cacheKey: address && token ? `collateral-balance-${address}-${token}` : undefined,
    }
  );

  return {
    balance,
    isLoading,
    error,
    lastUpdated,
    refetch,
    startPolling,
    stopPolling,
  };
};
