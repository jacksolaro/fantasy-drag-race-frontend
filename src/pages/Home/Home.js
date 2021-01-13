import React from "react";
import "./Home.css";
import HomeJumbotron from "../../components/HomeJumbotron/HomeJumbotron";
import homeBkg from "../../assets/images/bkg-1.png";
import derbyLogo from "../../assets/images/derby_logo_pink-01.png";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ShowCard from "../../components/ShowCard/ShowCard";
import { Grid } from "@material-ui/core";
import HomeInstructions from "../../components/HomeInstructions/HomeInstructions";

function Home() {
  return (
    <div>
      <HomeJumbotron
        image={homeBkg}
        headline="Welcome to Derby"
        subtitle="Competitive, Fantasy-Style TV Bracket Play"
        height="400"
        logo={derbyLogo}
      ></HomeJumbotron>
      <Container maxWidth="lg">
        <Typography gutterBottom variant="h4" component="h2" align="center">
          CURRENT & UPCOMING SHOWS
        </Typography>
        <Typography gutterBottom variant="h6" component="h6" align="center">
          Are you ready to get off to the races? Check out the shows below to
          create or join a league!
        </Typography>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={12} md={6} align="center">
            <ShowCard
              title="RuPaul's Drag Race"
              season="US Season 13"
              isActive={true}
              posterIMG="https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/seasonPosters%2FRDRUS13.jpg?alt=media&token=5345c2a5-eedc-41f1-9685-084580638900"
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
        <HomeInstructions></HomeInstructions>
      </Container>
    </div>
  );
}

export default Home;
