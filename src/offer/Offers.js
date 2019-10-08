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
        <NumberField
          source="amount"
          options={{
            style: "currency",
            currency: "EUR"
          }}
        />
        <TextField label="userId" source="userId" />
        <DateField label="createdAt" source="createdAt" showTime />
      </Datagrid>
    </List>
  );
};
