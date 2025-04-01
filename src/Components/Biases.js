import React from 'react';

export default function Biases() {    
    return (
        <div className="biases">
            <h1>Cognitive Biases</h1>
            <p>Flip the coin bruh.</p>

            <button onClick={() => (window.location.pathname = "/ostrich")}>
                Ostrich Effect
            </button>
            <button onClick={() => (window.location.pathname = "/slotmachine")}>
                Slot Machine Effect
            </button>
        </div>
    );
}