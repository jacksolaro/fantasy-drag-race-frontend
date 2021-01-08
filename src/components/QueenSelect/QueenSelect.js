import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import "./QueenSelect.css";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    minWidth: 400,
    "& .MuiPaper-root": {
      backgroundColor: "white",
    },
    "& .MuiMenu-list": {
      backgroundColor: "white",
    },
    formControl: {
      minWidth: 400,
      backgroundColor: "white",
    },
  },
});

function QueenSelect(props) {
  const classes = useStyles();
  return (
    <div>
      {/* Episode Winner Select */}
      <div>
        <h2>{props.pointCategory}</h2>
        <h3>{props.pointValue} Points</h3>
        <p>{props.pointCategoryDescription}</p>

        <div>
          <FormControl className={classes.root}>
            <InputLabel id="demo-simple-select-label">
              {props.pointCategory}
            </InputLabel>
            <Select
              labelId={props.pointCategoryId}
              id={props.pointCategoryId}
              name={props.pointCategoryId}
              value={props.currPickValue}
              onChange={props.handleChange}
            >
              {props.queensArr.map((queen) => (
                <div value={queen} key={queen.name}>
                  <MenuItem className={classes.root}>
                    <img
                      className="SelectEpisodeRoster__selectImg"
                      src={queen.imageURL}
                      alt={`image of ${queen.name}`}
                    ></img>
                    <p className="SelectEpisodeRoster__selectName">
                      {queen.name}
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
