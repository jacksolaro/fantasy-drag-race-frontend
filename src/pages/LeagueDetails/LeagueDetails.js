import React from "react";
import { useParams } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import leaguePageBkg from "../../assets/images/bkg-3.jpg";

function LeagueDetails() {
  let params = useParams();
  return (
    <div>
      {/* TODO: redirect or show 404 if there is no league */}
      <Jumbotron
        image={leaguePageBkg}
        height="300"
        headline="YOUR LEAGUES"
      ></Jumbotron>
      <h1>League Details: {params.id}</h1>
    </div>
  );
}

export default LeagueDetails;
