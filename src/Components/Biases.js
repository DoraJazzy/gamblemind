import React from 'react';
import Ostrich from './Ostrich';

export default function Biases() {    
    return (
        <div className="biases">
            <h1>Cognitive Biases</h1>
            <p>Flip the coin bruh.</p>

            <button onClick={() => (window.location.pathname = "/ostrich")}>
                Ostrich Effect
            </button>
        </div>
    );
}