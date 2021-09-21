import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SaveIcon from "@material-ui/icons/Save";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslate } from "react-admin";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
}));

const UpdateValidationStatusDialog = ({
  open,
  handleClose,
  handleConfirm,
  handleChange,
  validationStatus,
}) => {
  const classes = useStyles();
  const translate = useTranslate();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.formControl}
      titleStyle={{ textAlign: "center" }}
    >
      <DialogTitle>
        <Typography variant="h5" align="center">
          {translate("changeStatus")}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <InputLabel>{translate("validationStatus")}</InputLabel>
            <Select
              value={validationStatus}
              onChange={handleChange}
              input={<Input />}
            >
              <MenuItem value="DRAFT">DRAFT</MenuItem>
              <MenuItem value="VALIDATED">VALIDATED</MenuItem>
              <MenuItem value="CANCELED">CANCELED</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleConfirm}
          color="primary"
          startIcon={<SaveIcon />}
        >
          {translate("save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default UpdateValidationStatusDialog;
