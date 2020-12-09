import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./components/Nav/Nav.js";
import Footer from "./components/Footer/Footer.js";
import Leagues from "./pages/Leagues/Leagues.js";
import Home from "./pages/Home/Home.js";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Nav></Nav>
        </nav>

        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/leagues`}>
            <Leagues />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/`}>
            <Home />
          </Route>
          <Route component={Home} />
        </Switch>

        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </Router>
  );
}

export default App;
