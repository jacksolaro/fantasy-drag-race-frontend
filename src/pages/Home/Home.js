import React from "react";
import "./Home.css";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import homeBkg from "../../assets/images/bkg-1.png";
import derbyLogo from "../../assets/images/derby_logo_pink-01.png";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ShowCard from "../../components/ShowCard/ShowCard";
import { Grid } from "@material-ui/core";

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
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={12} md={6} align="center">
            <ShowCard
              title="RuPaul's Drag Race"
              season="US Season 13"
              isActive={true}
              posterIMG="https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/seasonPosters%2FRDRUS13.jpg?alt=media&token=4ab72254-e40e-4dd9-8873-00bb81832269"
            />
          </Grid>
          <Grid item xs={12} md={6} align="center">
            <ShowCard
              title="RuPaul's Drag Race"
              season="UK Season 2"
              isActive={false}
              posterIMG="https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/seasonPosters%2FRDRUK1.jpg?alt=media&token=e494bd19-4eba-4aa7-bfb0-a68bfb3dd38b"
            />
          </Grid>
        </Grid>
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
