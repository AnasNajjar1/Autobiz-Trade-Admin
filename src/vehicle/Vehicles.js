// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  DateInput,
  BooleanInput,
  TextField,
  DateField,
  BooleanField,
  AutocompleteInput,
  NumberField,
  Filter,
  TextInput,
  SelectInput,
  EditButton,
  ReferenceInput,
  SimpleShowLayout,
  Show,
} from "react-admin";
import { BulkDeleteButton } from "react-admin";

import UpdateStatus from "./UpdateStatus";
import { ChangeEndDateTime } from "./UpdateStatus";

import LinkToRelatedOffers from "./LinkToRelatedOffers";
import offerTypeChoices from "../assets/choices/offerType";
import salesTypeChoices from "../assets/choices/salesType";
import status from "../assets/choices/status";

import { TRADE_URL } from "../config";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  link: {
    color: "#9097ac",
    fontWeight: "bold",
  },
};

const VehicleFilter = (props) => (
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

    <SelectInput source="statusId" choices={status} alwaysOn />

    <SelectInput
      label="offerType"
      source="offerType"
      choices={offerTypeChoices}
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

export const Vehicles = (props) => (
  <List
    {...props}
    filters={<VehicleFilter />}
    perPage={25}
    bulkActionButtons={<VehicleBulkActionButtons />}
    sort={{ field: "id", order: "DESC" }}
  >
    <Datagrid rowClick="show" rowClick="show">
      <TextField label="ID" source="id" />
      <TextField label="REF" source="fileNumber" sortable={false} />
      <TextField label="REGISTRATION" source="registration" sortable={false} />
      <TextField label="STATUS" source="statusName" />
      <TextField label="OFFER TYPE" source="offerType" />
      <BooleanField source="acceptAuction" />
      <BooleanField source="acceptImmediatePurchase" />
      <BooleanField source="acceptSubmission" />
      <DateField label="SALES START" source="startDateTime" />
      <DateField label="SALES END" source="endDateTime" />
      <TextField label="BRAND" source="brandLabel" />
      <TextField label="MODEL" source="modelLabel" />
      <TextField label="POINT OF SALE" source="pointOfSaleName" />
      <LinkRecord label="urlAds" source="uuid" />
      <LinkToRelatedOffers />
      <EditButton />
    </Datagrid>
  </List>
);

export const Offline = (props) => (
  <Vehicles {...props} filter={{ statusId: [1] }} />
);

export const Online = (props) => (
  <Vehicles {...props} filter={{ statusId: [2], minEndDateTime: new Date() }} />
);

export const AuctionFinished = (props) => (
  <Vehicles
    {...props}
    filter={{
      withOffers: true,
      maxEndDateTime: new Date(),
      statusId: [1, 2],
      bestOfferType: ["submission", "auction"],
    }}
  />
);

export const AuctionFailed = (props) => (
  <Vehicles
    {...props}
    filter={{
      withOffers: false,
      maxEndDateTime: new Date(),
      statusId: [1, 2],
    }}
  />
);

export const PurchasedImmediately = (props) => (
  <Vehicles
    {...props}
    filter={{
      bestOfferType: ["immediatePurchase"],
      maxEndDateTime: new Date(),
      statusId: [1, 2],
    }}
  />
);

export const Sold = (props) => (
  <Vehicles {...props} filter={{ statusId: [3] }} />
);

const LinkRecord = withStyles(styles)(({ classes, record }) => {
  if (["online", "sold"].includes(record.statusName))
    return (
      <a
        href={`${TRADE_URL}/records/${record.uuid}`}
        rel="noopener"
        target="_blank"
        className={classes.link}
      >
        Link
      </a>
    );
  return null;
});

const VehicleBulkActionButtons = (props) => (
  <>
    {/* <UpdateStatus label="Update status" {...props} />
    <ChangeEndDateTime label="Update Sales end" {...props} /> API not ready yet */}
    <BulkDeleteButton {...props} />
  </>
);
