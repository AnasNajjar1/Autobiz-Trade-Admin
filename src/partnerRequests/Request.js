import React from "react";
import {
  Create,
  SimpleForm,
  TextField,
  ReferenceInput,
  SelectInput
} from "react-admin";

export const CreateRequest = props => (
  <Create {...props} title="Create a new request">
    <SimpleForm redirect={redirect}>
      <TextField source="vehicleId" />
      <ReferenceInput
        source="partnerId"
        reference="partner"
        sort={{ field: "name", order: "ASC" }}
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

const redirect = (basePath, id, data) =>
  `/vehicle/${data.vehicleId}/show/requests`;
