interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'image' | 'card';
  lines?: number;
}

export const LoadingSkeleton = ({ 
  className = "", 
  variant = "text", 
  lines = 1 
}: LoadingSkeletonProps) => {
  if (variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i} 
            className={`skeleton rounded h-4 bg-bg-secondary ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
          />
        ))}
      </div>
    );
  }

  if (variant === 'image') {
    return (
      <div className={`skeleton rounded-lg aspect-square bg-bg-secondary ${className}`} />
    );
  }

  if (variant === 'card') {
    return (
      <div className={`card p-4 bg-bg-tertiary ${className}`}>
        <div className="skeleton rounded-lg aspect-square mb-4 bg-bg-secondary" />
        <div className="skeleton rounded h-4 w-3/4 mb-2 bg-bg-secondary" />
        <div className="skeleton rounded h-4 w-1/2 mb-3 bg-bg-secondary" />
        <div className="skeleton rounded h-6 w-1/3 bg-bg-secondary" />
      </div>
    );
  }

  return <div className={`skeleton rounded bg-bg-secondary ${className}`} />;
};

export const ProductCardSkeleton = () => (
  <LoadingSkeleton variant="card" />
);

export const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);