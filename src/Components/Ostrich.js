import React, { useState } from 'react';

export function Ostrich() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [message, setMessage] = useState('');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        if (option === 'Keep Playing') {
            setMessage('You’ve decided to keep playing! This reaction is classic confirmation bias—your brain focuses on the win and ignores the overall loss. This is how casinos hook your brain.');
        } else if (option === 'Stop Playing') {
            setMessage('It’s tough, but you managed to face the truth. Smart move, you are not like an ostrich; therefore, you are less likely to keep playing and lose even more money!');
        }
    };

    return (
        <div className="ostrich">
            <h1>Ostrich Effect</h1>
            <p>
                Your friend keeps telling you how he always wins in the casino and about all the money he gains playing. 
                "Roulette is basically free money," he brags. You’re getting FOMO—why should he be the only one living the high-roller life? 
                You march into the casino, visions of easy money flashing before your eyes. 
                The first few spins? Not great. You watch your stack shrink by $500—ouch. But then… BAM! 
                One win. A sweet, crisp $100 payout. What do YOU tell your friends and yourself?
            </p>
            <div>
                <button onClick={() => handleOptionSelect('Keep Playing')}>Let’s FRICKIN GO! The casino literally gave me $100 for free! I have to do this again!</button>
                <button onClick={() => handleOptionSelect('Stop Playing')}>I lost $400</button>
            </div>

            <p>{message}</p>

            <h3>Pro Tip:</h3>
            <p>Track your wins and losses on paper or in your notes.</p>
            <p>Confirmation bias/ostrich effect can lead people to seek 
                out or ignore information based on whether it aligns 
                with their beliefs or avoids negative implications.</p>

        </div>
    );
}


