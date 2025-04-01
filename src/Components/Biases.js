import React from "react";
import "../Styles/biases.css";
import luck from "../Visuals/luck.svg"; 


export default function Biases() {
  const biases = [
    { name: "Ostrich Effect", path: "/ostrich" },
    { name: "Monte-Carlo Fallacy", path: "/CoinFlipSimulator" },
    { name: "Prospect Theory", path: "/ProspectTheory" },
    { name: "Bias 4", path: "/bias4", image: luck },
    { name: "Bias 5", path: "/bias5" },
    { name: "Bias 6", path: "/bias6" },
    { name: "Bias 7", path: "/bias7" },
    { name: "Bias 8", path: "/bias8" },
  ];

  return (
    <div className="biases-container">
      <h1 className="biases-title">Cognitive Biases</h1>
      <div className="bias-grid">
        {biases.map((bias, index) => (
          <button key={index} className="bias-button" onClick={() => (window.location.pathname = bias.path)}>
            <img src="/path-to-icon.png" alt={bias.name} className="bias-icon" />
            <span>{bias.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
