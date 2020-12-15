import React from "react";
import "./Home.css";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import homeBkg from "../../assets/images/bkg-1.png";
import derbyLogo from "../../assets/images/derby_logo_pink-01.png";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ShowCard from "../../components/ShowCard/ShowCard";

function Home() {
  return (
    <div>
      <Jumbotron
        image={homeBkg}
        headline="- Welcome to -"
        subtitle="Competitive, Fantasy-Style TV Bracket Play"
        height="700"
        logo={derbyLogo}
      ></Jumbotron>
      <Container maxWidth="lg">
        <Typography gutterBottom variant="h4" component="h2" align="center">
          CURRENT & UPCOMING
        </Typography>
        <div>
          <ShowCard />
        </div>
      </Container>
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
