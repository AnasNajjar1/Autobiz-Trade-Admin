// in src/posts.js
import React from "react";
import { Datagrid, TextField, NumberField, DateField } from "react-admin";

export const Offers = props => {
  return (
    <Datagrid>
      <TextField label="id" source="id" />
      <TextField label="comment" source="comment" />
      <NumberField
        source="value"
        options={{
          minimumFractionDigits: 0,
          style: "currency",
          currency: "EUR"
        }}
      />
      <NumberField label="partnerRequestId" source="partnerRequestId" />
      <DateField label="createdAt" source="createdAt" showTime />
    </Datagrid>
  );
};
