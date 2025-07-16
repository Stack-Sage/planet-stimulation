import React, { useContext, useEffect, useState } from "react";
import ig from "../assets/asset";

import { CollisionContext } from "../contents/content";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import sound from "../songs/songs";

import toastMsg from "../utils/toast";
import { Toaster } from "react-hot-toast";

const Planet = () => {
  const {
    nebulaCost,
    planetDis,
    setPlanetDis,
    setNebulaCost,
    value,
    setValue,
    allowSound,
    highestLevel
  } = useContext(CollisionContext);
  const ClickSound = new Audio(sound.explosionSound);

 const click = () => {
  if (nebulaCost <= value) {
    setPlanetDis(true);
    setNebulaCost(parseInt(nebulaCost * 2));
    setValue(value - nebulaCost);

    if (allowSound) {
      ClickSound.currentTime = 0.08;
      ClickSound.playbackRate = 1.2;
      ClickSound.play().catch((e) =>
        console.warn("Click sound failed:", e)
      );
    }

 
    setTimeout(() => {
      toastMsg("Yo! A new Planet. Lezgoo", {
      background: "linear-gradient(to right, #00c9ff, #92fe9d)"

,
        color: "black",
      });
    }, 500); // 0.5 second delay
  }
};


  const buttonStyle = nebulaCost > value ? "bg-black" : "bg-white";

  return (
    <>
      <div className=" relative group z-30  ">
        <div className="w-full mx-auto">
          <Toaster position="top-center" />
        </div>

        <button
          className={`  group hover:shadow-lg object-cover hover:shadow-white border-none ring-1 ring-blue-400 p-2 text-lg px-4 rounded-lg active:text-blue-400  hover:ring-sky-900 animate-slide-in ${buttonStyle} `}
        >
          <img
            onClick={click}
            src={ig.nebulamodel}
            alt="Nebula"
            width="35px"
            height="35px"
            className="rounded-sm object-contain   "
          />
        </button>

        <div className=" hidden absolute group-hover:flex flex-col  shadow-lg bg-gradient-to-br from-black via-slate-900 to-black  shadow-blue-200 brightness-125    p-2 mt-5 min-w-[180px] text-center rounded-lg gap-1  -ml-10  ">
          <p className="text-sm  font-thin">Planet </p>

          <p className=" text-xs font-light">+1 Simulations per Rotation </p>
          <p className=" text-sm font-light">
            {" "}
            Cost: {parseInt(nebulaCost)} stimulation
          </p>
        </div>
      </div>

      
    </>
  );
};

export default Planet;
