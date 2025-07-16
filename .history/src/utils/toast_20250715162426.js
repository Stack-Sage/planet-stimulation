import { toast } from "react-hot-toast";
import ig from "../assets/asset";

// Core toast with all options

const toastSound = new Audio("/sounds/star-toast.mp3");
toastSound.volume = 0.6;

export const showCustomToast = ({
  message,
  icon = "✨",
  background = "linear-gradient(to bottom right, #fdf6e3, #f5deb3)",
  color = "black",
  duration = 5000,
} = {}) => {
  toast(message || "This is your toast! 🥐", {
    duration,
    icon,
    style: {
      backgroundImage: background,
      color,
      wordSpacing: "2px",
      letterSpacing: "1px",
      border: "2px solid black",
      padding: "6px 10px",
      fontSize: "16px",
      fontWeight: "300",
      fontFamily: "Arial, sans-serif",
      width: "400px",
      maxWidth: "500px",
      boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.7)",
    },
  });
};

// Shortcut version: toastMsg("hello world", { icon: "🔥" });
const toastMsg = (message, options = {}) => {
  showCustomToast({ message, ...options });
};

export default toastMsg;
