// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  Filter,
  TextInput
} from "react-admin";

export const Auctions = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField label="id" source="id" sortable={false} />
      <TextField label="creationDate" source="creationDate" />
      <TextField label="dueDate" source="dueDate" />
    </Datagrid>
  </List>
);
