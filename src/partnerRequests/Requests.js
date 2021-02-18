// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  useTranslate,
} from "react-admin";

export const Requests = (props) => {
  const translate = useTranslate();
  return (
    <List
      {...props}
      title={translate(props.resource)}
      bulkActionButtons={false}
      perPage={25}
      sort={{ field: "id", order: "DESC" }}
    >
      <Datagrid>
        <TextField label="id" source="id" />
        <TextField label="uuid" source="uuid" />
        <TextField label="statusId" source="statusId" />
        <TextField label="vehicleId" source="vehicleId" />
        <TextField label="comment" source="comment" />
        <TextField label="Sale Comment" source="saleComment" />
        <TextField label="status" source="statusName" />
        <TextField label="partner" source="partnerName" />
        <NumberField
          source="value"
          options={{
            minimumFractionDigits: 0,
            style: "currency",
            currency: "EUR",
          }}
        />
        <DateField
          label="lastOfferCreatedAt"
          source="lastOfferCreatedAt"
          showTime
        />
        <DateField label="createdAt" source="createdAt" showTime />
      </Datagrid>
    </List>
  );
};
