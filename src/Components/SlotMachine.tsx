import React, { useState } from 'react';
import { motion } from 'framer-motion';

const symbols = ['🍒', '🍋', '🍊', '🍉', '🍀', '💎'];

const SlotMachine = () => {
    const [reels, setReels] = useState(["❓", "❓", "❓"]);
    const [spinning, setSpinning] = useState(false);

    const spinReels = () => {
        setSpinning(true);

        const newReels = Array.from({ length: 3 }, () => {
            return symbols[Math.floor(Math.random() * symbols.length)];
        });

        setTimeout(() => {
            setReels(newReels);
            setSpinning(false);
        }, 2000); // Simulate a 2-second spin
    };

    return (
        <div className="flex flex-col items-center space-y-4 p4">
            <div className="flex space-x-2 bprder-4 border-gray-700 p-4 rounded-x1">
                {reels.map((symbol, index) => (
                    <motion.div
                        key={index}
                        className="text-6xl"
                        animate={{ rotate: spinning ? 360 : 0 }}
                        transition={{ duration: 1, repeat: spinning ? Infinity : 0 }}
                    >
                        {symbol}
                    </motion.div>
                ))}
            </div>
            <button
                onClick={spinReels}
                disabled={spinning}
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${spinning ? 'opacity-50' : ''}`}
            >
                {spinning ? 'Spinning...' : 'Spin'}
            </button>
        </div>

    );
};

export default SlotMachine;
// This code defines a simple slot machine component using React and Framer Motion.
