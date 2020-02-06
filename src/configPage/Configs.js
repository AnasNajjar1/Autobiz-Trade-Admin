// in src/posts.js
import React from "react";
import { List, Datagrid, TextField, Filter, SelectInput } from "react-admin";



export const Configs = props => (
  <List {...props} perPage={25}>
    <Datagrid rowClick="edit">
      <TextField label="id" source="id" />
    </Datagrid>
  </List>
);
