import React from "react";
import styled from "styled-components";

const StarButton = ({ children, onClick, className, bgColor, fontSize, starColor }) => {
  return (
    <StyledWrapper bgColor={bgColor} fontSize={fontSize} starColor={starColor}>
      <button className={className} onClick={onClick}>
        {children}
        <div className="star-1"><StarSVG /></div>
        <div className="star-2"><StarSVG /></div>
        <div className="star-3"><StarSVG /></div>
        <div className="star-4"><StarSVG /></div>
        <div className="star-5"><StarSVG /></div>
        <div className="star-6"><StarSVG /></div>
      </button>
    </StyledWrapper>
  );
};

// Extracted Star SVG Component
const StarSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 784.11 815.53"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
  >
    <g>
      <path
        className="fil0"
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 
        207.96,29.37 371.12,197.68 392.05,407.74 
        20.93,-210.06 184.09,-378.37 392.05,-407.74 
        -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
      />
    </g>
  </svg>
);

// Styled-Component for Button & Stars
const StyledWrapper = styled.div`
  button {
    position: relative;
    padding: 12px 35px;
    background: ${(props) => props.bgColor || "#fec195"};
    font-size: ${(props) => props.fontSize || "22px"};
    font-weight: 500;
    color: #181818;
    border: 3px solid ${(props) => props.bgColor || "#fec195"};
    border-radius: 8px;
    box-shadow: 0 0 0 ${(props) => props.bgColor || "#fec195"}8c;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }

  .fil0 {
    fill: ${(props) => props.starColor || "#fffdef"};
  }

  .star-1, .star-2, .star-3, .star-4, .star-5, .star-6 {
    position: absolute;
    filter: drop-shadow(0 0 0 ${(props) => props.starColor || "#fffdef"});
    z-index: -5;
    transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
  }

  .star-1 { top: 20%; left: 20%; width: 25px; }
  .star-2 { top: 45%; left: 45%; width: 15px; }
  .star-3 { top: 40%; left: 40%; width: 5px; }
  .star-4 { top: 20%; left: 40%; width: 8px; }
  .star-5 { top: 25%; left: 45%; width: 15px; }
  .star-6 { top: 5%; left: 50%; width: 5px; }

  button:hover {
    background: transparent;
    color: ${(props) => props.bgColor || "#fec195"};
    box-shadow: 0 0 25px ${(props) => props.bgColor || "#fec195"}8c;
  }

  button:hover .star-1 { top: -80%; left: -30%; filter: drop-shadow(0 0 10px ${(props) => props.starColor || "#fffdef"}); z-index: 2; }
  button:hover .star-2 { top: -25%; left: 10%; filter: drop-shadow(0 0 10px ${(props) => props.starColor || "#fffdef"}); z-index: 2; }
  button:hover .star-3 { top: 55%; left: 25%; filter: drop-shadow(0 0 10px ${(props) => props.starColor || "#fffdef"}); z-index: 2; }
  button:hover .star-4 { top: 30%; left: 80%; filter: drop-shadow(0 0 10px ${(props) => props.starColor || "#fffdef"}); z-index: 2; }
  button:hover .star-5 { top: 25%; left: 115%; filter: drop-shadow(0 0 10px ${(props) => props.starColor || "#fffdef"}); z-index: 2; }
  button:hover .star-6 { top: 5%; left: 60%; filter: drop-shadow(0 0 10px ${(props) => props.starColor || "#fffdef"}); z-index: 2; }
`;

export default StarButton;
