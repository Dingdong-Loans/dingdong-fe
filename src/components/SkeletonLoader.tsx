import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoaderProps {
  type: "card" | "table" | "stats_row" | "form" | "loan_card" | "portfolio" | "health_factor";
}

const SkeletonLoader = ({ type }: SkeletonLoaderProps) => {
  if (type === "card") {
    return (
      <div className="space-y-3 p-4 border rounded-lg">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  if (type === "loan_card") {
    return (
      <div className="p-4 border rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-3 w-[150px]" />
          </div>
        </div>
        <div className="space-y-2 items-end flex flex-col">
          <Skeleton className="h-6 w-[120px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    )
  }

  if (type === "table") {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex space-x-4">
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "stats_row") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded-lg space-y-2"><Skeleton className="h-4 w-[100px]" /><Skeleton className="h-8 w-[150px]" /></div>
        <div className="p-4 border rounded-lg space-y-2"><Skeleton className="h-4 w-[100px]" /><Skeleton className="h-8 w-[150px]" /></div>
        <div className="p-4 border rounded-lg space-y-2"><Skeleton className="h-4 w-[100px]" /><Skeleton className="h-8 w-[150px]" /></div>
      </div>
    );
  }

  if (type === "portfolio" || type === "health_factor") {
    return (
      <div className="p-6 border rounded-2xl space-y-4">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-3 pt-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    )
  }

  if (type === "form") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;