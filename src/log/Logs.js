import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  useTranslate,
  ReferenceField,
} from "react-admin";
import { LogsFilter } from "./LogsFilter";
import { LogActionLabel } from "../components/LogActionLabel";
import { LogPanel } from "../components/LogPanel";

export const Logs = (props) => {
  const translate = useTranslate();

  return (
    <List
      {...props}
      title={translate(props.resource)}
      filters={<LogsFilter />}
      perPage={25}
      bulkActionButtons={false}
      sort={{ field: "id", order: "DESC" }}
    >
      <Datagrid expand={<LogPanel />}>
        <DateField label="date" source="createdAt" showTime />
        <TextField label="table" source="referenceTable" />
        <TextField label="id" source="referenceId" />
        <TextField label="userId" source="user" />
        <LogActionLabel label="event" />
        <ReferenceField label="userName" source="user" reference="facadeUser">
          <TextField source="name" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};
