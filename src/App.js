import React from 'react';
import Navbar from './Components/NavBar.js';
import About from './Components/About.js';
import Option1 from './Components/Option1.js';
import Option2 from './Components/Option2.js';
import Option3 from './Components/Option3.js';
import Footer from './Components/Footer.js';

function App() {
  let Component; 

  switch(window.location.pathname) {
    case "/":
      Component = About;
      break
      case "/about":
        Component = About;
        break
        case "/option1":
          Component = Option1;
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

