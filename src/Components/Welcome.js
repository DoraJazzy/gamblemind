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
        <a href="https://forms.gle/kh8fWeVnV1TLV2fd6" target="_blank" rel="noopener noreferrer">
          <button className="welcome-button survey">Feedback</button>
        </a>
      </div>
    </div>
  );
}