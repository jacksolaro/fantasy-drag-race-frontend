import "./App.css";
import React, { useState } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
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
import firebase from "./firebase.js";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

function App() {
  const location = useLocation();
  const [user, setUser] = useState();

  const font = "'Nunito', sans-serif";
  const theme = createMuiTheme({
    typography: {
      fontFamily: font,
      button: {
        textTransform: "none",
      },
    },
  });

  firebase.auth().onAuthStateChanged(function (currUser) {
    if (currUser) {
      setUser(currUser);
    } else {
      setUser();
    }
  });

  // var user = firebase.auth().currentUser;
  // if (user) {
  //   console.log("yeah");
  // } else {
  //   console.log("nah");
  // }

  // FOR TESTING PURPOSES
  // function HeaderView() {
  //   console.log(location.pathname);
  //   return <span>Path: {location.pathname}</span>;
  // }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AuthProvider>
          <nav>
            {!(
              location.pathname === "/login" ||
              location.pathname === "/signup" ||
              location.pathname === "/forgot-password"
            ) && <Nav currentUser={user}></Nav>}
          </nav>
          {/* FOR TESTING PURPOSES --- UNCOMMENT TO SEE CURRENT PAGE */}
          {/* {HeaderView()} */}
          <Switch>
            <Route path={`/leagues/:id/selectseasonroster`}>
              {user ? (
                <SelectSeasonRoster />
              ) : (
                <Redirect to={{ pathname: "/signup" }} />
              )}
            </Route>
            <Route path={`/leagues/:id/selectepisoderoster/:episodeNum`}>
              {user ? (
                <SelectEpisodeRoster />
              ) : (
                <Redirect to={{ pathname: "/signup" }} />
              )}
            </Route>
            <Route path={`/leagues/:id`}>
              {user ? (
                <LeagueDetails />
              ) : (
                <Redirect to={{ pathname: "/signup" }} />
              )}
            </Route>
            <Route path={`/signup`} component={SignUp}>
              {/* <SignUp /> */}
            </Route>
            <Route path={`/forgot-password`}>
              <ForgotPassword />
            </Route>
            <Route path={`/login`}>
              <Login />
            </Route>
            <Route path={`/leagues`}>
              {user ? <Leagues /> : <Redirect to={{ pathname: "/signup" }} />}
            </Route>
            <Route path={`/createleague`}>
              {user ? (
                <CreateLeague />
              ) : (
                <Redirect to={{ pathname: "/signup" }} />
              )}
            </Route>
            <Route path={`/joinleague`}>
              {user ? (
                <JoinLeague />
              ) : (
                <Redirect to={{ pathname: "/signup" }} />
              )}
            </Route>
            <Route path={`/`}>
              <Home />
            </Route>
            <Route component={Home} />
          </Switch>
          {!(
            location.pathname === "/login" ||
            location.pathname === "/signup" ||
            location.pathname === "/forgot-password"
          ) && <Footer />}
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
