import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import SunParticleScene from "../ui/SunScene";
import ig from "../../assets/asset";

const SunLoad = () => {
  const [showSun, setShowSun] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);

  // Preload audio for smooth play
  const audio = new Audio(ig.bonus); 
  audio.oncanplaythrough = () => setAudioLoaded(true); 

  useEffect(() => {
    audio.load(); 
  }, []);

  // Function to play sound
  const playSound = () => {
    if (audioLoaded) {
      const sound = new Audio("/sounds/star-toast.mp3");
      sound.volume = 0.8;
      sound.play().catch((e) => {
        console.warn("Audio play was blocked or failed:", e);
      });
    } else {
      console.warn("Audio not loaded yet.");
    }
  };

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      playSound(); 
      toast.success(
        "Congrats, you’ve got a star! It's hot, it's glowing, Just don’t stare directly at it—seriously 🌟 ",
        {
          duration: 5000,
          style: {
            backgroundImage:
              "radial-gradient(circle,rgba(16, 21, 110, 1) 0%, rgba(24, 24, 135, 1) 28%, rgba(19, 53, 176, 1) 53%, rgba(0, 212, 255, 1) 100%)",
            color: "white",
            wordSpacing: "5px",
            letterSpacing: "2px",
            border: "2px solid black",
            padding: "10px 10px",
            fontSize: "16px",
            width: "400px",
            minWidth: "300px",
            maxWidth: "",
            fontWeight: "300",
            fontFamily: "Arial, sans-serif",
            display: "flex",
            alignItems: "center",
            boxShadow:
              " 0px 0px 20px 10px rgba(0, 0, 225, 0.8)"
          },
          icon: ""
        }
      );
    }, 1000); // Toast will show 3 seconds after mounting

    const timeout2 = setTimeout(() => {
      setShowSun(true); // Show the sun after 1.5 seconds
    }, 1500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <div className="relative z-10 min-w-screen min-h-screen w-full h-full flex items-center bg-black justify-center">
      <div className="w-full mx-auto ">
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      {showSun && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="z-20 ">
          <SunParticleScene />
            
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SunLoad;
