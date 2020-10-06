// in src/posts.js
import React from "react";
import {
  List,
  Filter,
  TextInput,
  Datagrid,
  TextField,
  ReferenceField,
  NumberField,
  DateField,
  useTranslate,
} from "react-admin";

const VehicleFilter = (props) => (
  <Filter {...props}>
    <TextInput
      label="fileNumber"
      source="fileNumber"
      defaultValue=""
      alwaysOn
    />
  </Filter>
);

export const Offers = (props) => {
  const translate = useTranslate();
  return (
    <List
      {...props}
      title={translate(props.resource)}
      filters={<VehicleFilter />}
      perPage={25}
      sort={{ field: "id", order: "DESC" }}
    >
      <Datagrid>
        <TextField label="fileNumber" source="fileNumber" />
        <TextField label="make" source="brandLabel" />
        <TextField label="model" source="modelLabel" />
        <TextField label="pointOfSaleName" source="pointOfSaleName" />

        <NumberField
          label="auctionStartPrice"
          source="auctionStartPrice"
          options={{
            minimumFractionDigits: 0,
            style: "currency",
            currency: "EUR",
          }}
        />
        <NumberField
          label="auctionReservePrice"
          source="auctionReservePrice"
          options={{
            minimumFractionDigits: 0,
            style: "currency",
            currency: "EUR",
          }}
        />
        <NumberField
          label="immediatePurchasePrice"
          source="immediatePurchasePrice"
          options={{
            minimumFractionDigits: 0,
            style: "currency",
            currency: "EUR",
          }}
        />
        <NumberField
          label="amount"
          source="amount"
          options={{
            minimumFractionDigits: 0,
            style: "currency",
            currency: "EUR",
          }}
        />
        <TextField label="saleType" source="saleType" />
        <DateField label="createdAt" source="createdAt" showTime />
        <TextField label="userId" source="userId" />

        <ReferenceField label="userName" source="userId" reference="facadeUser">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          label="userEmail"
          source="userId"
          reference="facadeUser"
        >
          <TextField source="email" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};
