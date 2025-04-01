import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, ReferenceDot } from 'recharts';

export default function LossAversionChart() {
    const [lineY, setLineY] = useState(0);
    const [dotX, setDotX] = useState(0);

    const moveLineDown = () => {
        // Move the line down along the y-axis and the dot left along the x-axis
        if (lineY > -40 && dotX > -100) {
            setLineY(lineY - 35); // Adjust the step size as needed
            setDotX(dotX - 100); // Adjust the step size as needed
        }
    };

    // Static data for the loss aversion curve
    const data = [
        { x: -200, y: -40 },
        { x: -100, y: -35 },
        { x: 0, y: 0 },
        { x: 100, y: 15 },
        { x: 200, y: 20 }
    ];

    // Custom Tooltip Component
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ background: "#fff", padding: "5px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <p>{`Utility: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Loss Aversion Chart</h2>
            <button onClick={moveLineDown}>Lose Money</button>

            <LineChart width={800} height={800/1.5} data={data} style={{ margin: "20px auto" }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="x"
                    tickFormatter={(value) => (value === 0 ? '0' : (value < 0 ? '-' + Math.abs(value).toFixed(2) : '+' + Math.abs(value).toFixed(2)))}
                    domain={[-200, 200]}
                    label={{ value: 'Money Lost/Gained', position: 'insideBottom', offset: -1.5, style: { fontSize: '20px' } }}
                />
                <YAxis
                    domain={[-40, 40]}
                    label={{ value: 'Utility', angle: -90, position: 'centre', offset: 0, style: { fontSize: '20px' } }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="y" data={data} stroke="black" strokeWidth={3} />
                <ReferenceLine y={lineY} stroke="red" strokeDasharray="5 5" strokeWidth={3} />
                <ReferenceDot x={dotX} y={lineY} stroke="red" fill="red" r={8} />
            </LineChart>
        </div>
    );
}
