import { Box, Container, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Copyright } from "@material-ui/icons";
import React from "react";
import "./Footer.css";
import derbyLogoWhite from "../../assets/images/derby_logo_white-01.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LanguageIcon from "@material-ui/icons/Language";

function Footer() {
  return (
    <footer className="">
      <Container maxWidth="md" component="footer">
        <Grid
          container
          spacing={4}
          justify="space-evenly"
          className="Footer__Container"
        >
          <Grid item xs={6} sm={4}>
            <Link to="/">
              <img src={derbyLogoWhite} className="Footer__Logo"></img>
            </Link>
            <div>
              <Link to="https://github.com/jacksolaro" className="Footer__Icon">
                <GitHubIcon></GitHubIcon>
              </Link>
              <Link
                to="https://www.linkedin.com/in/jacksolaro/"
                className="Footer__Icon"
              >
                <LinkedInIcon></LinkedInIcon>
              </Link>
              <Link to="https://jacksolaro.com/" className="Footer__Icon">
                <LanguageIcon></LanguageIcon>
              </Link>
            </div>
          </Grid>
        </Grid>
        <Box mt={0} style={{ color: "white" }}>
          © Jack Solaro 2020
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;
