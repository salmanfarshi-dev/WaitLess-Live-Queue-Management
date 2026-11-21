
import { motion } from "motion/react";
import { FiLoader } from "react-icons/fi";

function ButtonLoader({ message = "Please wait...", size = 18 }) {
  return (
    <span
      className="inline-flex items-center justify-center gap-2"
      role="status"
      aria-live="polite"
    >
      <motion.span
        className="inline-flex"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ color: "var(--wl-primary)" }}
      >
        <FiLoader size={size} />
      </motion.span>

      <span>{message}</span>
    </span>
  );
}

export default ButtonLoader;
