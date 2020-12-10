import React from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import leaguePageBkg from "../../assets/images/bkg-3.jpg";

function Leagues() {
  return (
    <div>
      <Jumbotron
        image={leaguePageBkg}
        height="300"
        headline="YOUR LEAGUES"
      ></Jumbotron>
      <h1>YOUR LEAGUES</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </p>
      <h2>SAMPLE BRACKET</h2>
      <h2>SAMPLE BRACKET</h2>
      <h2>SAMPLE BRACKET</h2>
    </div>
  );
}

export default Leagues;
