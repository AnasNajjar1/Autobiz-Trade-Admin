import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useTranslate, useLocale, useSetLocale, Title } from "react-admin";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  label: { width: "10em", display: "inline-block" },
  button: { margin: "1em" },
});

const UserParameters = () => {
  const translate = useTranslate();
  const locale = useLocale();
  const setLocale = useSetLocale();
  const classes = useStyles();

  return (
    <Card>
      <Title title={translate("parameters")} />

      <CardContent>
        <div className={classes.label}>{translate("language")}</div>

        <Button
          variant="contained"
          className={classes.button}
          color={locale === "en" ? "primary" : "default"}
          onClick={() => setLocale("en")}
        >
          en
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          color={locale === "fr" ? "primary" : "default"}
          onClick={() => setLocale("fr")}
        >
          fr
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          color={locale === "de" ? "primary" : "default"}
          onClick={() => setLocale("de")}
        >
          de
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          color={locale === "es" ? "primary" : "default"}
          onClick={() => setLocale("es")}
        >
          es
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          color={locale === "it" ? "primary" : "default"}
          onClick={() => setLocale("it")}
        >
          it
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          color={locale === "pt" ? "primary" : "default"}
          onClick={() => setLocale("pt")}
        >
          pt
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserParameters;
