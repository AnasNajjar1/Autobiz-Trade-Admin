import React from "react";
import {
  TextInput,
  SelectInput,
  ReferenceInput,
  Filter,
  CheckboxGroupInput,
} from "react-admin";
export const VehiclesFilter = (props) => (
  <Filter {...props}>
    <TextInput
      label="fileNumberLike"
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
    {/* <ReferenceInput source="listId" reference="list" alwaysOn>
      <SelectInput source="name" resettable />
    </ReferenceInput>
    <CheckboxGroupInput
      source="status"
      choices={[
        { id: "INACTIVE", name: "INACTIVE" },
        { id: "SCHEDULED", name: "SCHEDULED" },
        { id: "LIVE", name: "LIVE" },
        { id: "CLOSED", name: "CLOSED" },
        { id: "FINISHED", name: "FINISHED" },
        { id: "ARCHIVED", name: "ARCHIVED" },
      ]}
      alwaysOn
    />

    <SelectInput
      source="supplyType"
      choices={[
        { id: "OFFER_TO_PRIVATE", name: "OFFER_TO_PRIVATE" },
        { id: "STOCK", name: "STOCK" },
      ]}
      alwaysOn
    /> */}
  </Filter>
);
