import React, { createContext, useState } from "react";

export const CollisionContext = createContext();

export const CollisionProvider = ({ children }) => {
  const [collisionCount, setCollisionCount] = useState(0);
  const [nebulaCost, setNebulaCost] = useState(5);
  const [value, setValue] = useState(0);
  const [speed, setSpeed] = useState(2);
  const [speedCost,setSpeedCost] = useState(10);
  const [hueRotate,setHueRotate] = useState(0);
  const [nebulaLevel, setNebulaLevel] = useState(1);
  const [speedLevel,setSpeedLevel] = useState(1);
  const highestLevel = 6;
  const [allowSound , setAllowSound] = useState(false);
  const [allowBang, setAllowBang] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [permissionGranted,setPermissionGranted] = useState(false)
  const [showSunScene,setShowSunScene] = useState(false);
  const [planetDis,setPlanetDis] = useState(false)
  const [bgStarDis]


  return (
    <CollisionContext.Provider
      value={{
        planetDis,
        setPlanetDis,
        collisionCount,
        setCollisionCount,
        nebulaCost,
        setNebulaCost,
        value,
        setValue,
        speed,
        setSpeed,
        speedCost,
        setSpeedCost,
        hueRotate,
        setHueRotate,
        nebulaLevel,
        setNebulaLevel,
        speedLevel,
        setSpeedLevel,
        highestLevel,
        allowSound,
        setAllowSound,
        allowBang,
        setAllowBang,
        playerName, 
        setPlayerName,
        permissionGranted,
        showSunScene,
        setShowSunScene,
        setPermissionGranted,
        
       
        

      }}
    >
      {children}
    </CollisionContext.Provider>
  );
};
