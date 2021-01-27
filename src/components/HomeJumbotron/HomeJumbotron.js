import { Typography } from "@material-ui/core";
import React from "react";
import "./HomeJumbotron.css";
import homeBkg from "../../assets/images/bkg-1.png";

function HomeJumbotron(props) {
  return (
    <div>
      <div className="homeJumbotron__main">
        <div className="homeJumbotron__content">
          <h1 className="homeJumbotron__title">
            <strong>{props.headline}</strong>
          </h1>
          {/* <img className="homeJumbotron__logo" src={props.logo}></img> */}
          <p className="homeJumbotron__subtitle">{props.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default HomeJumbotron;
