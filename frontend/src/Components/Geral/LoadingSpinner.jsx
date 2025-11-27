// LoadingSpinner.jsx
import { motion } from "framer-motion";

export function LoadingSpinner({ size = 48 }) {
  return (
    <div className="flex items-center justify-center py-4">
      <motion.svg
        viewBox="0 0 50 50"
        // tamanho controlado pela prop
        style={{ width: size, height: size }}
        className="block"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.1,
          ease: "linear",
        }}
      >
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          fill="transparent"
          stroke="rgba(3,105,161,1)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0.2 }}
          animate={{ pathLength: 0.8 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
}
