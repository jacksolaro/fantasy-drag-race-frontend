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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const EPISODE_PICKS = [
  {
    event: "season",
    picks: [
      {
        userID: "SallyPicks",
        picks: [
          {
            id: "seasonWinner",
            title: "Season Winner",
            queenID: "G5hMj6BwbtsnqTG6XB9U",
            queenName: "Kandy Muse",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FKandyMuseS13Promo.jpg?alt=media&token=083e7124-bd37-4edc-aff5-7edecdb12a79",
            result: "correct",
            scorePossible: 50,
            scoreActual: 0,
          },
          {
            id: "missCongeniality",
            title: "Miss Congeniality Winner",
            queenID: "G5hMj6BwbtsnqTG6XB9U",
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
            result: "incorrect",
            scorePossible: 50,
            scoreActual: 0,
          },
        ],
      },
      {
        userID: "nDGwS8Ia2oO2S9SPdZiCs9Rr93I2",
        picks: [
          {
            id: "seasonWinner",
            title: "Season Winner",
            queenID: "G5hMj6BwbtsnqTG6XB9U",
            queenName: "Kandy Muse",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FKandyMuseS13Promo.jpg?alt=media&token=083e7124-bd37-4edc-aff5-7edecdb12a79",
            result: "correct",
            scorePossible: 50,
            scoreActual: 0,
          },
          {
            id: "missCongeniality",
            title: "Miss Congeniality Winner",
            queenID: "G5hMj6BwbtsnqTG6XB9U",
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
            result: "incorrect",
            scorePossible: 50,
            scoreActual: 0,
          },
        ],
      },
    ],
  },
  {
    event: "episode1",
    picks: [
      {
        userID: "SallyPicks",
        picks: [
          {
            id: "episodeWinner",
            title: "Episode Winner",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            scorePossible: 20,
            scoreActual: 0,
          },
          {
            id: "maxiChallengeWinner",
            title: "Maxi Challenge Winner",
            queenID: "Test",
            queenName: "Gottmik",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FGottmikS13Promo.jpg?alt=media&token=8c2481c6-e1e3-49d5-a30b-ef14403b2661",
            result: "TBD",
            scorePossible: 10,
            scoreActual: 0,
          },
          {
            id: "miniChallengeWinner",
            title: "Mini Challenge Winner",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "correct",
            scorePossible: 10,
            scoreActual: 0,
          },
          {
            id: "eliminated",
            title: "Eliminated Queen",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            scorePossible: 10,
            scoreActual: 0,
          },
          {
            id: "topQueen1",
            title: "Top Queen #1",
            queenID: "Test",
            queenName: "Denali",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FDenaliS13Promo.jpg?alt=media&token=c30fba33-4d09-45f0-b329-87c2535ea3b1",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
          {
            id: "topQueen2",
            title: "Top Queen #2",
            queenID: "Test",
            queenName: "Denali",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FDenaliS13Promo.jpg?alt=media&token=c30fba33-4d09-45f0-b329-87c2535ea3b1",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
          {
            id: "bottomQueen1",
            title: "Bottom Queen #1",
            queenID: "Test",
            queenName: "Kahmora Hall",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FKahmoraHallS13Promo.jpg?alt=media&token=298e371a-11bb-42ee-b663-ef3f13ece25f",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
          {
            id: "bottomQueen2",
            title: "Bottom Queen #2",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
        ],
      },
      {
        userID: "nDGwS8Ia2oO2S9SPdZiCs9Rr93I2",
        picks: [
          {
            id: "episodeWinner",
            title: "Episode Winner",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            scorePossible: 20,
            scoreActual: 0,
          },
          {
            id: "maxiChallengeWinner",
            title: "Maxi Challenge Winner",
            queenID: "Test",
            queenName: "Gottmik",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FGottmikS13Promo.jpg?alt=media&token=8c2481c6-e1e3-49d5-a30b-ef14403b2661",
            result: "TBD",
            scorePossible: 10,
            scoreActual: 0,
          },
          {
            id: "miniChallengeWinner",
            title: "Mini Challenge Winner",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "correct",
            scorePossible: 10,
            scoreActual: 0,
          },
          {
            id: "eliminated",
            title: "Eliminated Queen",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            scorePossible: 10,
            scoreActual: 0,
          },
          {
            id: "topQueen1",
            title: "Top Queen #1",
            queenID: "Test",
            queenName: "Denali",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FDenaliS13Promo.jpg?alt=media&token=c30fba33-4d09-45f0-b329-87c2535ea3b1",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
          {
            id: "topQueen2",
            title: "Top Queen #2",
            queenID: "Test",
            queenName: "Denali",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FDenaliS13Promo.jpg?alt=media&token=c30fba33-4d09-45f0-b329-87c2535ea3b1",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
          {
            id: "bottomQueen1",
            title: "Bottom Queen #1",
            queenID: "Test",
            queenName: "Kahmora Hall",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FKahmoraHallS13Promo.jpg?alt=media&token=298e371a-11bb-42ee-b663-ef3f13ece25f",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
          {
            id: "bottomQueen2",
            title: "Bottom Queen #2",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
        ],
      },
    ],
  },
  {
    event: "episode2",
    picks: [
      {
        userID: "nDGwS8Ia2oO2S9SPdZiCs9Rr93I2",
        picks: [
          {
            id: "episodeWinner",
            title: "Episode Winner",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            scorePossible: 20,
            scoreActual: 0,
          },
          {
            id: "maxiChallengeWinner",
            title: "Maxi Challenge Winner",
            queenID: "Test",
            queenName: "Gottmik",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FGottmikS13Promo.jpg?alt=media&token=8c2481c6-e1e3-49d5-a30b-ef14403b2661",
            result: "TBD",
            scorePossible: 10,
            scoreActual: 0,
          },
          {
            id: "miniChallengeWinner",
            title: "Mini Challenge Winner",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "correct",
            scorePossible: 10,
            scoreActual: 0,
          },
          {
            id: "eliminated",
            title: "Eliminated Queen",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            scorePossible: 10,
            scoreActual: 0,
          },
          {
            id: "topQueen1",
            title: "Top Queen #1",
            queenID: "Test",
            queenName: "Denali",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FDenaliS13Promo.jpg?alt=media&token=c30fba33-4d09-45f0-b329-87c2535ea3b1",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
          {
            id: "topQueen2",
            title: "Top Queen #2",
            queenID: "Test",
            queenName: "Denali",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FDenaliS13Promo.jpg?alt=media&token=c30fba33-4d09-45f0-b329-87c2535ea3b1",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
          {
            id: "bottomQueen1",
            title: "Bottom Queen #1",
            queenID: "Test",
            queenName: "Kahmora Hall",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FKahmoraHallS13Promo.jpg?alt=media&token=298e371a-11bb-42ee-b663-ef3f13ece25f",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
          {
            id: "bottomQueen2",
            title: "Bottom Queen #2",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
        ],
      },
      {
        userID: "CindyPicks",
        picks: [
          {
            id: "episodeWinner",
            title: "Episode Winner",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            scorePossible: 20,
            scoreActual: 0,
          },
          {
            id: "maxiChallengeWinner",
            title: "Maxi Challenge Winner",
            queenID: "Test",
            queenName: "Gottmik",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FGottmikS13Promo.jpg?alt=media&token=8c2481c6-e1e3-49d5-a30b-ef14403b2661",
            result: "TBD",
            scorePossible: 10,
            scoreActual: 0,
          },
          {
            id: "miniChallengeWinner",
            title: "Mini Challenge Winner",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "correct",
            scorePossible: 10,
            scoreActual: 0,
          },
          {
            id: "eliminated",
            title: "Eliminated Queen",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            scorePossible: 10,
            scoreActual: 0,
          },
          {
            id: "topQueen1",
            title: "Top Queen #1",
            queenID: "Test",
            queenName: "Denali",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FDenaliS13Promo.jpg?alt=media&token=c30fba33-4d09-45f0-b329-87c2535ea3b1",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
          {
            id: "topQueen2",
            title: "Top Queen #2",
            queenID: "Test",
            queenName: "Denali",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FDenaliS13Promo.jpg?alt=media&token=c30fba33-4d09-45f0-b329-87c2535ea3b1",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
          {
            id: "bottomQueen1",
            title: "Bottom Queen #1",
            queenID: "Test",
            queenName: "Kahmora Hall",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FKahmoraHallS13Promo.jpg?alt=media&token=298e371a-11bb-42ee-b663-ef3f13ece25f",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
          {
            id: "bottomQueen2",
            title: "Bottom Queen #2",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            scorePossible: 5,
            scoreActual: 0,
          },
        ],
      },
    ],
  },
];

const RESULTS = {
  season: {
    seasonWinner: "G5hMj6BwbtsnqTG6XB9U",
    missCongeniality: "G5hMj6BwbtsnqTG6XB9U",
    firstEliminated: "G5qTG6XB9U",
  },
};

const SCORES = {
  totals: [
    {
      userID: "1",
      username: "Joe Schmo",
      score: 55,
    },
    {
      userID: "2",
      username: "Sally Something",
      score: 70,
    },
    {
      userID: "3",
      username: "Cindy Lou Who",
      score: 65,
    },
  ],
  episodes: [
    {
      episode1: [
        {
          userID: "1",
          username: "Joe Schmo",
          score: 55,
        },
        {
          userID: "2",
          username: "Sally Something",
          score: 70,
        },
        {
          userID: "3",
          username: "Cindy Lou Who",
          score: 65,
        },
      ],
    },
  ],
};

// const getScores = () => {
//   let scores = [];
//   let episodeSum, totalSum;

//     EPISODE_PICKS.map((event) => {
//       event.picks.map((user) => {
//         episodeSum = 0;
//         user.picks.map((pick) => {
//           if (pick.result === "correct") {
//             episodeSum += pick.scorePossible;
//           }
//         });
//         scores.push({
//           userID: user.userID,
//           score: episodeSum,
//         });

//       })
//     });
//   // if (EPISODE_PICKS[`episode1`]) {
//   //   EPISODE_PICKS[`episode1`].map((user) => {
//   //     episodeSum = 0;
//   //     user.picks.map((pick) => {
//   //       if (pick.result === "correct") {
//   //         episodeSum += pick.scorePossible;
//   //       }
//   //     });
//   //     scores.push({
//   //       userID: user.userID,
//   //       score: episodeSum,
//   //     });
//   //   });
//   // }

//   console.log("EPISODE PICKS", EPISODE_PICKS);
//   console.log("Scores", scores);
//   return scores;
// };

function LeagueDetails() {
  let params = useParams();
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [leagueData, setLeagueData] = useState([{}]);
  const [page, setPage] = React.useState(1);
  // const [scores, setScores] = useState(getScores());

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // getScores();

    db.collection("leagues")
      .doc(params.id)
      .get()
      .then((doc) => {
        // console.log(doc.data());
        setLeagueData(doc.data());
      })
      .catch((error) => console.log("Error", error));
  }, []);

  function renderEpisodePicks(episodeNum) {
    const episodePicks = JSON.parse(JSON.stringify(EPISODE_PICKS)).filter(
      (list) => list.event === `episode${episodeNum}`
    );

    if (episodePicks.length > 0) {
      const userPicksForEpisode = JSON.parse(
        JSON.stringify(episodePicks[0].picks)
      ).filter((user) => user.userID === currentUser.uid);

      return userPicksForEpisode[0].picks.map((pick) => (
        <TableRow key={pick.queenID}>
          <TableCell component="th" scope="row">
            {pick.title}
          </TableCell>
          <TableCell>
            <img
              className="leagueDetails__rosterIMG2"
              src={pick.queenIMG}
            ></img>
          </TableCell>
          <TableCell>{pick.queenName}</TableCell>
          <TableCell>
            {pick.result === "correct" ? pick.scorePossible : 0}
          </TableCell>
          <TableCell>{pick.scorePossible}</TableCell>
        </TableRow>
      ));
    } else {
      return <div>Not currently available</div>;
    }
  }

  function renderSeasonPicks() {
    const seasonPicks = JSON.parse(JSON.stringify(EPISODE_PICKS)).filter(
      (list) => list.event === `season`
    );

    if (seasonPicks.length > 0) {
      const userSeasonPicks = JSON.parse(
        JSON.stringify(seasonPicks[0].picks)
      ).filter((user) => user.userID === currentUser.uid);

      return userSeasonPicks[0].picks.map((pick) => (
        <TableRow key={pick.queenID}>
          <TableCell component="th" scope="row">
            {pick.title}
          </TableCell>
          <TableCell>
            <img
              className="leagueDetails__rosterIMG2"
              src={pick.queenIMG}
            ></img>
          </TableCell>
          <TableCell>{pick.queenName}</TableCell>
          <TableCell>
            {pick.result === "correct" ? pick.scorePossible : 0}
          </TableCell>
          <TableCell>{pick.scorePossible}</TableCell>
        </TableRow>
      ));
    } else {
      return <div>Not currently available</div>;
    }
  }

  return (
    <Container>
      {/* TODO: redirect or show 404 if there is no league */}
      <div className="leagueDetails__header">
        <h1>You Betta Werk!</h1>
        <h3>RuPaul's Drag Race, Season 13</h3>
        <h3>LEAGUE CODE: {params.id}</h3>
      </div>

      {/* dashboard */}
      <Grid container container align="center" justify="center">
        <Grid item xs={12} md={12}>
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
                {SCORES ? (
                  SCORES.totals
                    .sort((a, b) => (a.score < b.score ? 1 : -1))
                    .map((row) => (
                      <TableRow key={row.userID}>
                        <TableCell component="th" scope="row">
                          {row.username}
                        </TableCell>
                        <TableCell align="right">{row.score}</TableCell>
                      </TableRow>
                    ))
                ) : (
                  <p>loading</p>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography align="center" variant="h4">
            YOUR ROSTER
          </Typography>
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
              boundaryCount={2}
              color="primary"
            />
            <Grid container container align="center" justify="center">
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
                  <TableBody>
                    {renderEpisodePicks(page)}
                    <TableRow key="total">
                      <TableCell component="th" scope="row">
                        EPISODE TOTAL
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>150</TableCell>
                      <TableCell>200</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </div>
          <div>
            <Typography align="center" variant="h5">
              SEASON PICKS
            </Typography>
            <Grid container align="center" justify="center">
              {renderSeasonPicks()}

              {/* {EPISODE_PICKS.season
                ? EPISODE_PICKS.season.map((pick) => (
                    <Grid
                      className={
                        pick.result === "correct"
                          ? "correctGuess"
                          : pick.result === "incorrect"
                          ? "incorrectGuess"
                          : ""
                      }
                      item
                      xs={12}
                      md={3}
                    >
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
                      <p>
                        {RESULTS["season"][`${pick.id}`] === pick.queenID
                          ? "correct"
                          : "incorrect"}
                      </p>
                      <p>{pick.id}</p>
                    </Grid>
                  ))
                : "Make your season selection! [INSERT BUTTON HERE]"} */}
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
    </Container>
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
