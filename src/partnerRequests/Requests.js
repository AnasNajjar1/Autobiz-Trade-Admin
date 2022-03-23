// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  ReferenceField,
  useTranslate,
} from "react-admin";

import { makeStyles } from "@material-ui/core/styles";
import RequestsFilter from "./RequestsFilter";
const useStyles = makeStyles((theme) => ({
  commentSaleStyle: {
    maxWidth: 300,
    overflowWrap: "break-word",
  },
}));

export const Requests = (props) => {
  const translate = useTranslate();
  const classes = useStyles();
  return (
    <List
      {...props}
      title={translate(props.resource)}
      bulkActionButtons={false}
      perPage={25}
      sort={{ field: "id", order: "DESC" }}
      filters={<RequestsFilter />}
    >
      <Datagrid>
        <TextField label="vehicleId" source="vehicleId" />
        <TextField label="id" source="id" />
        <TextField label="fileNumber" source="vehicle.fileNumber" />
        <TextField label="registration" source="vehicle.registration" />
        <TextField label="make" source="vehicle.brandLabel" />
        <TextField label="model" source="vehicle.modelLabel" />
        <TextField label="uuid" source="uuid" />
        <TextField label="statusId" source="statusId" />
        <TextField label="comment" source="comment" />
        <TextField
          label="Offer Comment"
          source="offerComment"
          cellClassName={classes.commentSaleStyle}
        />
        <TextField
          label="Sale Comment"
          source="saleComment"
          cellClassName={classes.commentSaleStyle}
        />
        <TextField label="status" source="statusName" />
        <TextField label="partner" source="partnerName" />
        <NumberField
          label="value"
          source="value"
          options={{
            minimumFractionDigits: 0,
            style: "currency",
            currency: "EUR",
          }}
        />
        <DateField
          label="lastOfferCreatedAt"
          source="lastOfferCreatedAt"
          showTime
        />
        <DateField label="createdAt" source="createdAt" showTime />
        <ReferenceField
          label="createdBy"
          source="createdBy"
          reference="facadeUser"
          sortable={false}
        >
          <TextField source="name" />
        </ReferenceField>
        <TextField label="pointOfSaleName" source="vehicle.pointofsale.name" />
      </Datagrid>
    </List>
  );
};
