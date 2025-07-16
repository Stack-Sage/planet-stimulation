import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useContext } from "react";
import { CollisionContext } from "../../contents/content";
import ig from "../../assets/asset";

const ModelNebula = () => {
  const { setCollisionCount,speed,setSpeed , hueRotate, setHueRotate} = useContext(CollisionContext)

  const size = 20;
  const controls = useAnimation();
  const x = useMotionValue(Math.random() * (window.innerWidth - size));
  const y = useMotionValue(Math.random() * (window.innerHeight - size));
  const velocity = useRef({ vx: 1, vy: 1 });


  useEffect(() => {
    const updatePosition = () => {
      const deltaX = (velocity.current.vx * speed) / 60;
      const deltaY = (velocity.current.vy * speed) / 60;

      const newX = x.get() + deltaX;
      const newY = y.get() + deltaY;

      let collided = false;

      // Detect collisions and reverse direction
      if (newX <= 0 || newX >= window.innerWidth - size) {
        velocity.current.vx *= -1;
        collided = true;
      }
      if (newY <= 0 || newY >= window.innerHeight - size) {
        velocity.current.vy *= -1;
        collided = true;
      }

      if (collided) {
        setCollisionCount((prev) => prev + 1); // Update context count
      }

      // Update position
      x.set(Math.min(Math.max(newX, 0), window.innerWidth - size));
      y.set(Math.min(Math.max(newY, 0), window.innerHeight - size));
    };

    const interval = setInterval(updatePosition, 1000 / 60); // 60 FPS

    return () => clearInterval(interval); // Cleanup on unmount
  }, [x, y, speed,setCollisionCount]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none  ">
      <motion.img
        src={ig.nebulamodel}
        alt="Nebula"
        className="rounded-full bg-transparent absolute brightness-200 contrast-200 shadow-xl  shadow-white   " 
        width={size}
        height={size}
        style={{ x, y, filter: `hue-rotate(${hueRotate}deg)`, }} 
        animate={controls}
        transition={{
          ease: "linear",
        }}
      />
    </div>
  );
};

export default ModelNebula;
