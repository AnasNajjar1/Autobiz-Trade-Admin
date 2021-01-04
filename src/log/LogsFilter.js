import React from "react";
import { TextInput, SelectInput, Filter } from "react-admin";
export const LogsFilter = (props) => (
  <Filter {...props}>
    <SelectInput
      label="table"
      source="referenceTable"
      choices={[
        { id: "sales", name: "sales" },
        { id: "vehicles", name: "vehicles" },
      ]}
      alwaysOn
    />

    <SelectInput
      label="event"
      source="action"
      choices={[
        { id: "C", name: "create" },
        { id: "U", name: "update" },
        { id: "D", name: "delete" },
      ]}
      alwaysOn
    />

    <TextInput
      label="referenceId"
      source="referenceId"
      defaultValue=""
      alwaysOn
      resettable
    />
  </Filter>
);
