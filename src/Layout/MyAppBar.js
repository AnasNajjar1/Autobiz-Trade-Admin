import React from "react";
import { AppBar } from "react-admin";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { ReactComponent as Logo } from "../assets/images/logo.svg";

const styles = {
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    fontFamily: ["facitRegular", "sans-serif"].join(","),
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  spacer: {
    flex: 1
  },
  bar: {
    backgroundColor: "#fff"
  }
};

const rere = withStyles(styles)(({ classes, ...props }) => (
  <AppBar {...props} className={classes.bar}>
    <Typography
      variant="title"
      color="inherit"
      className={classes.title}
      id="react-admin-title"
    />
    <Logo />

    <span className={classes.spacer} />
  </AppBar>
));

export default rere;
