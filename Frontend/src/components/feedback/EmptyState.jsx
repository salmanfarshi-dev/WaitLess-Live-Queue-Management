
import { motion } from "motion/react";
import { FiInbox } from "react-icons/fi";

function EmptyState({
  title = "No data found",
  description = "There is nothing to display right now.",
  action,
  icon: Icon = FiInbox,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex w-full flex-col items-center justify-center px-5 py-10 text-center sm:py-14"
      role="status"
      aria-live="polite"
    >
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl sm:h-16 sm:w-16"
        style={{ backgroundColor: "var(--wl-primary-light)" }}
      >
        <Icon
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

      {action && (
        <div className="mt-6 w-full sm:w-auto">
          {action}
        </div>
      )}
    </motion.div>
  );
}

export default EmptyState;
