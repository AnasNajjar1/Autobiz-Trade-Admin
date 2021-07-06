import React from "react";
import Gavel from "@material-ui/icons/Gavel";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  useTranslate,
  ShowButton,
  BooleanField,
  CardActions,
  ExportButton,
} from "react-admin";
import { SalesFilter } from "./SalesFilter";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { TRADE_URL } from "../config";
import Stars from "@material-ui/icons/Stars";
import FlashOn from "@material-ui/icons/FlashOn";
import { exporter, SalesActions } from "./SalesExporter";
const styles = {
  link: {
    color: "#9097ac",
    fontWeight: "bold",
  },
};

export const Sales = (props) => {
  const translate = useTranslate();

  return (
    <List
      {...props}
      title={translate(props.resource)}
      filters={<SalesFilter />}
      perPage={25}
      sort={{ field: "id", order: "DESC" }}
      actions={<SalesActions />}
      exporter={exporter}
    >
      <Datagrid>
        <TextField label="saleId" source="id" />
        <TextField label="vehicleId" source="vehicle.id" />
        <TextField label="fileNumber" source="vehicle.fileNumber" />
        <TextField label="registration" source="vehicle.registration" />
        <TextField label="validationStatus" source="validationStatus" />
        <TextField label="status" source="status" />
        <TextField label="saleType" source="supplyType" />
        <DateField label="salesStart" source="startDateTime" />
        <DateField label="salesEnd" source="endDateTime" />
        <TextField label="make" source="vehicle.brandLabel" />
        <TextField label="model" source="vehicle.modelLabel" />
        <TextField label="pointOfSale" source="vehicle.pointofsale.name" />
        <BooleanField
          label="requestWinner"
          source="requestWinner"
          TrueIcon={Stars}
          sortable={false}
        />
        <BooleanField
          label="expressSale"
          source="expressSale"
          TrueIcon={FlashOn}
        />

        <LinkRecord label="urlAds" source="uuid" />
        <LinkToRelatedOffers />
        <ShowButton />
        {/* <EditButton /> */}
      </Datagrid>
    </List>
  );
};

const LinkRecord = withStyles(styles)(({ classes, record }) => {
  if (
    record &&
    record.status &&
    ["LIVE", "CLOSED", "FINISHED", "INACTIVE"].includes(record.status)
  )
    return (
      <a
        href={`${TRADE_URL}/records/${record.uuid}`}
        rel="noopener"
        target="_blank"
        className={classes.link}
      >
        Link
      </a>
    );
  return null;
});

const LinkToRelatedOffers = ({ record }) => {
  const translate = useTranslate();

  if (!record) {
    return null;
  }

  if (record.countOffers === 0) {
    return null;
  }
  return (
    <Button
      component={Link}
      size="small"
      color="primary"
      to={{
        pathname: `/sale/${record.id}/show/offer`,
      }}
    >
      <Gavel /> {translate("offers")} ({record.countOffers})
    </Button>
  );
};
