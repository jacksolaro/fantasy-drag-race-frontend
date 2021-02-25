import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import leaguePageBkg from "../../assets/images/bkg-3.jpg";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase.js";
import { Link } from "react-router-dom";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import "./Leagues.css";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import GroupTwoToneIcon from "@material-ui/icons/GroupTwoTone";

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
        height="400"
        headline="LEAGUES"
      ></Jumbotron>
      <Container>
        <h1>YOUR LEAGUES</h1>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} align="left">
            <p>
              Below are the leagues you are a part of! Don't see any leagues? Go
              ahead and create or join one!
            </p>
          </Grid>
          <Grid item xs={12} md={6} align="right">
            {/* <TextField
              id="joinLeague"
              label=""
              value="Enter League ID"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <Button variant="contained" style={{ color: "#0099FF" }}>
                    JOIN
                  </Button>
                ),
              }}
            /> */}
            <Link to="/createLeague" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#0099FF", color: "white" }}
              >
                + CREATE A LEAGUE
              </Button>
            </Link>

            {/* <div class="search">
              <input type="text" class="searchTerm" placeholder="League ID" />
              <button type="submit" class="searchButton">
                JOIN
              </button>
            </div> */}
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} align="center">
            <Link to="/joinleague" style={{ textDecoration: "none" }}>
              <div
                className="Leagues__Card Leagues__CreateLeagueCard"
                style={{ backgroundColor: "#0099ff" }}
              >
                <div>
                  <AddCircleOutlineRoundedIcon
                    className="Leagues__Icon"
                    style={{ fontSize: 100, color: "white" }}
                  ></AddCircleOutlineRoundedIcon>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    align="center"
                  >
                    <Box fontWeight="fontWeightBold" m={1}>
                      JOIN A LEAGUE
                    </Box>
                  </Typography>
                </div>
              </div>
            </Link>
          </Grid>
          {leagues.map((league, index) => (
            <Grid item xs={12} md={4} align="center" key={index}>
              <Link
                to={`/leagues/${league.id}`}
                style={{ textDecoration: "none", color: "#00497a" }}
              >
                <div className="Leagues__Card">
                  <div>
                    <GroupTwoToneIcon
                      className="Leagues__Icon"
                      style={{ fontSize: 100 }}
                    ></GroupTwoToneIcon>
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
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h6"
                      align="center"
                    >
                      <Box fontWeight="" m={1}>
                        {league.data().showDetails
                          ? `
            ${league.data().showDetails.showTitle} 
           ${league.data().showDetails.showCountry}, Season 
           ${league.data().showDetails.showSeasonNum}`
                          : "LOADING"}
                      </Box>
                    </Typography>
                  </div>
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
