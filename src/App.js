import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./components/Nav/Nav.js";
import Footer from "./components/Footer/Footer.js";
import Leagues from "./pages/Leagues/Leagues.js";
import Home from "./pages/Home/Home.js";
import CreateLeague from "./pages/CreateLeague/CreateLeague";
import JoinLeague from "./pages/JoinLeague/JoinLeague";
import SignUp from "./pages/SignUp/SignUp";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Nav></Nav>
        </nav>

        <AuthProvider>
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/signup`}>
              <SignUp />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/leagues`}>
              <Leagues />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/createleague`}>
              <CreateLeague />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/joinleague`}>
              <JoinLeague />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/`}>
              <Home />
            </Route>
            <Route component={Home} />
          </Switch>
        </AuthProvider>

        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </Router>
  );
}

export default App;
