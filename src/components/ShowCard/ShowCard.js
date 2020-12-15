import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import s13Poster from "../../assets/images/rpdr_s13_poster.jpg";
import { Grid, Button } from "@material-ui/core/";

function ShowCard() {
  return (
    <Card className="Home__SeasonCard">
      <CardActionArea className="Home__SeasonCardWrap">
        <img className="Home__SeasonCardImg" src={s13Poster}></img>
        <CardMedia image={s13Poster} title="S13 Poster" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            RuPaul's Drag Race
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Season 13
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={6} align="center">
            <Button
              variant="contained"
              color="primary"
              href="/createleague"
              target=""
              className="leagueBtn"
            >
              Create A League
            </Button>
          </Grid>
          <Grid item xs={6} align="center">
            <Button
              variant="contained"
              color="secondary"
              href="/joinleague"
              target=""
              className="leagueBtn"
            >
              Join a League
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default ShowCard;
