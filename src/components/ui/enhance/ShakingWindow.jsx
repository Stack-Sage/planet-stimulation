import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ShakingWindow() {
  const [isShaking, setIsShaking] = useState(false);

  const shakeVariants = {
    initial: { x: 0, y: 0 },
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0], // X-axis shake
      y: [0, -5, 5, -5, 5, -3, 3, 0], // Y-axis shake
      transition: {
        duration: 0.5, // Shake duration
        ease: "easeInOut",
        repeat: Infinity, // Keep shaking
      },
    },
  };

  useEffect(() => {
    setIsShaking(true);
    return () => setIsShaking(false);
  }, []);

  return (
    <motion.div
      variants={shakeVariants}
      animate={isShaking ? "shake" : "initial"}
      className="absolute  bg-transparent -z-10 "
    />
  );
}
