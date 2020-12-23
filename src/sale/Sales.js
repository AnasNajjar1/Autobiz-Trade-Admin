import React from "react";
import Gavel from "@material-ui/icons/Gavel";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  useTranslate,
  NumberField,
  ShowButton,
  EditButton,
} from "react-admin";
import { SalesFilter } from "./SalesFilter";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { stringify } from "query-string";
export const Sales = (props) => {
  const translate = useTranslate();

  return (
    <List
      {...props}
      title={translate(props.resource)}
      filters={<SalesFilter />}
      perPage={25}
      sort={{ field: "id", order: "DESC" }}
    >
      <Datagrid>
        <TextField label="saleId" source="id" />
        <TextField label="vehicleId" source="vehicle.id" />
        <TextField label="fileNumber" source="vehicle.fileNumber" />
        <TextField label="registration" source="vehicle.registration" />
        <TextField label="validationStatus" source="validationStatus" />
        <TextField label="status" source="status" />
        <TextField label="supplyType" source="supplyType" />
        <DateField label="salesStart" source="startDateTime" />
        <DateField label="salesEnd" source="endDateTime" />
        <TextField label="BrandLabel" source="vehicle.brandLabel" />
        <TextField label="ModelLabel" source="vehicle.modelLabel" />
        <TextField label="ModelLabel" source="vehicle.modelLabel" />
        <TextField label="pointOfSale" source="vehicle.pointofsale.name" />
        <a href={"url"} rel="noopener" target="_blank">
          Link
        </a>
        <LinkToRelatedOffers />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};

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
