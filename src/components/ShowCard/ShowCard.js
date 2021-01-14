import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
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
        <br></br>
        <Grid container spacing={0} justify="center" alignItems="center">
          {props.isActive ? (
            <>
              <Grid item xs={6} align="center">
                <Link to="/createleague" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    target=""
                    className="leagueBtn"
                    style={{ backgroundColor: "#0099FF" }}
                  >
                    Create League
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6} align="center">
                <Link to="/joinleague" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    target=""
                    className="leagueBtn"
                    style={{ backgroundColor: "#f46291" }}
                  >
                    Join League
                  </Button>
                </Link>
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
