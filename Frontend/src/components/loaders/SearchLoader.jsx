import { motion } from "motion/react";
import { FiSearch } from "react-icons/fi";

function SearchLoader({ message = "Searching..." }) {
  return (
    <div
      className="flex items-center justify-center gap-3 py-8"
      role="status"
      aria-live="polite"
    >
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light"
      >
        <FiSearch className="h-5 w-5 text-primary" />
      </motion.div>

      <div>
        <p className="text-sm font-semibold text-heading">{message}</p>

        <div className="mt-2 flex gap-1">
          {[0, 1, 2].map((item) => (
            <motion.span
              key={item}
              className="h-1.5 w-1.5 rounded-full bg-secondary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: item * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchLoader;
