/** Skeleton screens, never spinners. Shapes match the content they stand in for. */
export function SkeletonLine({ w = "100%", h = 12 }: { w?: string; h?: number }) {
  return <span className="skeleton block" style={{ width: w, height: h }} />;
}

export function SkeletonCard() {
  return (
    <div className="paper-card space-y-3 p-5">
      <SkeletonLine w="38%" h={10} />
      <SkeletonLine w="76%" h={18} />
      <SkeletonLine w="100%" />
      <SkeletonLine w="62%" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}

export function SkeletonRows({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="paper-card flex items-center gap-4 p-4">
          <span className="skeleton size-9 shrink-0 rounded-full" />
          <span className="flex-1 space-y-2">
            <SkeletonLine w="45%" h={11} />
            <SkeletonLine w="70%" h={9} />
          </span>
          <SkeletonLine w="52px" h={22} />
        </div>
      ))}
    </div>
  );
}
