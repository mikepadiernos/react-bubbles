import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// IMPORT ASSETS
import "./styles.scss";

// IMPORT CONTEXTS
import BubbleContext from "./contexts/BubbleContext";
import LoggedContext from "./contexts/LoggedContext";

// IMPORT UTILITIES
import { axiosWithAuth } from "./utilities/axiosWithAuth";
import ProtectedRoute from "./utilities/ProtectedRoute";

// IMPORT APP COMPONENTS
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";

function App() {

  const colorItem               = {
    color:  "",
    code:   {
      hex:  ""
    }
  };

  const [bubbles, setBubbles]   = useState([]);
  const [logged, setLogged] = useState( localStorage.getItem("token") );

  return (
    <Router>
      <BubbleContext.Provider value={{ bubbles, setBubbles, colorItem }}>
        <LoggedContext.Provider value={{ logged, setLogged }}>
        <div className="App">
          <div className="container">
            <header role="header" id="header" className="header">
              <h1>Welcome to the Bubble App!</h1>
            </header>
            <main role="content" id="main-content" className="main-content">
              <Route exact path="/" component={Login} />
              <ProtectedRoute path="/bubbles" component={BubblePage}/>
            </main>
            {/*
              Build a PrivateRoute component that will
              display BubblePage when you're authenticated
            */}
          </div>
        </div>
        </LoggedContext.Provider>
      </BubbleContext.Provider>
    </Router>
  );
}

export default App;