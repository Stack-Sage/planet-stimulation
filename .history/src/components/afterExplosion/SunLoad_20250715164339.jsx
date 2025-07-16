import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toastMsg from "../../utils/toast";
import SunParticleScene from "../ui/SunScene";
import ig from "../../assets/asset";
import { Toaster } from "react-hot-toast";

const SunLoad = () => {
  const [showSun, setShowSun] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const audio = new Audio(ig.bonus);
  audio.oncanplaythrough = () => setAudioLoaded(true);

  useEffect(() => {
    audio.load();
  }, []);

  const playSound = () => {
    if (audioLoaded) {
      const sound = new Audio("/sounds/star-toast.mp3");
      sound.volume = 0.8;
      sound.play().catch((e) => {
        console.warn("Audio play was blocked or failed:", e);
      });
    }
  };

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      playSound();
      toastMsg("Yo! A new Star has been formed. Careful It's quite hot yet.", {
        background: "linear-gradient(to right, #00dbde, #fc00ff)"

, 
        color: "black",
      });
    }, 1000);

    const timeout2 = setTimeout(() => {
      setShowSun(true);
    }, 1500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <div className="relative z-10 min-w-screen min-h-screen w-full h-full flex items-center bg-black justify-center">
      <div className="w-full mx-auto">
        <Toaster position="top-center"/>
      </div>

      {showSun && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="z-20">
            <SunParticleScene />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SunLoad;
