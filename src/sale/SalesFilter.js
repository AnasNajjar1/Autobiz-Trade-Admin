import React from "react";
import {
  TextInput,
  SelectInput,
  ReferenceInput,
  Filter,
  DateInput,
  CheckboxGroupInput,
  AutocompleteInput,
} from "react-admin";

export const SalesFilter = (props) => {
  return (
    <>
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
        <SelectInput
          label="saleType"
          source="supplyType"
          choices={[
            { id: "OFFER_TO_PRIVATE", name: "OFFER_TO_PRIVATE" },
            { id: "STOCK", name: "STOCK" },
          ]}
          alwaysOn
        />

        <DateInput
          label="saleStartTime"
          source="startDateTimeMin"
          resettable
          alwaysOn
        />
        <DateInput
          label="saleEndTime"
          source="endDateTimeMax"
          resettable
          alwaysOn
        />
        <ReferenceInput
          label="group"
          source="groupId"
          reference="group"
          sort={{ field: "name", order: "ASC" }}
          perPage={1000}
          alwaysOn
        >
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <CheckboxGroupInput
          label="Status"
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
    </>
  );
};
