import { motion } from "motion/react";

function Skeleton({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{
        backgroundColor: "var(--wl-border)",
      }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--wl-surface), transparent)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export function DashboardCardSkeleton() {
  return (
    <div className="wl-card w-full p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>

      <Skeleton className="mt-5 h-8 w-24" />
      <Skeleton className="mt-3 h-3 w-36 max-w-full" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="wl-card w-full overflow-hidden p-3 sm:p-5">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[420px]">
          {Array.from({ length: rows }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-t py-4"
              style={{
                borderColor: "var(--wl-border)",
              }}
            >
              <Skeleton className="h-9 w-9 shrink-0 rounded-full" />

              <div className="min-w-0 flex-1">
                <Skeleton className="h-4 w-32 max-w-full" />
                <Skeleton className="mt-2 h-3 w-24 max-w-full" />
              </div>

              <Skeleton className="h-7 w-20 shrink-0 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function QueueListSkeleton({ rows = 4 }) {
  return (
    <div className="w-full space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="wl-card flex w-full items-center gap-3 p-3 sm:gap-4 sm:p-4"
        >
          <Skeleton className="h-11 w-11 shrink-0 rounded-xl sm:h-12 sm:w-12" />

          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-32 max-w-full" />
            <Skeleton className="mt-2 h-3 w-24 max-w-full" />
          </div>

          <Skeleton className="h-7 w-16 shrink-0 rounded-full sm:w-20" />
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
