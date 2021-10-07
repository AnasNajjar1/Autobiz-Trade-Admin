import React from "react";
import { downloadCSV, TopToolbar } from "react-admin";
import jsonExport from "jsonexport/dist";
import moment from "moment";
import _ from "lodash";
import ExportButtonCustom from "../components/ExportButtonCustom";
import { getCreatedAtInterval } from "../utils/exportFile";

export const exporter = (posts) => {
  jsonExport(
    posts,
    {
      headers: [
        "id",
        "saleId",
        "sale.vehicle.fileNumber",
        "sale.vehicle.brandLabel",
        "sale.vehicle.modelLabel",
        "amount",
        "offerType",
        "userId",
        "createdAt",
        "sale.auctionStartPrice",
        "sale.auctionReservePrice",
        "sale.immediatePurchasePrice",
        "sale.vehicle.pointofsale.name",
        "sale.salesStat.status",
        "sale.vehicle.b2cMarketValue",
      ],
      rename: [
        "OfferId",
        "saleId",
        "File number",
        "Brand",
        "Model",
        "Amount",
        "Type of offer",
        "userId",
        "Date and time",
        "Auction start price",
        "Auction reserve price",
        "Immediate purchase price",
        "PoS name",
        "Status",
        "B2C Market Value",
      ],
      typeHandlers: {
        Object: function (value, name) {
          if (value.createdAt) {
            value.createdAt = moment(value.createdAt).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          value = _.omit(value, ["offerIsWinner"]);
          return value;
        },
      },
    },
    (err, csv) => {
      downloadCSV(csv, "offer"); // download as 'offer.csv` file
    }
  );
};

export const ListActions = (props) => {
  const { className, currentSort, resource, filterValues, total } = props;
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
