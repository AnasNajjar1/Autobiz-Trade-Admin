import React from "react";
import { TextInput, Filter } from "react-admin";
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
        label="vehicleId"
        source="vehicleId"
        defaultValue=""
        alwaysOn
        resettable
      />
    </Filter>
  );
};

export default RequestsFilter;
