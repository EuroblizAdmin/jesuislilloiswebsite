export function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-card shadow-md">
      <div className="skeleton-shimmer h-52 w-full" />
      <div className="flex flex-col gap-3 p-5">
        <div className="skeleton-shimmer h-6 w-3/4 rounded" />
        <div className="space-y-2">
          <div className="skeleton-shimmer h-4 w-full rounded" />
          <div className="skeleton-shimmer h-4 w-5/6 rounded" />
        </div>
        <div className="flex items-center gap-2 pt-2">
          <div className="skeleton-shimmer h-8 w-8 rounded-full" />
          <div className="skeleton-shimmer h-4 w-32 rounded" />
        </div>
      </div>
    </div>
  )
}
