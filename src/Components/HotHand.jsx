import React, { useState, useEffect } from 'react';
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
    const [gameCompleted, setGameCompleted] = useState(false);
    const [playerTotal, setPlayerTotal] = useState(0);
    const [dealerTotal, setDealerTotal] = useState(0);
    const [isBusted, setIsBusted] = useState(false);
    const [dealerTotalDisplay, setDealerTotalDisplay] = useState('');
    const [showPlayerTotal, setShowPlayerTotal] = useState(false); // New state
    const [showDealerTotal, setShowDealerTotal] = useState(false); // New state


    const suits = ["\u2660", "\u2665", "\u2666", "\u2663"]; // ♠ ♥ ♦ ♣

    const getCardClass = (suit) =>
        suit === "\u2665" || suit === "\u2666" ? "card red" : "card black";

    const drawCard = () => {
        const roundSpecificCards = {
            1: [{ value: "K", suit: "\u2660" }, { value: 3, suit: "\u2663" }],
            2: [{ value: 5, suit: "\u2666" }, { value: "Q", suit: "\u2660" }],
            3: [{ value: "Q", suit: "\u2663" }, { value: 6, suit: "\u2666" }],
            4: [{ value: 3, suit: "\u2665" }, { value: 4, suit: "\u2665" }],
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
        setIsBusted(false);
        setShowPlayerTotal(true);
        setShowDealerTotal(true);


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
                newPlayerHand = [{ value: 5, suit: "\u2665" }, { value: 7, suit: "\u2666" }];
                newDealerHand = [{ value: 8, suit: "\u2660" }];
                hiddenCard = { value: "A", suit: "\u2660" };
                break;
            case 3:
                newPlayerHand = [{ value: 8, suit: "\u2665" }, { value: 8, suit: "\u2663" }];
                newDealerHand = [{ value: 7, suit: "\u2660"}];
                hiddenCard = { value: 10, suit: "\u2666" };
                console.log("Round 4 setup:", { newPlayerHand, newDealerHand, hiddenCard });
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
    
        if (round >= 1 && round <= 8 && cardsDrawn >= 2) {
            console.log("Draw prevented: Max cards drawn for this round.");
            return;
        }
    
        const drawnCard = drawCard();
        const newPlayerHand = [...playerHand, drawnCard];
        const newTotal = calculateHandTotal(newPlayerHand);
    
        setPlayerHand(newPlayerHand);
        setCardsDrawn(prev => prev + 1);
        setPlayerTotal(newTotal);
    
        console.log(`Player drew: ${drawnCard.value}${drawnCard.suit}`);
        console.log(`New player hand: ${newPlayerHand.map(card => card.value + card.suit).join(', ')}`);
        console.log(`New player total: ${newTotal}`);
    
        if (newTotal > 21) {
            console.log("Player busted!");
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
    
        console.log(`Ending round. Player total: ${finalPlayerTotal}, Dealer total: ${dealerTotalValue}`);
        setDealerTotalDisplay(dealerTotalValue.toString());
    
        while (dealerTotalValue < 17) {
            const newCard = drawCard();
            fullDealerHand.push(newCard);
            dealerTotalValue = calculateHandTotal(fullDealerHand);
        }
    
        const winner = determineWinner(finalPlayerTotal, dealerTotalValue);
    
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
        setPlayerTotal(0);
        setDealerTotal(0);
        setIsBusted(false);
        setDealerTotalDisplay('');
        setShowPlayerTotal(false);
        setShowDealerTotal(false);

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
                        </div>
                    )}
                </div>
            </div>
    
            {playerTurn && gameInProgress && round < 9 && (
                <div>
                    <button
                        className="hotbutton"
                        onClick={handleDraw}
                        disabled={(round >= 1 && round <= 8 && cardsDrawn >= 2) || playerTotal > 21}
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
