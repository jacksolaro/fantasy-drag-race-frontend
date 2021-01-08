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

const LEAGUE_MEMBERS_DATA = [
  {
    userID: "nDGwS8Ia2oO2S9SPdZiCs9Rr93I2",
    username: "Josh",
    picks: [
      {
        category: "season",
        picks: [
          {
            id: "seasonWinner",
            title: "Season Winner",
            queenID: "G5hMj6BwbtsnqTG6XB9U",
            queenName: "Kandy Muse",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FKandyMuseS13Promo.jpg?alt=media&token=083e7124-bd37-4edc-aff5-7edecdb12a79",
            result: "correct",
            pointValue: 50,
            scoreActual: 50,
          },
          {
            id: "missCongeniality",
            title: "Miss Congeniality Winner",
            queenID: "G5hMj6BwbtsnqTG6XB9U",
            queenName: "Kandy Muse",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FKandyMuseS13Promo.jpg?alt=media&token=083e7124-bd37-4edc-aff5-7edecdb12a79",
            result: "correct",
            pointValue: 50,
            scoreActual: 50,
          },
          {
            id: "firstEliminated",
            title: "First Eliminated",
            queenID: "test",
            queenName: "Eliott with 2 T's",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FElliottS13Promo.jpg?alt=media&token=d00551fc-5f85-4c71-b2ca-426ab975aa6d",
            result: "incorrect",
            pointValue: 50,
            scoreActual: 0,
          },
        ],
      },
      {
        category: "episode1",
        picks: [
          {
            id: "episodeWinner",
            title: "Episode Winner",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            pointValue: 20,
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
            pointValue: 10,
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
            pointValue: 10,
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
            pointValue: 10,
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
            pointValue: 5,
            scoreActual: 0,
          },
          {
            id: "topQueen2",
            title: "Top Queen #2",
            queenID: "Test",
            queenName: "Denali",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FDenaliS13Promo.jpg?alt=media&token=c30fba33-4d09-45f0-b329-87c2535ea3b1",
            result: "correct",
            pointValue: 5,
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
            pointValue: 5,
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
            pointValue: 5,
            scoreActual: 0,
          },
        ],
      },
      {
        category: "episode2",
        picks: [
          {
            id: "episodeWinner",
            title: "Episode Winner",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            pointValue: 20,
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
            pointValue: 10,
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
            pointValue: 10,
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
            pointValue: 10,
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
            pointValue: 5,
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
            pointValue: 5,
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
            pointValue: 5,
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
            pointValue: 5,
            scoreActual: 0,
          },
        ],
      },
    ],
  },
  {
    userID: "sallysID",
    username: "Sally",
    picks: [
      {
        category: "season",
        picks: [
          {
            id: "seasonWinner",
            title: "Season Winner",
            queenID: "G5hMj6BwbtsnqTG6XB9U",
            queenName: "Kandy Muse",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FKandyMuseS13Promo.jpg?alt=media&token=083e7124-bd37-4edc-aff5-7edecdb12a79",
            result: "correct",
            pointValue: 50,
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
            pointValue: 50,
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
            pointValue: 50,
            scoreActual: 0,
          },
        ],
      },
      {
        category: "episode1",
        picks: [
          {
            id: "episodeWinner",
            title: "Episode Winner",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            pointValue: 20,
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
            pointValue: 10,
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
            pointValue: 10,
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
            pointValue: 10,
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
            pointValue: 5,
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
            pointValue: 5,
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
            pointValue: 5,
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
            pointValue: 5,
            scoreActual: 0,
          },
        ],
      },
      {
        category: "episode2",
        picks: [
          {
            id: "episodeWinner",
            title: "Episode Winner",
            queenID: "Test",
            queenName: "Joey Jay",
            queenIMG:
              "https://firebasestorage.googleapis.com/v0/b/derby-584f8.appspot.com/o/rpdr_s13_reg_queens%2FJoeyJayS13Promo.jpg?alt=media&token=df2669ac-67c2-4029-9f43-17384b163438",
            result: "TBD",
            pointValue: 20,
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
            pointValue: 10,
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
            pointValue: 10,
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
            pointValue: 10,
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
            pointValue: 5,
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
            pointValue: 5,
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
            pointValue: 5,
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
            pointValue: 5,
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

function LeagueDetails() {
  let params = useParams();
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [leagueData, setLeagueData] = useState([{}]);
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

  // useEffect(() => {
  //   setInterval(() => {
  //     setCurrTime(Date().toLocaleString());
  //   }, 12000);
  // });

  function renderEpisodePicks(episodeNum) {
    const userData = JSON.parse(JSON.stringify(LEAGUE_MEMBERS_DATA)).filter(
      (user) => user.userID === currentUser.uid
    );

    const episodePicks = JSON.parse(JSON.stringify(userData[0].picks)).filter(
      (list) => list.category === `episode${episodeNum}`
    );

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
                    {pick.title}
                  </TableCell>
                  <TableCell>
                    <img
                      className={
                        pick.result === "correct"
                          ? "leagueDetails__rosterIMG2"
                          : "leagueDetails__rosterIMG"
                      }
                      src={pick.queenIMG}
                    ></img>
                  </TableCell>
                  <TableCell>{pick.queenName}</TableCell>
                  <TableCell>
                    {pick.result === "correct" ? pick.pointValue : 0}
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

          <p>&ensp; Select Roster for Episode {page}</p>
        </div>
      );
    }
  }

  function renderSeasonPicks() {
    const userData = JSON.parse(JSON.stringify(LEAGUE_MEMBERS_DATA)).filter(
      (user) => user.userID === currentUser.uid
    );

    const seasonPicks = JSON.parse(JSON.stringify(userData[0].picks)).filter(
      (list) => list.category === `season`
    );

    if (seasonPicks.length > 0) {
      return seasonPicks[0].picks.map((pick) => (
        <Grid
          className={
            RESULTS["season"][`${pick.id}`] === pick.queenID
              ? "leagueDetails__rosterIMG2"
              : "leagueDetails__rosterIMG"
          }
          item
          xs={12}
          md={3}
        >
          <Typography align="center" variant="h6">
            {pick.title}
          </Typography>
          <Typography align="center" variant="subtitle2">
            {pick.pointValue} POINTS POSSIBLE
          </Typography>
          <img className="leagueDetails__rosterIMG2" src={pick.queenIMG}></img>
          <p>{pick.queenName}</p>
          <p className="pointsBadge">
            {RESULTS["season"][`${pick.id}`] === pick.queenID
              ? pick.pointValue
              : 0}
          </p>
        </Grid>
      ));
    } else {
      return (
        <div className="episodePaginationNoResultBox">
          Not currently available
        </div>
      );
    }
  }

  function renderScores() {
    let scores = [];
    let episodeSum, totalSum;

    LEAGUE_MEMBERS_DATA.map((user) => {
      totalSum = 0;
      user.picks.map((scoreEvent) => {
        scoreEvent.picks.map((pick) => {
          if (pick.result === "correct") {
            totalSum += pick.pointValue;
          }
        });
      });
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
