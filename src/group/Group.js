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
  required,
  ReferenceManyField,
  ReferenceField,
  Datagrid,
  CreateButton,
  Pagination,
} from "react-admin";
import { Link } from "react-router-dom";

export const CreateGroup = (props) => {
  const translate = useTranslate();
  return (
    <Create undoable={false} title={translate("createGroup")} {...props}>
      <SimpleForm>
        <TextInput label="name" source="name" validate={required()}></TextInput>
      </SimpleForm>
    </Create>
  );
};

export const EditGroup = (props) => {
  return (
    <Edit undoable={false} {...props}>
      <SimpleForm>
        <TextInput label="id" source="id" disabled />
        <TextInput label="name" source="name" validate={required()}></TextInput>
      </SimpleForm>
    </Edit>
  );
};

const AddOwnerButton = ({ classes, record }) => (
  <>
    <CreateButton
      label="AddANewOwner"
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
      label="AddANewMember"
      component={Link}
      to={`/groupUser`}
    ></CreateButton>
    <CreateButton
      label="CreateNewMember"
      component={Link}
      to={`/groupUser/create`}
    ></CreateButton>
  </>
);

export const ShowGroup = (props) => {
  const translate = useTranslate();
  return (
    <Show {...props} title={translate("group") + ` #${props.id}`}>
      <TabbedShowLayout>
        <Tab label="group">
          <TextField label="Id" source="id" />
          <TextField label="name" source="name" />
        </Tab>
        <Tab label="owners" path="owners">
          <ReferenceManyField
            pagination={<Pagination />}
            reference="groupUser"
            target="groupOwners"
          >
            <Datagrid rowClick="expand">
              <TextField label="Id" source="id" />
              <TextField label="autobizUserId" source="autobizUserId" />
              <ReferenceField
                label="userName"
                source="autobizUserId"
                reference="facadeUser"
              >
                <TextField label="name" source="name" />
              </ReferenceField>
            </Datagrid>
          </ReferenceManyField>
          <AddOwnerButton />
        </Tab>
        <Tab label="members" path="members">
          <ReferenceManyField
            pagination={<Pagination />}
            reference="groupUser"
            target="groupMembers"
          >
            <Datagrid rowClick="expand">
              <TextField label="Id" source="id" />
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
