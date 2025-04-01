import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function CoinFlipSimulator() {
    const [flips, setFlips] = useState({ H: 0, T: 0 });

    const flipCoin = (numFlips) => {
        let heads = 0;
        let tails = 0;

        for (let i = 0; i < numFlips; i++) {
            Math.random() < 0.5 ? heads++ : tails++;
        }

        // Accumulate results instead of resetting them
        setFlips(prevFlips => ({
            H: prevFlips.H + heads,
            T: prevFlips.T + tails
        }));
    };

    const totalFlips = flips.H + flips.T; // Total number of flips

    const data = [
        { outcome: "Heads", count: flips.H, probability: totalFlips ? (flips.H / totalFlips).toFixed(2) : 0 },
        { outcome: "Tails", count: flips.T, probability: totalFlips ? (flips.T / totalFlips).toFixed(2) : 0 },
    ];

    // Custom Tooltip Component
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
            <button onClick={() => flipCoin(1)}>Flip 1 Coin</button>
            <button onClick={() => flipCoin(100)}>Flip 100 Coins</button>

            <BarChart width={600} height={500} data={data} style={{ margin: "20px auto" }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="outcome" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </div>
    );
}
