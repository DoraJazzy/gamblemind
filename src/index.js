import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./App.css"; 
import "./Styles/navbar.css";
import "./Styles/footer.css";
import "./Styles/welcome.css";
import"./Styles/about.css";
import "./Styles/biases.css";
import "./Styles/BaseRateNeglect.css";
import "./Styles/ostrich.css";
import "./Styles/CoinFlipSimulator.css";
import "./Styles/prospect.css";
import "./Styles/illusion.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
