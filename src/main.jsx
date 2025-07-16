import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CollisionProvider } from "./contents/content.jsx";
createRoot(document.getElementById("root")).render(

  
  <CollisionProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </CollisionProvider>

);
