// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  ImageField,
  DateField,
  NumberField
} from "react-admin";

export const Vehicles = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      {/* <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField> */}
      <TextField label="REF" source="content.fileNumber" />
      <TextField label="BRAND" source="content.vehicle.modelLabel" />
      <TextField label="MODEL" source="content.vehicle.brandLabel" />
      <NumberField label="MILEAGE" source="content.vehicle.mileage" />
      <DateField label="MEC" source="content.vehicle.firstRegistrationDate" />
      {/* <ImageField source="content.vehicle.carPictures.front_picture" title="front_picture" /> */}
      {/* <TextField source="body" /> */}
    </Datagrid>
  </List>
);
