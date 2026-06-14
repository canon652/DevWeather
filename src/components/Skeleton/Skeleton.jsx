export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse rounded-2xl bg-white/10 ${className}`} />
);

export const DashboardSkeleton = () => (
  <div className="space-y-4 mt-6">
    <Skeleton className="h-48 w-full" />
    <div className="grid grid-cols-3 gap-3">
      {Array(6).fill(0).map((_, i) => (
        <Skeleton key={i} className="h-20" />
      ))}
    </div>
    <Skeleton className="h-28 w-full" />
    <Skeleton className="h-52 w-full" />
    <div className="flex gap-3">
      {Array(7).fill(0).map((_, i) => (
        <Skeleton key={i} className="h-24 w-24 flex-shrink-0" />
      ))}
    </div>
  </div>
);
