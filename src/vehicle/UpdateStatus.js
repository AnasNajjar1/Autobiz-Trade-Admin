import React, { Fragment, useState } from "react";
import {
  Confirm,
  useUpdateMany,
  useRefresh,
  useNotify,
  useUnselectAll
} from "react-admin";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

import _ from "lodash";

import status from "../assets/choices/status";

const ResetViewsButton = ({ selectedIds }) => {
  const [open, setOpen] = useState(false);
  const [statusId, setStatusId] = useState(1);
  const refresh = useRefresh();
  const notify = useNotify();
  const unselectAll = useUnselectAll();
  const [updateMany, { loading }] = useUpdateMany(
    "vehicle",
    selectedIds,
    { statusId },
    {
      onSuccess: () => {
        refresh();
        notify("Vehicle updated");
        unselectAll("vehicle");
      },
      onFailure: error => notify("Error: posts not updated", "warning")
    }
  );
  const handleClick = e => {
    setStatusId(e.target.value);
    setOpen(true);
  };
  const handleDialogClose = () => setOpen(false);

  const handleConfirm = () => {
    updateMany();
    setOpen(false);
  };

  return (
    <Fragment>
      <Select value={statusId} onChange={handleClick}>
        {status.map(status => (
          <MenuItem value={status.id}>{status.name}</MenuItem>
        ))}
      </Select>
      <Confirm
        isOpen={open}
        loading={loading}
        title="Update vehicle status"
        content={`Are you sure you want to set the status for these vehicles to ${
          _.find(status, o => o.id === statusId).name
        } ?`}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </Fragment>
  );
};

export default ResetViewsButton;

export const ChangeEndDateTime = ({ selectedIds }) => {
  const [open, setOpen] = useState(false);
  const [endDateTime, setEndDateTime] = useState(1);
  const refresh = useRefresh();
  const notify = useNotify();
  const unselectAll = useUnselectAll();
  const [updateMany, { loading }] = useUpdateMany(
    "vehicle",
    selectedIds,
    { "auction.endDateTime": endDateTime },
    {
      onSuccess: () => {
        refresh();
        notify("Vehicle updated");
        unselectAll("vehicle");
      },
      onFailure: error => notify("Error: posts not updated", "warning")
    }
  );
  const handleClick = e => {
    setEndDateTime(moment(e.target.value).format());
    setOpen(true);
  };
  const handleDialogClose = () => setOpen(false);

  const handleConfirm = () => {
    updateMany();
    setOpen(false);
  };

  return (
    <Fragment>
      <TextField
        id="datetime-local"
        label="Sales end"
        type="datetime-local"
        defaultValue={moment().format("YYYY-MM-DDTHH:mm")}
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleClick}
      />
      <Confirm
        isOpen={open}
        loading={loading}
        title="Update vehicle sales end"
        content={`Are you sure you want to set the sales end date to for these vehicles to ${moment(
          endDateTime
        ).format("YYYY-MM-DD HH:mm")} ?`}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </Fragment>
  );
};
