import React from 'react';
import Navbar from './Components/NavBar.js';
import About from './Components/About.js';
import Option2 from './Components/Option2.js';
import Option3 from './Components/Option3.js';
import Footer from './Components/Footer.js';
import Welcome from './Components/Welcome.js';
import Biases from './Components/Biases.js';

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
          case "/option2":
            Component = Option2;
            break
            case "/option3":
              Component = Option3;
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

