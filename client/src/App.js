import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// IMPORT ASSETS
import "./styles.scss";

// IMPORT CONTEXTS
import BubbleContext from "./contexts/BubbleContext";

// IMPORT UTILITIES

// IMPORT APP COMPONENTS
import Login from "./components/Login";

function App() {
  const colorItem               = {
    color:  "",
    code:   {
      hex:  ""
    }
  };

  const [bubbles, setBubbles]   = useState([]);

  return (
    <Router>
      <BubbleContext.Provieder value={{ bubbles, setBubbles, colorItem }}>
        <div className="App">
          <Route exact path="/" component={Login} />
          {/*
            Build a PrivateRoute component that will
            display BubblePage when you're authenticated
          */}
        </div>
      </BubbleContext.Provieder>
    </Router>
  );
}

export default App;
