import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { db } from "../../firebase.js";
import "./leagueDetails.css";
import { Pagination } from "@material-ui/lab";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

function LeagueDetails(props) {
  let params = useParams();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [leagueData, setLeagueData] = useState([{}]);
  const [resultsData, setResultsData] = useState([{}]);
  const [pickData, setPickData] = useState([]);
  const [page, setPage] = React.useState(1);

  // Changing Episode Pages
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (this != undefined) {
      console.log("defined");
    }
    console.log("undefined");
  });

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
          .doc(doc.data().showDetails.showID)
          .get()
          .then((doc) => {
            if (mounted) {
              console.log("RESULTS DATA", doc.data().results);
              setResultsData(doc.data().results);
            }
          });
      })
      .catch((error) => console.log("Error", error));

    return function cleanup() {
      mounted = false;
    };
  }, []);

  // RETRIEVE ALL PICK DATA FOR USERS IN LEAGUE
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    let mounted = true;
    let pickDataArr = [];
    // setPickData([]);
    // db.collection("leagues")
    //   .doc(params.id)
    //   .collection("picks")
    //   .get()
    //   .then(function (querySnapshot) {
    //     if (mounted) {
    //       querySnapshot.forEach(function (doc) {
    //         pickDataArr.push(doc.data());
    //         console.log("DOC DATA", doc.data());
    //       });
    //       setPickData(pickDataArr);
    //       setLoading(false);
    //     }
    //   })
    //   .catch((error) => {
    //     setPickData([]);
    //     setLoading(false);
    //     console.log("Error", error);
    //   });

    db.collection("leagues")
      .doc(params.id)
      .collection("picks")
      .get()
      .then((docsArr) => {
        if (mounted) {
          console.log("DOCS", docsArr.docs);
          docsArr.docs.map((doc) => {
            console.log("DOC", doc.data());
            pickDataArr.push(doc.data());
          });
        }
        setPickData(pickDataArr);
        setLoading(false);
      })
      .catch((error) => {
        setPickData([]);
        setLoading(false);
        console.log("Error", error);
      });

    return function cleanup() {
      mounted = false;
    };
  }, []);

  // TAKES ALL THE USERS EPISODE ROSTERS, RENDERS THEM ON PAGE AND DISPLAYS POINTS
  function renderEpisodePicks(episodeNum) {
    if (loading) {
      return <div className="episodePaginationNoResultBox">LOADING</div>;
    } else {
      console.log("renderEpisodePicksFunction - PickData", pickData);

      const userData = JSON.parse(JSON.stringify(pickData)).filter(
        (user) => user.userID === currentUser.uid
      );

      console.log("renderEpisodePicksFunction - UserData", userData);

      if (userData[0]?.picks !== undefined) {
        const episodePicks = JSON.parse(
          JSON.stringify(userData[0].picks)
        ).filter((list) => list.category === `episode${episodeNum}`);
        console.log("renderEpisodePicksFunction - episodePicks", episodePicks);

        if (episodePicks[0]?.picks !== undefined) {
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
                          alt={`${pick.queenName}`}
                        ></img>
                      </TableCell>
                      <TableCell>{pick.queenName}</TableCell>
                      <TableCell>
                        <p className="">
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
                        </p>
                      </TableCell>
                      <TableCell>{pick.pointValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
        }
      }
      // if the season has already started, return notice
      if (resultsData?.[`episode${page}`]?.airDate?.seconds !== undefined) {
        if (
          resultsData[`episode${page}`]["airDate"]["seconds"] * 1000 <
          new Date().getTime()
        ) {
          return (
            <p>
              This episode has passed. You may no longer make selections for
              this episode.
            </p>
          );
        }
      }

      return (
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to={`/leagues/${params.id}/selectepisoderoster/${page}`}
        >
          <div className="episodePaginationNoResultBox">
            <div>
              <AddCircleOutlineRoundedIcon />
            </div>
            &ensp; Select Roster for Episode {page}
          </div>
        </Link>
      );
    }
  }

  // TAKES THE USER'S SEASON ROSTER, RENDERS THEM ON PAGE AND DISPLAYS POINTS
  function renderSeasonPicks() {
    if (loading) {
      return <div className="episodePaginationNoResultBox">LOADING</div>;
    } else {
      console.log("renderEpisodePicksFunction - PickData", pickData);

      const userData = JSON.parse(JSON.stringify(pickData)).filter(
        (user) => user.userID === currentUser.uid
      );

      console.log("renderEpisodePicksFunction - UserData", userData);

      if (userData[0]?.picks !== undefined) {
        const seasonPicks = JSON.parse(
          JSON.stringify(userData[0].picks)
        ).filter((list) => list.category === `season`);
        console.log("renderEpisodePicksFunction - seasonPicks", seasonPicks);

        if (seasonPicks[0]?.picks !== undefined) {
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
                alt={`${pick.queenName}`}
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
        }
      }

      // if the season has already started, return notice
      if (resultsData?.episode1?.airDate?.seconds !== undefined) {
        if (
          resultsData[`episode1`]["airDate"]["seconds"] * 1000 <
          new Date().getTime()
        ) {
          return (
            <p>
              Sorry this season has already begun. You may no longer make season
              selections
            </p>
          );
        }
      }

      return (
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to={`/leagues/${params.id}/selectseasonroster/`}
        >
          <div className="episodePaginationNoResultBox">
            <div>
              <AddCircleOutlineRoundedIcon />
            </div>
            &ensp; Select Roster for Season {page}
          </div>
        </Link>
      );
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

        <p>
          {leagueData.showDetails
            ? `
            ${leagueData.showDetails.showTitle} 
           ${leagueData.showDetails.showCountry}, Season 
           ${leagueData.showDetails.showSeasonNum}`
            : "LOADING"}
        </p>
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
                    color="#0099FF"
                  />

                  <p>
                    {resultsData[`episode${page}`]?.["episodeName"] !==
                    undefined
                      ? resultsData[`episode${page}`]?.["episodeName"]
                      : ""}
                  </p>
                  <p>
                    Air Date: &nbsp;
                    {resultsData
                      ? resultsData[`episode${page}`]
                        ? new Date(
                            resultsData[`episode${page}`]["airDate"][
                              "seconds"
                            ] * 1000
                          ).toLocaleDateString("en-us")
                        : "TBD"
                      : "TBD"}
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
