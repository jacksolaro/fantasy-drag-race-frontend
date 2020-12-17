import React from "react";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, total) {
  return { name, e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, total };
}

const rows = [
  createData("Jack Solaro", 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20),
  createData("Gabe Ohlsen", 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15),
  createData("Peter Popek", 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10),
  createData("David Schwartz", 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10),
  createData("John Smith", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
];

function LeagueDetails() {
  let params = useParams();
  const classes = useStyles();
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
      <Link>Select Episode Roster</Link>

      {/* League Details */}
      <h3>Next Episode Airs: 1/1/2021</h3>
      <h3>Roster Status: NOT SUBMITTED</h3>

      {/* dashboard */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <h2>Leaderboard</h2>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Episode 1</TableCell>
                  <TableCell align="right">Episode 2</TableCell>
                  <TableCell align="right">Episode 3</TableCell>
                  <TableCell align="right">Episode 4</TableCell>
                  <TableCell align="right">Episode 5</TableCell>
                  <TableCell align="right">Episode 6</TableCell>
                  <TableCell align="right">Episode 7</TableCell>
                  <TableCell align="right">Episode 8</TableCell>
                  <TableCell align="right">Episode 9</TableCell>
                  <TableCell align="right">Episode 10</TableCell>
                  <TableCell align="right">TOTAL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.e1}</TableCell>
                    <TableCell align="right">{row.e2}</TableCell>
                    <TableCell align="right">{row.e3}</TableCell>
                    <TableCell align="right">{row.e4}</TableCell>
                    <TableCell align="right">{row.e5}</TableCell>
                    <TableCell align="right">{row.e6}</TableCell>
                    <TableCell align="right">{row.e7}</TableCell>
                    <TableCell align="right">{row.e8}</TableCell>
                    <TableCell align="right">{row.e9}</TableCell>
                    <TableCell align="right">{row.e10}</TableCell>
                    <TableCell align="right">{row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <div>
            <h2>Weekly Recap</h2>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default LeagueDetails;
