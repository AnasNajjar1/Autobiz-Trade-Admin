import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslate } from "react-admin";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    marginRight: theme.spacing(4),
  },
}));

const ConfirmUpdateValidationStatus = ({
  open,
  onClose,
  onConfirm,
  cancel,
}) => {
  const classes = useStyles();
  const translate = useTranslate();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      className={classes}
    >
      <DialogTitle>
        <Typography variant="h5" align="center">
          {translate("Annuler la vente ?")}
        </Typography>
      </DialogTitle>

      <DialogActions className={classes.formControl}>
        <Button onClick={onConfirm} color="primary">
          {translate("yes")}
        </Button>
        <Button onClick={cancel} color="primary">
          {translate("no")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmUpdateValidationStatus;
