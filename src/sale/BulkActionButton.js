import React from "react";
import { BulkDeleteButton, useTranslate } from "react-admin";
import { TRADE_URL } from "../config";
import { API } from "aws-amplify";
import { Button } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";

export const BulkActionButtons = (props) => {
  const translate = useTranslate();
  const duplicateSale = async () => {
    const recordIds = props.selectedIds;
    recordIds.map(async (recordId) => {
      try {
        const sale = await API.get("b2bPlateform", `/admin/sale/${recordId}`);
        if (
          ["CLOSED", "FINISHED", "ARCHIVED","INACTIVE"].includes(sale.status)
        )
          return window.open(`#/sale/${sale.id}/duplicate`);
      } catch (e) {
        console.log(e);
        return;
      }
    });
  };

  return (
    <>
      <Button color="primary" size="small" onClick={duplicateSale}>
        <FileCopy />
        <span>{translate("clone_sale")}</span>
      </Button>
      <BulkDeleteButton {...props} />
    </>
  );
};
