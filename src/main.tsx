import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./assets/css/style.css";
import "./assets/css/extraSmall.css";
import "./assets/css/small.css";
import "./assets/css/medium.css";
import "./assets/css/large.css";
import "./assets/css/extraLarge.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
