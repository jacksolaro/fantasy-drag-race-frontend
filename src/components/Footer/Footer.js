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
          <Grid item xs={12} sm={12}>
            <Link to="/">
              <img src={derbyLogoWhite} className="Footer__Logo"></img>
            </Link>
            <div>
              <a
                href="https://github.com/jacksolaro"
                target="_blank"
                className="Footer__Icon"
              >
                <GitHubIcon></GitHubIcon>
              </a>
              <a
                href="https://www.linkedin.com/in/jacksolaro/"
                target="_blank"
                className="Footer__Icon"
              >
                <LinkedInIcon></LinkedInIcon>
              </a>
              <a
                href="https://jacksolaro.com/"
                target="_blank"
                className="Footer__Icon"
              >
                <LanguageIcon></LanguageIcon>
              </a>
              <p>
                <a
                  href="https://forms.gle/xwQpscx9uXTRLgYF9"
                  target="_blank"
                  className="Footer__Icon"
                >
                  Submit A Feature Request
                </a>
              </p>
              <p>
                <a
                  href="https://forms.gle/p6pyLEFUr3NAP7NE6"
                  target="_blank"
                  className="Footer__Icon"
                >
                  Report a Bug
                </a>
              </p>
              <Box mt={0} style={{ color: "white" }}>
                © Jack Solaro 2020
              </Box>
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
