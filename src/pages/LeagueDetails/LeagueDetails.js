import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import leaguePageBkg from "../../assets/images/bkg-3.jpg";
import { useAuth } from "../../contexts/AuthContext";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { Container, Grid, Typography } from "@material-ui/core";
import { db } from "../../firebase.js";
import firebase from "firebase";
import "./leagueDetails.css";
import { Pagination } from "@material-ui/lab";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const RESULTS = {
  season: {
    seasonWinner: [""],
    missCongeniality: ["G5hMj6BwbtsnqTG6XB9U"],
    firstEliminated: ["G5hMj6BwbtsnqTG6XB9U"],
  },
  episode1: {
    episodeWinner: ["G5hMj6BwbtsnqTG6XB9U"],
    maxiChallengeWinner: ["G5hMj6BwbtsnqTG6XB9U"],
    miniChallengeWinner: ["JOxpAR3tXdm5qOnDxIoq"],
    eliminated: ["G5qTG6XB9U", "G5hMj6BwbtsnqTG6XB9U"],
  },
};

function LeagueDetails() {
  let params = useParams();
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [leagueData, setLeagueData] = useState([{}]);
  const [pickData, setPickData] = useState([{}]);
  const [page, setPage] = React.useState(1);
  const [currTime, setCurrTime] = useState();

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    db.collection("leagues")
      .doc(params.id)
      .get()
      .then((doc) => {
        console.log(doc.data());
        setLeagueData(doc.data());
      })
      .catch((error) => console.log("Error", error));
  }, []);

  useEffect(() => {
    setLoading(true);
    let pickDataArr = [];
    db.collection("leagues")
      .doc(params.id)
      .collection("picks")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          pickDataArr.push(doc.data());
          console.log("DOC DATA", doc.data());
        });
        setPickData(pickDataArr);
        setLoading(false);
      })
      .catch((error) => console.log("Error", error));
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     setCurrTime(Date().toLocaleString());
  //   }, 12000);
  // });

  function renderEpisodePicks(episodeNum) {
    // If page is loading, display Loading
    if (loading) {
      return <div className="episodePaginationNoResultBox">LOADING</div>;
      // If not loading, do the following
    } else {
      // retrieve user data
      const userData = JSON.parse(JSON.stringify(pickData)).filter(
        (user) => user.userID === currentUser.uid
      );

      if (pickData[0].picks !== undefined) {
        // set episodePicks to the array of the users picks for that episode
        const episodePicks = JSON.parse(
          JSON.stringify(userData[0].picks)
        ).filter((list) => list.category === `episode${episodeNum}`);
        if (episodePicks.length > 0) {
          return (
            <TableContainer>
              <Table aria-label="simple table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Queen Image</TableCell>
                    <TableCell>Your Pick</TableCell>
                    <TableCell>Points Awarded</TableCell>
                    <TableCell>Points Possible</TableCell>
                  </TableRow>
                </TableHead>
                {episodePicks[0].picks.map((pick) => (
                  <TableBody>
                    <TableRow key={pick.queenID}>
                      <TableCell component="th" scope="row">
                        {pick.pointCategory}
                      </TableCell>
                      <TableCell>
                        <img
                          className={
                            RESULTS[`${episodePicks[0].category}`][`${pick.id}`]
                              ? RESULTS[`${episodePicks[0].category}`][
                                  `${pick.id}`
                                ].includes(pick.queenID)
                                ? "leagueDetails__rosterIMG2"
                                : "leagueDetails__rosterIMG"
                              : "leagueDetails__rosterIMG"
                          }
                          src={pick.queenIMG}
                        ></img>
                        {/* <img
                          className={
                            pick.result === "correct"
                              ? "leagueDetails__rosterIMG2"
                              : "leagueDetails__rosterIMG"
                          }
                          src={pick.queenIMG}
                        ></img> */}
                      </TableCell>
                      <TableCell>{pick.queenName}</TableCell>
                      <TableCell>
                        {RESULTS[`${episodePicks[0].category}`][`${pick.id}`]
                          ? RESULTS[`${episodePicks[0].category}`][
                              `${pick.id}`
                            ].includes(pick.queenID)
                            ? pick.pointValue
                            : 0
                          : "?"}
                      </TableCell>
                      <TableCell>{pick.pointValue}</TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
          );
        } else {
          return (
            <div className="episodePaginationNoResultBox">
              <div>
                <AddCircleOutlineRoundedIcon />
              </div>
              <Link to={`/leagues/${params.id}/selectepisoderoster/${page}`}>
                &ensp; Select Roster for Episode {page}
              </Link>
            </div>
          );
        }
      } else {
        return (
          <div className="episodePaginationNoResultBox">
            <div>
              <AddCircleOutlineRoundedIcon />
            </div>
            <p>&ensp; Select Roster for Episode {page}</p>
          </div>
        );
      }
    }
  }

  function renderSeasonPicks() {
    if (loading) {
      return <div className="episodePaginationNoResultBox">LOADING</div>;
    } else {
      console.log("pickData", pickData);
      if (pickData[0].picks !== undefined) {
        const userData = JSON.parse(JSON.stringify(pickData)).filter(
          (user) => user.userID === currentUser.uid
        );

        const seasonPicks = JSON.parse(
          JSON.stringify(userData[0].picks)
        ).filter((list) => list.category === `season`);

        if (seasonPicks.length > 0) {
          return seasonPicks[0].picks.map((pick) => (
            <Grid
              className={
                RESULTS["season"][`${pick.id}`].includes(pick.queenID)
                  ? "leagueDetails__rosterIMG2"
                  : "leagueDetails__rosterIMG"
              }
              item
              xs={12}
              md={3}
            >
              <Typography align="center" variant="h6">
                {pick.pointCategory}
              </Typography>
              <Typography align="center" variant="subtitle2">
                {pick.pointValue} POINTS POSSIBLE
              </Typography>
              <img
                className={
                  RESULTS[`${seasonPicks[0].category}`][`${pick.id}`]
                    ? RESULTS["season"][`${pick.id}`].includes(pick.queenID)
                      ? "leagueDetails__rosterIMG2"
                      : "leagueDetails__rosterIMG"
                    : "leagueDetails__rosterIMG"
                }
                src={pick.queenIMG}
              ></img>
              <p>{pick.queenName}</p>
              <p className="pointsBadge">
                {RESULTS[`${seasonPicks[0].category}`][`${pick.id}`]
                  ? RESULTS["season"][`${pick.id}`].includes(pick.queenID)
                    ? pick.pointValue
                    : 0
                  : "?"}
              </p>
            </Grid>
          ));
        } else {
          return (
            <div className="episodePaginationNoResultBox">
              Select Season Picks
            </div>
          );
        }
      } else {
        return (
          <div className="episodePaginationNoResultBox">
            Select Season Picks
          </div>
        );
      }
    }
  }

  function renderScores() {
    let scores = [];
    let episodeSum, totalSum;

    pickData.map((user) => {
      totalSum = 0;
      if (user.picks) {
        user.picks.map((scoreEvent) => {
          scoreEvent.picks.map((pick) => {
            console.log("Score Event", scoreEvent);
            console.log("pick", pick);
            if (RESULTS[`${scoreEvent.category}`]) {
              if (RESULTS[`${scoreEvent.category}`][`${pick.id}`]) {
                if (
                  RESULTS[`${scoreEvent.category}`][`${pick.id}`].includes(
                    pick.queenID
                  )
                ) {
                  totalSum += pick.pointValue;
                }
              } else {
              }
            }
          });
        });
      }
      scores.push({
        userID: user.userID,
        username: user.username,
        score: totalSum,
      });
    });

    if (scores) {
      return (
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell align="right">SCORE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores
                .sort((a, b) => (a.score < b.score ? 1 : -1))
                .map((row, index) => (
                  <TableRow key={row.userID}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h5">{row.score}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else {
      return <p>LOADING</p>;
    }
  }

  return (
    <div className="leagueDetails__wrapper">
      {/* TODO: redirect or show 404 if there is no league */}
      <div className="leagueDetails__header">
        <h1>{leagueData.leagueName}</h1>
        {/* <h1>{currTime}</h1> */}
        <p>RuPaul's Drag Race, Season 13</p>
        <p>LEAGUE CODE: {params.id}</p>
      </div>

      <div className="leagueDetails__dashboard">
        {/* dashboard */}
        <Grid container container align="center" justify="center">
          <Grid item xs={12} md={3}>
            <div className="leagueDetails__leaderboard">
              <Grid item xs={12} md={12}>
                <Typography align="center" variant="h4">
                  LEADERBOARD
                </Typography>
                {renderScores()}
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className="leagueDetails__leaderboard">
              <Typography align="center" variant="h5">
                SEASON PICKS
              </Typography>
              <Grid container align="center" justify="center">
                {renderSeasonPicks()}
              </Grid>
            </div>
            <br></br>
            <div className="leagueDetails__leaderboard">
              <Grid item xs={12} md={12}>
                <div>
                  <Typography align="center" variant="h5">
                    EPISODE PICKS
                  </Typography>
                  <Pagination
                    className="episodePagination"
                    page={page}
                    onChange={handlePageChange}
                    count={12}
                    defaultPage={1}
                    boundaryCount={1}
                    color="primary"
                  />
                  <Grid container container align="center" justify="center">
                    {renderEpisodePicks(page)}
                  </Grid>
                </div>
              </Grid>
            </div>
          </Grid>
        </Grid>

        {/* ACTIONS */}
        <Link to={`/leagues/${params.id}/selectseasonroster`}>
          Select Season Roster
        </Link>
        <Link to={`/leagues/${params.id}/selectepisoderoster`}>
          Select Episode Roster
        </Link>
      </div>
    </div>
  );
}

export default LeagueDetails;
