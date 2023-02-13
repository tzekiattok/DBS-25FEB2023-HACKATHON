import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// add to existing imports
// check if env is localhost or not
// if you're not developing on localhost, you will need to detect this is another way—the docs linked above give some examples. 
const isLocalhost = !!(window.location.hostname === "localhost");



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
