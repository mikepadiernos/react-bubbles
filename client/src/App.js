import React, { useState } from "react";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";

// IMPORT ASSETS
// import "./styles.scss";
import "./css/App.css"

// IMPORT CONTEXTS
import LoggedContext    from "./contexts/LoggedContext";
import BubbleContext    from "./contexts/BubbleContext";
import ColorContext     from "./contexts/ColorContext";

// IMPORT UTILITIES
import ProtectedRoute   from "./utilities/ProtectedRoute";

// IMPORT APP COMPONENTS
import Login            from "./components/Login";
import BubblePage       from "./components/BubblePage";

function App() {

  const colorItem               = {
    color:  "",
    code:   {
      hex:  ""
    }
  };

  const [logged, setLogged]         = useState( localStorage.getItem("token") );
  const [bubble, setBubble]         = useState([]);
  const [colorList, setColorList]   = useState([]);

  return (
    <Router>
      <LoggedContext.Provider value={{ logged, setLogged }}>
        <BubbleContext.Provider value={{ bubble, setBubble }}>
          <ColorContext.Provider value={{ colorList, setColorList, colorItem }}>
            <div className="App">
              <header id="header" className="header">
                <div className="container">
                  <h1>Welcome to the Bubble App!</h1>
                </div>
              </header>
              <main id="main-content" className="main-content">
                <div className="container">
                  <Route exact path="/" component={Login} />
                  <ProtectedRoute path="/bubbles" component={BubblePage}/>
                </div>
              </main>
              {/*
                 Build a PrivateRoute component that will
                  display BubblePage when you're authenticated
              */}
            </div>
          </ColorContext.Provider>
        </BubbleContext.Provider>
      </LoggedContext.Provider>
    </Router>
  );
}

export default App;