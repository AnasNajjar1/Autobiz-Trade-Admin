import React from "react";
import { Filter, TextInput, SelectInput } from "react-admin";
import FileChoices from "../assets/choices/fileStatus";

export const ImportFilter = (props) => (
  <Filter {...props}>
    <TextInput label="id" source="id" alwaysOn></TextInput>
    <SelectInput
      choices={FileChoices}
      label="status"
      source="status"
      alwaysOn
    ></SelectInput>
    <TextInput label="createdBy" source="createdBy" alwaysOn></TextInput>
  </Filter>
);
