import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import s13Poster from "../../assets/images/rpdr_s13_poster.jpg";
import "./SelectEpisodeRoster.css";
import { db, storage } from "../../firebase.js";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import QueenSelect from "../../components/QueenSelect/QueenSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const EPISODE_NUM = 1;

function SelectEpisodeRoster() {
  const classes = useStyles();
  const [queens, setQueens] = React.useState([]);
  const [episodePicks, setEpisodePicks] = React.useState({
    episodeWinner: "",
    maxiChallengeWinner: "",
    miniChallengeWinner: "",
    topQueen1: "",
    topQueen2: "",
    bottomQueen1: "",
    bottomQueen2: "",
    eliminated: "",
  });

  const [pickData, setPickData] = React.useState({
    category: `episode${EPISODE_NUM}`,
    picks: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();
  let params = useParams();

  useEffect(() => {
    const queensArr = [];
    db.collection("shows")
      .doc("RPDR")
      .collection("seasons")
      .doc("US_Reg_13")
      .collection("queens")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          queensArr.push(doc.data());
          console.log("queens", queens);
          console.log("queensArr", queensArr);
        });
        setQueens(queensArr);
      });
  }, []);

  const handleChange = (pointCategory, event) => {
    event.preventDefault();
    const { name, value } = event.target;
    value.id = name;
    value.pointCategory = pointCategory;
    console.log(event.target);
    setEpisodePicks({ ...episodePicks, [name]: value });
    console.log("episodePicks", Object.values(episodePicks));
    console.log("actual episode picks", episodePicks);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // TODO: If current user isnt member of league, do not submit
    // if (signUpFormState.password !== signUpFormState.passwordConfirm) {
    //   return setError("Passwords do not match");
    // }

    const submittedArr = {
      category: `episode${EPISODE_NUM}`,
      picks: Object.values(episodePicks),
    };
    console.log("SUBMITTING: ", submittedArr);

    // try {
    console.log("STEP 1");
    setError("");
    setLoading(true);
    db.collection(`leagues`)
      .doc(params.id)
      .collection("picks")
      .where("userID", "==", currentUser.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          db.collection("leagues")
            .doc(params.id)
            .collection("picks")
            .doc(doc.id)
            .update({
              picks: firebase.firestore.FieldValue.arrayUnion(submittedArr),
            });
          console.log("Success ", doc.id, " => ", doc.data());
          console.log("STEP 2");
        });
      })
      .catch(function (error) {
        setError("Error writing document: ", error);
        console.log("ERROR ", error);
      });

    history.push(`/leagues/${params.id}`);
    setLoading(false);
    console.log("STEP 3");
  }

  return (
    <div>
      <h1>Select Episode Roster</h1>
      <p>
        These are your picks for this episode. Once you lock these in, you
        cannot change them for the remainder of the season.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Episode Winner Select */}
        <QueenSelect
          queensArr={queens}
          handleChange={(event) => handleChange("Episode Winner", event)}
          currPickValue={episodePicks.episodeWinner}
          pointCategory="Episode Winner"
          pointCategoryId="episodeWinner"
          pointValue="20"
          pointCategoryDescription="This is the winner of the episode. If there is more than one winner,
        points will be assigned if you have selected one of the winners."
        />

        {/* Maxi Challenge Winner Select */}
        <QueenSelect
          queensArr={queens}
          handleChange={(event) => handleChange("Maxi Challenge Winner", event)}
          currPickValue={episodePicks.maxiChallengeWinner}
          pointCategory="Maxi Challenge Winner"
          pointCategoryId="maxiChallengeWinner"
          pointValue="10"
          pointCategoryDescription="This is the winner of the main challenge of the episode. If there is
          more than one winner, points will be awarded if you have selected
          one of the winners."
        />

        {/* Mini Challenge Winner Select */}
        <QueenSelect
          queensArr={queens}
          handleChange={(event) => handleChange("Mini Challenge Winner", event)}
          currPickValue={episodePicks.miniChallengeWinner}
          pointCategory="Mini Challenge Winner"
          pointCategoryId="miniChallengeWinner"
          pointValue="10"
          pointCategoryDescription="This is the winner of the main challenge of the episode. If there is
          more than one winner, points will be awarded if you have selected
          one of the winners."
        />

        {/* Top 2 of the Week Select */}
        <div>
          <h2>Top 2 of the Week</h2>
          <h3>5 Points Each</h3>
          <p>
            This is the top two queens of the week (in no particular order). If
            there is a number of queens in the top other than 2, you will
            receive points for each queen you have that is in the top.
          </p>

          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Top Queen of the Week #1
              </InputLabel>
              <Select
                labelId="topQueen1"
                id="topQueen1"
                name="topQueen1"
                value={episodePicks.topQueen1}
                onChange={(event) => handleChange("Top Queen #1", event)}
                className="SelectEpisodeRoster__Select"
              >
                {queens.map((queen) => (
                  <div value={queen} key={queen.queenName}>
                    <MenuItem className="SelectEpisodeRoster__MenuItem">
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
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Top Queen of the Week #2
              </InputLabel>
              <Select
                labelId="topQueen2"
                id="topQueen2"
                name="topQueen2"
                value={episodePicks.topQueen2}
                onChange={(event) => handleChange("Top Queen #2", event)}
                className="SelectEpisodeRoster__Select"
              >
                {queens.map((queen) => (
                  <div value={queen} key={queen.queenName}>
                    <MenuItem className="SelectEpisodeRoster__MenuItem">
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

        {/* Bottom 2 of the Week Select */}
        <div>
          <h2>Bottom 2 of the Week</h2>
          <h3>5 Points Each</h3>
          <p>
            This is the bottom two queens of the week (in no particular order).
            If there is a number of queens in the bottom other than 2, you will
            receive points for each queen you have that is in the bottom.
          </p>

          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Bottom Queen of the Week #1
              </InputLabel>
              <Select
                labelId="bottomQueen1"
                id="bottomQueen1"
                name="bottomQueen1"
                value={episodePicks.bottomQueen1}
                onChange={(event) => handleChange("Bottom Queen #1", event)}
                className="SelectEpisodeRoster__Select"
              >
                {queens.map((queen) => (
                  <div value={queen} key={queen.queenName}>
                    <MenuItem className="SelectEpisodeRoster__MenuItem">
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
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Bottom Queen of the Week #2
              </InputLabel>
              <Select
                labelId="bottomQueen2"
                id="bottomQueen2"
                name="bottomQueen2"
                value={episodePicks.bottomQueen2}
                onChange={(event) => handleChange("Bottom Queen #2", event)}
                className="SelectEpisodeRoster__Select"
              >
                {queens.map((queen) => (
                  <div value={queen} key={queen.queenName}>
                    <MenuItem className="SelectEpisodeRoster__MenuItem">
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

        {/* Eliminated Queen Select */}
        <QueenSelect
          queensArr={queens}
          handleChange={(event) => handleChange("Eliminated Queen", event)}
          currPickValue={episodePicks.eliminated}
          pointCategory="Eliminated Queen"
          pointCategoryId="eliminated"
          pointValue="10"
          pointCategoryDescription="This is the queen that you think will get eliminated this episode.
          If there is more than one queens eliminated, points will be awarded
          if you have selected one of the winners. If double shantay, no
          points will be awarded."
        />

        <Button type="submit" variant="contained" color="primary">
          Submit Season Picks
        </Button>
      </form>
    </div>
  );
}

export default SelectEpisodeRoster;
