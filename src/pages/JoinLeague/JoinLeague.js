import React from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import joinLeagueBkg from "../../assets/images/bkg-2.jpg";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useParams } from "react-router-dom";
import { db } from "../../firebase.js";
import firebase from "firebase/app";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import "./JoinLeague.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: 50,
    backgroundColor: "#0099ff",
  },
}));

function JoinLeague() {
  const classes = useStyles();
  let params = useParams();
  const { currentUser } = useAuth();
  const [formData, setFormData] = React.useState({
    leagueID: "",
  });
  const history = useHistory();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    db.collection("leagues")
      .doc(formData.leagueID)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
      });

    db.collection(`leagues`)
      .doc(formData.leagueID)
      .collection("picks")
      .add({
        userID: currentUser.uid,
        username: currentUser.displayName,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        // setError("Error writing document: ", error);
        console.log("ERROR ", error);
      });
    history.push(`/leagues/`);
  };

  return (
    <div className="JoinLeague__Wrapper">
      <Jumbotron
        image={joinLeagueBkg}
        height="300"
        headline="JOIN A LEAGUE"
      ></Jumbotron>
      <Container maxWidth="md">
        <h1>Join a League</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              required
              name="leagueID"
              id="leagueID"
              label="League ID"
              defaultValue=""
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Join League
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default JoinLeague;
