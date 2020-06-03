import React, { forwardRef } from "react";
import { AppBar, UserMenu, MenuItemLink, useTranslate } from "react-admin";
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { ReactComponent as Logo } from "../assets/images/logo.svg";

const styles = {
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    fontFamily: ["facitRegular", "sans-serif"].join(","),
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  spacer: {
    flex: 1,
  },
  bar: {
    backgroundColor: "#fff",
  },
};

const ParmeterMenu = forwardRef((props, ref) => {
  const translate = useTranslate();
  return (
    <MenuItemLink
      ref={ref}
      to="/user-parameters"
      title=""
      primaryText={translate("parameters")}
      leftIcon={<SettingsIcon />}
      onClick={props.onClick}
    />
  );
});

const CustomUserMenu = (props) => (
  <UserMenu {...props}>
    <ParmeterMenu />
  </UserMenu>
);

const rere = withStyles(styles)(({ classes, ...props }) => (
  <AppBar {...props} className={classes.bar} userMenu={<CustomUserMenu />}>
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
