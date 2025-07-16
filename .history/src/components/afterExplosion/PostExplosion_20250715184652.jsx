import React, { useState } from "react";
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
  const [planetName,setPlanetName] = useState("")

  function enter(){
    setPlanetName(planetName)
  }

  return (
    <>
    <div className="  h-screen w-screen overflow-hidden ">
      <div className=" fixed h-screen w-screen  overflow-hidden ">
        <SunLoad />
      </div>
      <div className=" absolute w-full  mx-auto bottom-10 ">
        
          <Button />
       
      </div>
      {planetDis && (
        
        <div className="overflow-hidden z-20 "> 
        onClick ={} (e)=> {setPlanetName(e.target.value)}}
         <PlanetModel/>

         </div>
       
         
        )}

        {
          bgStarDis &&(
            <div className=" brightness-200  contrast-100 ">
      
            <SnowParticles/>
            </div>
          )
        }
      </div>
  
    </>
  );
};

export default PostExplosion;
