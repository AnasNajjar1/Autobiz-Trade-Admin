import React from "react";
import { List, Datagrid, TextField, DateField, Create } from "react-admin";
import { withStyles } from "@material-ui/core/styles";
import { ImportImagesListActions } from "./ImportImagesAction";
import { ImportExpandPanel } from "./ImportExpandPanel";
import { ImportFilter } from "./ImportFilter";
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

export const ImportImages = (props) => {
  return (
    <List
      {...props}
      label="import"
      perPage={25}
      actions={<ImportImagesListActions />}
      filters={<ImportFilter />}
      sort={{ field: "id", order: "DESC" }}
      empty={false}
      filterDefaultValues={{
        importType: "vehicleImage",
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
