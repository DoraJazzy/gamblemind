import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, ReferenceDot } from 'recharts';
import '../Styles/prospect.css'; 

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

    const resetChart = () => {
        setLineY(0);  // Reset line position
        setDotX(0);   // Reset dot position
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
        <div className="prospect-container">
            <h2 style={{ color: '#ff4444' }}>Loss Aversion</h2>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button className="prospect-button" onClick={moveLineDown}>Lose Money</button>
                <button className="prospect-button" onClick={resetChart}>Reset Your Mindset</button>
            </div>

            <div style={{ width: '600px', height: '500px', margin: '20px auto' }}>
                <LineChart width={600} height={500} data={data}>
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
                    <Line type="monotone" dataKey="y" data={data} stroke="white" strokeWidth={3} />
                    <ReferenceLine y={lineY} stroke="red" strokeDasharray="5 5" strokeWidth={3} />
                    <ReferenceDot x={dotX} y={lineY} stroke="red" fill="red" r={8} />
                </LineChart>
            </div>

            <p className="prospect-p">
                This loss aversion curve illustrates how losses tend to have a greater emotional impact than equivalent gains. The steeper slope for losses shows why people often take bigger risks to avoid losing money. This bias can lead to poor decision-making, such as chasing losses in gambling. Before making a decision, ask yourself if you're trying to recoup losses. If so, it might be better to refrain from betting.
            </p>
        </div>
    );
}
