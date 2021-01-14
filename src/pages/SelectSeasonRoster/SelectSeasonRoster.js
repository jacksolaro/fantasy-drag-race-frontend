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
import "./SelectSeasonRoster.css";
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

const EPISODE_NUM = "season";

function SelectSeasonRoster() {
  const classes = useStyles();
  const [queens, setQueens] = React.useState([]);
  const [seasonPicks, setSeasonPicks] = React.useState({});

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
    setSeasonPicks({
      ...seasonPicks,
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
      category: `season`,
      picks: Object.values(seasonPicks),
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
          history.push(`/leagues/${params.id}`);
          console.log("STEP 2");
        });
      })
      .catch(function (error) {
        setError("Error writing document: ", error);
        console.log("ERROR ", error);
      });

    setLoading(false);
  }

  return (
    <Container>
      <h1>Select Season Roster</h1>
      <p>
        These are your picks for this season. Once you lock these in, you cannot
        change them for the remainder of the season.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Season Winner Select */}
        <QueenSelect
          queensArr={queens}
          handleChange={(event) => handleChange(50, "Season Winner", event)}
          currPickValue={seasonPicks.seasonWinner}
          pointCategory="Season Winner"
          pointCategoryId="seasonWinner"
          pointValue="50"
          pointCategoryDescription="This is the winner of the season. If there is more than one winner,
          points will be assigned if you have selected one of the winners."
        />

        {/* Miss Congeniality */}
        <QueenSelect
          queensArr={queens}
          handleChange={(event) => handleChange(50, "Miss Congeniality", event)}
          currPickValue={seasonPicks.missCongeniality}
          pointCategory="Miss Congeniality"
          pointCategoryId="missCongeniality"
          pointValue="50"
          pointCategoryDescription="Miss Congeniality award goes to the Fan Favorite of the season on
          the final episode."
        />

        {/* Miss Congeniality */}
        <QueenSelect
          queensArr={queens}
          handleChange={(event) => handleChange(50, "First Eliminated", event)}
          currPickValue={seasonPicks.firstEliminated}
          pointCategory="First Eliminated"
          pointCategoryId="firstEliminated"
          pointValue="50"
          pointCategoryDescription="Select who you think will be the first eliminated. You will get points if you guess this correctly. If there is no elimination on episode one, points will be assigned when the first queen is eliminated."
        />

        <br></br>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          style={{ backgroundColor: "#0099FF", color: "white" }}
        >
          Submit Season Picks
        </Button>
      </form>
      <br></br>
      <br></br>
      <br></br>
    </Container>
  );
}

export default SelectSeasonRoster;
