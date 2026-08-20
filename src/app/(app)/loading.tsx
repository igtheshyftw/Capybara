import { SkeletonGrid } from "@/components/learning/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="space-y-3">
        <span className="skeleton block h-3 w-28" />
        <span className="skeleton block h-8 w-72" />
        <span className="skeleton block h-4 w-full max-w-lg" />
      </div>
      <div className="mt-7">
        <SkeletonGrid count={6} />
      </div>
    </div>
  );
}
