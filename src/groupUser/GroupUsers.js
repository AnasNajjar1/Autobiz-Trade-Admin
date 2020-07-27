// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  useTranslate,
  ReferenceField,
} from "react-admin";

export const GroupUsers = (props) => {
  const translate = useTranslate();
  return (
    <List {...props} title={translate("groups")} perPage={25}>
      <Datagrid rowClick="edit">
        <TextField label="userId" source="id" />
        <TextField label="autobizUserId" source="autobizUserId" />
        <ReferenceField
          label="userName"
          source="autobizUserId"
          reference="facadeUser"
        >
          <TextField source="name" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};
