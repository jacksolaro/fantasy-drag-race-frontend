import React from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import createLeagueBkg from "../../assets/images/bkg-2.jpg";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

function CreateLeague() {
  const [formData, setFormData] = React.useState({
    leagueName: "",
    leagueDescription: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <Jumbotron image={createLeagueBkg} headline="CREATE A LEAGUE"></Jumbotron>
      <Container maxWidth="md">
        <h1>Create a League</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </p>
        <form>
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
