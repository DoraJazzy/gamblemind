import React from 'react';

export default function Biases() {    
    return (
        <div className="biases">
            <h1>Cognitive Biases</h1>
            <p>Flip the coin bruh.</p>

            <button onClick={() => (window.location.pathname = "/ostrich")}>
                Ostrich Effect
            </button>
            <button onClick={() => (window.location.pathname = "/CoinFlipSimulator")}>
                Coin Flip Simulator
            </button>
            <button onClick={() => (window.location.pathname = "/ProspectTheory")}>
                Prospect Theory
            </button>
        </div>
    );
}