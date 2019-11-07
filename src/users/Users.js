// in src/posts.js
import React from "react";
import { List, Datagrid, TextField } from "react-admin";

export const Users = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField label="id" source="id" />
      <TextField label="role" source="custom:b2bRole" />
      <TextField label="email" source="email" />
    </Datagrid>
  </List>
);
