// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  DateInput,
  TextField,
  DateField,
  BooleanField,
  Filter,
  TextInput,
  SelectInput,
  EditButton,
  ReferenceInput,
  useTranslate,
} from "react-admin";
import { BulkDeleteButton } from "react-admin";
import Stars from "@material-ui/icons/Stars";

import UpdateStatus from "./UpdateStatus";

import LinkToRelatedOffers from "./LinkToRelatedOffers";
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
      source="fileNumberLike"
      defaultValue=""
      alwaysOn
      resettable
    />
    <TextInput
      label="registration"
      source="registrationLike"
      defaultValue=""
      alwaysOn
      resettable
    />
    <ReferenceInput source="listId" reference="list" alwaysOn>
      <SelectInput source="name" resettable />
    </ReferenceInput>

    <SelectInput label="status" source="statusId" choices={status} alwaysOn />

    {/* <SelectInput
      label="offerType"
      source="offerType"
      choices={offerTypeChoices}
      resettable
    /> */}

    {/* <ReferenceInput
      label="make"
      source="brandLabel"
      reference="facadeBrand"
      resettable
    >
      <SelectInput optionValue="id" optionText="name" resettable />
    </ReferenceInput> */}

    {/* <TextInput label="model" source="modelLabel" defaultValue="" resettable />

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
    /> */}
    <DateInput
      label="maxSalesEnd"
      source="maxEndDateTime"
      defaultValue=""
      resettable
      alwaysOn
    />
    {/* <DateInput
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
    /> */}

    {/* <BooleanInput label="withOffers" source="withOffers" />

    <ReferenceInput
      label="pointOfSale"
      source="pointOfSaleId"
      reference="pointOfSale"
      sort={{ field: "name", order: "ASC" }}
    >
      <AutocompleteInput optionText="name" />
    </ReferenceInput> */}
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
      <Datagrid rowClick="show">
        <TextField label="id" source="id" />
        <TextField label="ref" source="fileNumber" sortable={false} />
        <TextField
          label="registration"
          source="registration"
          sortable={false}
        />
        <TextField label="status" source="status.name" />
        <BooleanField source="sale.acceptAuction" label="acceptAuction" />
        <BooleanField
          source="sale.acceptImmediatePurchase"
          label="acceptImmediatePurchase"
        />
        <BooleanField source="sale.acceptSubmission" label="acceptSubmission" />
        <DateField label="salesStart" source="sale.startDateTime" />
        <DateField label="salesEnd" source="sale.endDateTime" />
        <TextField label="bestOfferType" source="sale.bestOfferType" />
        <TextField label="make" source="brandLabel" />
        <TextField label="model" source="modelLabel" />
        <TextField label="pointOfSale" source="pointOfSale.name" />
        <BooleanField source="requestWinner" TrueIcon={Stars} />

        <LinkRecord label="urlAds" source="uuid" />
        <LinkToRelatedOffers />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const Stock = (props) => (
  <Vehicles {...props} filter={{ offerType: ["stock"] }} />
);

export const OfferToPrivate = (props) => (
  <Vehicles {...props} filter={{ offerType: ["offerToPrivate"] }} />
);

export const Offertoprivate = (props) => (
  <Vehicles {...props} filter={{ offerType: ["offerToPrivate"] }} />
);

export const OffertoprivateOffline = (props) => (
  <Vehicles
    {...props}
    filter={{ statusId: [1], offerType: ["offerToPrivate"] }}
  />
);

export const StockOffline = (props) => (
  <Vehicles {...props} filter={{ statusId: [1], offerType: ["stock"] }} />
);

export const OffertoprivatePending = (props) => (
  <Vehicles
    {...props}
    filter={{ statusId: [4], offerType: ["offerToPrivate"] }}
  />
);

export const StockPending = (props) => (
  <Vehicles {...props} filter={{ statusId: [4], offerType: ["stock"] }} />
);

export const OffertoprivateOnSale = (props) => (
  <Vehicles
    {...props}
    filter={{
      statusId: [2],
      minEndDateTime: new Date(),
      offerType: ["offerToPrivate"],
    }}
  />
);

export const StockOnSale = (props) => (
  <Vehicles
    {...props}
    filter={{ statusId: [2], minEndDateTime: new Date(), offerType: ["stock"] }}
  />
);

export const OffertoprivateAuctionFinished = (props) => (
  <Vehicles
    {...props}
    filter={{
      withOffers: true,
      maxEndDateTime: new Date(),
      statusId: [1, 2],
      bestOfferType: ["auction"],
      offerType: ["offerToPrivate"],
    }}
  />
);

export const StockAuctionFinished = (props) => (
  <Vehicles
    {...props}
    filter={{
      withOffers: true,
      maxEndDateTime: new Date(),
      statusId: [1, 2],
      bestOfferType: ["auction"],
      offerType: ["stock"],
    }}
  />
);

export const OffertoprivateAuctionFailed = (props) => (
  <Vehicles
    {...props}
    filter={{
      withOffers: false,
      maxEndDateTime: new Date(),
      statusId: [1, 2],
      offerType: ["offerToPrivate"],
    }}
  />
);

export const StockAuctionFailed = (props) => (
  <Vehicles
    {...props}
    filter={{
      withOffers: false,
      maxEndDateTime: new Date(),
      statusId: [1, 2],
      offerType: ["stock"],
    }}
  />
);

export const OffertoprivatePurchasedImmediately = (props) => (
  <Vehicles
    {...props}
    filter={{
      bestOfferType: ["immediatePurchase"],
      maxEndDateTime: new Date(),
      statusId: [1, 2],
      offerType: ["offerToPrivate"],
    }}
  />
);

export const StockPurchasedImmediately = (props) => (
  <Vehicles
    {...props}
    filter={{
      bestOfferType: ["immediatePurchase"],
      maxEndDateTime: new Date(),
      statusId: [1, 2],
      offerType: ["stock"],
    }}
  />
);

export const OffertoprivateSold = (props) => (
  <Vehicles
    {...props}
    filter={{ statusId: [3], offerType: ["offerToPrivate"] }}
  />
);

export const StockSold = (props) => (
  <Vehicles {...props} filter={{ statusId: [3], offerType: ["stock"] }} />
);

export const OffertoprivateSubmissionsOnlyFinished = (props) => (
  <Vehicles
    {...props}
    filter={{
      maxEndDateTime: new Date(),
      bestOfferType: ["submission"],
      statusId: [1, 2],
      offerType: ["offerToPrivate"],
    }}
  />
);

export const StockSubmissionsOnlyFinished = (props) => (
  <Vehicles
    {...props}
    filter={{
      maxEndDateTime: new Date(),
      bestOfferType: ["submission"],
      statusId: [1, 2],
      offerType: ["stock"],
    }}
  />
);

const LinkRecord = withStyles(styles)(({ classes, record }) => {
  if (["online", "sold", "pending"].includes(record.status.name))
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
