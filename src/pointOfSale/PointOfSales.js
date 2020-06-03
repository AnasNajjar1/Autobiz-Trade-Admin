// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  Filter,
  SelectInput,
  useTranslate,
} from "react-admin";

import countryChoices from "../assets/choices/country";

const PointOfSaleFilter = (props) => (
  <Filter {...props}>
    <SelectInput
      label="country"
      source="country"
      choices={countryChoices}
      alwaysOn
    ></SelectInput>
  </Filter>
);

export const PointOfSales = (props) => {
  const translate = useTranslate();
  return (
    <List
      {...props}
      title={translate("pointOfSale")}
      filters={<PointOfSaleFilter />}
      perPage={25}
    >
      <Datagrid rowClick="edit">
        <TextField label="pointOfSaleId" source="id" />
        <TextField label="name" source="name" />
        <TextField label="zipCode" source="zipCode" />
        <TextField label="city" source="city" />
        <TextField label="country" source="country" />
      </Datagrid>
    </List>
  );
};
