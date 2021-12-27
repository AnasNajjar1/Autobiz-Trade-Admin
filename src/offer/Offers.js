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
  DateInput,
  SelectField,
  FunctionField,
} from "react-admin";
import { countryChoices } from "../assets/choices/country";
import { exporter, ListActions } from "./OffersExporter";
import { offerType } from "../assets/choices/offerType";
import saleStatus from "../assets/choices/saleStatus";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  numberField: {
    fontWeight: "bold",
  },
});
const OffersFilter = (props) => (
  <Filter {...props}>
    <TextInput
      label="fileNumber"
      source="fileNumberLike"
      defaultValue=""
      alwaysOn
    />
    <TextInput
      label="licencePlate"
      source="registrationLike"
      defaultValue=""
      alwaysOn
    />
    <TextInput label="userId" source="userId" defaultValue="" alwaysOn />
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
      label="saleType"
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
  const classes = useStyles();

  return (
    <List
      {...props}
      title={translate(props.resource)}
      filters={<OffersFilter />}
      perPage={25}
      sort={{ field: "id", order: "DESC" }}
      actions={<ListActions />}
    >
      <Datagrid>
        <TextField label="id" source="id" />
        <TextField label="fileNumber" source="sale.vehicle.fileNumber" />
        <TextField label="licencePlate" source="sale.vehicle.registration" />
        <TextField label="make" source="sale.vehicle.brandLabel" />
        <TextField label="model" source="sale.vehicle.modelLabel" />
        <FunctionField
          label="auctionStartPrice"
          render={(record) =>
            !record.sale.acceptAuction ? (
              <Close />
            ) : (
              record.sale.auctionStartPrice.toLocaleString("fr-FR", {
                minimumFractionDigits: 0,
                style: "currency",
                currency: "EUR",
              })
            )
          }
        />
        <FunctionField
          label="auctionReservePrice"
          render={(record) =>
            record.sale.acceptAuction && record.sale.auctionReservePrice ? (
              record.sale.auctionReservePrice.toLocaleString("fr-FR", {
                minimumFractionDigits: 0,
                style: "currency",
                currency: "EUR",
              })
            ) : (
              <Close />
            )
          }
        />
        <FunctionField
          label="immediatePurchasePrice"
          render={(record) =>
            !record.sale.acceptImmediatePurchase ? (
              <Close />
            ) : (
              record.sale.immediatePurchasePrice.toLocaleString("fr-FR", {
                minimumFractionDigits: 0,
                style: "currency",
                currency: "EUR",
              })
            )
          }
        />
        <NumberField
          label="amount"
          source="amount"
          className={classes.numberField}
          options={{
            minimumFractionDigits: 0,
            style: "currency",
            currency: "EUR",
          }}
        />
        <SelectField source="offerType" label="offerType" choices={offerType} />
        <SelectField
          source="sale.salesStat.status"
          label="offerStatus"
          choices={saleStatus}
        />
        <DateField label="createdAt" source="createdAt" showTime />
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
