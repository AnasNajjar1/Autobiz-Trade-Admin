import React, { useState } from "react";
import {
  BulkDeleteButton,
  useTranslate,
  useRefresh,
  useNotify,
  useUnselectAll,
  downloadCSV,
  ExportButton,
  showNotification,
  BulkExportButton,
} from "react-admin";
import { API } from "aws-amplify";
import { Button } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import ActionUpdate from "@material-ui/icons/Edit";
import UpdateValidationStatusDialog from "./UpdateValidationStatusDialog";
import jsonExport from "jsonexport/dist";
import { t } from "autobiz-translate";
import _ from "lodash";
import moment from "moment";

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

  const exporter = async (sales) => {
    try {
      jsonExport(
        sales,
        {
          headers: [
            "id",
            "vehicle.fileNumber",
            "group.name",
            "vehicle.registration",
            "vehicle.brandLabel",
            "vehicle.modelLabel",
            "vehicle.pointofsale.name",
            "startDateTime",
            "endDateTime",
            "auctionReservePrice",
            "immediatePurchasePrice",
            "countOffers",
            "bestOffer",
            "bestOfferType",
            "bestOffererDetails.fullName",
            "bestOffererDetails.email",
            "bestOffererDetails.phoneNumber",
          ],
          rename: [
            t("saleId"),
            t("fileNumber"),
            t("nameGroup"),
            t("licencePlate"),
            t("make"),
            t("model"),
            t("pointOfSales"),
            t("startDateTime"),
            t("endDateTime"),
            t("reservePrice"),
            t("immediatePurchasePrice"),
            t("countOffers"),
            t("bestOffer"),
            t("bestOfferType"),
            t("bestOffererName"),
            t("bestOffererMail"),
            t("bestOffererPhoneNumber"),
          ],
          typeHandlers: {
            Object: function (value, name) {
              if (value.group === null) {
                value.group = { name: "" };
              }

              if (value.auctionReservePrice === null) {
                value.auctionReservePrice = "-";
              } else if (value.auctionReservePrice >= 0) {
                value.auctionReservePrice = `${value.auctionReservePrice} €`;
              }

              if (value.immediatePurchasePrice === 0) {
                value.immediatePurchasePrice = "-";
              } else if (value.immediatePurchasePrice > 0) {
                value.immediatePurchasePrice = `${value.immediatePurchasePrice} €`;
              }

              if (value.bestOffer) {
                value.bestOffer = `${value.bestOffer} €`;
              }

              if (value.startDateTime) {
                value.startDateTime = moment(value.startDateTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
              }
              if (value.endDateTime) {
                value.endDateTime = moment(value.endDateTime).format(
                  "YYYY-MM-DD  HH:mm:ss"
                );
              }
              if (parseInt(value.countOffers) === 0) {
                value.countOffers = "0";
              }

              const valueToRemove = [
                "winner",
                "vehicleId",
                "validationStatus",
                "uuid",
                "url",
                "supplyType",
                "status",
                "requestWinner",
                "ownerId",
                "listId",
                "groupId",
                "expressSale",
                "deleteWinner",
                "countAuctions",
                "commentInt",
                "comment",
                "carcheckId",
                "auctionStepPrice",
                "auctionStartPrice",
                "acceptSubmission",
                "acceptAuction",
                "acceptImmediatePurchase",
                "vehicle.id",
                "vehicle.versionLabel",
                "vehicle.fuelLabel",
                "vehicle.mileage",
                "vehicle.firstRegistrationDate",
                "vehicle.pointofsale.city",
                "vehicle.pointofsale.zipCode",
                "vehicle.pointofsale.country",
                "vehicle.b2cMarketValue",
                "vehicle.standardMileage",
                "vehicle.dpaProAmt",
                "vehicle.salesSpeedName",
                "bestOfferer",
                "customBestOffer",
                "maxOfferAmount",
              ];

              if (value.bestOffererDetails === null) {
                valueToRemove.push("bestOffererDetails");
              }
              value = _.omit(value, valueToRemove);
              return value;
            },
          },
        },
        (err, csv) => {
          downloadCSV(csv, "SaleSelection");
        }
      );
    } catch (error) {
      showNotification(error);
    }
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
      <BulkExportButton
        resource={props.resource}
        selectedIds={props.selectedIds}
        exporter={exporter}
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
