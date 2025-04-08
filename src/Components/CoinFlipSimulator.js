import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import '../Styles/CoinFlipSimulator.css';

export default function CoinFlipSimulator() {
    const [flips, setFlips] = useState([]);
    const [message, setMessage] = useState('');
    const [streakMessage, setStreakMessage] = useState('');
    const [decisionButtonsVisible, setDecisionButtonsVisible] = useState(false);
    const [flipCounts, setFlipCounts] = useState({ H: 0, T: 0 });
    const [guessMade, setGuessMade] = useState(false);

    const flipCoin = (numFlips) => {
        let newFlips = [];
        let headsCount = 0;
        let tailsCount = 0;
        const totalFlips = flipCounts.H + flipCounts.T;
    
        for (let i = 0; i < numFlips; i++) {
            let newFlip;
            
            if (totalFlips + i < 4) {
                newFlip = 'Tails'; // Ensure the first four flips are tails
                tailsCount++;
            } else {
                newFlip = Math.random() < 0.5 ? 'Heads' : 'Tails'; // Random flips after 4
                newFlip === "Heads" ? headsCount++ : tailsCount++;
            }
    
            newFlips.push(newFlip);
        }
    
        setFlips((prevFlips) => [...prevFlips, ...newFlips].slice(-4));
    
        if (totalFlips + numFlips >= 4 && streakMessage === '') {
            setStreakMessage('You flipped 4 times! What are the odds of tails next?');
            setDecisionButtonsVisible(true);
        }
    
        setFlipCounts(prev => ({
            H: prev.H + headsCount,
            T: prev.T + tailsCount,
        }));
    };
    const resetFlips = () => {
        setFlips([]); // Clears the coin flip results
        setFlipCounts({ H: 0, T: 0 }); // Resets the counts for the graph
        setMessage(''); // Clear previous messages
        setStreakMessage(''); // Clear the streak message
        setDecisionButtonsVisible(false); // Hide decision buttons again, if necessary
    };

    const handleGuess = (guess) => {
        setMessage(`You guessed: ${guess}. The probability of tails is 50% regardless of past flips! This is the Monte Carlo Fallacy—past events do not change the odds.`);
        setGuessMade(true);
    };

    const totalFlips = flipCounts.H + flipCounts.T;
    const data = [
        { outcome: "Heads", count: flipCounts.H, probability: totalFlips ? (flipCounts.H / totalFlips).toFixed(2) : 0 },
        { outcome: "Tails", count: flipCounts.T, probability: totalFlips ? (flipCounts.T / totalFlips).toFixed(2) : 0 },
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p>{`${payload[0].payload.outcome}: ${payload[0].value}`}</p>
                    <p>{`Probability: ${(payload[0].payload.probability * 100).toFixed(2)}%`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="coin-flip-container">
            <h2>Coin Flip Simulator</h2>
            <p>Flip a coin and see the probability of getting heads or tails!</p>
            <p>Total Flips: {totalFlips}</p>
            <button onClick={() => flipCoin(1)}>Flip 1 Coin</button>
            <button className="reset-button" onClick={resetFlips}>Reset</button>
    
            <p>Last Flips: {flips.join(', ')}</p>
            {streakMessage && <p>{streakMessage}</p>}
            
            {decisionButtonsVisible && (
                <div className="decision-buttons">
                    <button onClick={() => handleGuess('It is most likely to be tails')}>It is most likely to be tails</button>
                    <button onClick={() => handleGuess('It is most likely to be heads')}>It is most likely to be heads</button>
                    <button onClick={() => handleGuess('It is 50/50')}>It is 50/50</button>

                    {guessMade && (
                        <div style={{ marginTop: "10px" }}>
                            <button onClick={() => flipCoin(100)}>Flip 100 Coins</button>
                        </div>
                    )}
                </div>
            )}

            {message && <div className="message-box">{message}</div>}

            <div className="chart-container">
                <BarChart width={600} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="outcome" />
                    <YAxis tickFormatter={(value) => `${(value * 100).toFixed(1)}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="probability" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    );
}