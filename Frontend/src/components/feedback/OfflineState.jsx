
import { motion } from "motion/react";
import { FiWifiOff, FiRefreshCw } from "react-icons/fi";
import { Button } from "@heroui/react";

function OfflineState({
  title = "You're offline",
  description = "Please check your internet connection and try again.",
  onRetry,
  retryLabel = "Try Again",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex w-full flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-14"
      role="status"
      aria-live="polite"
    >
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl sm:h-16 sm:w-16"
        style={{ backgroundColor: "var(--wl-primary-light)" }}
      >
        <FiWifiOff
          className="h-7 w-7 sm:h-8 sm:w-8"
          style={{ color: "var(--wl-primary)" }}
        />
      </div>

      <h3 className="text-lg font-bold text-heading sm:text-xl">
        {title}
      </h3>

      <p className="mt-2 w-full max-w-sm text-sm leading-6 text-muted sm:text-base">
        {description}
      </p>

      {onRetry && (
        <Button
          color="primary"
          variant="solid"
          onPress={onRetry}
          className="mt-6 w-full sm:w-auto"
        >
          <FiRefreshCw className="h-4 w-4" />
          {retryLabel}
        </Button>
      )}
    </motion.div>
  );
}

export default OfflineState;
