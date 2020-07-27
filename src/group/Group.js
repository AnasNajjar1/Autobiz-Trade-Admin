import React from "react";
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  useTranslate,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
  ReferenceManyField,
  ReferenceField,
  Datagrid,
  CreateButton,
} from "react-admin";
import { Link } from "react-router-dom";

export const CreateGroup = (props) => {
  const translate = useTranslate();
  return (
    <Create title={translate("createGroup")} {...props}>
      <SimpleForm>
        <TextInput label="name" source="name"></TextInput>
      </SimpleForm>
    </Create>
  );
};

export const EditGroup = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput label="name" source="name"></TextInput>
      </SimpleForm>
    </Edit>
  );
};

const AddOwnerButton = ({ classes, record }) => (
  <>
    <CreateButton
      label="Add a new owner"
      component={Link}
      to={`/groupUser`}
    ></CreateButton>
    <CreateButton
      label="Create new owner"
      component={Link}
      to={`/groupUser/create`}
    ></CreateButton>
  </>
);

const AddMemberButton = ({ classes, record }) => (
  <>
    <CreateButton
      label="Add a new member"
      component={Link}
      to={`/groupUser`}
    ></CreateButton>
    <CreateButton
      label="Create new member"
      component={Link}
      to={`/groupUser/create`}
    ></CreateButton>
  </>
);

export const ShowGroup = (props) => {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Group">
          <TextField source="id" />
          <TextField source="name" />
        </Tab>
        <Tab label="Owners" path="owners">
          <ReferenceManyField reference="groupUser" target="groupOwners">
            <Datagrid rowClick="expand">
              <TextField source="id" />
              <TextField label="autobizUserId" source="autobizUserId" />
              <ReferenceField
                label="userName"
                source="autobizUserId"
                reference="facadeUser"
              >
                <TextField source="name" />
              </ReferenceField>
            </Datagrid>
          </ReferenceManyField>
          <AddOwnerButton />
        </Tab>
        <Tab label="Members" path="members">
          <ReferenceManyField reference="groupUser" target="groupMembers">
            <Datagrid rowClick="expand">
              <TextField source="id" />
              <TextField label="autobizUserId" source="autobizUserId" />
              <ReferenceField
                label="userName"
                source="autobizUserId"
                reference="facadeUser"
              >
                <TextField source="name" />
              </ReferenceField>
            </Datagrid>
          </ReferenceManyField>
          <AddMemberButton />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
