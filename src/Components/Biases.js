import React from "react";
import "../Styles/biases.css";
import luck from "../Visuals/luck.svg";
import ostrich from "../Visuals/ostrich.svg";
import monte from "../Visuals/monte.svg";
import loss from "../Visuals/loss.svg";
import miss from "../Visuals/miss.svg";
import base from "../Visuals/base.svg";
import hot from "../Visuals/hot.svg";
import ratio from "../Visuals/ratio.svg";



export default function Biases() {
  const biases = [
    { path: "/ostrich", image: ostrich },
    { path: "/CoinFlipSimulator", image: monte },
    { path: "/ProspectTheory", image: loss },
    { path: "/bias4", image: luck },
    { path: "/slotmachine", image: miss },
    { path: "/bias6", image: base },
    { path: "/bias5", image: hot },
    { path: "/bias8", image: ratio },
  ];

  return (
    <div className="biases-container">
      <h1 className="biases-title">Cognitive Biases</h1>
      <div className="bias-grid">
        {biases.map((bias, index) => (
          <button key={index} className="bias-button" onClick={() => (window.location.pathname = bias.path)}>
            <img src={bias.image} alt={bias.name} className="bias-icon" />
            <span className="bias-name">{bias.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
