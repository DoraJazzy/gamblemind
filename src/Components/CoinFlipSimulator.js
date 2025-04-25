import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";
import '../Styles/CoinFlipSimulator.css';

export default function CoinFlipSimulator() {
    const [flips, setFlips] = useState([]);
    const [message, setMessage] = useState('');
    const [streakMessage, setStreakMessage] = useState('');
    const [decisionButtonsVisible, setDecisionButtonsVisible] = useState(false);
    const [flipCounts, setFlipCounts] = useState({ H: 0, T: 0 });
    const [guessMade, setGuessMade] = useState(false);
    const [fallacyDescription, setFallacyDescription] = useState('');
    const [fallacyTip, setFallacyTip] = useState('');

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
        setFlips([]);
        setFlipCounts({ H: 0, T: 0 });
        setMessage('');
        setStreakMessage('');
        setDecisionButtonsVisible(false);
        setGuessMade(false);
        setFallacyDescription('');
        setFallacyTip('');
    };

    const handleGuess = (guess) => {
        setMessage(`You guessed: ${guess}. The probability of tails is 50% regardless of past flips!`);
        setFallacyDescription(
            "The Monte Carlo fallacy, also known as the gambler’s fallacy, is the mistaken belief that if a random event (like a coin landing on heads or tails) has occurred more or less frequently than expected in the past, it is more likely to 'even out' in the future. In reality, previous coin flips does not affect future flips. If you keep clicking 'Flip 100 Coins', the proportions of heads and tails will tend to get closer to 50% each, but individual outcomes remain random and unpredictable."
        );
        setFallacyTip(
            "Don’t let patterns in random events fool you! Even after a long streak of heads or tails, the probability of the next coin flip remains 50%. Each flip is independent—past outcomes do not change the odds."
        );
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
            <h2>Monte-Carlo Fallacy</h2>
            <p>Flip a coin and see the probability of getting heads or tails!</p>
            <button className="flip-coin-button" onClick={() => flipCoin(1)}>Flip 1 Coin</button>
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

            <div className="chart-and-counter">
                <div className="chart-container">
                    <BarChart width={600} height={400} data={data}>
                        <YAxis domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}>
                            <ReferenceLine y={0.5} stroke="red" strokeDasharray="3 3" />
                        </YAxis>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="outcome" />
                        <Tooltip content={<CustomTooltip />} cursor={false}/>
                        <Bar dataKey="probability" fill="#ffcc00" />
                    </BarChart>
                </div>
                <div className="flip-counter">
                    <p>Total Flips: <span className="value">{totalFlips}</span></p>
                    <p>Heads: <span className="value">{flipCounts.H}</span></p>
                    <p>Tails: <span className="value">{flipCounts.T}</span></p>
                </div>
            </div>

            {(fallacyDescription || fallacyTip) && (
            <div className="fallacy-info-container">
                    <h3>What is going on?</h3>
                    <p>{fallacyDescription}</p>
                    <h3>Pro Tip</h3>
                    <p>{fallacyTip}</p>
            </div>
            )}
        </div>
    );
}
