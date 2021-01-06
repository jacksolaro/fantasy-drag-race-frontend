import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "./HomeInstructions.css";

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
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={4} align="left">
            <Typography gutterBottom variant="h4" component="h2" align="left">
              1. CREATE
            </Typography>
            <Typography gutterBottom variant="h6" component="h6" align="left">
              Start off by creating or joining a league. This creates a space
              within a TV show for you and your friends to keep track of your
              points!
            </Typography>
          </Grid>
          <Grid item xs={8} align="center">
            <img src={"http://placekitten.com/401/300"}></img>
          </Grid>
          <Grid item xs={8} align="center">
            <img src={"http://placekitten.com/405/300"}></img>
          </Grid>
          <Grid item xs={4} align="right">
            <Typography gutterBottom variant="h4" component="h2" align="left">
              2. CHOOSE
            </Typography>
            <Typography gutterBottom variant="h6" component="h6" align="left">
              To earn points, you will select rosters of your favorite reality
              tv show contestants. Each week, you will earn points based on how
              your selected contestants perform!
            </Typography>
          </Grid>
          <Grid item xs={4} align="right">
            <Typography gutterBottom variant="h4" component="h2" align="left">
              3. COMPETE
            </Typography>
            <Typography gutterBottom variant="h6" component="h6" align="left">
              And that's it! You're ready to compete against your friends!
            </Typography>
          </Grid>
          <Grid item xs={8} align="center">
            <img src={"http://placekitten.com/400/300"}></img>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}

export default HomeInstructions;
