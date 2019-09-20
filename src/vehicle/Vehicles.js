// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  Filter,
  TextInput
} from "react-admin";
const PostFilter = props => (
  <Filter {...props}>
    <TextInput
      label="Title"
      source="content.vehicle.brandLabel"
      defaultValue=""
      alwaysOn
    />
  </Filter>
);

export const Vehicles = props => (
  <List {...props} filters={<PostFilter />}>
    <Datagrid rowClick="edit">
      <TextField label="REF" source="content.fileNumber" />
      <TextField label="BRAND" source="content.vehicle.brandLabel" />
      <TextField label="MODEL" source="content.vehicle.modelLabel" />
      <NumberField label="MILEAGE" source="content.characteristics.mileage" />
      <DateField label="MEC" source="content.vehicle.firstRegistrationDate" />
    </Datagrid>
  </List>
);
