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
import { Button, Grid, Typography } from "@material-ui/core";
import { db } from "../../firebase.js";
import "./leagueDetails.css";
import { Pagination } from "@material-ui/lab";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FileCopyIcon from "@material-ui/icons/FileCopy";

function LeagueDetails(props) {
  let params = useParams();
  const { currentUser } = useAuth();
  const [fetchComplete, setFetchComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leagueData, setLeagueData] = useState([{}]);
  const [resultsData, setResultsData] = useState([{}]);
  const [pickData, setPickData] = useState([]);
  const [page, setPage] = React.useState(1);
  const [scores, setScores] = React.useState([]);

  // Changing Episode Pages
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (this != undefined) {
      // console.log("defined");
    }
    // console.log("undefined");
  });

  // RETRIEVE THE LEAGUE DATA (NAME, MEMBERS, SHOW ID, RESULTS, ETC)
  useEffect(() => {
    let mounted = true;
    getResultsData(mounted);
    if (fetchComplete) {
      getScoresData();
    }

    return function cleanup() {
      mounted = false;
    };
  }, [fetchComplete]);

  async function getResultsData(mounted) {
    console.log("STARTING GET RESULTS");
    getValues("leagues", `${params.id}`)
      .then((leagueFetch) => {
        setLeagueData(leagueFetch);
        getValues("shows", `${leagueFetch.showDetails.showID}`)
          .then((resultsFetch) => {
            setResultsData(resultsFetch.results, getPickData());
          })
          .catch((error) => console.log("Error", error));
      })
      .catch((error) => console.log("Error", error));
    // try {
    //   setLeagueData(response.data());
    //   let resultsFetch = await getValues(
    //     "shows",
    //     `${response.data().showDetails.showID}`
    //   );
    //   if (mounted) {
    //     // console.log("RESULTS DATA", doc.data().results);
    //     setResultsData(resultsFetch.results, getPickData());
    //   }
    //   // const response = await db
    //   //   .collection("leagues")
    //   //   .doc(params.id)
    //   //   .get()
    //   // .then((doc) => {
    //   //   // console.log("LEAGUE DATA", doc.data());
    //   //   setLeagueData(doc.data());
    //   //   db.collection("shows")
    //   //     .doc(doc.data().showDetails.showID)
    //   //     .get()

    //   //     .then((doc) => {
    //   //       if (mounted) {
    //   //         // console.log("RESULTS DATA", doc.data().results);
    //   //         setResultsData(doc.data().results, getPickData());
    //   //       }
    //   //     });
    //   // .then(() => findClosestDate());

    //   // setResultsData(response);
    //   setLoading(false);
    // } catch (error) {
    //   console.log("Error", error);
    // }
  }

  async function getPickData(mounted) {
    console.log("STARTING GET PICKS");
    window.scrollTo(0, 0);
    setLoading(true);
    let pickDataArr = [];
    try {
      const response = await db
        .collection("leagues")
        .doc(params.id)
        .collection("picks")
        .get()
        // for (const doc of response.docs) {
        //   pickDataArr.push(doc.data());
        // }
        .then((docsArr) => {
          // if (mounted) {
          // console.log("DOCS", docsArr.docs);
          docsArr.docs.map((doc) => {
            // console.log("DOC", doc.data());
            pickDataArr.push(doc.data());
          });
          // }
          setPickData(pickDataArr);
          setLoading(false);
          setFetchComplete(true);
        });
    } catch (error) {
      setPickData([]);
      setLoading(false);
      console.log("Error", error);
    }
  }

  async function getScoresData() {
    console.log("STARTING GET SCORES");
    try {
      let scoresArr = [];
      let episodeScores = [];
      let episodeSum, totalSum;
      console.log("INSIDE GET SCORES - PICKS", pickData);
      console.log("INSIDE GET SCORES - RESULTS", resultsData);
      pickData.map((user) => {
        totalSum = 0;
        episodeScores = [];
        if (user.picks) {
          user.picks.map((scoreEvent) => {
            scoreEvent.picks.map((pick) => {
              if (resultsData[`${scoreEvent.category}`]) {
                if (resultsData[`${scoreEvent.category}`][`${pick.id}`]) {
                  if (
                    resultsData[`${scoreEvent.category}`][
                      `${pick.id}`
                    ].includes(pick.queenID)
                  ) {
                    totalSum += pick.pointValue;
                    episodeSum += pick.pointValue;
                  }
                } else {
                }
              }
            });
            let episodeNum = scoreEvent.category.replace("episode", "");
            episodeScores.push({ episodeNum, episodeSum });
            episodeSum = 0;
          });
        }
        scoresArr.push({
          userID: user.userID,
          username: user.username,
          score: totalSum,
          episodeScores: episodeScores,
        });
      });
      setScores(scoresArr);
      console.log("SCORES SET (CHECK 3)", scores);
    } catch (err) {
      console.log(err);
    }
  }

  function getValues(collectionName, docName) {
    return db
      .collection(collectionName)
      .doc(docName)
      .get()
      .then(function (doc) {
        if (doc.exists) return doc.data();
        return Promise.reject("No such document");
      });
  }

  function findClosestDate() {
    // console.log("RESULTS ARR", resultsData);
    let today = new Date();
    let closest = 1;
    Object.values(resultsData).forEach((episode) => {
      if (episode.airDate?.seconds * 1000 < today.getTime()) {
        // console.log(
        //   "CHECK: ",
        //   new Date(episode.airDate?.seconds),
        //   episode.airDate?.seconds * 1000,
        //   today.getTime()
        // );
        closest = episode.episodeNum;
      }
    });
    // console.log("NEXT EPISODE", closest);
    setPage(closest);
  }

  function findCurrentEpisodeScore() {
    const scoresData = JSON.parse(JSON.stringify(scores)).filter(
      (user) => user.userID === currentUser.uid
    )[0];

    const episodeScore = scoresData?.episodeScores.filter(
      (episode) => episode?.episodeNum == page
    )[0]?.episodeSum;

    return episodeScore || 0;
  }

  // TAKES ALL THE USERS EPISODE ROSTERS, RENDERS THEM ON PAGE AND DISPLAYS POINTS
  function renderEpisodePicks(episodeNum) {
    if (loading) {
      return <div className="episodePaginationNoResultBox">LOADING</div>;
    } else {
      // console.log("renderEpisodePicksFunction - PickData", pickData);

      const userData = JSON.parse(JSON.stringify(pickData)).filter(
        (user) => user.userID === currentUser.uid
      );

      // console.log("renderEpisodePicksFunction - UserData", userData);

      if (userData[0]?.picks !== undefined) {
        const episodePicks = JSON.parse(
          JSON.stringify(userData[0].picks)
        ).filter((list) => list.category === `episode${episodeNum}`);
        // console.log("renderEpisodePicksFunction - episodePicks", episodePicks);

        if (episodePicks[0]?.picks !== undefined) {
          return (
            <div className="episodePicks__container">
              {episodePicks[0].picks.map((pick, index) => (
                <>
                  <Grid
                    className="episodePicks__pointRow"
                    container
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid item xs={10} style={{ textAlign: "left" }}>
                      <div style={{ display: "flex" }}>
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
                        <div style={{ padding: "10px" }}>
                          <p className="episodePicks__pointCategoryLabel">
                            {pick.pointCategory}
                          </p>
                          <p style={{ margin: "0px" }}>{pick.queenName}</p>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2} style={{ textAlign: "right" }}>
                      <span className="episodePicks__textEmphasis">
                        +
                        {resultsData[`${episodePicks[0].category}`]
                          ? resultsData[`${episodePicks[0].category}`][
                              `${pick.id}`
                            ]
                            ? resultsData[`${episodePicks[0].category}`][
                                `${pick.id}`
                              ].includes(pick.queenID)
                              ? pick.pointValue
                              : 0
                            : "TBD"
                          : "TBD"}
                      </span>
                      {/* / {pick.pointValue} */}
                    </Grid>
                  </Grid>
                  <hr></hr>
                </>
              ))}
            </div>
            // POINTS CODE
          );
        }
      }
      // if the episode has already started, return notice
      if (resultsData?.[`episode${page}`]?.airDate?.seconds !== undefined) {
        if (
          resultsData[`episode${page}`]["airDate"]["seconds"] * 1000 <
          new Date().getTime()
        ) {
          return (
            <p style={{ color: "#AAA" }}>
              The window to select your roster for this episode is closed.
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
      // console.log("renderEpisodePicksFunction - PickData", pickData);

      const userData = JSON.parse(JSON.stringify(pickData)).filter(
        (user) => user.userID === currentUser.uid
      );

      // console.log("renderEpisodePicksFunction - UserData", userData);

      if (userData[0]?.picks !== undefined) {
        const seasonPicks = JSON.parse(
          JSON.stringify(userData[0].picks)
        ).filter((list) => list.category === `season`);
        // console.log("renderEpisodePicksFunction - seasonPicks", seasonPicks);

        if (seasonPicks[0]?.picks !== undefined) {
          return seasonPicks[0].picks.map((pick) => (
            <Grid
              className={
                resultsData?.["season"]?.[`${pick.id}`]?.includes(pick.queenID)
                  ? "leagueDetails__rosterIMG2"
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
                  resultsData?.["season"]?.[`${pick.id}`]?.includes(
                    pick.queenID
                  )
                    ? "leagueDetails__rosterIMG2"
                    : "leagueDetails__rosterIMG2"
                }
                src={pick.queenIMG}
                alt={`${pick.queenName}`}
              ></img>
              <p>{pick.queenName}</p>
              <p className="pointsBadge">
                {resultsData?.["season"]?.[`${pick.id}`]?.[0] != ""
                  ? resultsData?.["season"]?.[`${pick.id}`]?.includes(
                      pick.queenID
                    )
                    ? pick.pointValue
                    : 0
                  : "TBD"}
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
        <p>
          League Code: &nbsp;
          <Button
            style={{
              color: "white",
              padding: 10,
              backgroundColor: "rgb(45,45,45,.1)",
              borderRadius: "10px",
            }}
            onClick={() => navigator.clipboard.writeText(`${params.id}`)}
          >
            {params.id} &nbsp;
            <FileCopyIcon fontSize="small"></FileCopyIcon>
          </Button>
        </p>
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

            <div
              className="leagueDetails__leaderboard"
              style={{ minHeight: "250px" }}
            >
              <Grid item xs={12} md={12}>
                <div>
                  <Typography align="center" variant="h5">
                    EPISODE PICKS
                  </Typography>
                  <Pagination
                    className="episodePagination"
                    page={page}
                    onChange={handlePageChange}
                    count={14}
                    defaultPage={1}
                    boundaryCount={1}
                    color="#0099FF"
                  />

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
                  <hr></hr>

                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      <p>Episode Points</p>
                      <p className="episodePicks__textEmphasis">
                        {findCurrentEpisodeScore()}
                      </p>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      style={{
                        borderWidth: "0px 1px",
                        borderColor: "#CCC",
                        borderStyle: "solid",
                      }}
                    >
                      <p>Episode Title:</p>
                      <p className="episodePicks__textEmphasis">
                        {resultsData[`episode${page}`]?.["episodeName"] !==
                        undefined
                          ? resultsData[`episode${page}`]?.["episodeName"]
                          : "TBD"}
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <p>Air Date:</p>
                      <p className="episodePicks__textEmphasis">
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
                    </Grid>
                  </Grid>
                  <hr></hr>

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
