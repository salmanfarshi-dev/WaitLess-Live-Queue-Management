import { motion, useReducedMotion } from "motion/react";
import { FiHeart, FiClock } from "react-icons/fi";

function BrandLoader({
  message = "Preparing your experience...",
  size = "md",
}) {
  const shouldReduceMotion = useReducedMotion();

  const sizes = {
    sm: 48,
    md: 72,
    lg: 100,
  };

  const dimension = sizes[size] || sizes.md;

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-4 px-4 py-8"
      role="status"
      aria-live="polite"
    >
      <div
        className="relative flex shrink-0 items-center justify-center"
        style={{
          width: dimension,
          height: dimension,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-[3px]"
          style={{
            borderColor: "var(--wl-primary-light)",
            borderTopColor: "var(--wl-primary)",
            borderRightColor: "var(--wl-secondary)",
          }}
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="relative flex items-center justify-center"
          animate={shouldReduceMotion ? {} : { scale: [1, 1.12, 1] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FiHeart
            style={{
              color: "var(--wl-primary)",
              width: dimension * 0.46,
              height: dimension * 0.46,
            }}
            strokeWidth={2.5}
          />

          <FiClock
            className="absolute"
            style={{
              color: "var(--wl-secondary)",
              width: dimension * 0.22,
              height: dimension * 0.22,
              right: -dimension * 0.04,
              bottom: -dimension * 0.02,
            }}
            strokeWidth={2.5}
          />
        </motion.div>
      </div>

      <div className="flex w-full flex-col items-center gap-2 text-center">
        <motion.p
          className="text-sm font-semibold text-heading sm:text-base"
          animate={shouldReduceMotion ? {} : { opacity: [0.55, 1, 0.55] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {message}
        </motion.p>

        <span className="text-xs font-medium text-muted">
          WaitLess · Your Time Matters.
        </span>
      </div>
    </div>
  );
}

export default BrandLoader;
