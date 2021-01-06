import React from "react";
import { TextInput, Filter } from "react-admin";
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
  </Filter>
);
