import React from "react";
import { useContext } from "react";
import SunLoad from "./SunLoad";
import Button from "../Button";
import EarthScene from "../ui/PlanetModel";
import GlobeComponent from "../ui/PlanetModel";
import PlanetModel from "../ui/PlanetModel";
import { CollisionContext, CollisionProvider } from "../../contents/content";
import SnowParticles from "../ui/enhance/particleWave";

const PostExplosion = () => {

  const {planetDis,bgStarDis} =  useContext(CollisionContext)


  return (
    <>
    <div className="  h-screen w-screen overflow-hidden ">
      <div className=" fixed h-screen w-screen  overflow-hidden ">
        <SunLoad />
      </div>
      <div className=" absolute w-full  mx-auto bottom-10 ">
        
          <Button />
       
      </div cl>
      {planetDis && (
        
        
         <PlanetModel/>
       
         
        )}

        {
          bgStarDis &&(
            <div className="blur-[1px]">
      
            <SnowParticles/>
            </div>
          )
        }
      </div>
  
    </>
  );
};

export default PostExplosion;
