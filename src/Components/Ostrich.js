import React, { useState } from 'react';
import '../Styles/ostrich.css';

export function Ostrich() {
    const [message, setMessage] = useState('');

    const handleOptionSelect = (option) => {
        console.log(`Button clicked: ${option}`);  // Debug: Log the selected option
        if (option === 'Keep Playing') {
            console.log('Setting message for Keep Playing');  // Debug: Log the action
            setMessage('You decided to keep playing! This reaction is classic confirmation bias—your brain focuses on the win and ignores the overall loss. This is how casinos hook your brain.');
        } else if (option === 'Stop Playing') {
            console.log('Setting message for Stop Playing');  // Debug: Log the action
            setMessage('It’s tough, but you managed to face the truth. Smart move, you are not like an ostrich; therefore, you are less likely to keep playing and lose even more money!');
        }
    };

    return (
        <div className="ostrich-container">
            <h1>Ostrich Effect</h1>
            <p>
                Your friend keeps telling you how he always wins in the casino and about all the money he gains playing.
                "Roulette is basically free money," he brags. You’re getting FOMO—why should he be the only one living the high-roller life?
                You march into the casino, visions of easy money flashing before your eyes.
                The first few spins? Not great. You watch your stack shrink by $500—ouch. But then… BAM!
                One win. A sweet, crisp $100 payout. What do YOU focus on?
            </p>
            <div className="ostrich-button">
                <button className="button" onClick={() => handleOptionSelect('Keep Playing')}>I knew it! I just needed to give it time. I’m getting the hang of this.</button>
                <button className="button" onClick={() => handleOptionSelect('Stop Playing')}>That was a nice moment, but I think I’ve seen enough for today</button>
            </div>

            <p className="ostrich-feedback">{message}</p>

            <p>Pro Tip: Track your wins and losses on paper or in your notes.</p>
            <p>
                Confirmation bias/ostrich effect can lead people to seek
                out or ignore information based on whether it aligns
                with their beliefs or avoids negative implications.
            </p>
        </div>
    );
}
