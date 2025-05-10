import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    CartesianGrid, ReferenceLine, ReferenceDot
} from 'recharts';
import '../Styles/prospect.css';

export default function LossAversionChart() {
    const [lineY, setLineY] = useState(0);
    const [dotX, setDotX] = useState(0);
    const [showTip, setShowTip] = useState(false);

    const moveLineDown = () => {
        if (lineY > -40 && dotX > -100) {
            setLineY(lineY - 35);
            setDotX(dotX - 100);
            setShowTip(true);
        }
    };

    const resetChart = () => {
        setLineY(0);
        setDotX(0);
    };

    const data = [
        { x: -200, y: -40 },
        { x: -100, y: -35 },
        { x: 0, y: 0 },
        { x: 100, y: 15 },
        { x: 200, y: 20 }
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ background: "#fff", padding: "5px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <p>{`Value: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="prospect-container">
            <h2>Loss Aversion</h2>
            <div className="button-row">
                <button className="prospect-button" onClick={moveLineDown}>Lose Money</button>
                <button className="prospect-button" onClick={resetChart}>Reset Your Mindset</button>
            </div>

            <div className="chart-and-tip">
                <div className="chart-wrapper">
                    <LineChart width={600} height={500} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="x"
                            tickFormatter={(value) =>
                                value === 0
                                    ? '0'
                                    : value < 0
                                        ? '-' + Math.abs(value).toFixed(2)
                                        : '+' + Math.abs(value).toFixed(2)
                            }
                            domain={[-200, 200]}
                            label={{
                                value: 'Money Lost/Gained',
                                position: 'insideBottom',
                                offset: -1.5,
                                style: { fontSize: '20px' }
                            }}
                        />
                        <YAxis
                            domain={[-40, 40]}
                            label={{
                                value: 'Value',
                                angle: -90,
                                position: 'centre',
                                offset: 0,
                                style: { fontSize: '20px' }
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="y" data={data} stroke="white" strokeWidth={3} />
                        <ReferenceLine y={lineY} stroke="#ff73c8" strokeDasharray="5 5" strokeWidth={3} />
                        <ReferenceDot x={dotX} y={lineY} stroke="#ff73c8" fill="#ff73c8" r={8} />
                    </LineChart>
                </div>

                {showTip && (
                    <div className="prospect-tip-box">
                        <h3>💡 What is going on?</h3>
                        <p>
                            This loss aversion curve illustrates how losses tend to have a greater emotional impact than equivalent gains.
                            The steeper slope for losses indicates that losing $100 feels worse than the pleasure of gaining $100.
                            After experiencing a loss, your mental context often shifts — winning back what you lost becomes significantly more important,
                            while the prospect of losing even more might not feel as painful. This mindset can lead to riskier behavior, especially in gambling scenarios.
                        </p>
                        <h3>🧠 Tip</h3>
                        <p>
                            When you catch yourself focused on recouping a loss, take a break.
                            That’s loss aversion in action, and it can lead to irrational decisions.
                            Recognize it, pause, and reset your mindset.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
