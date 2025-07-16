// toastUtils.js
import { toast } from "react-hot-toast";

// General-purpose custom toast
export const showCustomToast = ({
  message = "Here’s your toast! 🥐",
  background = "linear-gradient(to bottom right, #fdf6e3, #f5deb3)",
  color = "black",
  icon = "✨",
  duration = 5000,
}) => {
  toast(message, {
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
