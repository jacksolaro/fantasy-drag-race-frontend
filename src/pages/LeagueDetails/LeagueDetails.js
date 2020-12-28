import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import leaguePageBkg from "../../assets/images/bkg-3.jpg";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { db } from "../../firebase";
import firebase from "firebase";
import "./leagueDetails.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CURRENT_EPISODE = {
  episodeNum: 1,
  airDate: Date(1 / 1 / 2020),
};

const EPISODE_PICKS = {
  season: [
    {
      id: "seasonWinner",
      title: "Season Winner",
      queenID: "Test",
      queenName: "Kandy Muse",
      queenIMG:
        "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FKandyMuseS13Promo.jpg?alt=media&token=083e7124-bd37-4edc-aff5-7edecdb12a79",
      result: "TBD",
      scorePossible: 50,
      scoreActual: 0,
    },
    {
      id: "missCongeniality",
      title: "Miss Congeniality Winner",
      queenID: "Test",
      queenName: "Kandy Muse",
      queenIMG:
        "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FKandyMuseS13Promo.jpg?alt=media&token=083e7124-bd37-4edc-aff5-7edecdb12a79",
      result: "TBD",
      scorePossible: 50,
      scoreActual: 0,
    },
    {
      id: "firstEliminated",
      title: "First Eliminated",
      queenID: "test",
      queenName: "Eliott with 2 T's",
      queenIMG:
        "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FElliottS13Promo.jpg?alt=media&token=d00551fc-5f85-4c71-b2ca-426ab975aa6d",
      result: "TBD",
      scorePossible: 50,
      scoreActual: 0,
    },
  ],
  episode1: [
    {
      id: "episodeWinner",
      title: "Episode Winner",
      queenID: "Test",
      queenIMG: "",
      result: "TBD",
      scorePossible: 20,
      scoreActual: 0,
    },
    {
      id: "maxiChallengeWinner",
      title: "Maxi Challenge Winner",
      queenID: "Test",
      queenIMG: "",
      result: "TBD",
      scorePossible: 10,
      scoreActual: 0,
    },
    {
      id: "miniChallengeWinner",
      title: "Mini Challenge Winner",
      queenID: "Test",
      queenIMG: "",
      result: "TBD",
      scorePossible: 10,
      scoreActual: 0,
    },
    {
      id: "eliminated",
      title: "Eliminated Queen",
      queenID: "Test",
      queenIMG: "",
      result: "TBD",
      scorePossible: 10,
      scoreActual: 0,
    },
    {
      id: "topQueen1",
      title: "Top Queen #1",
      queenID: "Test",
      queenIMG: "",
      result: "TBD",
      scorePossible: 5,
      scoreActual: 0,
    },
    {
      id: "topQueen2",
      title: "Top Queen #2",
      queenID: "Test",
      queenIMG: "",
      result: "TBD",
      scorePossible: 5,
      scoreActual: 0,
    },
    {
      id: "bottomQueen1",
      title: "Bottom Queen #1",
      queenID: "Test",
      queenIMG: "",
      result: "TBD",
      scorePossible: 5,
      scoreActual: 0,
    },
    {
      id: "bottomQueen2",
      title: "Bottom Queen #2",
      queenID: "Test",
      queenIMG: "",
      result: "TBD",
      scorePossible: 5,
      scoreActual: 0,
    },
  ],
};

function LeagueDetails() {
  let params = useParams();
  const classes = useStyles();
  const [leagueData, setLeagueData] = useState([{}]);

  //   useEffect(() => {
  //     console.log("tried for function");
  //     const loadScores = firebase.functions().httpsCallable("loadScores");
  //     loadScores({ test: "test" })
  //       .then((response) => {
  //         console.log("testing response");
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log("error occurred");
  //       });
  //   }, []);

  useEffect(() => {
    db.collection("leagues")
      .doc(params.id)
      .get()
      .then((doc) => {
        // console.log(doc.data());
        setLeagueData(doc.data());
      })
      .catch((error) => console.log("Error", error));

    // console.log("leagueData", leagueData);

    db.collection("shows")
      //   TODO: Need to automate what show and what season
      .doc("RPDR")
      .collection("seasons")
      .doc("US_Reg_13")
      .get()
      .then((doc) => {
        // console.log("TEST", doc.data());
      });
  }, []);

  return (
    <div>
      {/* TODO: redirect or show 404 if there is no league */}
      <div className="leagueDetails__header">
        <h1>You Betta Werk!</h1>
        <h3>RuPaul's Drag Race, Season 13</h3>
        <h3>LEAGUE CODE: {params.id}</h3>
      </div>

      {/* dashboard */}
      <Grid container container align="center" justify="center">
        <Grid item xs={12} md={3}>
          <Typography align="center" variant="h4">
            LEADERBOARD
          </Typography>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>NAME</TableCell>
                  <TableCell align="right">SCORE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leagueData.scores ? (
                  leagueData.scores.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell component="th" scope="row">
                        {user.email}
                      </TableCell>
                      <TableCell align="right">{user.score}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p>loading</p>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography align="center" variant="h4">
            YOUR ROSTER
          </Typography>
          <div>
            <Typography align="center" variant="h5">
              EPISODE PICKS
            </Typography>
            <Typography align="center" variant="subtitle2">
              EPISODE: {CURRENT_EPISODE.episodeNum}
            </Typography>
            <Grid container container align="center" justify="center">
              {EPISODE_PICKS.episode1.map((pick) => (
                <Grid item xs={12} md={3}>
                  <p>{pick.title}</p>
                  <p>{pick.queenID}</p>
                </Grid>
              ))}
            </Grid>
          </div>
          <div>
            <Typography align="center" variant="h5">
              SEASON PICKS
            </Typography>
            <Grid container align="center" justify="center">
              {EPISODE_PICKS.season
                ? EPISODE_PICKS.season.map((pick) => (
                    <Grid item xs={12} md={3}>
                      <Typography align="center" variant="h6">
                        {pick.title}
                      </Typography>
                      <Typography align="center" variant="subtitle2">
                        {pick.scorePossible} POINTS POSSIBLE
                      </Typography>
                      <img
                        className="leagueDetails__rosterIMG"
                        src={pick.queenIMG}
                      ></img>
                      <p>{pick.queenName}</p>
                    </Grid>
                  ))
                : "Make your season selection! [INSERT BUTTON HERE]"}
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
  );
}

export default LeagueDetails;

// // import React, { Component } from "react";
// let leagueData;

// let params = useParams();
// export default class LeagueDetails extends Component {
//   componentDidMount() {
//     const fetchData = async () => {
//       db.collection("leagues")
//         .doc(params.id)
//         .get()
//         .then((doc) => {
//           console.log(doc.data());
//           leagueData = doc.data();
//         });
//     };
//     fetchData();
//     console.log("leagueData", leagueData);
//   }

//   render() {
//     const useStyles = makeStyles({
//       table: {
//         minWidth: 650,
//       },
//     });

//     const classes = useStyles();

//     const CURRENT_EPISODE = {
//       episodeNum: 1,
//       airDate: Date(1 / 1 / 2020),
//     };

//     const LEAGUE_DATA = {
//       scores: [
//         {
//           name: "Jack Solaro",
//           score: 20,
//         },
//         {
//           name: "Gabe Ohlsen",
//           score: 15,
//         },
//         {
//           name: "Peter Popek",
//           score: 10,
//         },
//         {
//           name: "David Schwartz",
//           score: 10,
//         },
//       ],
//     };

//     const [leagueData, setLeagueData] = useState();

//     return (
//       <div>
//         {/* TODO: redirect or show 404 if there is no league */}
//         <h1>You Betta Werk!</h1>
//         <h3>RuPaul's Drag Race, Season 13</h3>
//         <h3>LEAGUE CODE: {params.id}</h3>

//         {/* ACTIONS */}
//         <Link to={`/leagues/${params.id}/selectseasonroster`}>
//           Select Season Roster
//         </Link>
//         <Link to={`/leagues/${params.id}/selectepisoderoster`}>
//           Select Episode Roster
//         </Link>

//         {/* League Details */}
//         <h3>Next Episode Airs: 1/1/2021</h3>
//         <h3>Roster Status: NOT SUBMITTED</h3>

//         {/* dashboard */}
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={8}>
//             <h2>Leaderboard</h2>
//             <TableContainer component={Paper}>
//               <Table className={classes.table} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>NAME</TableCell>
//                     <TableCell align="right">SCORE</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {/* {leagueData.scores.map((user) => (
//                   <TableRow key={user.name}>
//                     <TableCell component="th" scope="row">
//                       {user.name}
//                     </TableCell>
//                     <TableCell align="right">{user.score}</TableCell>
//                   </TableRow>
//                 ))} */}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <div>
//               <h2>YOUR ROSTER</h2>
//               <h3>EPISODE: {CURRENT_EPISODE.episodeNum}</h3>
//             </div>
//           </Grid>
//         </Grid>
//       </div>
//     );
//   }
// }
