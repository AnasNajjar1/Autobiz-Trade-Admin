import React from "react";
import { List, Datagrid, TextField, DateField } from "react-admin";
import { withStyles } from "@material-ui/core/styles";
import { ImportVehicleSalesAction } from "./ImportVehicleSalesAction";
import { ImportFilter } from "./ImportFilter";
import { ImportExpandPanel } from "./ImportExpandPanel";
const styles = {
  link: {
    color: "#9097ac",
    fontWeight: "bold",
  },
};

const LinkSheet = withStyles(styles)(({ classes, record }) => {
  return (
    <a
      href={`${record.link}`}
      rel="noopener"
      target="_blank"
      className={classes.link}
    >
      Link
    </a>
  );
});

export const ImportVehicleSales = (props) => {
  return (
    <List
      {...props}
      label="import"
      perPage={25}
      actions={<ImportVehicleSalesAction />}
      filters={<ImportFilter />}
      sort={{ field: "id", order: "DESC" }}
      empty={false}
      filterDefaultValues={{
        importType: "vehicleSale",
      }}
    >
      <Datagrid
        expand={<ImportExpandPanel />}
        isRowExpandable={(row) => row.notification}
        size={"medium"}
      >
        <TextField label="id" source="id" />
        <TextField label="uuid" source="uuid" />
        <TextField label="status" source="status" />
        <TextField label="createdBy" source="createdBy" />
        <LinkSheet label="link" source="link" />
        <DateField label="createdAt" source="createdAt" showTime />
        <DateField label="updatedAt" source="updatedAt" showTime />
      </Datagrid>
    </List>
  );
};
