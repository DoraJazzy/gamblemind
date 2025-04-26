import React from 'react';
import Navbar from './Components/NavBar.js';
import About from './Components/About.js';
import Footer from './Components/Footer.js';
import Welcome from './Components/Welcome.js';
import Biases from './Components/Biases.js';
import { Ostrich }  from './Components/Ostrich.js';
import CoinFlipSimulator from './Components/CoinFlipSimulator.js';
import ProspectTheory from './Components/ProspectTheory.js';
import BaseRateNeglect from './Components/BaseRateNeglect.js';
import HotHand from './Components/HotHand.jsx';
import SlotMachine from './Components/SlotMachine.jsx';
import rationalization from './Components/rationalization.jsx';
import illusion from './Components/Illusion.js';



function App() {

// Handle GitHub Pages 404 redirect
if (window.location.search.includes('?p=')) {
  const path = window.location.search.split('?p=')[1];
  window.history.replaceState({}, '', path);
}

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
            case "/CoinFlipSimulator":
              Component = CoinFlipSimulator;
              break
              case "/ProspectTheory":
                Component = ProspectTheory;
                break
                case "/slotmachine":
                  Component = SlotMachine; 
                  break
                  case "/baserateneglect":
                    Component = BaseRateNeglect;
                    break
                    case "/HotHand":
                      Component = HotHand;
                      break
                      case "/rationalization":
                        Component = rationalization;
                        break
                        case "/illusion":
                          Component = illusion;
                          break
                        default:
                          Component = () => <h1>404: Not Found</h1>
  }
  return <Component />;
}

export default App;

