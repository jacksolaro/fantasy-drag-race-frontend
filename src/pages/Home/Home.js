import React from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import homeBkg from "../../assets/images/bkg-1.png";
import { Grid, Button } from "@material-ui/core/";

function Home() {
  return (
    <div>
      <Jumbotron
        image={homeBkg}
        headline="Welcome to Derby"
        subtitle="A Competitive Fantasy Style TV Bracket"
      ></Jumbotron>
      <Grid container spacing={0} justify="center" alignItems="center">
        <Grid item xs={6} align="center">
          <Button
            variant="contained"
            color="primary"
            href="/createleague"
            target=""
            className="leagueBtn"
          >
            Create A League
          </Button>
        </Grid>
        <Grid item xs={6} align="center">
          <Button
            variant="contained"
            color="secondary"
            href="/joinleague"
            target=""
            className="leagueBtn"
          >
            Join a League
          </Button>
        </Grid>
      </Grid>
      <h2>HOW DOES DERBY WORK?</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </p>
      <h2>INSTRUCTIONS</h2>
    </div>
  );
}

export default Home;
