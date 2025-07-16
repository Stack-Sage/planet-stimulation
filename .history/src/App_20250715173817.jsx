import React, { useContext } from "react";

import { ToastContainer } from "react-toastify";

import { CollisionContext, CollisionProvider } from "./contents/content";

import Bang from "./components/Bang";
import PostExplosion from "./components/afterExplosion/PostExplosion";

const App = () => {
  const { showSunScene, setShowSunScene } = useContext(CollisionContext);

  return (
    <>
      <div className="w-full h-full ">
      
          <Bang />
          <PostExplosion/>

        
        
      </div>

     
    </>
  );
};

export default App;
