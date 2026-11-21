import { motion } from "motion/react";

function TableLoader({ rows = 5, columns = 4 }) {
  return (
    <div
      className="wl-card w-full overflow-hidden"
      role="status"
      aria-label="Loading table data"
    >
      {/* Table Header */}
      <div className="overflow-x-auto">
        <div className="flex min-w-[420px] gap-4 border-b border-border bg-background px-4 py-4 sm:px-5">
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="min-w-0 flex-1">
              <div
                className="h-3 w-20 max-w-full rounded-md"
                style={{ backgroundColor: "var(--wl-border)" }}
              />
            </div>
          ))}
        </div>

        {/* Table Rows */}
        <div className="min-w-[420px] divide-y divide-border">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center gap-4 px-4 py-5 sm:px-5"
            >
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="min-w-0 flex-1">
                  <motion.div
                    className="h-4 rounded-md"
                    style={{
                      width: `${65 + ((rowIndex + colIndex) % 3) * 10}%`,
                      backgroundColor: "var(--wl-border)",
                    }}
                    animate={{
                      opacity: [0.45, 1, 0.45],
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: colIndex * 0.1,
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TableLoader;
