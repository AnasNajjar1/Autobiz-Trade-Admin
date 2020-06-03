// in src/posts.js
import React from "react";
import { List, Datagrid, TextField, useTranslate } from "react-admin";

export const Configs = (props) => {
  const translate = useTranslate();
  return (
    <List title={translate("config")} {...props} perPage={25}>
      <Datagrid rowClick="edit">
        <TextField label="id" source="id" />
      </Datagrid>
    </List>
  );
};
