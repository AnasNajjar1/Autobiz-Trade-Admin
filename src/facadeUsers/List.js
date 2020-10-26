// in src/posts.js
import React from "react";
import {
  List,
  Datagrid,
  TextField,
  useTranslate,
  Filter,
  TextInput,
  SelectInput,
} from "react-admin";
import { countryChoices } from "../assets/choices/country";
import ButtonGroupUser from "./ButtonGroupUser";

const FacadeUsers = (props) => {
  const translate = useTranslate();
  return (
    <List
      {...props}
      title={translate("users")}
      perPage={50}
      filters={<UserFilter />}
      filterDefaultValues={{ country: "FR" }}
      pagination={<></>}
    >
      <Datagrid>
        <TextField label="id" source="id" sortable={false} />
        <TextField label="firstname" source="firstname" sortable={false} />
        <TextField label="lastname" source="lastname" sortable={false} />
        <TextField label="username" source="username" sortable={false} />
        <TextField label="email" source="email" sortable={false} />
        <TextField label="groupUserId" source="groupUserId" sortable={false} />
        <ButtonGroupUser {...props} />
      </Datagrid>
    </List>
  );
};

const UserFilter = (props) => (
  <Filter {...props}>
    <SelectInput
      label="country"
      source="country"
      alwaysOn
      choices={countryChoices}
    />
    <TextInput label="userName" source="username" defaultValue="" alwaysOn />
    <TextInput label="firstName" source="firstName" defaultValue="" alwaysOn />
    <TextInput label="lastName" source="lastName" defaultValue="" alwaysOn />
    <TextInput label="email" source="email" defaultValue="" alwaysOn />
  </Filter>
);

export default FacadeUsers;
