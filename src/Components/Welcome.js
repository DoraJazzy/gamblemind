import React from "react";
import "@fontsource/squada-one";
import "../Styles/welcome.css";

export default function Welcome() {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">GAMBLE-MINDED</h1>

      <div className="button-group">
        <button
          className="welcome-button gray"
          onClick={() => (window.location.pathname = "/about")}
        >
          About
        </button>

        <button
          className="welcome-button red"
          onClick={() => (window.location.pathname = "/biases")}
        >
          Cognitive Biases
        </button>
      </div>
    </div>
  );
}