// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  Filter,
  TextInput,
  EditButton
} from "react-admin";

import LinkToRelatedOffers from "./LinkToRelatedOffers";

const VehicleFilter = props => (
  <Filter {...props}>
    <TextInput label="REF" source="fileNumber" defaultValue="" alwaysOn />
  </Filter>
);

export const Vehicles = props => (
  <List {...props} filters={<VehicleFilter />}>
    <Datagrid>
      <TextField label="id" source="id" />
      <TextField label="REF" source="fileNumber" sortable={false} />
      <TextField label="BRAND" source="brandLabel" />
      <TextField label="MODEL" source="modelLabel" />
      <NumberField label="MILEAGE" source="mileage" />
      <TextField label="POINT OF SALE" source="pointOfSaleName" />
      <DateField label="EXPERTISE DATE" source="expertiseDate" />
      <LinkToRelatedOffers />
      <EditButton />
    </Datagrid>
  </List>
);
