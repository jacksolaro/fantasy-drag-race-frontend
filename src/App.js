import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Footer from "./components/Footer/Footer.js";
import Leagues from "./pages/Leagues/Leagues.js";
import Home from "./pages/Home/Home.js";
import CreateLeague from "./pages/CreateLeague/CreateLeague";
import JoinLeague from "./pages/JoinLeague/JoinLeague";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Nav from "./components/Nav/Nav";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import LeagueDetails from "./pages/LeagueDetails/LeagueDetails.js";
import SelectSeasonRoster from "./pages/SelectSeasonRoster/SelectSeasonRoster";
import SelectEpisodeRoster from "./pages/SelectEpisodeRoster/SelectEpisodeRoster";

function App() {
  return (
    <Router>
      <div>
        <AuthProvider>
          <nav>
            <Nav></Nav>
          </nav>
          <Switch>
            <Route
              path={`${process.env.PUBLIC_URL}/leagues/:id/selectseasonroster`}
            >
              <SelectSeasonRoster />
            </Route>
            <Route
              path={`${process.env.PUBLIC_URL}/leagues/:id/selectepisoderoster/:episodeNum`}
            >
              <SelectEpisodeRoster />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/leagues/:id`}>
              <LeagueDetails />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/signup`}>
              <SignUp />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/forgot-password`}>
              <ForgotPassword />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/login`}>
              <Login />
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
