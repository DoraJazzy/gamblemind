import React, { useState } from 'react';
import '../Styles/hothand.css';
import { style } from 'framer-motion/client';

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
    const [cardsDrawn, setCardsDrawn] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);

    const suits = ["\u2660", "\u2665", "\u2666", "\u2663"]; // ♠ ♥ ♦ ♣

    const getCardClass = (suit) =>
        suit === "\u2665" || suit === "\u2666" ? "card red" : "card black";

    const drawCard = () => {
        const roundSpecificCards = {
            1: [{ value: "K", suit: "\u2660" }, { value: 3, suit: "\u2663" }],
            2: [{ value: 5, suit: "\u2666" }, { value: "Q", suit: "\u2660" }],
            3: [{ value: "A", suit: "\u2663" }, { value: 6, suit: "\u2666" }],
            4: [{ value: 3, suit: "\u2665" }, { value: "J", suit: "\u2665" }],
            5: [{ value: 7, suit: "\u2660" }, { value: "Q", suit: "\u2663" }],
            6: [{ value: 7, suit: "\u2666" }, { value: "J", suit: "\u2660" }],
            7: [{ value: 8, suit: "\u2663" }, { value: "2", suit: "\u2665" }],
            8: [{ value: "K", suit: "\u2665" }, { value: "Q", suit: "\u2666" }],
        };

        const roundCards = roundSpecificCards[round] || [{
            value: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"][Math.floor(Math.random() * 13)],
            suit: suits[Math.floor(Math.random() * 4)]
        }];

        if (cardsDrawn < roundCards.length) {
            return roundCards[cardsDrawn];
        } else {
            return {
                value: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"][Math.floor(Math.random() * 13)],
                suit: suits[Math.floor(Math.random() * 4)]
            };
        }
    };

    const calculateValue = (card) =>
        ["J", "Q", "K"].includes(card.value) ? 10 : (card.value === "A" ? 11 : card.value);

    const calculateHandTotal = (hand) => {
        let total = hand.reduce((sum, c) => sum + calculateValue(c), 0);
        let aces = hand.filter(c => c.value === "A").length;
        while (total > 21 && aces > 0) {
            total -= 10;
            aces--;
        }
        return total;
    };

    const determineWinner = (playerTotal, dealerTotal) => {
        if (playerTotal > 21) return -1;
        if (dealerTotal > 21) return 1;
        if (dealerTotal > playerTotal) return -1;
        if (playerTotal > dealerTotal) return 1;
        return 0;
    };

    const playRound = () => {
        if (gameInProgress || round >= 9) return;

        setRound(prev => prev + 1);
        setPlayerTurn(true);
        setGameInProgress(true);
        setResult('');
        setMessage('');
        setCardsDrawn(0);

        let newPlayerHand = [];
        let newDealerHand = [];
        let hiddenCard = null;

        const randomSuit = () => suits[Math.floor(Math.random() * 4)];

        switch (round) {
            case 0:
                newPlayerHand = [{ value: 7, suit: "\u2666" }, { value: 5, suit: "\u2663" }];
                newDealerHand = [{ value: "Q", suit: "\u2660" }];
                hiddenCard = { value: 8, suit: "\u2665" };
                break;
            case 1:
                newPlayerHand = [{ value: 3, suit: "\u2665" }, { value: 4, suit: "\u2660" }];
                newDealerHand = [{ value: 8, suit: "\u2666" }];
                hiddenCard = { value: 9, suit: "\u2660" };
                break;
            case 2:
                newPlayerHand = [{ value: 5, suit: "\u2665" }, { value: 6, suit: "\u2666" }];
                newDealerHand = [{ value: 8, suit: "\u2660" }];
                hiddenCard = { value: "A", suit: "\u2660" };
                break;
            case 3:
                newPlayerHand = [{ value: 8, suit: "\u2665" }, { value: 8, suit: "\u2663" }];
                newDealerHand = [{ value: 7, suit: "\u2660"}];
                hiddenCard = { value: 10, suit: "\u2666" };
                break;
            case 4:
                newPlayerHand = [{ value: 3, suit: "\u2666" }, { value: "J", suit: "\u2660" }];
                newDealerHand = [{ value: 8, suit: "\u2665" }];
                hiddenCard = { value: 9, suit: "\u2666" };
                break;
            case 5:
                newPlayerHand = [{ value: 8, suit: "\u2663" }, { value: 6, suit: "\u2666" }];
                newDealerHand = [{ value: "K", suit: "\u2663" }];
                hiddenCard = { value: 7, suit: "\u2660" };
                break;
            case 6:
                newPlayerHand = [{ value: 5, suit: "\u2666" }, { value: 6, suit: "\u2660" }];
                newDealerHand = [{ value: 10, suit: "\u2666" }];
                hiddenCard = { value: 8, suit: "\u2663" };
                break;
            case 7:
                newPlayerHand = [{ value: 8, suit: "\u2660" }, { value: 8, suit: "\u2666" }];
                newDealerHand = [{ value: 7, suit: "\u2663" }];
                hiddenCard = { value: "J", suit: "\u2665" };
                break;
        }

        setPlayerHand(newPlayerHand);
        setDealerHand(newDealerHand);
        setHiddenDealerCard(hiddenCard);
    };

    const handleDraw = () => {
        const playerTotal = calculateHandTotal(playerHand);

        // Prevent draw if player has busted
        if (!playerTurn || !gameInProgress || playerTotal > 21) return;

        // Prevent draw if max 2 drawn cards allowed in scripted rounds
        if (round >= 1 && round <= 8 && cardsDrawn >= 2) return;

        // EXTRA CHECK: Stop if total is already over 21 before drawing
        if (calculateHandTotal(playerHand) > 21) return;

        const drawnCard = drawCard();
        const newPlayerHand = [...playerHand, drawnCard];
        const newTotal = calculateHandTotal(newPlayerHand);

        setPlayerHand(newPlayerHand);
        setCardsDrawn(prev => prev + 1);

        if (newTotal > 21) endRound();
    };

    const handleStay = () => {
        if (!playerTurn || !gameInProgress) return;
        endRound();
    };

    const endRound = () => {
        setPlayerTurn(false);
        setGameInProgress(false);

        const playerTotal = calculateHandTotal(playerHand);
        let fullDealerHand = [...dealerHand, hiddenDealerCard];
        let dealerTotal = calculateHandTotal(fullDealerHand);

        while (dealerTotal < 17) {
            const newCard = drawCard();
            fullDealerHand.push(newCard);
            dealerTotal = calculateHandTotal(fullDealerHand);
        }

        const winner = determineWinner(playerTotal, dealerTotal);

        if (winner === -1) {
            setResult("You lose.");
            setStreak(0);
        } else if (winner === 1) {
            setResult("You win!");
            setStreak(prev => prev + 1);
        } else {
            setResult("Push!");
        }

        setDealerHand(fullDealerHand);

        // Check if this was the final round (round 8)
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
        setCardsDrawn(0);
        setGameCompleted(false);
    };

    const renderCard = (card) => (
        <div className={`hotcard ${getCardClass(card.suit)}`}>
            <div className="hotcard-inner">
                <div className="hotcard-front">
                    <span className="top-left">{card.value}{card.suit}</span>
                    <span className="bottom-right">{card.value}{card.suit}</span>
                </div>
                <div className="hotcard-back"></div>
            </div>
        </div>
    );

    return (
        <div className="hotcontainer">
            <h1>Blackjack Hot Hand Demo 🃏</h1>
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
                        {playerHand.map((card, index) => renderCard(card))}
                    </div>
                </div>
                <div className="hand-column">
                    <h2>🤖 Dealer's Hand:</h2>
                    <div className="hand">
                        {dealerHand.map((card, index) => renderCard(card))}
                        {playerTurn && hiddenDealerCard && (
                            <div className="hotcard hidden">
                                <div className="hotcard-inner">
                                    <div className="hotcard-back"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {playerTurn && gameInProgress && round < 9 && (
                <div>
                    <button
                        className="hotbutton"
                        onClick={handleDraw}
                        disabled={(round >= 1 && round <= 8 && cardsDrawn >= 2) || calculateHandTotal(playerHand) > 21}
                    >
                        Draw Card
                    </button>
                    <button className="hotbutton" onClick={handleStay}>Stay</button>
                </div>
            )}

            {playerTurn && gameInProgress && round >= 1 && round <= 8 && cardsDrawn >= 2 && (
                <p>Maximum cards drawn for this round</p>
            )}

            <p id="result">{result}</p>
            <p id="streak">🔥 Win Streak: {streak}</p>
            <p id="message">{message}</p>

            {round === 8 && gameCompleted && (
                <div className="game-completed-message">
                    <h2>Game Completed!</h2>
                    <p>This game was programmed to make you lose the first 3 rounds,
                        win a few rounds in a row — supposing you drew additional cards —
                        and make you feel like you were in a good streak. Rounds 4 and
                        8 started with the exact same starting hands; was your attitude
                        different before and after the streak? If it was, you fell into the Hot-Hand
                        Fallacy! After winning several rounds you may feel like you are in
                        control and start taking more risk. If you would like to, restart 
                        the game and pay close attention to how your attitude differs 
                        in the cases when you have two 8 cards in your hand originally. 
                        Rememnber: a good streak does not mean that you invincible! </p>
                </div>
            )}
        </div>
    );
}
