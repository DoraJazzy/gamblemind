import React, { useRef, useState } from "react";
import "../Styles/slotmachine.css";

const SlotMachine2 = () => {
  const icon_width = 79;
  const icon_height = 79;
  const num_icons = 9;
  const time_per_icon = 100;
  const iconMap = [
    "banana",
    "seven",
    "cherry",
    "plum",
    "orange",
    "bell",
    "bar",
    "lemon",
    "watermelon",
  ];

  const reelsRef = useRef([]);
  const [indexes, setIndexes] = useState([0, 0, 0]);
  const [counter, setCounter] = useState(100);
  const [reelsRolling, setReelsRolling] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const roll = (reel, offset = 0) => {
    const delta =
      (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
    const style = getComputedStyle(reel);
    const backgroundPositionY = parseFloat(style["background-position-y"]);
    const targetBackgroundPositionY =
      backgroundPositionY + delta * icon_height;
    const normTargetBackgroundPositionY =
      targetBackgroundPositionY % (num_icons * icon_height);

    return new Promise((resolve) => {
      reel.style.transition = `background-position-y ${
        8 + delta * time_per_icon
      }ms cubic-bezier(.45,.05,.58,1.09)`;
      reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;

      setTimeout(() => {
        reel.style.transition = `none`;
        reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
        resolve(delta % num_icons);
      }, 8 + delta * time_per_icon);
    });
  };

  const rollAll = () => {
    const reelsList = reelsRef.current;
    return Promise.all(
      reelsList.map((reel, i) => roll(reel, i))
    ).then((deltas) => {
      const newIndexes = [...indexes];
      deltas.forEach(
        (delta, i) => (newIndexes[i] = (newIndexes[i] + delta) % num_icons)
      );
      setIndexes(newIndexes);

      // Check win conditions
      if (newIndexes[0] === newIndexes[1] && newIndexes[0] === newIndexes[2]) {
        setCounter((prev) => prev + 40);
        showPopup("WIN WIN WIN");
      } else if (newIndexes[0] === newIndexes[1]) {
        setCounter((prev) => prev + 20);
        showPopup("WIN WIN");
      }
    });
  };

  const handleSpin = () => {
    if (!reelsRolling && counter > 0) {
      setReelsRolling(true);
      setCounter((prev) => prev - 10);

      rollAll().then(() => {
        setReelsRolling(false);
      });
    }
  };

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => {
      setPopupMessage("");
    }, 3000);
  };

  return (
    <div className="slot-machine">
      <h1 className="hot-hand-title">Slot Machine</h1>
      <p className="hot-hand-description">
        Spin the reels and try your luck! Match all three symbols to win big!
      </p>

      {/* Slot machine reels */}
      <div className="slots">
        {[0, 1, 2].map((_, i) => (
          <div
            key={i}
            className="reel"
            ref={(el) => (reelsRef.current[i] = el)}
          ></div>
        ))}
      </div>

      {/* Counter display */}
      <div className="counter-display">Credits: {counter}</div>

      {/* Spin button */}
      <button
        className="spin-button"
        onClick={handleSpin}
        disabled={reelsRolling || counter <= 0}
      >
        Spin
      </button>

      {/* Popup message */}
      {popupMessage && <div className="popup">{popupMessage}</div>}
    </div>
  );
};

export default SlotMachine2;