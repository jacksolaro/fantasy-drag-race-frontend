import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/SwipeableDrawer";
import { useHistory } from "react-router-dom";
import "./Nav.css";
import derbyLogo from "../../assets/images/derby_logo_white-01.png";

import { useAuth } from "../../contexts/AuthContext";

function Nav(props) {
  const { logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  // Open / Close Drawer for Mobile Nav
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    if (typeof event === "undefined") {
      return;
    }
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsExpanded(!isExpanded);
  };

  // Handle Log Out
  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push(`/login`);
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <nav className="">
      <div className={`nav`}>
        <Link className="nav-logo" to="/">
          <img src={derbyLogo} alt="Derby Logo" className="nav-logo"></img>
        </Link>

        <Drawer
          anchor="right"
          open={isExpanded}
          onOpen={toggleDrawer("right", true)}
          onClose={toggleDrawer("right", false)}
        >
          <div className="drawer">
            <ul className="drawer__list">
              {!props.currentUser && (
                <>
                  <Link to="/login">
                    <li className="drawer__item">Log In</li>
                  </Link>
                  <Link to="/signup">
                    <li className="drawer__item">Sign Up</li>
                  </Link>
                </>
              )}
              {props.currentUser && (
                <>
                  <Link className="drawer__item" to="/">
                    Home
                  </Link>

                  <Link className="drawer__item" to="/leagues">
                    Leagues
                  </Link>

                  <Link className="drawer__item" to="/" onClick={handleLogout}>
                    Log Out
                  </Link>
                </>
              )}
            </ul>
          </div>
        </Drawer>

        <ul>
          {!props.currentUser && (
            <>
              <Link className="nav-link" to="/login">
                <li className="nav-item button__logout">Log In</li>
              </Link>
              <Link className="nav-link" to="/signup">
                <li className="nav-item button__logout">Sign Up</li>
              </Link>
            </>
          )}
          {props.currentUser && (
            <>
              <Link className="nav-link" to="/" onClick={handleLogout}>
                <li className="nav-item button__logout">Log Out</li>
              </Link>
              <li className="nav-item">
                <Link className="nav-link" to="/leagues">
                  Leagues
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="nav__hamburger">
          <MenuIcon
            onClick={toggleDrawer("right", true)}
            style={{ color: "#FFFFFF" }}
            fontSize="large"
          />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
