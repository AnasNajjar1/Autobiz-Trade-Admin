// in src/posts.js
import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {
  List,
  Datagrid,
  DateInput,
  TextField,
  DateField,
  AutocompleteInput,
  CheckboxGroupInput,
  NumberField,
  BooleanInput,
  Filter,
  TextInput,
  SelectInput,
  EditButton,
  ReferenceInput,
  Show,
  RichTextField,
  SimpleShowLayout,
  Create,
  ChipField
} from "react-admin";
import ButtonImport from "./ButtonImport";

export const Records = props => (
  <List {...props} filters={<RecordFilter />}>
    <Datagrid>
      <TextField label="ID" source="id" />
      <TextField label="REF" source="refHexaId" sortable={false} />
      <DateField label="EXPERTISE DATE" source="createdAt" />
      <TextField label="BRAND" source="brandName" />
      <TextField label="MODEL" source="modelName" />
      <TextField label="registration" source="registration" />
      <TextField label="vin" source="vin" />
      <TextField label="concessionId" source="concessionId" />
      <NumberField label="MILEAGE" source="mileage" />
      <ChipField source="sourceId" />
      <EditButton label="Open" />
    </Datagrid>
  </List>
);

export const Record = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="fileNumber" />
      <TextField label="BRAND" source="brandLabel" />
      <TextField label="MODEL" source="modelLabel" />
      <NumberField label="MILEAGE" source="mileage" />
      <TextField label="Point of sale" source="pointOfSale.name" />
      <TextField label="CITY" source="pointOfSale.city" />
      <TextField label="zipCode" source="pointOfSale.zipCode" />
      <ButtonImport {...props} />
    </SimpleShowLayout>
  </Show>
);

const RecordFilter = props => (
  <Filter {...props}>
    <TextInput
      label="REF"
      source="fileNumber"
      defaultValue=""
      alwaysOn
      resettable
    />
    <TextInput
      label="Immat"
      source="registration"
      defaultValue=""
      alwaysOn
      resettable
    />

{/* 
    <CheckboxGroupInput
      source="statusId"
      choices={[
        { id: 1, name: "Valid registration" },
        { id: 2, name: "Buyer expertise ongoing" },
        { id: 3, name: "Buyer expertise finished " },
        { id: 4, name: "Supervisor authorised" },
        { id: 5, name: "Auto authorised" },
        { id: 6, name: "Rejected" },
        { id: 7, name: "Car out of process" },
        { id: 8, name: "Expertise reported" },
        { id: 9, name: "Transaction ongoing" },
        { id: 10, name: "Transaction finished" },
        { id: 11, name: "Offer older than 20 days" },
        { id: 12, name: "Expertise interrupted" },
        { id: 13, name: "Documents uploaded" },
        { id: 14, name: "Expertise reported for no specific reason" },
        { id: 15, name: "Inspection passed to the old flow" }
      ]}
      alwaysOn
    /> */}

    <DateInput
      label="Min Expertise date"
      source="creationDateMin"
      resettable
      alwaysOn
    />
    <DateInput label="Max Expertise date" source="creationDateMax" resettable />

  </Filter>
);
