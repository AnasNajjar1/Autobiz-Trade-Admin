import React, { cloneElement } from "react";
import {
  downloadCSV,
  TopToolbar,
  CreateButton,
  ExportButton,
  useListContext,
  sanitizeListRestProps,
} from "react-admin";
import jsonExport from "jsonexport/dist";
import moment from "moment";

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
  const { className, filters, ...rest } = props;
  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    basePath,
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
