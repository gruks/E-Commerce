export default function ProductGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 px-4 sm:px-6
                    grid-cols-2
                    lg:grid-cols-4">
      {children}
    </div>
  );
}