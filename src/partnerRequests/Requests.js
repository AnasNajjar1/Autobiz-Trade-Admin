// in src/posts.js
import React from "react";
import { List, Datagrid, TextField, NumberField, DateField } from "react-admin";

export const Requests = props => {
  return (
    <List {...props} perPage={25}>
      <Datagrid>
        <TextField label="id" source="id" />
        <TextField label="uuid" source="uuid" />
        <TextField label="statusId" source="statusId" />
        <TextField label="vehicleId" source="vehicleId" />
        <TextField label="comment" source="comment" />
        <TextField label="status" source="status" />
        <NumberField
          source="value"
          options={{
            minimumFractionDigits: 0,
            style: "currency",
            currency: "EUR"
          }}
        />
        <DateField
          label="lastOfferCreatedAt"
          source="lastOfferCreatedAt"
          showTime
        />
        <DateField label="createdAt" source="createdAt" showTime />
      </Datagrid>
    </List>
  );
};
