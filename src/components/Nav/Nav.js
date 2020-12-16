import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/SwipeableDrawer";
import "./Nav.css";
import { useAuth } from "../../contexts/AuthContext";

function Nav() {
  const [isExpanded, setIsExpanded] = useState(false);

  const { currentUser } = useAuth();

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

  return (
    <nav className="">
      <div className={`nav`}>
        <Link className="nav-logo" to="/">
          Fantasy Drag Race
        </Link>

        <Drawer
          anchor="right"
          open={isExpanded}
          onClose={toggleDrawer("right", false)}
        >
          <div className="drawer">
            <ul className="drawer__list">
              <Link to="/" className="drawer__item">
                Home
              </Link>
              <Link to="/leagues" className="drawer__item">
                Leagues
              </Link>
            </ul>
          </div>
        </Drawer>

        {/* <MenuIcon className="nav-hamburger" onClick={openNav}></MenuIcon> */}
        <ul>
          {!currentUser && (
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </li>
          )}
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
