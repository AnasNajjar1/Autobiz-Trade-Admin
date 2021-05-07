import React, { cloneElement } from "react";
import {
  downloadCSV,
  TopToolbar,
  ExportButton,
  useListContext,
  sanitizeListRestProps,
} from "react-admin";
import jsonExport from "jsonexport/dist";
import moment from "moment";
import _ from "lodash";

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
              "YYYY-MM-DD HH:MM:SS"
            );
          }
          if (value.endDateTime) {
            value.endDateTime = moment(value.endDateTime).format(
              "YYYY-MM-DD  HH:MM:SS"
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
            "vehicleId"
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
  const { className, filters, ...rest } = props;
  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    showFilter,
    total,
  } = useListContext();
  const date = new Date();
  const from = moment(date).subtract(4, "months").format("YYYY-MM-DD HH:mm:ss");
  const to = moment(date).format("YYYY-MM-DD HH:mm:ss");
  filterValues.createdAtInterval = [from, to];

  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: "button",
        })}
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filterValues={filterValues}
        maxResults={5000}
      />
    </TopToolbar>
  );
};
