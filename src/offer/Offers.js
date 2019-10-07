// in src/posts.js
import React from "react";
import { List, Datagrid, TextField, NumberField, DateField } from "react-admin";

export const Offers = props => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField label="fileNumber" source="fileNumber" />
        <NumberField
          source="amount"
          options={{
            style: "currency",
            currency: "EUR"
          }}
        />
        <TextField label="userId" source="userId" />
        <DateField label="createdAt" source="createdAt" showTime />
      </Datagrid>
    </List>
  );
};
