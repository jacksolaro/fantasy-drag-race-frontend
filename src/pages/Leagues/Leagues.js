import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import leaguePageBkg from "../../assets/images/bkg-3.jpg";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase.js";
import { Link } from "react-router-dom";
import { Box, Card, Container, Grid, Typography } from "@material-ui/core";
import "./Leagues.css";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import AssignmentTwoToneIcon from "@material-ui/icons/AssignmentTwoTone";

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
    <div className="Leagues__Wrapper">
      <Jumbotron
        image={leaguePageBkg}
        height="300"
        headline="YOUR LEAGUES"
      ></Jumbotron>
      <Container>
        <h1>YOUR LEAGUES</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </p>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3} align="center">
            <div className="Leagues__Card">
              <AddCircleOutlineRoundedIcon
                className="Leagues__Icon"
                style={{ fontSize: 100 }}
              ></AddCircleOutlineRoundedIcon>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                align="center"
              >
                <Box fontWeight="fontWeightBold" m={1}>
                  CREATE A LEAGUE
                </Box>
              </Typography>
            </div>
          </Grid>
          {leagues.map((league) => (
            <Grid item xs={12} md={3} align="center">
              <Link to={`/leagues/${league.id}`}>
                <div className="Leagues__Card">
                  <AssignmentTwoToneIcon
                    className="Leagues__Icon"
                    style={{ fontSize: 100 }}
                  ></AssignmentTwoToneIcon>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    align="center"
                  >
                    <Box fontWeight="fontWeightBold" m={1}>
                      {league.data().leagueName}
                    </Box>
                  </Typography>
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Leagues;
