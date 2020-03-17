// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  DateInput,
  TextField,
  DateField,
  AutocompleteInput,
  CheckboxGroupInput,
  NumberField,
  BooleanInput,
  Filter,
  TextInput,
  SelectInput,
  EditButton,
  ReferenceInput
} from "react-admin";

import LinkToRelatedOffers from "./LinkToRelatedOffers";
import offerTypeChoices from "../assets/choices/offerType";
import salesTypeChoices from "../assets/choices/salesType";
import { TRADE_URL } from "../config";

const VehicleFilter = props => (
  <Filter {...props}>
    <TextInput
      label="REF"
      source="fileNumber"
      defaultValue=""
      alwaysOn
      resettable
    />
    <TextInput
      label="REGISTRATION"
      source="registration"
      defaultValue=""
      alwaysOn
      resettable
    />
    {/* 
    <ReferenceInput source="statusId" reference="status">
      <SelectInput source="name" resettable />
    </ReferenceInput> */}

    <CheckboxGroupInput
      source="statusId"
      choices={[
        { id: "1", name: "Offline" },
        { id: "2", name: "Online" },
        { id: "3", name: "Sold" }
      ]}
      alwaysOn
    />

    <SelectInput
      label="offerType"
      source="offerType"
      choices={offerTypeChoices}
      resettable
    />
    <SelectInput
      label="sales Type"
      source="salesType"
      choices={salesTypeChoices}
      resettable
    />
    <ReferenceInput
      label="brand Label"
      source="brandLabel"
      reference="facadeBrand"
      resettable
    >
      <SelectInput optionValue="id" optionText="name" resettable />
    </ReferenceInput>

    <TextInput
      label="modelLabel"
      source="modelLabel"
      defaultValue=""
      resettable
    />

    <TextInput
      label="mileage Min"
      source="mileageMin"
      defaultValue=""
      resettable
    />
    <TextInput
      label="mileage Max"
      source="mileageMax"
      defaultValue=""
      resettable
    />
    <DateInput
      label="Expertise date"
      source="createdAt"
      defaultValue=""
      resettable
    />
    <DateInput
      label="MAX Sales end"
      source="maxEndDateTime"
      defaultValue=""
      resettable
      alwaysOn
    />
    <DateInput
      label="MIN Sales end"
      source="minEndDateTime"
      defaultValue=""
      resettable
    />
    <DateInput
      label="Sales Start"
      source="startDateTime"
      defaultValue=""
      resettable
    />

    <DateInput
      label="Sales end"
      source="endDateTime"
      defaultValue=""
      resettable
    />

    <BooleanInput label="with Offers" source="withOffers" />

    <ReferenceInput
      source="pointOfSaleId"
      reference="pointOfSale"
      sort={{ field: "name", order: "ASC" }}
    >
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

export const Vehicles = props => (
  <List {...props} filters={<VehicleFilter />} perPage={25}>
    <Datagrid rowClick="show">
      <TextField label="ID" source="id" />

      <TextField label="REF" source="fileNumber" sortable={false} />
      <TextField label="REGISTRATION" source="registration" sortable={false} />
      <TextField label="STATUS" source="statusName" />
      <TextField label="OFFER TYPE" source="offerType" />
      <TextField label="SALEs TYPE" source="salesType" />
      <DateField label="SALES START" source="startDateTime" />
      <DateField label="SALES END" source="endDateTime" />
      <DateField label="EXPERTISE DATE" source="createdAt" />
      <TextField label="BRAND" source="brandLabel" />
      <TextField label="MODEL" source="modelLabel" />
      <NumberField label="MILEAGE" source="mileage" />
      <TextField label="POINT OF SALE" source="pointOfSaleName" />
      <LinkRecord label="urlAds" source="uuid" />
      <LinkToRelatedOffers />
      <EditButton />
    </Datagrid>
  </List>
);

export const Offline = props => (
  <Vehicles {...props} filter={{ statusId: [1] }} />
);

export const Online = props => (
  <Vehicles {...props} filter={{ statusId: [2], minEndDateTime: new Date() }} />
);

export const AuctionFinished = props => (
  <Vehicles
    {...props}
    filter={{
      withOffers: true,
      maxEndDateTime: new Date(),
      salesType: "auction",
      statusId: [1, 2]
    }}
  />
);

export const AuctionFailed = props => (
  <Vehicles
    {...props}
    filter={{
      withOffers: false,
      maxEndDateTime: new Date(),
      salesType: "auction",
      statusId: [1, 2]
    }}
  />
);

export const PurchasedImmediately = props => (
  <Vehicles
    {...props}
    filter={{
      withOffers: true,
      salesType: "immediatePurchase",
      maxEndDateTime: new Date(),
      statusId: [1, 2]
    }}
  />
);

export const Sold = props => <Vehicles {...props} filter={{ statusId: [3] }} />;

const LinkRecord = ({ record }) => {
  if (["online", "sold"].includes(record.statusName))
    return (
      <a
        href={`${TRADE_URL}/records/${record.uuid}`}
        rel="noopener"
        target="_blank"
      >
        Link
      </a>
    );
  return null;
};
