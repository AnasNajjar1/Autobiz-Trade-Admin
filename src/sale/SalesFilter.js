import React from "react";
import {
  TextInput,
  SelectInput,
  ReferenceInput,
  Filter,
  DateInput,
  CheckboxGroupInput,
} from "react-admin";
export const SalesFilter = (props) => (
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
    <ReferenceInput source="listId" reference="list" alwaysOn>
      <SelectInput source="name" resettable />
    </ReferenceInput>

    <SelectInput
      label="supplyType"
      source="supplyType"
      choices={[
        { id: "OFFER_TO_PRIVATE", name: "OFFER_TO_PRIVATE" },
        { id: "STOCK", name: "STOCK" },
      ]}
      alwaysOn
    />

    <DateInput
      label="startDateTimeMin"
      source="startDateTimeMin"
      resettable
      alwaysOn
    />
    <DateInput
      label="endDateTimeMax"
      source="endDateTimeMax"
      resettable
      alwaysOn
    />

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
  </Filter>
);
