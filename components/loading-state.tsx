export function LoadingState() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        <div className="h-8 w-1/3 bg-muted animate-pulse rounded" />
        <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="neu-card animate-pulse">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 bg-muted rounded-lg" />
                <div className="h-4 w-16 bg-muted rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-1/2 bg-muted rounded" />
                <div className="h-6 w-3/4 bg-muted rounded" />
                <div className="h-3 w-full bg-muted rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}