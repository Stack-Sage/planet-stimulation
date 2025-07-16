import { motion } from "framer-motion";

// Function to generate a random number within a range
const getRandomValue = (min, max) => Math.random() * (max - min) + min;

const MotionWrapper = ({ children, className }) => {
  // Generate random initial x, y, rotation, and glow values
  const randomX = getRandomValue(-150, 150);
  const randomY = getRandomValue(-150, 150);
  const randomRotateX = getRandomValue(-20, 20);
  const randomRotateY = getRandomValue(-20, 20);
  const randomSkewX = getRandomValue(-5, 5); // Slight glitch skew
  const randomBlur = getRandomValue(5, 15);

  return (
    <motion.div
      className={className}
      style={{
        perspective: "1000px", // Adds depth
        transformStyle: "preserve-3d",
      }}
      initial={{
        opacity: 0,
        x: randomX,
        y: randomY,
        rotateX: randomRotateX,
        rotateY: randomRotateY,
        skewX: randomSkewX,
        scale: 0.8,
        filter: `blur(${randomBlur}px) brightness(1.5)`,
      
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        skewX: 0,
        scale: 1,
        filter: "blur(0px) brightness(1)",
   
        transition: {
          duration: 1.2,
          ease: [0.25, 0.6, 0.3, 1],
        },
      }}
      exit={{
        opacity: 0,
        x: -randomX,
        y: -randomY,
        rotateX: -randomRotateX,
        rotateY: -randomRotateY,
        skewX: -randomSkewX,
        scale: 0.8,
        filter: `blur(${randomBlur}px) brightness(1.5)`,
       
      }}
     
   
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
