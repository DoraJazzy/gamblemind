import React, { useEffect, useRef } from "react";
import "../Styles/slotmachine.css"; 
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // Import the useWindowSize hook

const icon_height = 79
const num_icons = 9
const time_per_icon = 100



const roll = (reel, offset = 0) => {
    const delta = (offset + 2) * num_icons + Math.round(Math.random() * 2 * num_icons);
    const style = getComputedStyle(reel);
    const backgroundPositionY = parseFloat(style.backgroundPositionY || "0");
    const targetBackgroundPositionY = backgroundPositionY + delta * icon_height;
    const normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * icon_height);

    
    return new Promise((resolve, reject) => {
        reel.style.transition = `background-position-y ${8 + delta * time_per_icon}ms cubic-bezier(.45, .05, .58, 1.09)`;
        reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;

        setTimeout(() => {
            reel.style.transition = `none`;
            reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
            resolve(delta%num_icons);
        }, 8 + delta * time_per_icon);
    })

};

const SlotMachine = () => {
  const { width, height } = useWindowSize(); // Get the window size
  const reelsRefLeft = useRef([]); // Refs for the left slot machine
  const reelsRefRight = useRef([]); // Refs for the right slot machine
  const indexesRefLeft = useRef(new Array(3).fill(0));
  const indexesRefRight = useRef(new Array(5).fill(0));
  const [isSpinningLeft, setIsSpinningLeft] = React.useState(false);
  const [isSpinningRight, setIsSpinningRight] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false); // State to control confetti display
  
  const rollAll = (reelsRef, indexesRef, setIsSpinning) => {
    setIsSpinning(true);

    const reelsList = reelsRef.current;
    if (reelsList.length === 0) return;

    Promise.all(reelsList.map((reel, i) => roll(reel, i))).then((deltas) => {
      deltas.forEach((delta, i) => {
        indexesRef.current[i] = (indexesRef.current[i] + delta) % num_icons;
      });
      setIsSpinning(false);
      console.log("Indexes:", indexesRef.current);

      const allEqual = indexesRef.current.every(
        (val, _, arr) => val === arr[0]
      );
      if (allEqual) {
        console.log("You win!");
        // Show confetti or any other winning animation
        setShowConfetti(true);

        // Hide confetti after 3 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 3000);
      }
    });
  };


  return (
    <div className="slot-machines-wrapper">
            {/* Intruction */}
            <div className="instructions">
                    <h2>Spin both slot machines 5 times, and choose which machine you'd continue playing on!</h2>
            </div>

            {/* Slot Machine Container */}
            <div className="slot-machines-container">
            {/* Left Slot Machine */}
            <div className="slot-machine-container">
                {showConfetti && <Confetti width={width} height={height} />}
                <div className="jackpot-header">
                    <h1>JACKPOT</h1>
                </div>
                <div className="slots slots-3x3">
                    {[...Array(3)].map((_, i) => (
                        <div
                            className="reel"
                            key={i}
                            ref={(el) => (reelsRefLeft.current[i] = el)}
                        ></div>
                    ))}
                </div>

        {/* Spin button */}
        <button
                    className="spin-button"
                    onClick={() => rollAll(reelsRefLeft, indexesRefLeft, setIsSpinningLeft)}
                    disabled={isSpinningLeft}
                >
                    {isSpinningLeft ? "Spinning..." : "Spin"}
                </button>
            </div>
            {/* Right Slot Machine */}
            <div className="slot-machine-container">
                <div className="jackpot-header">
                    <h1>JACKPOT</h1>
                </div>
                <div className="slots slots-5x3">
                    {[...Array(5)].map((_, i) => (
                        <div
                            className="reel"
                            key={i}
                            ref={(el) => (reelsRefRight.current[i] = el)}
                        ></div>
                    ))}
                </div>
                <button
                    className="spin-button"
                    onClick={() => rollAll(reelsRefRight, indexesRefRight, setIsSpinningRight)}
                    disabled={isSpinningRight}
                >
                    {isSpinningRight ? "Spinning..." : "Spin"}
                </button>
            </div>
    </div>
  </div>
);
}


export default SlotMachine;