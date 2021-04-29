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
  SelectInput,
} from "react-admin";
import { countryChoices } from "../assets/choices/country";

const OffersFilter = (props) => (
  <Filter {...props}>
    <TextInput
      label="fileNumber"
      source="fileNumberLike"
      defaultValue=""
      alwaysOn
    />
    <SelectInput
      label="offerType"
      source="offerType"
      choices={[
        { id: "submission", name: "submission" },
        { id: "auction", name: "auction" },
        { id: "immediatePurchase", name: "immediatePurchase" },
      ]}
      alwaysOn
    />
    <SelectInput
      label="supplyType"
      source="supplyType"
      choices={[
        { id: "OFFER_TO_PRIVATE", name: "OFFER_TO_PRIVATE" },
        { id: "STOCK", name: "STOCK" },
      ]}
      alwaysOn
    />
    <SelectInput
      label="country"
      source="country"
      alwaysOn
      choices={countryChoices}
    />
  </Filter>
);

export const Offers = (props) => {
  const translate = useTranslate();
  return (
    <List
      {...props}
      title={translate(props.resource)}
      filters={<OffersFilter />}
      perPage={25}
      sort={{ field: "id", order: "DESC" }}
    >
      <Datagrid>
        <TextField label="id" source="id" />
        <TextField label="fileNumber" source="sale.vehicle.fileNumber" />
        <TextField label="make" source="sale.vehicle.brandLabel" />
        <TextField label="model" source="sale.vehicle.modelLabel" />
        <TextField
          label="pointOfSaleName"
          source="sale.vehicle.pointofsale.name"
        />

        <NumberField
          label="auctionStartPrice"
          source="sale.auctionStartPrice"
          options={{
            minimumFractionDigits: 0,
            style: "currency",
            currency: "EUR",
          }}
        />
        <NumberField
          label="auctionReservePrice"
          source="sale.auctionReservePrice"
          emptyText="-"
          options={{
            minimumFractionDigits: 0,
            style: "currency",
            currency: "EUR",
          }}
        />

        <NumberField
          label="immediatePurchasePrice"
          source="sale.immediatePurchasePrice"
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
        <TextField label="offerType" source="offerType" />
        <TextField label="offerStatus" source="sale.salesStat.status" />
        <DateField label="createdAt" source="createdAt" showTime />
        <TextField label="userId" source="userId" />

        <ReferenceField
          label="userName"
          source="userId"
          reference="facadeUser"
          sortable={false}
        >
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          label="userEmail"
          source="userId"
          reference="facadeUser"
          sortable={false}
        >
          <TextField source="email" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};
