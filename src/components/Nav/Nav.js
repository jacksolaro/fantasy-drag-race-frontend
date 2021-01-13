import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/SwipeableDrawer";
import { useHistory } from "react-router-dom";
import "./Nav.css";
import derbyLogo from "../../assets/images/derby_logo_white-01.png";

import { useAuth } from "../../contexts/AuthContext";

function Nav() {
  const { currentUser, logout } = useAuth();
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
      history.pushState("/login");
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
          onClose={toggleDrawer("right", false)}
        >
          <div className="drawer">
            <ul className="drawer__list">
              <Link to="/" className="drawer__item">
                Shows
              </Link>
              <Link to="/leagues" className="drawer__item">
                Leagues
              </Link>
            </ul>
          </div>
        </Drawer>

        <ul>
          {!currentUser && (
            <>
              <Link className="nav-link" to="/login">
                <li className="nav-item button__logout">Log In</li>
              </Link>
              <Link className="nav-link" to="/signup">
                <li className="nav-item button__logout">Sign Up</li>
              </Link>
            </>
          )}
          {currentUser && (
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
                  Shows
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="nav__hamburger">
          <MenuIcon
            onClick={toggleDrawer("right", true)}
            style={{ color: "#FFFFFF" }}
          />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
