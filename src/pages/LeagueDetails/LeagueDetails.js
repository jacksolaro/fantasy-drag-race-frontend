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

function LeagueDetails() {
  let params = useParams();
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [leagueData, setLeagueData] = useState([{}]);
  const [resultsData, setResultsData] = useState([{}]);
  const [pickData, setPickData] = useState([{}]);
  const [page, setPage] = React.useState(1);
  const [currTime, setCurrTime] = useState();

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // RETRIEVE THE LEAGUE DATA (NAME, MEMBERS, SHOW ID, RESULTS, ETC)
  useEffect(() => {
    let mounted = true;
    db.collection("leagues")
      .doc(params.id)
      .get()
      .then((doc) => {
        console.log("LEAGUE DATA", doc.data());
        setLeagueData(doc.data());
        db.collection("shows")
          .doc(doc.data().showID)
          .get()
          .then((doc) => {
            if (mounted) {
              console.log("RESULTS DATA", doc.data().results);
              setResultsData(doc.data().results);
            }
            // console.log(resultsData.episode1.airDate);
          });
      })
      .catch((error) => console.log("Error", error));

    return function cleanup() {
      mounted = false;
    };
  }, []);

  // RETRIEVE ALL PICK DATA FOR USERS IN LEAGUE
  useEffect(() => {
    setLoading(true);
    let mounted = true;
    let pickDataArr = [];
    db.collection("leagues")
      .doc(params.id)
      .collection("picks")
      .get()
      .then(function (querySnapshot) {
        if (mounted) {
          setLoading(false);
          querySnapshot.forEach(function (doc) {
            pickDataArr.push(doc.data());
            console.log("DOC DATA", doc.data());
          });
          setPickData(pickDataArr);
        }
      })
      .catch((error) => console.log("Error", error));

    return function cleanup() {
      mounted = false;
    };
  }, []);

  // // RETRIEVE CURRENT DATE AND TIME
  // useEffect(() => {
  //   setInterval(() => {
  //     setCurrTime(Date().toLocaleString());
  //   }, 1000);
  // });

  // TAKES ALL THE USERS EPISODE ROSTERS, RENDERS THEM ON PAGE AND DISPLAYS POINTS
  function renderEpisodePicks(episodeNum) {
    // If page is loading, display Loading
    if (loading) {
      return <div className="episodePaginationNoResultBox">LOADING</div>;
      // If not loading, do the following
    } else {
      if (pickData[0].picks !== undefined) {
        // retrieve user data
        const userData = JSON.parse(JSON.stringify(pickData)).filter(
          (user) => user.userID === currentUser.uid
        );

        // set episodePicks to the array of the users picks for that episode
        const episodePicks = JSON.parse(
          JSON.stringify(userData[0].picks)
        ).filter((list) => list.category === `episode${episodeNum}`);

        // If episode picks is not empty, render the episode picks
        if (episodePicks.length > 0) {
          return (
            <TableContainer>
              {/* <p>{resultsData[`episode${episodeNum}`]["airDate"]}</p> */}
              <Table aria-label="simple table" size="small">
                <TableHead>
                  <TableRow key="episodeHeaders">
                    <TableCell>Category</TableCell>
                    <TableCell>Queen Image</TableCell>
                    <TableCell>Your Pick</TableCell>
                    <TableCell>Points Awarded</TableCell>
                    <TableCell>Points Possible</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {episodePicks[0].picks.map((pick, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {pick.pointCategory}
                      </TableCell>
                      <TableCell>
                        <img
                          className={
                            resultsData[`${episodePicks[0].category}`]
                              ? resultsData[`${episodePicks[0].category}`][
                                  `${pick.id}`
                                ]
                                ? resultsData[`${episodePicks[0].category}`][
                                    `${pick.id}`
                                  ].includes(pick.queenID)
                                  ? "leagueDetails__rosterIMG2"
                                  : "leagueDetails__rosterIMG"
                                : "leagueDetails__rosterIMG"
                              : "leagueDetails__rosterIMG"
                          }
                          src={pick.queenIMG}
                        ></img>
                      </TableCell>
                      <TableCell>{pick.queenName}</TableCell>
                      <TableCell>
                        {resultsData[`${episodePicks[0].category}`]
                          ? resultsData[`${episodePicks[0].category}`][
                              `${pick.id}`
                            ]
                            ? resultsData[`${episodePicks[0].category}`][
                                `${pick.id}`
                              ].includes(pick.queenID)
                              ? pick.pointValue
                              : 0
                            : "?"
                          : "?"}
                      </TableCell>
                      <TableCell>{pick.pointValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
        } else {
          if (resultsData) {
            if (resultsData[`episode${page}`]) {
              if (
                resultsData[`episode${page}`]["airDate"]["seconds"] <
                new Date().getTime()
              ) {
                return (
                  <p>
                    This episode has passed. You may no longer make selections
                    for this episode.
                  </p>
                );
              } else {
                return (
                  <div className="episodePaginationNoResultBox">
                    <div>
                      <AddCircleOutlineRoundedIcon />
                    </div>
                    <Link
                      to={`/leagues/${params.id}/selectepisoderoster/${page}`}
                    >
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
                  <Link
                    to={`/leagues/${params.id}/selectepisoderoster/${page}`}
                  >
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
                <Link to={`/leagues/${params.id}/selectepisoderoster/${page}`}>
                  &ensp; Select Roster for Episode {page}
                </Link>
              </div>
            );
          }
        }
      } else {
        if (resultsData) {
          if (resultsData[`episode${page}`]) {
            if (
              resultsData[`episode${page}`]["airDate"]["seconds"] <
              new Date().getTime()
            ) {
              return (
                <p>
                  This episode has passed. You may no longer make selections for
                  this episode.
                </p>
              );
            } else {
              return (
                <div className="episodePaginationNoResultBox">
                  <div>
                    <AddCircleOutlineRoundedIcon />
                  </div>
                  <Link
                    to={`/leagues/${params.id}/selectepisoderoster/${page}`}
                  >
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
              <Link to={`/leagues/${params.id}/selectepisoderoster/${page}`}>
                &ensp; Select Roster for Episode {page}
              </Link>
            </div>
          );
        }
      }
    }
  }

  // TAKES ALL THE USERS SEASON ROSTERS, RENDERS THEM ON PAGE AND DISPLAYS POINTS
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
                resultsData["season"]
                  ? resultsData["season"][`${pick.id}`].includes(pick.queenID)
                    ? "leagueDetails__rosterIMG2"
                    : "leagueDetails__rosterIMG"
                  : "leagueDetails__rosterIMG"
              }
              item
              xs={12}
              md={3}
              key={pick.queenID}
            >
              <Typography align="center" variant="h6">
                {pick.pointCategory}
              </Typography>
              <Typography align="center" variant="subtitle2">
                {pick.pointValue} POINTS POSSIBLE
              </Typography>
              <img
                className={
                  resultsData[`${seasonPicks[0].category}`]
                    ? resultsData[`${seasonPicks[0].category}`][`${pick.id}`]
                      ? resultsData["season"][`${pick.id}`].includes(
                          pick.queenID
                        )
                        ? "leagueDetails__rosterIMG2"
                        : "leagueDetails__rosterIMG"
                      : "leagueDetails__rosterIMG"
                    : "leagueDetails__rosterIMG"
                }
                src={pick.queenIMG}
              ></img>
              <p>{pick.queenName}</p>
              <p className="pointsBadge">
                {resultsData[`${seasonPicks[0].category}`]
                  ? resultsData[`${seasonPicks[0].category}`][`${pick.id}`]
                    ? resultsData["season"][`${pick.id}`].includes(pick.queenID)
                      ? pick.pointValue
                      : 0
                    : "?"
                  : "?"}
              </p>
            </Grid>
          ));
        } else {
          if (resultsData) {
            if (resultsData[`episode1`]) {
              if (
                resultsData[`episode1`]["airDate"]["seconds"] <
                new Date().getTime()
              ) {
                return (
                  <p>
                    Sorry this season has already begun. You may no longer make
                    season selections
                  </p>
                );
              } else {
                return (
                  <div className="episodePaginationNoResultBox">
                    <div>
                      <AddCircleOutlineRoundedIcon />
                    </div>
                    <Link to={`/leagues/${params.id}/selectseasonroster/`}>
                      &ensp; Select Roster for Season
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
                  <Link to={`/leagues/${params.id}/selectseasonroster/`}>
                    &ensp; Select Roster for Episode
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
                <Link to={`/leagues/${params.id}/selectseasonroster/`}>
                  &ensp; Select Roster for Season
                </Link>
              </div>
            );
          }
        }
      } else {
        if (resultsData) {
          if (resultsData[`episode1`]) {
            if (
              resultsData[`episode1`]["airDate"]["seconds"] <
              new Date().getTime()
            ) {
              return (
                <p>
                  Sorry this season has already begun. You may no longer make
                  season selections
                </p>
              );
            } else {
              return (
                <div className="episodePaginationNoResultBox">
                  <div>
                    <AddCircleOutlineRoundedIcon />
                  </div>
                  <Link to={`/leagues/${params.id}/selectseasonroster/`}>
                    &ensp; Select Roster for Season
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
                <Link to={`/leagues/${params.id}/selectseasonroster/`}>
                  &ensp; Select Roster for Season
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
              <Link to={`/leagues/${params.id}/selectseasonroster/`}>
                &ensp; Select Roster for Season
              </Link>
            </div>
          );
        }
      }
    }
  }

  // CALCULATES SCORES, SORTS THEM, AND RENDERS THEM ON PAGE
  function renderScores() {
    let scores = [];
    let episodeSum, totalSum;

    pickData.map((user) => {
      totalSum = 0;
      if (user.picks) {
        user.picks.map((scoreEvent) => {
          scoreEvent.picks.map((pick) => {
            if (resultsData[`${scoreEvent.category}`]) {
              if (resultsData[`${scoreEvent.category}`][`${pick.id}`]) {
                if (
                  resultsData[`${scoreEvent.category}`][`${pick.id}`].includes(
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
              <TableRow key="scoreHeaders">
                <TableCell>#</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell align="right">SCORE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores
                .sort((a, b) => (a.score < b.score ? 1 : -1))
                .map((row, index) => (
                  <TableRow key={index}>
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
                  <Typography align="center" variant="subtitle1">
                    EPISODE AIR DATE:
                  </Typography>
                  <p>
                    {resultsData
                      ? resultsData[`episode${page}`]
                        ? new Date(
                            resultsData[`episode${page}`]["airDate"][
                              "seconds"
                            ] * 1000
                          ).toLocaleDateString("en-us")
                        : "NO INFO ON AIR DATE YET"
                      : "NO INFO ON AIR DATE YET"}
                  </p>

                  {/* <p>
                    {resultsData
                      ? resultsData[`episode${page}`]
                        ? resultsData[`episode${page}`]["airDate"]["seconds"] <
                          new Date().getTime()
                          ? "LESS"
                          : "GREATER"
                        : "NO INFO ON AIR DATE YET"
                      : "NO INFO ON AIR DATE YET"}
                  </p> */}
                  <Grid container container align="center" justify="center">
                    {renderEpisodePicks(page)}
                  </Grid>
                </div>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default LeagueDetails;
