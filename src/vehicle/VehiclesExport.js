import React from "react";
import {
  downloadCSV,
  TopToolbar,
  CreateButton,
  useListContext,
} from "react-admin";
import jsonExport from "jsonexport/dist";
import moment from "moment";
import ExportButtonCustom from "../components/ExportButtonCustom";

export const exporter = (posts) => {
  jsonExport(
    posts,
    {
      headers: [
        "id",
        "fileNumber",
        "createdAt",
        "registration",
        "brandLabel",
        "modelLabel",
        "versionLabel",
        "fuelLabel",
        "mileage",
        "firstRegistrationDate",
        "pointofsale.id",
        "pointofsale.name",
        "pointofsale.city",
        "pointofsale.zipCode",
        "pointofsale.country",
        "b2cMarketValue",
        "standardMileage",
        "dpaProAmt",
        "salesSpeedName",
      ],
      rename: [
        "ID Vehicle",
        "fileNumber",
        "createdAt",
        "registration",
        "brandLabel",
        "modelLabel",
        "versionLabel",
        "fuelLabel",
        "mileage",
        "firstRegistrationDate",
        "ID PoS",
        "PoS name",
        "PoS city",
        "PoS ZIP",
        "PoS Country",
        "b2cMarketValue",
        "standardMileage",
        "dpaProAmt",
        "rotationSpeed",
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
      downloadCSV(csv, "vehicle"); // download as 'vehicle.csv` file
    }
  );
};

export const ListActions = (props) => {
  const { className, ...rest } = props;
  const { currentSort, resource, filterValues, basePath, total } =
    useListContext();
  const date = new Date();
  const from = moment(date).subtract(4, "months").format("YYYY-MM-DD HH:mm:ss");
  const to = moment(date).format("YYYY-MM-DD HH:mm:ss");
  return (
    <TopToolbar className={className}>
      <CreateButton basePath={basePath} />
      <ExportButtonCustom
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filterPermanent={{ createdAtInterval: [from, to] }}
        maxResults={5000}
        exporter={exporter}
      />
    </TopToolbar>
  );
};
