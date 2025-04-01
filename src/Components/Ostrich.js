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

            <MonteCarloFallacy />
        </div>
    );
}

// Monte Carlo Fallacy Section with Coin Flip Game
function MonteCarloFallacy() {
    return (
        <div className="monte-carlo">
            <h1>Monte Carlo Fallacy</h1>
            <p>
                Sometimes, after seeing a streak of the same outcome, people believe the next result must be different. 
                This is known as the **Monte Carlo Fallacy** (or Gambler’s Fallacy). Let’s see it in action!
            </p>
            <CoinFlipGame />
        </div>
    );
}

// Coin Flip Simulation
function CoinFlipGame() {
    const [flips, setFlips] = useState([]);
    const [message, setMessage] = useState('');
    const [streakMessage, setStreakMessage] = useState('');
    const [decisionButtonsVisible, setDecisionButtonsVisible] = useState(false);

    const flipCoin = () => {
        const newFlip = Math.random() < 1 ? 'Heads' : 'Tails';
        const newFlips = [...flips, newFlip].slice(-4); // Keeps only the last 4 flips
        setFlips(newFlips);

        if (newFlips.join(' ') === 'Heads Heads Heads Heads') {
            setStreakMessage('A streak of 4 heads appeared! What are the odds of tails next?');
            setDecisionButtonsVisible(true); // Show the decision buttons after 4 heads
        } else {
            setStreakMessage('');
            setDecisionButtonsVisible(false); // Hide decision buttons if streak is broken
        }
    };

    const handleGuess = (guess) => {
        setMessage(`You guessed: ${guess}. The probability of tails is 50% regardless of past flips! This is the Monte Carlo Fallacy—past events do not change the odds.`);
    };

    return (
        <div className="coin-flip-game">
            <button onClick={flipCoin}>Flip Coin</button>
            <p>Last Flips: {flips.join(', ')}</p>
            {streakMessage && <p>{streakMessage}</p>}
            
            {decisionButtonsVisible && (
                <div>
                    <button onClick={() => handleGuess('It is most likely to be tails')}>It is most likely to be tails</button>
                    <button onClick={() => handleGuess('It is most likely to be heads')}>It is most likely to be heads</button>
                    <button onClick={() => handleGuess('It is 50/50')}>It is 50/50</button>
                </div>
            )}
            
            {message && <p>{message}</p>}

            <h3>Pro Tip:</h3>

<p>Tracking your bets is smart—but don’t let a losing streak trick you. If red hasn’t hit in five spins, that doesn’t mean it’s “due” next. Each spin is independent, no matter how many times it was black before it doesn’t make it more likely to hit red next time. The roulette wheel doesn’t have a memory!
</p>
        </div>

    );
}


