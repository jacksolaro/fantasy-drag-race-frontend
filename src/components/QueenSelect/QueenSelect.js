import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 400,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

function QueenSelect(props) {
  //   const classes = useStyles();
  return (
    <div>
      {/* Episode Winner Select */}
      <div>
        <h2>{props.pointCategory}</h2>
        <h3>{props.pointValue} Points</h3>
        <p>{props.pointCategoryDescription}</p>

        <div>
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Episode Winner
            </InputLabel>
            <Select
              labelId="episodeWinner"
              id="episodeWinner"
              name="episodeWinner"
              value={props.currPickValue}
              onChange={props.handleChange}
              className="SelectEpisodeRoster__Select"
            >
              {props.queensArr.map((queen) => (
                <div value={queen} key={queen.name}>
                  <MenuItem className="SelectEpisodeRoster__MenuItem">
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
