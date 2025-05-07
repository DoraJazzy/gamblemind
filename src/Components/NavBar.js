import React from "react";
import logo from "../Visuals/logo.svg"; 

export default function NavBar() {
  return (
    <nav className="nav">
      <a href="/" className="site-logo">
        <img src={logo} alt="Gamble-Minded Logo" />
      </a>
      <ul>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/biases">Cognitive Biases</a>
        </li>
        <li>
          <a href="https://forms.gle/kh8fWeVnV1TLV2fd6" target="_blank" rel="noopener noreferrer">
            Feedback
          </a>
        </li>
      </ul>
    </nav>
  );
}
