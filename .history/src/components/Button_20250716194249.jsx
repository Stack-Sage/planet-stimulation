import React, { useContext, useEffect, useState } from "react";
import { CollisionContext } from "../contents/content";
import BgStars from "./BgStars";

import "../App.css";
import ig from "../assets/asset";

import Planet from "./Planet";




const Button = () => {
  const ClickSound = new Audio(ig.item);
  const { value, setValue , planetLoaded  } = useContext(CollisionContext);
  const [inc, setInc] = useState(1);
  const { collisionCount, allowSound, setAllowSound } =
    useContext(CollisionContext);

  useEffect(() => {
    if (collisionCount > 0) {
      setValue((prevValue) => prevValue + 1);
    }
  }, [collisionCount]);

  const clickValue = (e) => {
    setValue(value + inc);
    ClickSound.currentTime = 0.2;
    ClickSound.playbackRate = 1.2;
    ClickSound.volume = 0.4;
    ClickSound.play();
  };

  return (
    <div className="h-fit w-screen flex flex-col justify-between ">
      <div className=" flex flex-col items-center mt-20 text-white text-xl gap-2">
          <div className=" gap-3 min-h-[200px] mt-14 flex w-full min-w-[400px] z-10  flex-row justify-center  text-white  p-2">
            {(value > 5 &&   && (
              <div className=" ">
                  <Planet/>
              </div>
            )}

            {value > 8 && (
              <div className="">
                <BgStars />
              </div>
            )}
          

          </div>
       
          <h1 className="italic z-50  text-xl mb-2"> {value} Stimulations </h1>
          

          <button type="button" className="btn z-50  " onClick={clickValue}>
            <strong> Click Me! </strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>
                 
            <div id="glow">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </button>

        
      </div>
    </div>
  );
};

export default Button;
