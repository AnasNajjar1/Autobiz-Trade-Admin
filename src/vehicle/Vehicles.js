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
  SelectInput,
  EditButton,
  ReferenceInput
} from "react-admin";

import LinkToRelatedOffers from "./LinkToRelatedOffers";
import offerTypeChoices from "../assets/choices/offerType";
import salesTypeChoices from "../assets/choices/salesType";

const VehicleFilter = props => (
  <Filter {...props}>
    <TextInput label="REF" source="fileNumber" defaultValue="" alwaysOn />
    <ReferenceInput source="statusId" reference="status" alwaysOn>
      <SelectInput source="name" />
    </ReferenceInput>
    <SelectInput
      label="offerType"
      source="offerType"
      choices={offerTypeChoices}
      alwaysOn
    />
    <SelectInput
      label="salesType"
      source="salesType"
      choices={salesTypeChoices}
      alwaysOn
    />
    <ReferenceInput
      label="brandLabel"
      source="brandLabel"
      reference="facadeBrand"
      alwaysOn
    >
      <SelectInput optionValue="id" optionText="name" />
    </ReferenceInput>
  </Filter>
);

export const Vehicles = props => (
  <List {...props} filters={<VehicleFilter />}>
    <Datagrid>
      <TextField label="ID" source="id" />
      <TextField label="REF" source="fileNumber" sortable={false} />
      <TextField label="STATUS" source="statusName" />
      <TextField label="OFFER TYPE" source="offerType" />
      <TextField label="SALE TYPE" source="salesType" />
      <DateField label="SALE START" source="startDateTime" />
      <DateField label="SALE END" source="endDateTime" />
      <DateField label="EXPERTISE DATE" source="createdAt" />
      <TextField label="BRAND" source="brandLabel" />
      <TextField label="MODEL" source="modelLabel" />
      <NumberField label="MILEAGE" source="mileage" />
      <TextField label="POINT OF SALE" source="pointOfSaleName" />
      <LinkToRelatedOffers />
      <EditButton />
    </Datagrid>
  </List>
);
