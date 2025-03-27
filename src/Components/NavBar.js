import React from "react";
import logo from "../Visuals/logo.png"; 

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
      </ul>
    </nav>
  );
}
