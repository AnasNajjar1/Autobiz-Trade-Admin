import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  useTranslate,
} from "react-admin";
import { SalesFilter } from "./SalesFilter";

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
      <Datagrid rowClick="show">
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
      </Datagrid>
    </List>
  );
};
