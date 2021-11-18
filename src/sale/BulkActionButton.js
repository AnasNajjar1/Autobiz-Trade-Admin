import React, { useState } from "react";
import {
  BulkDeleteButton,
  useTranslate,
  useRefresh,
  useNotify,
  useUnselectAll,
} from "react-admin";
import { API } from "aws-amplify";
import { Button } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import ActionUpdate from "@material-ui/icons/Edit";
import UpdateValidationStatusDialog from "./UpdateValidationStatusDialog";

export const BulkActionButtons = (props) => {
  const translate = useTranslate();
  const [open, setOpen] = useState(false);
  const [validationStatus, setValidationStatus] = useState("DRAFT");
  const [disabledUpdateStatusButton, setDisabledUpdateStatusButton] =
    useState(false);
  const notify = useNotify();
  const unSelectAll = useUnselectAll();
  const refresh = useRefresh();
  const recordIds = props.selectedIds;

  const handleClick = (state) => setOpen(state);

  const duplicateSale = async () => {
    recordIds.map(async (recordId) => {
      try {
        const sale = await API.get("b2bPlateform", `/v2/admin/sale/${recordId}`);
        if (
          ["CLOSED", "FINISHED", "ARCHIVED", "INACTIVE"].includes(sale.status)
        )
          return window.open(`#/sale/${sale.id}/duplicate`);
      } catch (e) {
        console.log(e);
        return;
      }
    });
  };

  const updateValidationStatus = async () => {
    const result = await Promise.allSettled(
      recordIds.map(async (id) => {
        try {
          const data = await API.put("b2bPlateform", `/v2/admin/sale/${id}`, {
            body: {
              validationStatus,
            },
          });
          return data;
        } catch (error) {
          throw { id };
        }
      })
    );
    return result.filter((item) => item.reason).map((item) => item.reason.id);
  };

  const handleChange = (e) => setValidationStatus(e.target.value);

  const handleConfirm = async () => {
    setDisabledUpdateStatusButton(true);
    const errors = await updateValidationStatus();
    errors.length > 0
      ? notify(`Failed to update theses Sales ${errors.join(", ")}`, "warning")
      : notify("Sales updated");
    setOpen(false);
    setDisabledUpdateStatusButton(false);
    unSelectAll("sale");
    refresh();
  };

  return (
    <>
      <UpdateValidationStatusDialog
        open={open}
        validationStatus={validationStatus}
        handleConfirm={handleConfirm}
        handleClose={() => handleClick(false)}
        handleChange={handleChange}
      />
      <Button
        size="small"
        color="primary"
        disabled={disabledUpdateStatusButton}
        onClick={() => handleClick(true)}
      >
        <ActionUpdate />
        <span> {translate("updateStatus")} </span>
      </Button>
      <Button color="primary" size="small" onClick={duplicateSale}>
        <FileCopy />
        <span>{translate("clone_sale")}</span>
      </Button>
      <BulkDeleteButton {...props} />
    </>
  );
};
