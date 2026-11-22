import { motion } from "motion/react";
import waitlessLogo from "../../assets/images/waitless-logo.png";

function PageLoader({ message = "Preparing your experience..." }) {
  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4"
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-xs flex-col items-center"
      >
        {/* WaitLess Logo */}
        <motion.img
          src={waitlessLogo}
          alt="WaitLess"
          className="mb-8 h-auto w-64 max-w-full object-contain sm:w-72"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Brand Loading Spinner */}
        <div className="relative h-11 w-11">
          <motion.div
            className="absolute inset-0 rounded-full border-[3px]"
            style={{
              borderColor: "var(--wl-primary-light)",
              borderTopColor: "var(--wl-primary)",
              borderRightColor: "var(--wl-secondary)",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Loading Message */}
        <p className="mt-5 text-center text-sm font-semibold text-heading sm:text-base">
          {message}
        </p>

        <p className="mt-2 text-xs font-medium text-muted">
          Your Time Matters.
        </p>
      </motion.div>
    </div>
  );
}

export default PageLoader;
