import React from "react";
import { useContext } from "react";
import SunLoad from "./SunLoad";
import Button from "../Button";
import EarthScene from "../ui/PlanetModel";
import GlobeComponent from "../ui/PlanetModel";
import PlanetModel from "../ui/PlanetModel";
import { CollisionContext, CollisionProvider } from "../../contents/content";

const PostExplosion = () => {

  const {planetDis} =  useContext(CollisionContext)


  return (
    <div className="  h-screen w-screen overflow-hidden ">
      <div className=" fixed h-screen w-screen z-0 overflow-hidden ">
        <SunLoad />
      </div>
      <div className=" absolute w-full  mx-auto bottom-10 ">
        
          <Button />
       
      </div>
      {planetDis && (
        
        
         <PlanetModel/>
       

        )}
        {
          bgStar
        }

      </div>
  
  );
};

export default PostExplosion;
