// in src/posts.js
import React from "react";
import {
  List,
  Filter,
  TextInput,
  Datagrid,
  TextField,
  ReferenceField,
  NumberField,
  DateField,
} from "react-admin";

const VehicleFilter = (props) => (
  <Filter {...props}>
    <TextInput
      label="fileNumber"
      source="fileNumber"
      defaultValue=""
      alwaysOn
    />
  </Filter>
);

export const Offers = (props) => {
  return (
    <List
      {...props}
      filters={<VehicleFilter />}
      perPage={25}
      sort={{ field: "id", order: "DESC" }}
    >
      <Datagrid>
        <TextField label="fileNumber" source="fileNumber" />
        <TextField label="brandLabel" source="brandLabel" />
        <TextField label="modelLabel" source="modelLabel" />
        <DateField label="purchaseDate" source="purchaseDate" />
        <TextField label="pointOfSaleName" source="pointOfSaleName" />
        <NumberField
          source="amount"
          options={{
            minimumFractionDigits: 0,
            style: "currency",
            currency: "EUR",
          }}
        />
        <TextField label="saleType" source="saleType" />
        <DateField label="createdAt" source="createdAt" showTime />
        <TextField label="userId" source="userId" />

        <ReferenceField label="User" source="userId" reference="facadeUser">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="User" source="userId" reference="facadeUser">
          <TextField source="email" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};
