import React from "react";
import { Typography } from "@material-ui/core";
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
        <Typography gutterBottom variant="h4" component="h2" align="left">
          1. CREATE
        </Typography>
        <Typography gutterBottom variant="h6" component="h6" align="left">
          Start off by creating or joining a league. This creates a space within
          a TV show for you and your friends to keep track of your points!
        </Typography>
        <Typography gutterBottom variant="h4" component="h2" align="left">
          2. CHOOSE
        </Typography>
        <Typography gutterBottom variant="h6" component="h6" align="left">
          To earn points, you will select rosters of your favorite reality tv
          show contestants. Each week, you will earn points based on how your
          selected contestants perform!
        </Typography>
        <Typography gutterBottom variant="h4" component="h2" align="left">
          3. COMPETE
        </Typography>
        <Typography gutterBottom variant="h6" component="h6" align="left">
          And that's it! You're ready to compete against your friends!
        </Typography>
      </div>
    </section>
  );
}

export default HomeInstructions;
