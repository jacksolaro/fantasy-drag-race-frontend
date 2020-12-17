import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import s13Poster from "../../assets/images/rpdr_s13_poster.jpg";
import "./SelectSeasonRoster.css";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SelectSeasonRoster() {
  const classes = useStyles();
  const [seasonPicks, setSeasonPicks] = React.useState({
    seasonWinner: "",
    missCongeniality: "",
    firstEliminated: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();
  let params = useParams();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(event.target);
    setSeasonPicks({ ...seasonPicks, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // TODO: If current user isnt member of league, do not submit
    // if (signUpFormState.password !== signUpFormState.passwordConfirm) {
    //   return setError("Passwords do not match");
    // }

    try {
      setError("");
      setLoading(true);
      db.collection(`leagues`).doc(params.id).collection("picks").add({
        userID: currentUser.uid,
        seasonPicks: { seasonPicks },
        episodePicks: [],
      });
      history.push(`/leagues/${params.id}`);
    } catch {
      setError("Failed to save Season Picks");
      console.log("something went wrong");
    }
    setLoading(false);
  }

  return (
    <div>
      <h1>Select Season Roster</h1>
      <p>
        These are your picks for the season. Once you lock these in, you cannot
        change them for the remainder of the season.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Season Winner Select */}
        <div>
          <h2>Season Winner</h2>
          <p>
            This is the winner of the season. If there is more than one winner,
            points will be assigned if you have selected one of the winners.
          </p>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Season Winner
              </InputLabel>
              <Select
                labelId="seasonWinner"
                id="seasonWinner"
                name="seasonWinner"
                value={seasonPicks.seasonWinner}
                onChange={handleChange}
                className="SelectSeasonRoster__Select"
              >
                <div value={10}>
                  <MenuItem className="SelectSeasonRoster__MenuItem">
                    <img
                      className="SelectSeasonRoster__selectImg"
                      src={s13Poster}
                    ></img>
                    <p className="SelectSeasonRoster__selectName">
                      Miss Vangie
                    </p>
                  </MenuItem>
                </div>
                <div value={20}>
                  <MenuItem className="SelectSeasonRoster__MenuItem">
                    <img
                      className="SelectSeasonRoster__selectImg"
                      src={s13Poster}
                    ></img>
                    <p className="SelectSeasonRoster__selectName">Trixie</p>
                  </MenuItem>
                </div>
                <div value={30}>
                  <MenuItem className="SelectSeasonRoster__MenuItem">
                    <img
                      className="SelectSeasonRoster__selectImg"
                      src={s13Poster}
                    ></img>
                    <p className="SelectSeasonRoster__selectName">Katya</p>
                  </MenuItem>
                </div>
                <div value={40}>
                  <MenuItem className="SelectSeasonRoster__MenuItem">
                    <img
                      className="SelectSeasonRoster__selectImg"
                      src={s13Poster}
                    ></img>
                    <p className="SelectSeasonRoster__selectName">Delta Work</p>
                  </MenuItem>
                </div>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Miss Congeniality Select */}
        <div>
          <h2>Miss Congeniality</h2>
          <p>
            Miss Congeniality award goes to the Fan Favorite of the season on
            the final episode.
          </p>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Miss Congeniality
              </InputLabel>
              <Select
                labelId="missCongeniality"
                id="missCongeniality"
                name="missCongeniality"
                value={seasonPicks.missCongeniality}
                onChange={handleChange}
                className="SelectSeasonRoster__Select"
              >
                <div value={10}>
                  <MenuItem className="SelectSeasonRoster__MenuItem">
                    <img
                      className="SelectSeasonRoster__selectImg"
                      src={s13Poster}
                    ></img>
                    <p className="SelectSeasonRoster__selectName">
                      Miss Vangie
                    </p>
                  </MenuItem>
                </div>
                <div value={20}>
                  <MenuItem className="SelectSeasonRoster__MenuItem">
                    <img
                      className="SelectSeasonRoster__selectImg"
                      src={s13Poster}
                    ></img>
                    <p className="SelectSeasonRoster__selectName">Trixie</p>
                  </MenuItem>
                </div>
                <div value={30}>
                  <MenuItem className="SelectSeasonRoster__MenuItem">
                    <img
                      className="SelectSeasonRoster__selectImg"
                      src={s13Poster}
                    ></img>
                    <p className="SelectSeasonRoster__selectName">Katya</p>
                  </MenuItem>
                </div>
                <div value={40}>
                  <MenuItem className="SelectSeasonRoster__MenuItem">
                    <img
                      className="SelectSeasonRoster__selectImg"
                      src={s13Poster}
                    ></img>
                    <p className="SelectSeasonRoster__selectName">Delta Work</p>
                  </MenuItem>
                </div>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* First Eliminated Select */}
        <div>
          <h2>First Eliminated</h2>
          <p>
            Select who you think will be the first eliminated. You will get
            points if you guess this correctly. If there is no elimination on
            episode one, points will be assigned when the first queen is
            eliminated.
          </p>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                First Eliminated
              </InputLabel>
              <Select
                labelId="firstEliminated"
                id="firstEliminated"
                name="firstEliminated"
                value={seasonPicks.firstEliminated}
                onChange={handleChange}
                className="SelectSeasonRoster__Select"
              >
                <div value={10}>
                  <MenuItem className="SelectSeasonRoster__MenuItem">
                    <img
                      className="SelectSeasonRoster__selectImg"
                      src={s13Poster}
                    ></img>
                    <p className="SelectSeasonRoster__selectName">
                      Miss Vangie
                    </p>
                  </MenuItem>
                </div>
                <div value={20}>
                  <MenuItem className="SelectSeasonRoster__MenuItem">
                    <img
                      className="SelectSeasonRoster__selectImg"
                      src={s13Poster}
                    ></img>
                    <p className="SelectSeasonRoster__selectName">Trixie</p>
                  </MenuItem>
                </div>
                <div value={30}>
                  <MenuItem className="SelectSeasonRoster__MenuItem">
                    <img
                      className="SelectSeasonRoster__selectImg"
                      src={s13Poster}
                    ></img>
                    <p className="SelectSeasonRoster__selectName">Katya</p>
                  </MenuItem>
                </div>
                <div value={40}>
                  <MenuItem className="SelectSeasonRoster__MenuItem">
                    <img
                      className="SelectSeasonRoster__selectImg"
                      src={s13Poster}
                    ></img>
                    <p className="SelectSeasonRoster__selectName">Delta Work</p>
                  </MenuItem>
                </div>
              </Select>
            </FormControl>
          </div>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit Season Picks
        </Button>
      </form>
    </div>
  );
}

export default SelectSeasonRoster;
