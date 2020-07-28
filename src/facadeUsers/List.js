// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  useTranslate,
  ReferenceField,
  Filter,
  TextInput,
} from "react-admin";

const FacadeUsers = (props) => {
  const translate = useTranslate();
  return (
    <List
      {...props}
      title={translate("facadeUsers")}
      perPage={25}
      filters={<UserFilter />}
    >
      <Datagrid rowClick="edit">
        <TextField label="userId" source="id" />
      </Datagrid>
    </List>
  );
};

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="country" source="country" defaultValue="" alwaysOn />
  </Filter>
);

export default FacadeUsers;
