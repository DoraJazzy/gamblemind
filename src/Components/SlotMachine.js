import React, { useEffect, useRef } from "react";
import "../Styles/slotmachine.css"; 

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
  const reelsRef = useRef([]);
  const indexesRef = useRef([0, 0, 0]);

  const rollAll = () => {
    const reelsList = reelsRef.current;
    if (reelsList.length !== 3) return;

    Promise.all(reelsList.map((reel, i) => roll(reel, i))).then((deltas) => {
      deltas.forEach((delta, i) => {
        indexesRef.current[i] = (indexesRef.current[i] + delta) % num_icons;
      });

      console.log("Indexes:", indexesRef.current);

      if (
        indexesRef.current[0] === indexesRef.current[1] &&
        indexesRef.current[0] === indexesRef.current[2]
      ) {
        console.log("You win!");
      }

      // Optional: re-spin every 10 seconds
      // setTimeout(rollAll, 10000);
    });
  };

  useEffect(() => {
    // Initial automatic spin
    rollAll();
  }, []);  

  return (
    <div className="slot-machine">
        {/* Title and description */}
        <h1 className="hot-hand-title">Hot hand fallacy</h1>
        <p className="hot-hand-description">
            Spin the reels and try your luck! Match all three symbols to win big!
        </p>

        {/* Slot machine reels */}
        <div className="slots">
            {[0, 1, 2].map((_, i) => (
                <div
                    className="reel"
                    key={i}
                    ref={(el) => (reelsRef.current[i] = el)}
                ></div>
            ))}
        </div>

        {/* Spin button */}
        <button className="spin-button" onClick={rollAll}>
            Spin
        </button>
    </div>
);
}


export default SlotMachine;