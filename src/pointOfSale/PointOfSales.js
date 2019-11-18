// in src/posts.js
import React from "react";
import { List, Datagrid, TextField, Filter, SelectInput } from "react-admin";

import countryChoices from "../assets/choices/country";

const PointOfSaleFilter = props => (
  <Filter {...props}>
    <SelectInput
      source="country"
      choices={countryChoices}
      alwaysOn
    ></SelectInput>
  </Filter>
);

export const PointOfSales = props => (
  <List {...props} filters={<PointOfSaleFilter />} perPage={25}>
    <Datagrid rowClick="edit">
      <TextField label="id" source="id" />
      <TextField label="name" source="name" />
      <TextField label="zipCode" source="zipCode" />
      <TextField label="city" source="city" />
      <TextField label="country" source="country" />
    </Datagrid>
  </List>
);
