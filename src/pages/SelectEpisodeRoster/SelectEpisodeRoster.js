import {
  Button,
  Container,
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
  const [episodePicks, setEpisodePicks] = React.useState({});

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();
  let params = useParams();

  useEffect(() => {
    const queensArr = [];
    db.collection("leagues")
      .doc(params.id)
      .get()
      .then(function (doc) {
        console.log("SCHWOOOOP", doc.data());
        db.collection("shows")
          .doc(doc.data().showDetails.showID)
          .collection("contestants")
          .get()
          .then(function (docsArr) {
            console.log(docsArr.docs[0].data());
            docsArr.docs.map((doc) => {
              queensArr.push(doc.data());
              console.log("queens", queens);
              console.log("queensArr", queensArr);
            });
            setQueens(queensArr);
          });
      });
  }, []);

  const handleChange = (pointValue, pointCategory, event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setEpisodePicks({
      ...episodePicks,
      [name]: { ...value, id: name, pointValue, pointCategory },
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // TODO: If current user isnt member of league, do not submit
    // if (signUpFormState.password !== signUpFormState.passwordConfirm) {
    //   return setError("Passwords do not match");
    // }

    const submittedArr = {
      category: `episode${params.episodeNum}`,
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
          history.push(`/leagues/${params.id}`);
        });
      })
      .catch(function (error) {
        setError("Error writing document: ", error);
        console.log("ERROR ", error);
      });

    setLoading(false);
    console.log("STEP 3");
  }

  return (
    <Container>
      <h1>Select Episode Roster</h1>
      <p>
        These are your picks for this episode. Submitting these picks will lock
        them in for this episode.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Episode Winner Select */}
        <QueenSelect
          queensArr={queens}
          handleChange={(event) => handleChange(20, "Episode Winner", event)}
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
          handleChange={(event) =>
            handleChange(10, "Maxi Challenge Winner", event)
          }
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
          handleChange={(event) =>
            handleChange(10, "Mini Challenge Winner", event)
          }
          currPickValue={episodePicks.miniChallengeWinner}
          pointCategory="Mini Challenge Winner"
          pointCategoryId="miniChallengeWinner"
          pointValue="10"
          pointCategoryDescription="This is the winner of the main challenge of the episode. If there is
          more than one winner, points will be awarded if you have selected
          one of the winners."
        />

        {/* Top #1 Select */}
        <QueenSelect
          queensArr={queens}
          handleChange={(event) => handleChange(5, "Top Queen #1", event)}
          currPickValue={episodePicks.topQueen1}
          pointCategory="Top Queen #1"
          pointCategoryId="topQueen1"
          pointValue="5"
          pointCategoryDescription="This is the top two queens of the week (in no particular order). If
          there is a number of queens in the top other than 2, you will
          receive points for each queen you have that is in the top."
        />

        {/* Top #2 Select */}
        <QueenSelect
          queensArr={queens}
          handleChange={(event) => handleChange(5, "Top Queen #2", event)}
          currPickValue={episodePicks.topQueen2}
          pointCategory="Top Queen #2"
          pointCategoryId="topQueen2"
          pointValue="5"
          pointCategoryDescription="This is the top queen #1 of the week (in no particular order). If
          there is a number of queens in the top other than 2, you will
          receive points for each queen you have that is in the top."
        />

        {/* Bottom #1 Select */}
        <QueenSelect
          queensArr={queens}
          handleChange={(event) => handleChange(5, "Bottom Queen #1", event)}
          currPickValue={episodePicks.bottomQueen1}
          pointCategory="Bottom Queen #1"
          pointCategoryId="bottomQueen1"
          pointValue="5"
          pointCategoryDescription="This is the bottom queen #1 of the week (in no particular order).
          If there is a number of queens in the bottom other than 2, you will
          receive points for each queen you have that is in the bottom."
        />

        {/* Bottom #2 Select */}
        <QueenSelect
          queensArr={queens}
          handleChange={(event) => handleChange(5, "Bottom Queen #2", event)}
          currPickValue={episodePicks.bottomQueen2}
          pointCategory="Bottom Queen #2"
          pointCategoryId="bottomQueen2"
          pointValue="5"
          pointCategoryDescription="This is the bottom queen #2 of the week (in no particular order).
          If there is a number of queens in the bottom other than 2, you will
          receive points for each queen you have that is in the bottom."
        />

        {/* Eliminated Queen Select */}
        <QueenSelect
          queensArr={queens}
          handleChange={(event) => handleChange(10, "Eliminated Queen", event)}
          currPickValue={episodePicks.eliminated}
          pointCategory="Eliminated Queen"
          pointCategoryId="eliminated"
          pointValue="10"
          pointCategoryDescription="This is the queen that you think will get eliminated this episode.
          If there is more than one queens eliminated, points will be awarded
          if you have selected one of the winners. If double shantay, no
          points will be awarded."
        />
        <br></br>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          style={{ backgroundColor: "#0099FF", color: "white" }}
        >
          Submit Episode Picks
        </Button>
      </form>
      <br></br>
      <br></br>
      <br></br>
    </Container>
  );
}

export default SelectEpisodeRoster;
