import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  useTranslate,
  SelectField,
} from "react-admin";
import { ListActions } from "./VehiclesActions";
import { VehiclesFilter } from "./VehiclesFilter";
import fuel from "../assets/choices/fuel";
export const Vehicles = (props) => {
  const translate = useTranslate();
  return (
    <List
      {...props}
      title={translate(props.resource)}
      filters={<VehiclesFilter />}
      perPage={25}
      sort={{ field: "id", order: "DESC" }}
      actions={<ListActions />}
    >
      <Datagrid rowClick="show">
        <TextField label="vehicleId" source="id" />
        <TextField label="fileNumber" source="fileNumber" />
        <TextField label="registration" source="registration" />
        <TextField label="make" source="brandLabel" />
        <TextField label="model" source="modelLabel" />
        <TextField label="version" source="versionLabel" />
        <SelectField source="fuelLabel" label="fuelLabel" choices={fuel} />
        <TextField label="mileage" source="mileage" />
        <TextField
          label="firstRegistrationDate"
          source="firstRegistrationDate"
        />
        <TextField label="pointOfSaleName" source="pointofsale.name" />
      </Datagrid>
    </List>
  );
};
