import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

// CSS Imports
import "./css/main.css";
import "./css/game.css";
import "./css/lobby.css";

// Renders the main page
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
