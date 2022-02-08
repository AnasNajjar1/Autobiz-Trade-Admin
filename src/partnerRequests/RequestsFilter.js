import React from "react";
import {
  TextInput,
  Filter,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
const RequestsFilter = (props) => {
  return (
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
        source="registrationLike"
        defaultValue=""
        alwaysOn
      />
      <TextInput label="userId" source="createdBy" defaultValue="" alwaysOn />
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
};

export default RequestsFilter;
