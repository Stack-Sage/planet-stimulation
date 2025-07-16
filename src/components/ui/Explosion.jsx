import React, { useRef, useEffect } from 'react';
import ig from '../../assets/asset';

const Explosion = ({ permissionGranted,onExplosionEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.5;

      video.play().catch(err => {
        console.error("Error playing video:", err);
        video.setAttribute("controls", "true"); 
      });
    }
  }, []);

  return (
    <div className="absolute w-screen h-screen z-50 overflow-hidden flex items-center justify-center contrast-200 brightness-110  ">
      <video
        
        
        ref={videoRef} 
        src={ig.explosion}
        // muted={!permissionGranted}
        className="w-full h-full object-cover"
        onEnded={onExplosionEnd}
        muted

      />
    </div>
  );
};

export default Explosion;
