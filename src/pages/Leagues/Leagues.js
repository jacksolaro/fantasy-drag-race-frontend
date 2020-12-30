import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import leaguePageBkg from "../../assets/images/bkg-3.jpg";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase.js";
import { Link } from "react-router-dom";

function Leagues() {
  const { currentUser } = useAuth();
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    db.collection("leagues")
      .where("members", "array-contains", currentUser.uid)
      .onSnapshot((snapshot) => {
        setLeagues(snapshot.docs.map((doc) => doc));
      });
  }, []);

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
      {leagues.map((league) => (
        <Link to={`/leagues/${league.id}`}>
          <div>{league.data().leagueName}</div>
        </Link>
      ))}
    </div>
  );
}

export default Leagues;
