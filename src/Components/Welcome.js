import React from "react";
import "../Styles/welcome.css";

export default function Welcome() {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">gamble-minded</h1>

      <div className="button-group">
        <button
          className="welcome-button gray"
          onClick={() => (window.location.pathname = "/about")}
        >
          About
        </button>

        <button
          className="welcome-button black"
          onClick={() => (window.location.pathname = "/biases")}
        >
          Cognitive Biases
        </button>
      </div>
    </div>
  );
}