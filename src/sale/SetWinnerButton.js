import React, { Fragment, useState } from "react";
import {
  Button,
  Confirm,
  useRefresh,
  useNotify,
  useTranslate,
} from "react-admin";
import Done from "@material-ui/icons/Done";
import { API } from "aws-amplify";

const SetWinnerButton = (props) => {
  const translate = useTranslate();
  const [open, setOpen] = useState(false);
  const refresh = useRefresh();
  const notify = useNotify();

  const handleUpdate = async () => {
    const { record } = props;

    try {
      await API.put("b2bPlateform", `/admin/sale/${record.saleId}`, {
        body: {
          assignedWinner: record.userId,
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
    notify(translate("accept_submission"), "warning");

    setOpen(false);
  };

  if (props.record) {
    return (
      <Fragment>
        <Button label={translate("accept_submission")} onClick={handleClick}>
          <Done />
        </Button>
        <Confirm
          isOpen={open}
          title=""
          content={translate("validation_submission_buyer")}
          onConfirm={handleConfirm}
          onClose={handleDialogClose}
        />
      </Fragment>
    );
  } else {
    return <></>;
  }
};

export default SetWinnerButton;
