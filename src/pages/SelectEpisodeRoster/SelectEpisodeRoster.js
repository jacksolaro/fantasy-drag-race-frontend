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
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SelectEpisodeRoster() {
  const classes = useStyles();
  const [queens, setQueens] = React.useState([]);
  const [episodePicks, setEpisodePicks] = React.useState({
    episodeNum: 1,
    episodeWinner: "",
    maxiChallengeWinner: "",
    miniChallengeWinner: "",
    topQueen1: "",
    topQueen2: "",
    bottomQueen1: "",
    bottomQueen2: "",
    eliminated: "",
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
        });
        setQueens(queensArr);
      });
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    // console.log(event.target);
    setEpisodePicks({ ...episodePicks, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // TODO: If current user isnt member of league, do not submit
    // if (signUpFormState.password !== signUpFormState.passwordConfirm) {
    //   return setError("Passwords do not match");
    // }

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
              episodePicks: firebase.firestore.FieldValue.arrayUnion(
                episodePicks
              ),
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
        These are your picks for the season. Once you lock these in, you cannot
        change them for the remainder of the season.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Season Winner Select */}
        <div>
          <h2>Episode Winner</h2>
          <p>
            This is the winner of the episode. If there is more than one winner,
            points will be assigned if you have selected one of the winners.
          </p>

          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Episode Winner
              </InputLabel>
              <Select
                labelId="episodeWinner"
                id="episodeWinner"
                name="episodeWinner"
                value={episodePicks.episodeWinner}
                onChange={handleChange}
                className="SelectEpisodeRoster__Select"
              >
                {queens.map((queen) => (
                  <div value={10}>
                    <MenuItem className="SelectEpisodeRoster__MenuItem">
                      <img
                        className="SelectEpisodeRoster__selectImg"
                        src={queen.imageURL}
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
        <Button type="submit" variant="contained" color="primary">
          Submit Season Picks
        </Button>
      </form>
    </div>
  );
}

export default SelectEpisodeRoster;
