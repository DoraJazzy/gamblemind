import React from "react";
import "../Styles/about.css";
import brains from "../Visuals/brains.png"; 

export default function About() {
  return (
    <div className="about-container">
      <div className="text-section">
        <h1>
          About GAMBLE-MINDED
        </h1>
        <p>
        Cognitive biases may distort risk perception and decision-making, often contributing 
        to impulsive gambling behavior. To address this issue, we have reviewed and collected 
        the most common cognitive biases and tendencies from gambling and decision-making literature. 
        </p>
        <p>
          Our goal is to educate and empower individuals with knowledge about these biases, 
          helping them make more informed choices. Whether you're a casual player, a concerned 
          friend, or someone looking to understand the science behind gambling addiction, 
          GAMBLE-MINDED provides clear explanations, engaging visuals, and practical tips.  
        </p>
      </div>
      <div className="image-section">
        <img src={brains} alt="Brains"/>
      </div>
    </div>
  );
}