import { useEffect, useRef } from "react";

const BackgroundMusic = ({ src, volume = 0.5, play }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && play) {
      audio.volume = volume;
      audio.loop = true;
      audio.play().catch((error) => console.error("Autoplay blocked:", error));
    }
  }, [play, volume]);

  return <audio ref={audioRef} src={src} />;
};

export default BackgroundMusic;
