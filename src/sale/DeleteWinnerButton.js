import React, { Fragment, useState } from "react";
import {
  Button,
  Confirm,
  useRefresh,
  useNotify,
  useTranslate,
} from "react-admin";
import ActionDelete from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { API } from "aws-amplify";

const useStyles = makeStyles({
  button: {
    color: "red",
  },
});
const DeleteWinnerButton = (props) => {
  const translate = useTranslate();
  const [open, setOpen] = useState(false);
  const refresh = useRefresh();
  const notify = useNotify();
  const classes = useStyles();

  const handleUpdate = async () => {
    const { record } = props;

    try {
      await API.put("b2bPlateform", `/v2/admin/sale/${record.saleId}`, {
        body: {
          winner: null,
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleClick = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const handleConfirm = async () => {
    await handleUpdate();
    refresh();
    notify(translate("delete_winner"), "warning");

    setOpen(false);
  };

  if (props.record && props.record.offerIsWinner) {
    return (
      <Fragment>
        <Button label={translate("accepted_offer")} color="secondary"></Button>
        <Button
          label={translate("delete_winner")}
          className={classes.button}
          onClick={handleClick}
        >
          <ActionDelete />
        </Button>
        <Confirm
          isOpen={open}
          title={""}
          content={translate("popup_delete_winner")}
          onConfirm={handleConfirm}
          onClose={handleDialogClose}
        />
      </Fragment>
    );
  } else {
    return <></>;
  }
};

export default DeleteWinnerButton;
