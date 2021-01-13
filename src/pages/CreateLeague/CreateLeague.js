import React from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import createLeagueBkg from "../../assets/images/bkg-2.jpg";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase.js";
import { useHistory } from "react-router-dom";
import "./CreateLeague.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: 50,
    backgroundColor: "#0099ff",
  },
}));

function CreateLeague() {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    leagueName: "",
    leagueDescription: "",
    showDetails: "",
  });
  const history = useHistory();
  const { currentUser } = useAuth();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    db.collection("leagues")
      .add({
        leagueName: formData.leagueName,
        // TODO: SHOW ID IS HARDCODED, NEED TO UPDATE EVENTUALLY
        showDetails: JSON.parse(formData.showDetails),
        members: [currentUser.uid],
        scores: [
          {
            email: currentUser.email,
            score: 0,
            userID: currentUser.uid,
          },
        ],
      })
      .then(function (docRef) {
        db.collection("leagues")
          .doc(docRef.id)
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
      });
    history.push(`/leagues/`);
  };

  return (
    <div className="CreateLeague__Wrapper">
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
            <FormControl>
              <InputLabel id="demo-simple-select-label">Show</InputLabel>
              <Select
                labelId="showDetails"
                id="showDetails"
                name="showDetails"
                value={formData.showDetails}
                onChange={handleChange}
              >
                <MenuItem
                  value={JSON.stringify({
                    showID: "YhoWk1cQLR1WN3qAGgYG",
                    showTitle: "RuPaul's Drag Race",
                    showSeasonNum: "13",
                    showCountry: "US",
                  })}
                >
                  RuPaul's Drag Race US S13
                </MenuItem>
                <MenuItem
                  value={JSON.stringify({
                    showID: "K0baDwCtjiQ1Eo7zLHMQ",
                    showTitle: "RuPaul's Drag Race",
                    showSeasonNum: "2",
                    showCountry: "UK",
                  })}
                >
                  RuPaul's Drag Race UK S2
                </MenuItem>
              </Select>
            </FormControl>
          </div>

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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create League
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default CreateLeague;
