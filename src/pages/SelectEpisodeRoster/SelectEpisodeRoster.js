import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import "./SelectEpisodeRoster.css";
import { db, storage } from "../../firebase.js";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import QueenSelect from "../../components/QueenSelect/QueenSelect";
import { Alert } from "@material-ui/lab";
import pickQuestions from "../../utils/dragRaceEpisodePicksTemplate.json";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 300,
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
  const [snackbarStatus, setSnackbarStatus] = React.useState({
    isOpen: false,
    status: "",
    text: "",
  });
  const { currentUser } = useAuth();
  let params = useParams();

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarStatus({ ...snackbarStatus, isOpen: false });
  };

  const handleClick = () => {
    setSnackbarStatus({ ...snackbarStatus, isOpen: true });
  };

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
            });
            setQueens(queensArr);
          });
      });
  }, []);

  const handleChange = (pointValue, pointCategory, event) => {
    event.preventDefault();
    console.log("EVENT", event);
    const target = event.target;
    const value = JSON.parse(event.target.value);
    const name = target.name;
    setEpisodePicks({
      ...episodePicks,
      [name]: { ...value, pointValue, pointCategory },
    });
    console.log("EPISODE PICKS", episodePicks);
  };

  async function handleSubmit(e) {
    e.preventDefault();

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
            })
            .then(() => {
              console.log("Success ", doc.id, " => ", doc.data());
              console.log("STEP 2");
              history.push({
                pathname: `/leagues/${params.id}`,
                data: snackbarStatus,
              });
            });
        });
      })
      .catch(function (error) {
        setError("Error writing document: ", error);
        console.log("ERROR ", error);
        setSnackbarStatus({
          ...snackbarStatus,
          status: "error",
          text: "Error. Something went wrong!",
          isOpen: true,
        });
      });

    setLoading(false);
    console.log("STEP 3");
    setSnackbarStatus({
      ...snackbarStatus,
      status: "success",
      text: "Yay! Your picks were submitted!",
      isOpen: true,
    });
  }

  return (
    <Container>
      <h1>Select Episode Roster</h1>
      <p>
        These are your picks for this episode. Submitting these picks will lock
        them in for this episode.
      </p>
      <Snackbar
        open={snackbarStatus.isOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          variant="filled"
          severity={snackbarStatus.status}
          color={snackbarStatus.status}
        >
          {snackbarStatus.text}
        </Alert>
      </Snackbar>

      <form onSubmit={handleSubmit}>
        {pickQuestions.map((pickQuestion) => (
          <QueenSelect
            queensArr={queens}
            handleChange={(event) =>
              handleChange(
                pickQuestion.pointValue,
                pickQuestion.pointCategoryID,
                event
              )
            }
            currPickValue={
              JSON.stringify(episodePicks[`${pickQuestion.pointCategoryId}`]) ||
              ""
            }
            pointCategory={pickQuestion.pointCategory}
            pointCategoryId={pickQuestion.pointCategoryId}
            pointValue={pickQuestion.pointValue}
            pointCategoryDescription={pickQuestion.pointCategoryDescription}
          />
        ))}

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
