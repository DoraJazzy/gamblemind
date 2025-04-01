import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

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
                <div style={{ background: "#fff", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <p>{`${payload[0].payload.outcome}: ${payload[0].value}`}</p>
                    <p>{`Probability: ${(payload[0].payload.probability * 100).toFixed(2)}%`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Coin Flip Simulator</h2>
            <p>Flip a coin and see the probability of getting heads or tails!</p>
            <p>Total Flips: {totalFlips}</p>
            <button onClick={() => flipCoin(1)}>Flip 1 Coin</button>
    
            <p>Last Flips: {flips.join(', ')}</p>
            {streakMessage && <p>{streakMessage}</p>}
            
            {decisionButtonsVisible && (
                <div>
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

            {message && <p>{message}</p>}

            <BarChart width={600} height={500} data={data} style={{ margin: "20px auto" }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="outcome" />
                <YAxis tickFormatter={(value) => `${(value * 100).toFixed(1)}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="probability" fill="#8884d8" />
            </BarChart>
        </div>
    );
}