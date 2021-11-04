import React from "react";
import {
  TextInput,
  Filter,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
export const VehiclesFilter = (props) => (
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
    <ReferenceInput
      label="pointOfSaleName"
      source="pointOfSaleId"
      reference="pointOfSale"
      sort={{ field: "name", order: "ASC" }}
      perPage={1000}
      alwaysOn
    >
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
);
