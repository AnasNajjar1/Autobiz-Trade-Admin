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
  useTranslate,
} from "react-admin";
import { BulkDeleteButton } from "react-admin";

import UpdateStatus from "./UpdateStatus";
import { ChangeEndDateTime } from "./UpdateStatus";

import LinkToRelatedOffers from "./LinkToRelatedOffers";
import offerTypeChoices from "../assets/choices/offerType";
import salesTypeChoices from "../assets/choices/salesType";
import status from "../assets/choices/status";
import { ImportButton } from "react-admin-import-csv";
import { TRADE_URL } from "../config";
import { withStyles } from "@material-ui/core/styles";
import { CreateButton } from "ra-ui-materialui";
const styles = {
  link: {
    color: "#9097ac",
    fontWeight: "bold",
  },
};

const VehicleFilter = (props) => (
  <Filter {...props}>
    <TextInput
      label="fileNumber"
      source="fileNumber"
      defaultValue=""
      alwaysOn
      resettable
    />
    <TextInput
      label="registration"
      source="registration"
      defaultValue=""
      alwaysOn
      resettable
    />
    {/* 
    <ReferenceInput source="statusId" reference="status">
      <SelectInput source="name" resettable />
    </ReferenceInput> */}

    <SelectInput label="status" source="statusId" choices={status} alwaysOn />

    <SelectInput
      label="offerType"
      source="offerType"
      choices={offerTypeChoices}
      resettable
    />

    <ReferenceInput
      label="make"
      source="brandLabel"
      reference="facadeBrand"
      resettable
    >
      <SelectInput optionValue="id" optionText="name" resettable />
    </ReferenceInput>

    <TextInput label="model" source="modelLabel" defaultValue="" resettable />

    <TextInput
      label="mileageMin"
      source="mileageMin"
      defaultValue=""
      resettable
    />
    <TextInput
      label="mileageMax"
      source="mileageMax"
      defaultValue=""
      resettable
    />
    <DateInput
      label="expertiseDate"
      source="createdAt"
      defaultValue=""
      resettable
    />
    <DateInput
      label="maxSalesEnd"
      source="maxEndDateTime"
      defaultValue=""
      resettable
      alwaysOn
    />
    <DateInput
      label="minSalesEnd"
      source="minEndDateTime"
      defaultValue=""
      resettable
    />
    <DateInput
      label="salesStart"
      source="startDateTime"
      defaultValue=""
      resettable
    />

    <DateInput
      label="salesEnd"
      source="endDateTime"
      defaultValue=""
      resettable
    />

    <BooleanInput label="withOffers" source="withOffers" />

    <ReferenceInput
      label="pointOfSale"
      source="pointOfSaleId"
      reference="pointOfSale"
      sort={{ field: "name", order: "ASC" }}
    >
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

export const Vehicles = (props) => {
  const translate = useTranslate();
  return (
    <List
      {...props}
      title={translate(props.resource)}
      filters={<VehicleFilter />}
      perPage={25}
      bulkActionButtons={<VehicleBulkActionButtons />}
      actions={<VehicleActions />}
      sort={{ field: "id", order: "DESC" }}
    >
      <Datagrid rowClick="show" rowClick="show">
        <TextField label="id" source="id" />
        <TextField label="ref" source="fileNumber" sortable={false} />
        <TextField
          label="registration"
          source="registration"
          sortable={false}
        />
        <TextField label="status" source="statusName" />
        <TextField label="offerType" source="offerType" />
        <BooleanField source="acceptAuction" label="acceptAuction" />
        <BooleanField
          source="acceptImmediatePurchase"
          label="acceptImmediatePurchase"
        />
        <BooleanField source="acceptSubmission" label="acceptSubmission" />
        <DateField label="salesStart" source="startDateTime" />
        <DateField label="salesEnd" source="endDateTime" />
        <TextField label="make" source="brandLabel" />
        <TextField label="model" source="modelLabel" />
        <TextField label="pointOfSale" source="pointOfSaleName" />
        <LinkRecord label="urlAds" source="uuid" />
        <LinkToRelatedOffers />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const Offline = (props) => (
  <Vehicles {...props} filter={{ statusId: [1] }} />
);

export const Pending = (props) => (
  <Vehicles {...props} filter={{ statusId: [4] }} />
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
      bestOfferType: ["auction"],
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

export const SubmissionsOnlyFinished = (props) => (
  <Vehicles
    {...props}
    filter={{
      maxEndDateTime: new Date(),
      bestOfferType: ["submission"],
      statusId: [1, 2],
    }}
  />
);

const LinkRecord = withStyles(styles)(({ classes, record }) => {
  if (["online", "sold", "pending"].includes(record.statusName))
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
    <UpdateStatus label="Update status" {...props} />
    {/* <ChangeEndDateTime label="Update Sales end" {...props} /> API not ready yet */}
    <BulkDeleteButton {...props} />
  </>
);

const VehicleActions = (props) => {
  const { className, basePath } = props;

  const config = {
    parseConfig: {
      delimiter: ";",
    },
  };

  return (
    <>
      <ImportButton {...props} {...config} />
      <CreateButton basePath={basePath} />
    </>
  );
};
