import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import "./QueenSelect.css";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    minWidth: 250,
    "& .MuiPaper-root": {
      backgroundColor: "white",
    },
    "& .MuiMenu-list": {
      backgroundColor: "white",
    },
    "& .MuiMenuItem-root": {
      float: "left",
    },
    formControl: {
      width: 250,
      backgroundColor: "white",
    },
  },
});

function QueenSelect(props) {
  const classes = useStyles();
  return (
    <div>
      {/* Episode Winner Select */}
      <div className="QueenSelect__Card">
        <Grid container>
          <Grid item xs={8} sm={8}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.pointCategory}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} align="right">
            <Typography
              gutterBottom
              variant="subtitle1"
              component="subtitle1"
              className="QueenSelect__PointValue"
            >
              {props.pointValue} POINTS
            </Typography>
          </Grid>
        </Grid>
        <p>{props.pointCategoryDescription}</p>

        <div>
          <FormControl className={classes.root}>
            <InputLabel id="demo-simple-select-label">
              {props.pointCategory}
            </InputLabel>
            <Select
              required
              labelId={props.pointCategoryId}
              id={props.pointCategoryId}
              name={props.pointCategoryId}
              value={props.currPickValue}
              onChange={props.handleChange}
            >
              {props.queensArr.map((queen) => (
                <div
                  value={queen}
                  key={queen.queenName}
                  className={classes.root}
                >
                  <MenuItem className={classes.root}>
                    <img
                      className="SelectEpisodeRoster__selectImg"
                      src={queen.queenIMG}
                      alt={`image of ${queen.queenName}`}
                    ></img>
                    <p className="SelectEpisodeRoster__selectName">
                      {queen.queenName}
                    </p>
                  </MenuItem>
                </div>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default QueenSelect;
