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
import s13Poster from "../../assets/images/rpdr_s13_poster.jpg";
import "./SelectEpisodeRoster.css";
import { db, storage } from "../../firebase.js";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import QueenSelect from "../../components/QueenSelect/QueenSelect";
import { Alert } from "@material-ui/lab";
import { findByLabelText } from "@testing-library/react";

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
              console.log("queens", queens);
              console.log("queensArr", queensArr);
            });
            setQueens(queensArr);
          });
      });
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    console.log("EVENT", event);
    const target = event.target;
    const value = JSON.parse(event.target.value);
    const name = target.name;
    setEpisodePicks({ ...episodePicks, [name]: { ...value } });
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
        <FormControl style={{ width: "400px" }}>
          <Select
            required
            defaultValue=""
            labelId="labelID"
            id="categoryID"
            name="categoryID"
            value={JSON.stringify(episodePicks.categoryID) || ""}
            onChange={handleChange}
            MenuProps={{ className: classes.menu }}
          >
            {queens.map((queen) => (
              <MenuItem
                className={`${
                  queen.isEliminated ? "QueenSelect__Eliminated" : ""
                }`}
                value={JSON.stringify(queen)}
                key={queen.queenName}
                style={{ width: "100%" }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    className={`SelectEpisodeRoster__selectImg`}
                    src={queen.queenIMG}
                    alt={`image of ${queen.queenName}`}
                  ></img>
                  <p
                    className={`SelectEpisodeRoster__selectName ${
                      queen.isEliminated ? "QueenSelect__Eliminated" : ""
                    }`}
                  >
                    {queen.queenName}
                  </p>
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Episode Winner Select */}
        <QueenSelect
          queensArr={queens}
          handleChange={(event) => handleChange(event)}
          currPickValue={JSON.stringify(episodePicks.categoryID) || ""}
          pointCategory="Episode Winner"
          pointCategoryId="episodeWinner"
          pointValue="20"
          pointCategoryDescription="This is the winner of the episode. If there is more than one winner,
        points will be assigned if you have selected one of the winners."
        />

        {/* TODO: PASTE BACK QUESTIONS */}
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
