"use client";

import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useEffect, useRef } from "react";

export default function WavyText({ text }) {
  const containerRef = useRef(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      const target = containerRef.current.querySelector(".wavy");
      if (!target) return; 

      const { chars } = splitText(target);
      containerRef.current.style.visibility = "visible";

      const staggerDelay = 0.15;

      animate(
        chars,
        { y: [-1, 1] },
        {
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          duration: 0.1,
          delay: stagger(staggerDelay, { startDelay: -staggerDelay * chars.length }),
        }
      );
    });
  }, [text]);

  return (
    <div className="container" ref={containerRef}>
      
        <span className="wavy">{text}</span>
      
      <Stylesheet />
    </div>
  );
}

function Stylesheet() {
  return (
    <style>{`
      .container {
      c
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          visibility: hidden;
      }
      .split-char {
          will-change: transform, opacity;
      }
    `}</style>
  );
}
