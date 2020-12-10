import React from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import joinLeagueBkg from "../../assets/images/bkg-2.jpg";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

function JoinLeague() {
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
        <form>
          <div>
            <TextField
              required
              name="leagueCode"
              id="leagueCode"
              label="League Code"
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
