import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import s13Poster from "../../assets/images/rpdr_s13_poster.jpg";
import { Grid, Button } from "@material-ui/core/";
import "./ShowCard.css";

function ShowCard(props) {
  return (
    <div className="Card">
      <img
        className="Card__Img"
        src={props.posterIMG}
        alt={`${props.tite} poster`}
      ></img>
      <div className="Card__Content">
        <Typography gutterBottom variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.season}
        </Typography>
        <Grid container spacing={0} justify="center" alignItems="center">
          {props.isActive ? (
            <>
              <Grid item xs={6} align="center">
                <Button
                  variant="contained"
                  color="primary"
                  href="/createleague"
                  target=""
                  className="leagueBtn"
                >
                  Create League
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
                  Join League
                </Button>
              </Grid>
            </>
          ) : (
            <Typography
              variant="h5"
              color="textSecondary"
              component="h5"
              align="center"
            >
              COMING SOON
            </Typography>
          )}
        </Grid>
      </div>
    </div>
    // <Card className="Home__SeasonCard" style={{ backgroundColor: "#EEE" }}>
    //   <CardActionArea className="Home__SeasonCardWrap cardContent">
    //     <img className="Home__SeasonCardImg" src={props.posterIMG}></img>
    //     <CardMedia
    //       className="cardContent"
    //       image={s13Poster}
    //       title="S13 Poster"
    //     />
    //     <CardContent className="cardContent">
    //       <Typography gutterBottom variant="h5" component="h2">
    //         {props.title}
    //       </Typography>
    //       <Typography variant="body2" color="textSecondary" component="p">
    //         {props.season}
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Grid container spacing={0} justify="center" alignItems="center">
    //       {props.isActive ? (
    //         <>
    //           <Grid item xs={6} align="center">
    //             <Button
    //               variant="contained"
    //               color="primary"
    //               href="/createleague"
    //               target=""
    //               className="leagueBtn"
    //             >
    //               Create A League
    //             </Button>
    //           </Grid>
    //           <Grid item xs={6} align="center">
    //             <Button
    //               variant="contained"
    //               color="secondary"
    //               href="/joinleague"
    //               target=""
    //               className="leagueBtn"
    //             >
    //               Join a League
    //             </Button>
    //           </Grid>
    //         </>
    //       ) : (
    //         <Typography
    //           variant="h5"
    //           color="textSecondary"
    //           component="h5"
    //           align="center"
    //         >
    //           COMING SOON
    //         </Typography>
    //       )}
    //     </Grid>
    //   </CardActions>
    // </Card>
  );
}

export default ShowCard;
