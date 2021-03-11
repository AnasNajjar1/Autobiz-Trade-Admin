// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  DateInput,
  TextField,
  DateField,
  NumberField,
  Filter,
  TextInput,
  EditButton,
  Show,
  SimpleShowLayout,
  ChipField,
  useTranslate
} from "react-admin";
import ButtonImport from "./ButtonImport";

const RecordPagination = (props) => <div />; //remove pagination until it works on api

export const Records = (props) => {
  const translate = useTranslate();

  return(
    <List {...props} title={translate(props.resource)} filters={<RecordFilter />} pagination={<RecordPagination />}>
      <Datagrid>
        <TextField label="id" source="id" sortable={false} />
        <TextField
          label="ref"
          source="refHexaId"
          sortable={false}
          sortable={false}
        />
        <DateField label="expertiseDate" source="createdAt" sortable={false} />
        <TextField label="make" source="brandName" sortable={false} />
        <TextField label="model" source="modelName" sortable={false} />
        <TextField label="registration" source="registration" sortable={false} />
        <TextField label="vin" source="vin" sortable={false} />
        <TextField label="concessionId" source="concessionId" sortable={false} />
        <NumberField label="mileage" source="mileage" sortable={false} />
        <ChipField label="source" source="sourceId" sortable={false} />
        <EditButton label="open" sortable={false} />
      </Datagrid>
    </List>
  )
};

export const Record = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField label="ref" source="fileNumber" />
      <TextField label="make" source="brandLabel" />
      <TextField label="model" source="modelLabel" />
      <NumberField label="mileage" source="mileage" />
      <TextField label="pointOfSale" source="pointofsale.name" />
      <TextField label="city" source="pointofsale.city" />
      <TextField label="zipCode" source="pointofsale.zipCode" />
      <ButtonImport {...props} />
    </SimpleShowLayout>
  </Show>
);

const RecordFilter = (props) => (
  <Filter {...props}>
    <TextInput
      label="REF"
      source="refHexaId"
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
      label="MinExpertiseDate"
      source="creationDateMin"
      resettable
      alwaysOn
    />
    <DateInput
      label="MaxExpertiseDate"
      source="creationDateMax"
      resettable
      alwaysOn
    />
  </Filter>
);
