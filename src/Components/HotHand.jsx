import React, { useState, useEffect } from 'react';
import '../Styles/hothand.css';
import Confetti from 'react-confetti'

export default function HotHand() {
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [hiddenDealerCard, setHiddenDealerCard] = useState(null);
    const [result, setResult] = useState('');
    const [streak, setStreak] = useState(0);
    const [message, setMessage] = useState('');
    const [round, setRound] = useState(0);
    const [playerTurn, setPlayerTurn] = useState(true);
    const [gameInProgress, setGameInProgress] = useState(false);
    const [playerCardsDrawn, setPlayerCardsDrawn] = useState(0);
    const [dealerCardsDrawn, setDealerCardsDrawn] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [playerTotal, setPlayerTotal] = useState(0);
    const [dealerTotal, setDealerTotal] = useState(0);
    const [isBusted, setIsBusted] = useState(false);
    const [isDealerBusted, setIsDealerBusted] = useState(false);
    const [dealerTotalDisplay, setDealerTotalDisplay] = useState('');
    const [showPlayerTotal, setShowPlayerTotal] = useState(false);
    const [showDealerTotal, setShowDealerTotal] = useState(false);
    const [showVideo, setShowVideo] = useState(true);
    const [showDescription, setShowDescription] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);

    const suits = ["\u2660", "\u2665", "\u2666", "\u2663"]; // ♠ ♥ ♦ ♣

    const getCardClass = (suit) =>
        suit === "\u2665" || suit === "\u2666" ? "card red" : "card black";

    const drawCard = (playerType) => {
        const roundSpecificCards = {
            player: {
                1: [{ value: "K", suit: "\u2660" }, { value: 3, suit: "\u2663" }],
                2: [{ value: 6, suit: "\u2666" }, { value: 10, suit: "\u2665" }],
                3: [{ value: "Q", suit: "\u2663" }, { value: 6, suit: "\u2666" }],
                4: [{ value: 4, suit: "\u2665" }, { value: 9, suit: "\u2665" }],
                5: [{ value: 7, suit: "\u2660" }, { value: "Q", suit: "\u2663" }],
                6: [{ value: 7, suit: "\u2666" }, { value: "J", suit: "\u2660" }],
                7: [{ value: 8, suit: "\u2663" }, { value: "2", suit: "\u2665" }],
                8: [{ value: "K", suit: "\u2665" }, { value: "Q", suit: "\u2666" }],
            },
            dealer: {
                1: [{ value: "A", suit: "\u2665" }, { value: 2, suit: "\u2663" }],
                2: [{ value: 6, suit: "\u2660" }, { value: "J", suit: "\u2660" }],
                3: [{ value: "K", suit: "\u2663" }, { value: 5, suit: "\u2666" }],
                4: [{ value: 9, suit: "\u2663" }, { value: 3, suit: "\u2665" }],
                5: [{ value: 5, suit: "\u2660" }, { value: "K", suit: "\u2663" }],
                6: [{ value: 3, suit: "\u2666" }, { value: "Q", suit: "\u2660" }],
                7: [{ value: 7, suit: "\u2663" }, { value: "3", suit: "\u2665" }],
                8: [{ value: 10, suit: "\u2665" }, { value: 2, suit: "\u2666" }],
            }
        };

        const roundCards = roundSpecificCards[playerType]?.[round] || [{
            value: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"][Math.floor(Math.random() * 13)],
            suit: suits[Math.floor(Math.random() * 4)]
        }];

        let cardIndex;
        if (playerType === 'player') {
            cardIndex = playerCardsDrawn;
        } else {
            cardIndex = dealerCardsDrawn;
        }

        if (cardIndex < roundCards.length) {
            return roundCards[cardIndex];
        } else {
            return {
                value: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"][Math.floor(Math.random() * 13)],
                suit: suits[Math.floor(Math.random() * 4)]
            };
        }
    };

    const calculateValue = (card) => {
        const value = typeof card.value === 'string' ? card.value : String(card.value);
        if (["J", "Q", "K"].includes(value)) return 10;
        if (value === "A") return 11;
        return parseInt(value, 10);
    };

    const calculateHandTotal = (hand) => {
        let total = hand.reduce((sum, card) => sum + calculateValue(card), 0);
        let aces = hand.filter(card => card.value === "A").length;
        while (total > 21 && aces > 0) {
            total -= 10;
            aces--;
        }
        return total;
    };

    const determineWinner = (playerTotal, dealerTotal) => {
        if (playerTotal > 21 && dealerTotal > 21) return 0; // Both busted, it's a push
        if (playerTotal > 21) return -1;
        if (dealerTotal > 21) return 1;
        if (dealerTotal > playerTotal) return -1;
        if (playerTotal > dealerTotal) return 1;
        return 0;
    };    

    const playRound = () => {
        if (gameInProgress || round >= 9) return;

        setShowConfetti(false);
        setShowVideo(false); // hide video on first round
        setShowDescription(false); // hide description on first round
        setRound(prev => prev + 1);
        setPlayerTurn(true);
        setGameInProgress(true);
        setResult('');
        setMessage('');
        setPlayerCardsDrawn(0);
        setDealerCardsDrawn(0);
        setIsBusted(false);
        setShowPlayerTotal(true);
        setShowDealerTotal(true);


        let newPlayerHand = [];
        let newDealerHand = [];
        let hiddenCard = null;

        switch (round) {
            case 0:
                newPlayerHand = [{ value: 7, suit: "\u2666" }, { value: 5, suit: "\u2663" }];
                newDealerHand = [{ value: "Q", suit: "\u2660" }];
                hiddenCard = { value: 7, suit: "\u2665" };
                break;
            case 1:
                newPlayerHand = [{ value: 5, suit: "\u2660" }, { value: 4, suit: "\u2666" }];
                newDealerHand = [{ value: 8, suit: "\u2663" }];
                hiddenCard = { value: 4, suit: "\u2660" };
                break;
            case 2:
                newPlayerHand = [{ value: 5, suit: "\u2665" }, { value: 7, suit: "\u2663" }];
                newDealerHand = [{ value: 8, suit: "\u2660" }];
                hiddenCard = { value: "A", suit: "\u2660" };
                break;
            case 3:
                newPlayerHand = [{ value: 8, suit: "\u2665" }, { value: 8, suit: "\u2666" }];
                newDealerHand = [{ value: 7, suit: "\u2660" }];
                hiddenCard = { value: 10, suit: "\u2665" };
                break;
            case 4:
                newPlayerHand = [{ value: 3, suit: "\u2665" }, { value: "J", suit: "\u2660" }];
                newDealerHand = [{ value: 4, suit: "\u2663" }];
                hiddenCard = { value: 9, suit: "\u2666" };
                break;
            case 5:
                newPlayerHand = [{ value: 8, suit: "\u2663" }, { value: 6, suit: "\u2666" }];
                newDealerHand = [{ value: "A", suit: "\u2663" }];
                hiddenCard = { value: 3, suit: "\u2660" };
                break;
            case 6:
                newPlayerHand = [{ value: 5, suit: "\u2666" }, { value: 6, suit: "\u2660" }];
                newDealerHand = [{ value: 10, suit: "\u2666" }];
                hiddenCard = { value: 8, suit: "\u2665" };
                break;
            case 7:
                newPlayerHand = [{ value: 8, suit: "\u2665" }, { value: 8, suit: "\u2666" }];
                newDealerHand = [{ value: 7, suit: "\u2660" }];
                hiddenCard = { value: 5, suit: "\u2660" };
                break;
        }

        setPlayerHand(newPlayerHand);
        setDealerHand(newDealerHand);
        setHiddenDealerCard(hiddenCard);
        setPlayerTotal(calculateHandTotal(newPlayerHand));

        const initialDealerTotal = calculateHandTotal(newDealerHand);
        setDealerTotal(initialDealerTotal);
        setDealerTotalDisplay(`${initialDealerTotal} + ?`);
    };

    useEffect(() => {
        setPlayerTotal(calculateHandTotal(playerHand));
    }, [playerHand]);

    const handleDraw = () => {
        if (!playerTurn || !gameInProgress) return;
    
        if (round >= 1 && round <= 8 && playerCardsDrawn >= 2) {
            return;
        }
    
        const drawnCard = drawCard('player');
        const newPlayerHand = [...playerHand, drawnCard];
        const newTotal = calculateHandTotal(newPlayerHand);
    
        setPlayerHand(newPlayerHand);
        setPlayerCardsDrawn(prev => prev + 1);
        setPlayerTotal(newTotal);
    
        if (newTotal > 21) {
            setIsBusted(true);
            setPlayerTurn(false);
            endRound(newTotal);
        }
    };

    const handleStay = () => {
        if (!playerTurn || !gameInProgress) return;
        endRound(playerTotal);
    };

    const endRound = (playerTotalAtEnd) => {
        setPlayerTurn(false);
        setGameInProgress(false);
    
        const finalPlayerTotal = playerTotalAtEnd !== undefined ? playerTotalAtEnd : playerTotal;
    
        let fullDealerHand = [...dealerHand, hiddenDealerCard];
        let dealerTotalValue = calculateHandTotal(fullDealerHand);
        setDealerTotal(dealerTotalValue);
    
        setDealerTotalDisplay(dealerTotalValue.toString()); // Update dealer total display
    
        while (dealerTotalValue < 17) {
            const newCard = drawCard('dealer');
            fullDealerHand.push(newCard);
            dealerTotalValue = calculateHandTotal(fullDealerHand);
            setDealerCardsDrawn(prev => prev + 1);
        }
    
        setDealerHand(fullDealerHand);
        setDealerTotal(dealerTotalValue); // Update dealer total after all cards are drawn
        setDealerTotalDisplay(dealerTotalValue.toString()); // Update dealer total display
    
        // Check if the dealer busted
        if (dealerTotalValue > 21) {
            setIsDealerBusted(true);
        } else {
            setIsDealerBusted(false);
        }
    
        const winner = determineWinner(finalPlayerTotal, dealerTotalValue);
    
        if (winner === 0) {
            setResult("Push!");
            setStreak(0);
            setShowConfetti(false); // Hide confetti on push
        } else if (winner === -1) {
            setResult("You lose.");
            setStreak(0);
            setShowConfetti(false); // Hide confetti if losing
        } else if (winner === 1) {
            setResult("You win!");
            setStreak(prev => prev + 1);
            setShowConfetti(true); // Show confetti when winning
        }
    
        if (round === 8) {
            setGameCompleted(true);
        }
    };

    const restartGame = () => {
        setPlayerHand([]);
        setDealerHand([]);
        setHiddenDealerCard(null);
        setResult('');
        setStreak(0);
        setMessage('');
        setRound(0);
        setPlayerTurn(true);
        setGameInProgress(false);
        setPlayerCardsDrawn(0);
        setDealerCardsDrawn(0);
        setGameCompleted(false);
        setPlayerTotal(0);
        setDealerTotal(0);
        setIsBusted(false);
        setIsDealerBusted(false); // Reset dealer busted state
        setDealerTotalDisplay('');
        setShowPlayerTotal(false);
        setShowDealerTotal(false);
        setShowVideo(true); // Reset video visibility
        setShowDescription(true); // Reset description visibility
    };
    

    const renderCard = (card, index) => (
        <div key={`${card.value}-${card.suit}-${index}`} className={`hotcard ${getCardClass(card.suit)}`}>
            <div className="hotcard-inner">
                <div className="hotcard-front">
                    <span className="top-left">{card.value}{card.suit}</span>
                    <span className="bottom-right">{card.value}{card.suit}</span>
                </div>
                <div className="hotcard-back"></div>
            </div>
        </div>
    );
    
    // Update the JSX in the return statement
    return (
        <div className="hotcontainer">
            <h1>Hot-Hand Fallacy</h1>
            <div className="container-container">
            {showDescription && (
                <div className="description-container">
                    <h3>You'll play 8 rounds of a Blackjack-like game</h3>
                    <p>Watch the video first to understand the basics of the game if you are a beginner.</p>
                    <p>Note that in this version of the game, betting is not included, and you cannot split a 
                        pair of cards—for example, two 8s.</p>
                    <p>The dealer's hidden card is only revealed after you choose to stand.</p>
                    <p><strong>Deal Cards</strong> - Start each round (automatically deals initial hands)</p>
                    <p><strong>Hit</strong> - Draw another card (limited to 2 extra cards)</p>
                    <p><strong>Stand</strong> - Keep your current hand and see the dealer's cards</p>
                </div>
            )}
            {showVideo && (
                <div className="video-container">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/ln_kJjdHGus"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
            </div>
            {showConfetti && (
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                gravity={1.2}
                numberOfPieces={500}
                recycle={false} 
                onConfettiComplete={() => setShowConfetti(false)}
            />
         )}
            {gameCompleted ? (
                <button className="hotbutton" onClick={restartGame}>
                    Restart
                </button>
            ) : (
                <button className="hotbutton" onClick={playRound} disabled={gameInProgress || round >= 8}>
                    Deal Cards
                </button>
            )}
            
            <div className="hands-container">
                <div className="hand-column">
                    <h2>🧑‍💻 Your Hand:</h2>
                    <div className="hand">
                        {playerHand.map(renderCard)}
                    </div>
                    {showPlayerTotal && (
                    <div>
                        Total: {playerTotal}
                        {isBusted && <span style={{ color: 'red' }}> - Busted!</span>}
                    </div>
                    )}
                </div>
                <div className="hand-column">
                    <h2>🤖 Dealer's Hand:</h2>
                    <div className="hand">
                        {dealerHand.map(renderCard)}
                        {playerTurn && hiddenDealerCard && (
                           <div key="hidden" className="hotcard hidden">
                            <div className="hotcard-inner">
                             <div className="hotcard-back"></div>
                                </div>
                            </div>
                        )}
                    </div>
                    {showDealerTotal && (
                        <div>
                            Total: {dealerTotalDisplay}
                            {isDealerBusted && <span style={{ color: 'red' }}> - Busted!</span>}
                        </div>
                    )}
                </div>
            </div>

            {playerTurn && gameInProgress && round < 9 && (
                <div className="hotbutton-group">
                    <button
                        className="hotbutton"
                        onClick={handleDraw}
                        disabled={(round >= 1 && round <= 8 && playerCardsDrawn >= 2) || playerTotal > 21}
                    >
                        Hit
                    </button>
                    <button className="hotbutton" onClick={handleStay}>Stand</button>
                </div>
            )}
    
            {playerTurn && gameInProgress && round >= 1 && round <= 8 && playerCardsDrawn >= 2 && (
                <p>Maximum cards drawn for this round</p>
            )}
    
            <p id="result">{result}</p>
            <p id="streak">🔥 Win Streak: {streak}</p>
            <p id="message">{message}</p>
    
            {round === 8 && gameCompleted && (
    <div className="game-completed-container">
        <h2>🎉 Game Completed!</h2>
            <h3>🧠 What just happened?</h3>
            <p>
            This game was programmed to make you lose the first 3 rounds,
            then win a few — assuming you drew more cards — making you feel
            like you were on a streak. Rounds 4 and 8 started with the exact
            same hands. Did you draw another card in the 8th round but not in the 4th?
            Did your attitude change? If so, you fell for the Hot-Hand Fallacy.
            </p>
            <p>
            Hot-Hand Fallacy is the belief that a person who has experienced success 
            with a random event (like winning several rounds) has a higher chance of 
            continued success. This fallacy occurs even when each event is independent 
            and the odds haven't changed. It can lead to overconfidence and risky decisions.
            </p>
            <h3>💡 Tip:</h3>
            <p>
            When you feel "on a roll," pause and ask yourself: Have the actual 
            odds changed, or just how I feel about them?
            </p>
    </div>
)}
        </div>
    );
}
