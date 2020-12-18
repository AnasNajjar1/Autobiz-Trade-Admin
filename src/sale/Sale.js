import React, { Fragment, useState } from "react";
import {
  TabbedShowLayout,
  Tab,
  TextField,
  Show,
  DateField,
  NumberField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
} from "react-admin";

export const ShowSale = (props) => {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="vehicle">
          <TextField label="registration" source="vehicle.registration" />
          <TextField source="brandLabel" source="vehicle.brandLabel" />
          <TextField source="modelLabel" source="vehicle.modelLabel" />
          <TextField source="versionLabel" source="vehicle.versionLabel" />
          <DateField
            source="firstRegistrationDate"
            source="vehicle.firstRegistrationDate"
          />
          <NumberField source="mileage" source="vehicle.mileage" />
          <TextField
            source="pointOfSale.name"
            source="vehicle.pointofsale.name"
          />
        </Tab>
        <Tab label="Offers" path="offer">
          <ReferenceManyField reference="offer" target="saleId">
            <Datagrid>
              <TextField label="offerId" source="id" />
              <NumberField
                source="amount"
                options={{
                  minimumFractionDigits: 0,
                  style: "currency",
                  currency: "EUR",
                }}
              />
              <TextField label="saleType" source="offerType" />
              <DateField label="createdAt" source="createdAt" showTime />
              <TextField label="userId" source="userId" />
              {/* <ReferenceField
                label="User"
                source="userId"
                reference="facadeUser"
              >
                <TextField source="name" />
              </ReferenceField>
              <ReferenceField
                label="Email"
                source="userId"
                reference="facadeUser"
              >
                <TextField source="email" />
              </ReferenceField> */}
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
