import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import OneTimeNameInput from './enhance/ShowInput';

const PlanetModel = () => {
  const globeRef = useRef();
  const containerRef = useRef();
  const [angle, setAngle ] = useState(0);
  const orbitRadius = 250; 
  const orbitSpeed = 0.008;

  
  useEffect(() => {
    if (!globeRef.current || !containerRef.current) return;

    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 10;

    const animateOrbit = () => {
      setAngle(prev => {
        const newAngle = prev + orbitSpeed;

        const x = Math.cos(newAngle) * orbitRadius;
        const y = Math.sin(newAngle) * orbitRadius;

      
        containerRef.current.style.transform = `translate(${x}px, ${y}px)`;

        return newAngle;
      });

      requestAnimationFrame(animateOrbit);
    };

    animateOrbit();
  }, []);


  const [showInput, setShowInput] = useState(false)

  function enterName(name){
    const inputName = (name)=>{
      console.log("Name is ",name);
    }
  }

  return (
    <span
      ref={containerRef}
      className="absolute invert md:top-80 lg:top-72 hue-rotate-15 contrast-200 brightness-200 md:left-96  lg:left-1/2   -translate-x-1/2 -translate-y-1/2 bg-transparent hover:cursor-pointer  z-0 "

      
      style={{ position: 'absolute', width: 130, height: 130 }}
    >
      <one
      <Globe
        ref={globeRef}
        width={120}
        height={120}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg"
        bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
        backgroundColor="white"
        showAtmosphere={true}
        atmosphereColor="rgba(0, 150, 255, 0.3)"
        atmosphereAltitude={0.15}
        enableZoom={false}
        enablePointerInteraction={true}
      />
    </span>
  );
};

export default PlanetModel;
