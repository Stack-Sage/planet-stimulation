import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

const PlanetModel = () => {
  const globeRef = useRef();
  const containerRef = useRef();
  const [angle, setAngle ] = useState(0);
  const orbitRadius = 300; 
  const orbitSpeed = 0.005;

  
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

  return (
    <span
      ref={containerRef}
      className="absolute invert hue-rotate-15 contrast-200 brightness-200 left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 bg-transparent   z-20 "
      style={{ position: 'absolute', width: 130, height: 130 }}
    >
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
