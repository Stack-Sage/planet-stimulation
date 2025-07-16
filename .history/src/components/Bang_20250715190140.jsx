import React, { useContext, useState, useEffect } from "react";
import { CollisionContext } from "../contents/content";
import Explosion from "./ui/Explosion";
import ig from "../assets/asset";
import StarButton from "./ui/StarButton";
import BackgroundMusic from "./BackgroundMusic";
import Input2 from "./ui/enhance/Input2";
import MotionWrapper from "./ui/enhance/MotionWrapper";

import WavyText from "./ui/enhance/WavyText";
import WavyTextFast from "./ui/enhance/WavyTextFast";
import PostExplosion from "./afterExplosion/PostExplosion";

import SnowParticles from "./ui/enhance/particleWave";


const Bang = () => {
  const { playerName, setPlayerName, permissionGranted, setPermissionGranted } =
    useContext(CollisionContext);
  const [stage, setStage] = useState(0);
  const [messageIndex, setMessageIndex] = useState(-1);
  const [messagesFinished, setMessagesFinished] = useState(false);
  const [explosionStarted, setExplosionStarted] = useState(false);

  const messages = [
    "A massive explosion is about to occur!",
    "Two neutron stars are on the brink of collision!",
    "You are in for a great adventure!",
    `Brace yourself, ${playerName}!`
  ];

  useEffect(() => {
    if (stage === 3) {
      setMessageIndex(0);
      let i = 0;
      const interval = setInterval(() => {
        setMessageIndex((prev) => prev + 1);
        i++;
        if (i >= messages.length) {
          clearInterval(interval);
          setTimeout(() => setMessagesFinished(true), 500);
        }
      }, 3000);
    }
  }, [stage]);

  return (
    <>
      <div className="absolute w-screen h-screen z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-black to-blue-950 text-blue-500 bg-opacity-75 text-2xl">
        
        <div className="absolute h-screen w-screen z-0 opacity- brightness-125 contrast-110 saturate-200  ">

        <SnowParticles/>
        </div>
        
        {stage === 0 && (
          <MotionWrapper className="flex px-10 flex-col gap-10 items-center">

          

            <MotionWrapper>
              <p className="lg:text-4xl text-3xl text-blue-500 contrast-200 brightness-200  font-bold italic  mb-4">
                <WavyText text=" Enter your Name, Explorer " />
              </p>
            </MotionWrapper>

            <MotionWrapper>
              <Input2
                value={playerName}
                type="text"
                className="p-2 rounded outline-none text-teal-500 brightness-150 text-xl contrast-150 mb-4 text-center"
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </MotionWrapper>

            <MotionWrapper>
              <StarButton
                className="bg-blue-500 hue-rotate-180 saturate-200 px-4 py-2 rounded text-white"
                onClick={() => playerName.trim() && setStage(1)}
              >
                Confirm
              </StarButton>
            </MotionWrapper>
          </MotionWrapper>
        )}

        {stage === 1 && (
          <MotionWrapper className="flex gap-10  px-10 flex-col lg:text-4xl text-2xl text-center  ">
            <MotionWrapper>
              <p className="text-2xl lg:text-4xl text-center  text-blue-500 contrast-200 brightness-200  font-bold italic ">
                <WavyText text=" Do you want to Enable Sound for the Best Experience " />
              </p>
            </MotionWrapper>

            <MotionWrapper>
              <StarButton
                className="mt-4 hue-rotate-90 text-center  px-2 py-2 rounded text-white"
                onClick={() => {
                  setPermissionGranted(true);
                  setStage(3);
                }}
              >
                Yes, Play with Sound 🔊
              </StarButton>
            </MotionWrapper>

            <MotionWrapper>
              <StarButton
                className="mt-4 hue-rotate-60 px-4 py-2 rounded text-white"
                onClick={() => {
                  setPermissionGranted(false);
                  setStage(2);
                }}
              >
                No, mute it 🔇
              </StarButton>
            </MotionWrapper>
          </MotionWrapper>
        )}
        {permissionGranted === false && stage === 2 && (
          <MotionWrapper>
            <div className="flex flex-col gap-10 items-center">
              <MotionWrapper>
                <p className="text-2xl  text-center items-center  gap-2 px-10 text-cyan-400 italic font-semibold  ">
                  <h1 className="text-3xl text-cyan-300 lg:text-4xl gap-2  contrast-200 brightness-200  font-bold italic ">
                    <WavyText text={`Kidding ${playerName}`} />{" "}
                  </h1>
                  <br /> You don't get to choose <br /> Play with sound on...
                </p>
              </MotionWrapper>
              <StarButton
                className="mt-4 hue-rotate-90 text-center items-center  px-2 py-2 rounded text-white"
                onClick={() => {
                  setPermissionGranted(true);
                  setStage(3);
                }}
              >
                Yes, play with sound
              </StarButton>
            </div>
          </MotionWrapper>
        )}

        {stage === 3 && messageIndex < messages.length && (
          <MotionWrapper className="flex px-10 flex-col items-center text-center">
            <MotionWrapper className="   lg:text-4xl  text-cyan-400 contrast-200 brightness-200  font-bold italic  text-3xl p-2 rounded-lg shadow-lg w-full animate-fade">
              <WavyTextFast text={`${messages[messageIndex]}`} />
            </MotionWrapper>
            <BackgroundMusic
              src={ig.space_sound}
              play={permissionGranted}
              volume={0.8}
            ></BackgroundMusic>
          </MotionWrapper>
        )}

        {messagesFinished && !explosionStarted && (
          <MotionWrapper className="absolute  gap-20 flex flex-col items-center bg-opacity-70 p-6 rounded-lg">
            <BackgroundMusic
              src={ig.space_sound}
              play={permissionGranted}
              volume={0.8}
            ></BackgroundMusic>
            <MotionWrapper>
              <p className=" text-blue-500 contrast-200 brightness-200  font-bold italic text-3xl lg:text-4xl text-center mb-4">
                <WavyText text=" Start the Simulation " />
              </p>
            </MotionWrapper>

            <MotionWrapper>
              <StarButton
                className="mt-4 hue-rotate-180    saturate-200 contrast-100 brightness-1 px-4 py-2 rounded font-bold"
                onClick={() => {
                  setExplosionStarted(true);
                  setStage(4);
                }}
              >
                Activate Explosion...
              </StarButton>
            </MotionWrapper>
          </MotionWrapper>
        )}

        {explosionStarted && stage === 4 && (
          <div className=" absolute h-screen w-screen  ">
            <Explosion
              permissionGranted={permissionGranted}
              onExplosionEnd={() => setStage(5)}
            />
          </div>
        )}

        {stage === 5 && (
          <div>
            <PostExplosion />
          </div>
        )}

        <BackgroundMusic src={ig.ost} play={permissionGranted} volume={0.8} />
      </div>
    </>
  );
};

export default Bang;
