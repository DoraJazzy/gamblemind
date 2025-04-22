import React, { useEffect, useRef, useState } from "react";
import "../Styles/slotmachine.css";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // Import the useWindowSize hook

const icon_height = 79;
const num_icons = 9;
const time_per_icon = 100;

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
            resolve(delta % num_icons);
        }, 8 + delta * time_per_icon);
    });
};

const SlotMachine = () => {
    const { width, height } = useWindowSize(); // Get the window size
    const reelsRefLeft = useRef([]); // Refs for the left slot machine
    const reelsRefRight = useRef([]); // Refs for the right slot machine
    const indexesRefLeft = useRef(new Array(3).fill(0));
    const indexesRefRight = useRef(new Array(5).fill(0));
    const [isSpinningLeft, setIsSpinningLeft] = useState(false);
    const [isSpinningRight, setIsSpinningRight] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false); // State to control confetti display
    const [spinCountLeft, setSpinCountLeft] = useState(0); // Track spins for 3x3
    const [spinCountRight, setSpinCountRight] = useState(0); // Track spins for 5x3
    const [showQuestion, setShowQuestion] = useState(false); // State to show the question
    const [feedback, setFeedback] = useState(""); // State to show feedback

    // Predetermined outcomes for the 5x3 slot machine
    const predeterminedOutcomes = [
        [0, 1, 2, 3, 4], // All symbols different
        [0, 0, 0, 3, 4], // 3 symbols the same
        [1, 2, 3, 4, 5], // All symbols different
        [2, 2, 2, 2, 5], // 4 symbols the same
        [3, 4, 5, 6, 7], // All symbols different
    ];

    const rollAll = (reelsRef, indexesRef, setIsSpinning, spinCount, setSpinCount, isLeft) => {
        if (spinCount >= 5) return; // Stop after 5 spins
        setIsSpinning(true);

        const reelsList = reelsRef.current;
        if (reelsList.length === 0) return;

        if (isLeft) {
            // 3x3 Slot Machine: Randomize outcomes but ensure no win
            indexesRef.current = indexesRef.current.map(() =>
                Math.floor(Math.random() * num_icons)
            );
            // Ensure no winning condition
            while (indexesRef.current.every((val, _, arr) => val === arr[0])) {
                indexesRef.current = indexesRef.current.map(() =>
                    Math.floor(Math.random() * num_icons)
                );
            }
        } else {
            // 5x3 Slot Machine: Use predetermined outcomes
            indexesRef.current = predeterminedOutcomes[spinCount];
        }

        // Animate the reels to match the outcomes
        Promise.all(
            reelsList.map((reel, i) => {
                const targetIndex = indexesRef.current[i];
                const targetPosition = targetIndex * icon_height;

                // Add a large offset to simulate spinning
                const spinOffset = num_icons * icon_height * 10; // 10 full spins
                const targetBackgroundPositionY = spinOffset + targetPosition;

                // Calculate a delay for each reel to make them spin slower
                const reelDelay = i * 300; // Add a delay of 500ms per reel

                return new Promise((resolve) => {
                    setTimeout(() => {
                        reel.style.transition = `background-position-y ${3 + i}s cubic-bezier(.45, .05, .58, 1.09)`;
                        reel.style.backgroundPositionY = `-${targetBackgroundPositionY}px`;

                        // Reset position after animation
                        setTimeout(() => {
                            reel.style.transition = "none";
                            reel.style.backgroundPositionY = `-${targetPosition}px`;
                            resolve();
                        }, 3000 + i * 1000); // Match the duration of the animation
                    }, reelDelay);
                });
            })
        ).then(() => {
            // Update spin count and spinning state
            setIsSpinning(false);
            setSpinCount(spinCount + 1);

            // Show confetti only if it's a win (for the 5x3 slot machine)
            if (!isLeft && indexesRef.current.every((val, _, arr) => val === arr[0])) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000);
            }

            // Show the question if both slot machines have been spun 5 times
            if (spinCountLeft + 1 >= 5 && spinCountRight + 1 >= 5) {
                setShowQuestion(true);
            }
        });
    };

    const handleChoice = (choice) => {
        if (choice === "3x3") {
            setFeedback("You chose the 3x3 slot machine! Seems like you have a hunch what the near-miss effects is. Yay! You rock! Wonder what it actually is? The near miss effect is when just barely missing a goal—like almost winning a game or nearly hitting the jackpot—makes you feel more motivated to try again. Even though you didn’t win, it feels like you were close, which tricks your brain into thinking success is just around the corner.");
        } else if (choice === "5x3") {
            setFeedback("You chose the 5x3 slot machine! Did you choose it because it seemed like it has a higher chance of winning or was it just a random choice? Either way, you rock! Wonder why it seems more probably to win big? Because of the near-miss effect. The near miss effect is when just barely missing a goal—like almost winning a game or nearly hitting the jackpot—makes you feel more motivated to try again. Even though you didn’t win, it feels like you were close, which tricks your brain into thinking success is just around the corner.");
        }
        setShowQuestion(false); // Hide the question after a choice is made
    };

    return (
        <div className="slot-machines-wrapper">
            {/* Instructions */}
            <div className="instructions">
                <h2>Spin both slot machines 5 times, and choose which machine you'd continue playing on!</h2>
            </div>

            {/* Slot Machines Container */}
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
                        onClick={() =>
                            rollAll(
                                reelsRefLeft,
                                indexesRefLeft,
                                setIsSpinningLeft,
                                spinCountLeft,
                                setSpinCountLeft,
                                true
                            )
                        }
                        disabled={isSpinningLeft || spinCountLeft >= 5}
                    >
                        {spinCountLeft >= 5 ? "Done" : isSpinningLeft ? "Spinning..." : "Spin"}
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
                        onClick={() =>
                            rollAll(
                                reelsRefRight,
                                indexesRefRight,
                                setIsSpinningRight,
                                spinCountRight,
                                setSpinCountRight,
                                false
                            )
                        }
                        disabled={isSpinningRight || spinCountRight >= 5}
                    >
                        {spinCountRight >= 5 ? "Done" : isSpinningRight ? "Spinning..." : "Spin"}
                    </button>
                </div>
            </div>

            {/* Question and Feedback */}
        {showQuestion && (
            <div className="question">
                <h3>Which slot machine do you choose?</h3>
                <div className="feedback-buttons">
                    <button onClick={() => handleChoice("3x3")}>3x3 Slot Machine</button>
                    <button onClick={() => handleChoice("5x3")}>5x3 Slot Machine</button>
                </div>
            </div>
        )}

        {feedback && 
            <div className="feedback-message">
                <p>{feedback}</p>
                <div className="pro-tip">
                    <h3>💡Pro Tip:💡</h3>
                    {feedback.includes("3x3") ? (
                        <p>Keep in mind that slot machines are based on pure luck, even though it seems like you are close to hitting big the odds of winning still remain relatively small.</p>
                    ) : (
                        <p>Keep in mind that slot machines are based on pure luck, even though it seems like you are close to hitting big the odds of winning still remain relatively small.</p>
                    )}
                </div>
            </div>
        }
    </div>
    );
};


export default SlotMachine;