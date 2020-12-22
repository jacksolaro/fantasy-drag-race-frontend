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
import { Grid } from "@material-ui/core";
import { db } from "../../firebase";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CURRENT_EPISODE = {
  episodeNum: 1,
  airDate: Date(1 / 1 / 2020),
};

const LEAGUE_DATA = {
  scores: [
    {
      name: "Jack Solaro",
      score: 20,
    },
    {
      name: "Gabe Ohlsen",
      score: 15,
    },
    {
      name: "Peter Popek",
      score: 10,
    },
    {
      name: "David Schwartz",
      score: 10,
    },
  ],
};

function LeagueDetails() {
  let params = useParams();
  const classes = useStyles();
  const [leagueData, setLeagueData] = useState([{}]);

  useEffect(() => {
    db.collection("leagues")
      .doc(params.id)
      .get()
      .then((doc) => {
        console.log(doc.data());
        setLeagueData(doc.data());
      })
      .catch((error) => console.log("Error", error));

    console.log("leagueData", leagueData);
  }, []);

  return (
    <div>
      {/* TODO: redirect or show 404 if there is no league */}
      <h1>You Betta Werk!</h1>
      <h3>RuPaul's Drag Race, Season 13</h3>
      <h3>LEAGUE CODE: {params.id}</h3>

      {/* ACTIONS */}
      <Link to={`/leagues/${params.id}/selectseasonroster`}>
        Select Season Roster
      </Link>
      <Link to={`/leagues/${params.id}/selectepisoderoster`}>
        Select Episode Roster
      </Link>

      {/* League Details */}
      <h3>Next Episode Airs: 1/1/2021</h3>
      <h3>Roster Status: NOT SUBMITTED</h3>

      {/* dashboard */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <h2>Leaderboard</h2>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
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
        <Grid item xs={12} md={4}>
          <div>
            <h2>YOUR ROSTER</h2>
            <h3>EPISODE: {CURRENT_EPISODE.episodeNum}</h3>
          </div>
        </Grid>
      </Grid>
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
