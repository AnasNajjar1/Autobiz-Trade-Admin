// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  ImageField,
  DateField,
  NumberField
} from "react-admin";


export const Users = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField label="id" source="id" />
      <TextField label="Username" source="Username" />
      <TextField label="email" source="email" />
    </Datagrid>
  </List>
);
