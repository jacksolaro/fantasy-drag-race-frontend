import { Box, Container, Grid, Link, Typography } from "@material-ui/core";
import { Copyright } from "@material-ui/icons";
import React from "react";
import "./Footer.css";

const footers = [
  {
    title: "About",
    description: ["Jack's GitHub"],
  },

  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

function Footer() {
  return (
    <footer className="">
      <Container maxWidth="md" component="footer">
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul className="footer__ul">
                {footer.description.map((item) => (
                  <div className="footer__liWrapper">
                    <li key={item} className="footer__li">
                      <Link href="#" variant="subtitle1" color="textSecondary">
                        {item}
                      </Link>
                    </li>
                  </div>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
          Derby Leagues 2020
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;
