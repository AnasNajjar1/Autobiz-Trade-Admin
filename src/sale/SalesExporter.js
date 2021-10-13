import React from "react";
import { downloadCSV, TopToolbar, useTranslate } from "react-admin";
import jsonExport from "jsonexport/dist";
import moment from "moment";
import _ from "lodash";
import { Box, Button } from "@material-ui/core";
import { FormatColorResetTwoTone } from "@material-ui/icons";
import ExportButtonCustom from "../components/ExportButtonCustom";
import { getCreatedAtInterval } from "../utils/exportFile";

export const exporter = (posts) => {
  jsonExport(
    posts,
    {
      headers: [
        "id",
        "vehicle.id",
        "vehicle.fileNumber",
        "vehicle.registration",
        "uuid",
        "validationStatus",
        "supplyType",
        "acceptAuction",
        "acceptImmediatePurchase",
        "acceptSubmission",
        "countOffers",
        "countAuctions",
        "auctionStartPrice",
        "auctionStepPrice",
        "auctionReservePrice",
        "immediatePurchasePrice",
        "startDateTime",
        "endDateTime",
        "status",
        "requestWinner",
        "bestOfferer",
        "winner",
        "listId",
        "groupId",
        "group.name",
        "ownerId",
        "vehicle.brandLabel",
        "vehicle.modelLabel",
        "vehicle.versionLabel",
        "vehicle.fuelLabel",
        "vehicle.mileage",
        "vehicle.firstRegistrationDate",
        "vehicle.pointofsale.name",
        "vehicle.pointofsale.city",
        "vehicle.pointofsale.zipCode",
        "vehicle.pointofsale.country",
        "vehicle.b2cMarketValue",
        "vehicle.standardMileage",
        "vehicle.dpaProAmt",
        "vehicle.salesSpeedName",
      ],
      rename: [
        "saleId",
        "vehicleId",
        "fileNumber",
        "registration",
        "uuid",
        "validationStatus",
        "supplyType",
        "acceptAuction",
        "acceptImmediatePurchase",
        "acceptSubmission",
        "countOffers",
        "countAuctions",
        "auctionStartPrice",
        "auctionStepPrice",
        "auctionReservePrice",
        "immediatePurchasePrice",
        "startDateTime",
        "endDateTime",
        "status",
        "requestWinner",
        "bestOfferer",
        "winner",
        "listId",
        "groupId",
        "nameGroupe",
        "ownerId",
        "brandLabel",
        "modelLabel",
        "versionLabel",
        "fuelLabel",
        "mileage",
        "firstRegistrationDate",
        "posName",
        "posCity",
        "posZip",
        "posCountry",
        "b2cMarketValue",
        "standardMileage",
        "dpaProAmt",
        "rotationSpeed",
      ],
      typeHandlers: {
        Object: function (value, name) {
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
          if (value.group === null) {
            value.group = { name: "" };
          }
          value = _.omit(value, [
            "url",
            "comment",
            "commentInt",
            "carcheckId",
            "expressSale",
            "vehicleId",
            "bestOffer",
            "bestOfferType",
          ]);
          return value;
        },
      },
    },
    (err, csv) => {
      downloadCSV(csv, "Sale"); // download as 'Sale.csv` file
    }
  );
};

export const SalesActions = (props) => {
  const { className, currentSort, resource, filterValues, total, setFilters } =
    props;
  const translate = useTranslate();
  const resetFilter = () => setFilters({}, []);
  const { startDateTimeMin, endDateTimeMax } = filterValues;
  const createdAtInterval = getCreatedAtInterval(
    startDateTimeMin,
    endDateTimeMax
  );
  const filterPermanent = {
    startDateTimeMin: null,
    endDateTimeMax: null,
    createdAtInterval,
  };
  return (
    <TopToolbar className={className}>
      <Box>
        <Button size="small" color="primary" onClick={resetFilter}>
          <FormatColorResetTwoTone />
          <span> {translate("reset_filter")} </span>
        </Button>
      </Box>
      <ExportButtonCustom
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filterPermanent={filterPermanent}
        maxResults={5000}
        exporter={exporter}
      />
    </TopToolbar>
  );
};
