// in src/posts.js
import React from "react";
import {
  List,
  Filter,
  TextInput,
  Datagrid,
  TextField,
  NumberField,
  DateField
} from "react-admin";

const VehicleFilter = props => (
  <Filter {...props}>
    <TextInput
      label="fileNumber"
      source="fileNumber"
      defaultValue=""
      alwaysOn
    />
  </Filter>
);

export const Offers = props => {
  return (
    <List {...props} filters={<VehicleFilter />}>
      <Datagrid>
        <TextField label="fileNumber" source="fileNumber" />
        <TextField label="brandLabel" source="brandLabel" />
        <TextField label="modelLabel" source="modelLabel" />
        <DateField label="purchaseDate" source="purchaseDate" />
        <TextField label="pointOfSaleName" source="pointOfSaleName" />
        <NumberField
          source="amount"
          options={{
            style: "currency",
            currency: "EUR"
          }}
        />
        <DateField label="createdAt" source="createdAt" showTime />
        <TextField label="userId" source="userId" />
      </Datagrid>
    </List>
  );
};
