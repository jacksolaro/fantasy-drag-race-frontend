import React from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import createLeagueBkg from "../../assets/images/bkg-2.jpg";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";

function CreateLeague() {
  const [formData, setFormData] = React.useState({
    leagueName: "",
    leagueDescription: "",
  });

  const { currentUser } = useAuth();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    db.collection("leagues").add({
      leagueName: formData.leagueName,
      members: [currentUser.uid],
      scores: [
        {
          email: currentUser.email,
          score: 0,
          userID: currentUser.uid,
        },
      ],
    });
  };

  return (
    <div>
      <Jumbotron
        image={createLeagueBkg}
        height="300"
        headline="CREATE A LEAGUE"
      ></Jumbotron>
      <Container maxWidth="md">
        <h1>Create a League</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              required
              name="leagueName"
              id="leagueName"
              label="League Name"
              defaultValue=""
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              required
              name="leagueDescription"
              id="leagueDescription"
              label="League Description"
              defaultValue=""
              onChange={handleChange}
            />
          </div>
          <button>Create League</button>
        </form>
      </Container>
    </div>
  );
}

export default CreateLeague;
