import React, { useState } from "react";
import "../Styles/illusion.css";
import die1 from "../Visuals/1.svg";
import die2 from "../Visuals/2.svg";
import die3 from "../Visuals/3.svg";
import die4 from "../Visuals/4.svg";
import die5 from "../Visuals/5.svg";
import die6 from "../Visuals/6.svg";

export default function Illusion() {
  const diceImages = [die1, die2, die3, die4, die5, die6];
  const [image, setImage] = useState(diceImages[0]);
  const [image2, setImage2] = useState(diceImages[1]);
  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState("rolling");
  const [selectedDie, setSelectedDie] = useState(null);

  const rollDice = () => {
    const rand1 = Math.floor(Math.random() * 6);
    const rand2 = Math.floor(Math.random() * 6);
    setImage(diceImages[rand1]);
    setImage2(diceImages[rand2]);

    if (round < 5) {
      setRound(prev => prev + 1);
    } else {
      setPhase("guessing");
    }
  };

  const handleGuess = (choice) => {
    setSelectedDie(choice);
    setPhase("revealing");
  };

  const resetGame = () => {
    setImage(diceImages[0]);
    setImage2(diceImages[1]);
    setRound(1);
    setPhase("rolling");
    setSelectedDie(null);
  };

  return (
    <div className="illusion-container">
      <div className="illusion-content">
        <h1 className="illusion-title">Illusion of Control</h1>
        <p className="instruction-message">
          {phase === "rolling" && "Roll the dice 5 times and try to spot the luckier die!"}
          {phase === "guessing" && "Which die was luckier? Make your choice!"}
          {phase === "revealing" && "The truth about your choice..."}
        </p>

        {phase === "rolling" && (
          <div className="rolling-phase">
            <p className="round-counter">Round {round} of 5</p>
            <div className="dice-background">
              <div className="square-row">
                <img className="square" src={image} alt="Left Die" />
                <img className="square" src={image2} alt="Right Die" />
              </div>
            </div>
            <button className="illusionbutton" onClick={rollDice}>
              {round < 5 ? "Roll Again" : "Finish Rolls"}
            </button>
          </div>
        )}

        {phase === "guessing" && (
          <div className="guessing-phase">
            <div className="choice-buttons">
              <button className="illusionbutton" onClick={() => handleGuess("left")}>
                Left Die Was Luckier
              </button>
              <button className="illusionbutton" onClick={() => handleGuess("right")}>
                Right Die Was Luckier
              </button>
            </div>
          </div>
        )}

        {phase === "revealing" && (
          <div className="revealing-phase">
            <div className="result-message">
              <p>You chose the {selectedDie} die.</p>
              <p>But both dice were completely random all along!</p>
              <p>This shows how we see patterns in randomness - the "illusion of control".</p>
            </div>
            <button className="illusionbutton" onClick={resetGame}>
              Restart to see if the {selectedDie} die remains "luckier" or not
            </button>
          </div>
        )}
      </div>
    </div>
  );
}