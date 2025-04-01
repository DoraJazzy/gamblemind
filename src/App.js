import React from 'react';
import Navbar from './Components/NavBar.js';
import About from './Components/About.js';
import Footer from './Components/Footer.js';
import Welcome from './Components/Welcome.js';
import Biases from './Components/Biases.js';
import { Ostrich }  from './Components/Ostrich.js';
import SlotMachine from './Components/SlotMachine.tsx';
import CoinFlipSimulator from './Components/CoinFlipSimulator.js';
import ProspectTheory from './Components/ProspectTheory.js';

function App() {
  let Component; 

  switch(window.location.pathname) {
    case "/":
      Component = Welcome;
      break
      case "/about":
        Component = About;
        break
        case "/biases":
          Component = Biases;
          break
          case "/ostrich":
            Component = Ostrich;
            break
            case "/slotmachine":
              Component = SlotMachine; 
              break
              case "/CoinFlipSimulator":
              Component = CoinFlipSimulator;
              break
              case "/ProspectTheory":
                Component = ProspectTheory;
                break
                case "/slotmachine":
                  Component = SlotMachine; 
                  break
                  default:
                    Component = () => <h1>404: Not Found</h1>
  }
  return (
  <div>
    <Navbar />
    <Component />
    <Footer />
  </div>
  );
}

export default App;

