import React, { useState } from 'react';
import '../Styles/hothand.css';

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

    const suits = ["\u2660", "\u2665", "\u2666", "\u2663"];

    const getCardClass = (suit) =>
        suit === "\u2665" || suit === "\u2666" ? "card red" : "card black";

    const drawCard = () => {
        // MODIFY THESE PER ROUND FOR DRAWN CARDS
        const roundSpecificCards = {
            1: [{ value: "K", suit: "\u2666" }, { value: "Q", suit: "\u2663" }],
            2: [{ value: "K", suit: "\u2666" }, { value: "Q", suit: "\u2660" }],
            3: [{ value: "K", suit: "\u2666" }, { value: "Q", suit: "\u2666" }],
            4: [{ value: "K", suit: "\u2666" }, { value: "Q", suit: "\u2665" }],
            5: [{ value: "K", suit: "\u2666" }, { value: "Q", suit: "\u2663" }],
            6: [{ value: "K", suit: "\u2666" }, { value: "Q", suit: "\u2660" }],
            7: [{ value: "K", suit: "\u2666" }, { value: "Q", suit: "\u2665" }],
            8: [{ value: "K", suit: "\u2666" }, { value: "Q", suit: "\u2666" }],
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
        if (playerTotal > 21 || (dealerTotal <= 21 && dealerTotal > playerTotal)) {
            return -1;
        } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
            return 1;
        } else {
            return 0;
        }
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
                newPlayerHand = [
                    { value: 7, suit: "\u2666" },
                    { value: 5, suit: "\u2663" }
                ];
                newDealerHand = [
                    { value: "Q", suit: randomSuit() }
                ];
                hiddenCard = { value: 10, suit: randomSuit() };
                break;
            case 1:
                newPlayerHand = [
                    { value: 3, suit: "\u2665" },
                    { value: 3, suit: "\u2660" }
                ];
                newDealerHand = [
                    { value: 8, suit: randomSuit() }
                ];
                hiddenCard = { value: 9, suit: randomSuit() };
                break;
            case 2:
                newPlayerHand = [
                    { value: 3, suit: "\u2665" },
                    { value: 2, suit: "\u2666" }
                ];
                newDealerHand = [
                    { value: 10, suit: "\u2660" }
                ];
                hiddenCard = { value: "A", suit: "\u2660" };
                break;
            case 3:
                newPlayerHand = [
                    { value: 7, suit: randomSuit() },
                    { value: 8, suit: randomSuit() }
                ];
                newDealerHand = [
                    { value: "K", suit: randomSuit() }
                ];
                hiddenCard = { value: 2, suit: randomSuit() };
                break;
            case 4:
                newPlayerHand = [
                    { value: 9, suit: randomSuit() },
                    { value: "A", suit: randomSuit() }
                ];
                newDealerHand = [
                    { value: 8, suit: randomSuit() }
                ];
                hiddenCard = { value: 7, suit: randomSuit() };
                break;
            case 5:
                newPlayerHand = [
                    { value: 10, suit: randomSuit() },
                    { value: "Q", suit: randomSuit() }
                ];
                newDealerHand = [
                    { value: 9, suit: randomSuit() }
                ];
                hiddenCard = { value: 7, suit: randomSuit() };
                break;
            case 6:
                newPlayerHand = [
                    { value: 5, suit: randomSuit() },
                    { value: 6, suit: randomSuit() }
                ];
                newDealerHand = [
                    { value: 10, suit: randomSuit() }
                ];
                hiddenCard = { value: 10, suit: randomSuit() };
                break;
            case 7:
                newPlayerHand = [
                    { value: 7, suit: randomSuit() },
                    { value: 8, suit: randomSuit() }
                ];
                newDealerHand = [
                    { value: "K", suit: randomSuit() }
                ];
                hiddenCard = { value: 2, suit: randomSuit() };
                break;
            case 8:
                newPlayerHand = [];
                newDealerHand = [];
                hiddenCard = null;
                break;
            default:
                break;
        }

        setPlayerHand(newPlayerHand);
        setDealerHand(newDealerHand);
        setHiddenDealerCard(hiddenCard);
    };

    const handleDraw = () => {
        const playerTotal = calculateHandTotal(playerHand);

        if (!playerTurn || !gameInProgress || cardsDrawn >= 2 || playerTotal > 21) return;

        const drawnCard = drawCard();
        const newPlayerHand = [...playerHand, drawnCard];
        const newTotal = calculateHandTotal(newPlayerHand);

        setPlayerHand(newPlayerHand);
        setCardsDrawn(prev => prev + 1);

        if (newTotal > 21) {
            endRound();
        }
    };

    const handleStay = () => {
        if (!playerTurn || !gameInProgress) return;
        endRound();
    };

    const endRound = () => {
        setPlayerTurn(false);
        setGameInProgress(false);

        const fullDealerHand = [...dealerHand, hiddenDealerCard];
        const dealerTotal = calculateHandTotal(fullDealerHand);
        const playerTotal = calculateHandTotal(playerHand);
        const winner = determineWinner(playerTotal, dealerTotal);

        if (winner === 1) {
            setResult("You win!");
            setStreak(prev => prev + 1);
            setMessage(round === 8 ? "That's the hot-hand fallacy!" : "Rigged for wins!");
        } else {
            setResult("You lose.");
            setStreak(0);
            setMessage("Rigged for losses!");
        }

        setDealerHand(fullDealerHand);
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
            <button
                className="hotbutton"
                onClick={playRound}
                disabled={gameInProgress || round >= 9}
            >
                Deal Cards
            </button>

            <div className="hands-container">
                <div className="hand-column">
                    <h2>🧑 Player Hand:</h2>
                    <div className="hand">
                        {playerHand.map((card, index) => renderCard(card))}
                    </div>
                </div>
                <div className="hand-column">
                    <h2>🤖 Dealer Hand:</h2>
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
                        disabled={cardsDrawn >= 2 || calculateHandTotal(playerHand) > 21}
                    >
                        Draw Card
                    </button>
                    <button className="hotbutton" onClick={handleStay}>Stay</button>
                </div>
            )}

            <p id="result">{result}</p>
            <p id="streak">🔥 Win Streak: {streak}</p>
            <p id="message">{message}</p>
        </div>
    );
}
