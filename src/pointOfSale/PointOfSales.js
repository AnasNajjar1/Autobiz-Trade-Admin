// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  Filter,
  SelectInput,
  useTranslate,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";

import { countryChoices } from "../assets/choices/country";
import _ from "lodash";

const PointOfSaleFilter = (props) => {
  const companiesChoices = getCompaniesChoices(props.data);
  return (
    <Filter {...props}>
      <SelectInput
        label="country"
        source="country"
        choices={countryChoices}
        alwaysOn
      ></SelectInput>
      <ReferenceInput
        label="name"
        source="id"
        reference="pointOfSale"
        sort={{ field: "name", order: "ASC" }}
        perPage={1000}
        alwaysOn
      >
        <AutocompleteInput optionValue="id" optionText="name" />
      </ReferenceInput>
      <SelectInput
        label="company"
        source="company"
        reference="pointOfSale"
        choices={companiesChoices}
        alwaysOn
      ></SelectInput>
    </Filter>
  );
};

export const PointOfSales = (props) => {
  const translate = useTranslate();
  return (
    <List
      {...props}
      title={translate("pointOfSale")}
      filters={<PointOfSaleFilter />}
      perPage={25}
      sort={{ field: "id", order: "DESC" }}
    >
      <Datagrid rowClick="edit">
        <TextField label="pointOfSaleId" source="id" />
        <TextField label="name" source="name" />
        <TextField label="company" source="company" />
        <TextField label="zipCode" source="zipCode" />
        <TextField label="city" source="city" />
        <TextField label="country" source="country" />
      </Datagrid>
    </List>
  );
};

const getCompaniesChoices = (pointOfSales) => {
  return _.map(
    _.filter(pointOfSales, (pointOfSale) => pointOfSale.company),
    (pointOfSale) => ({ id: pointOfSale.company, name: pointOfSale.company })
  );
};
