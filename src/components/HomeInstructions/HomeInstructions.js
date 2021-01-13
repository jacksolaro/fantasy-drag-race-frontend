import React from "react";
import { Grid, Hidden, Typography } from "@material-ui/core";
import "./HomeInstructions.css";
import AddBoxIcon from "@material-ui/icons/AddBox";
import BallotIcon from "@material-ui/icons/Ballot";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

function HomeInstructions() {
  return (
    <section className="HomeInstructions__Section">
      <Typography gutterBottom variant="h4" component="h2" align="center">
        HOW DOES DERBY WORK?
      </Typography>
      <Typography gutterBottom variant="h6" component="h6" align="center">
        It's simple, really! All you have to do is Create, Choose, and Compete!
      </Typography>
      <div>
        <Grid container spacing={0} justify="center" alignItems="flex-start">
          <Grid
            item
            xs={12}
            md={4}
            align="center"
            className="HomeInstructions__Card"
          >
            <AddBoxIcon className="HomeInstructions__Icon"></AddBoxIcon>
            <Typography gutterBottom variant="h4" component="h2" align="center">
              1. Create a League
            </Typography>
            <Typography gutterBottom variant="h6" component="h6" align="left">
              Start off by creating or joining a league. This creates a space
              within a TV show for you and your friends to keep track of your
              points!
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            align="center"
            className="HomeInstructions__Card"
          >
            <BallotIcon className="HomeInstructions__Icon"></BallotIcon>
            <Typography gutterBottom variant="h4" component="h2" align="center">
              2. Choose Your Roster
            </Typography>
            <Typography gutterBottom variant="h6" component="h6" align="left">
              To earn points, you will select rosters of your favorite reality
              tv show contestants. Each week, you will earn points based on how
              your selected contestants perform!
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            align="center"
            className="HomeInstructions__Card"
          >
            <SupervisedUserCircleIcon className="HomeInstructions__Icon"></SupervisedUserCircleIcon>
            <Typography gutterBottom variant="h4" component="h2" align="center">
              3. Compete with Friends
            </Typography>
            <Typography gutterBottom variant="h6" component="h6" align="left">
              And that's it! You're ready to compete against your friends!
            </Typography>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}

export default HomeInstructions;
