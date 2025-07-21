import { useState, useEffect, useRef } from "react";
import { Abi } from "viem";
import { contractUtils } from "@/lib/contract-utils";

interface PollingOptions {
  interval?: number;  // Polling interval in milliseconds
  enabled?: boolean;  // Whether polling is enabled
  initialData?: any;  // Initial data to use before the first poll
  onSuccess?: (data: any) => void;  // Callback when a poll succeeds
  onError?: (error: Error) => void;  // Callback when a poll fails
  cacheKey?: string;  // Optional cache key for deduplication
  cacheDuration?: number;  // Optional custom cache duration in milliseconds
}

// Simple cache for read operations to prevent spam
const pollingCache = new Map<string, { data: unknown; timestamp: number }>();
const DEFAULT_CACHE_DURATION = 2000; // 2 seconds default cache

// Custom hook for polling contract reads
export const useContractPolling = <TData = unknown>(
  contractAddress: `0x${string}` | undefined,
  abi: Abi,
  functionName: string,
  args: unknown[] = [],
  options: PollingOptions = {}
) => {
  const {
    interval = 5000,  // Default to 5 second polling
    enabled = true,   // Default to enabled
    initialData = undefined,
    onSuccess,
    onError,
    cacheKey,
    cacheDuration = DEFAULT_CACHE_DURATION
  } = options;

  const [data, setData] = useState<TData | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  // Using refs for things that shouldn't trigger re-renders when they change
  const pollingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const fetchData = async () => {
    if (!contractAddress) return;
    
    // Check cache if cache key is provided
    const cacheKeyString = cacheKey ?? `${contractAddress}-${functionName}-${JSON.stringify(args)}`;
    const cached = pollingCache.get(cacheKeyString);
    if (cached && Date.now() - cached.timestamp < cacheDuration) {
      if (isMountedRef.current) {
        setData(cached.data as TData);
      }
      return cached.data;
    }

    if (isMountedRef.current) {
      setIsLoading(true);
    }

    try {
      const result = await contractUtils.readContract(
        contractAddress,
        abi,
        functionName,
        args
      );

      // Cache the result
      pollingCache.set(cacheKeyString, {
        data: result,
        timestamp: Date.now(),
      });

      if (isMountedRef.current) {
        setData(result as TData);
        setError(null);
        setIsLoading(false);
        setLastUpdated(Date.now());
      }

      if (onSuccess && isMountedRef.current) {
        onSuccess(result);
      }

      return result;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      
      if (isMountedRef.current) {
        setError(errorObj);
        setIsLoading(false);
      }

      if (onError && isMountedRef.current) {
        onError(errorObj);
      }
      
      throw errorObj;
    }
  };

  const startPolling = () => {
    if (pollingTimerRef.current) {
      clearInterval(pollingTimerRef.current);
    }

    // Initial fetch
    fetchData().catch(() => {}); // Catch error to prevent unhandled promise rejection
    
    // Setup interval polling
    pollingTimerRef.current = setInterval(() => {
      fetchData().catch(() => {}); // Catch error to prevent unhandled promise rejection
    }, interval);
  };

  const stopPolling = () => {
    if (pollingTimerRef.current) {
      clearInterval(pollingTimerRef.current);
      pollingTimerRef.current = null;
    }
  };

  // Force a refresh of the data
  const refetch = () => {
    return fetchData();
  };

  useEffect(() => {
    // Initialize on mount or when dependencies change
    if (enabled && contractAddress) {
      startPolling();
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      isMountedRef.current = false;
      stopPolling();
    };
  }, [enabled, contractAddress, functionName, JSON.stringify(args), interval]);

  return {
    data,
    isLoading,
    error,
    lastUpdated,
    refetch,
    startPolling,
    stopPolling,
  };
};
