import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";

// If you have a global CSS entry, import it here.
// Adjust the path if needed:
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
