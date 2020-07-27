// in src/posts.js
import React from "react";
import { List, Datagrid, TextField, useTranslate } from "react-admin";

export const Groups = (props) => {
  const translate = useTranslate();
  return (
    <List
      {...props}
      title={translate("groups")}
      bulkActionButtons={false}
      perPage={25}
    >
      <Datagrid rowClick="show">
        <TextField label="groupId" source="id" />
        <TextField label="name" source="name" />
      </Datagrid>
    </List>
  );
};
