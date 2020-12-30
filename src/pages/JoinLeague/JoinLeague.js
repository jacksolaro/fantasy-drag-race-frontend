import React from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import joinLeagueBkg from "../../assets/images/bkg-2.jpg";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useParams } from "react-router-dom";
import { db } from "../../firebase.js";
import firebase from "firebase/app";
import { useAuth } from "../../contexts/AuthContext";

function JoinLeague() {
  let params = useParams();
  const { currentUser } = useAuth();
  const [formData, setFormData] = React.useState({
    leagueID: "",
  });

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
        scores: firebase.firestore.FieldValue.arrayUnion({
          email: currentUser.email,
          score: 0,
          userID: currentUser.uid,
        }),
      });
  };

  return (
    <div>
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
          <button>JOIN LEAGUE</button>
        </form>
      </Container>
    </div>
  );
}

export default JoinLeague;
