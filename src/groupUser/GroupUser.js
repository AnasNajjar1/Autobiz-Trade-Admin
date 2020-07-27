import React from "react";
import {
  Create,
  Edit,
  SimpleForm,
  required,
  TextInput,
  useTranslate,
  TextField,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  SelectInput,
  ReferenceField,
} from "react-admin";

export const CreateGroupUser = (props) => {
  const translate = useTranslate();
  return (
    <Create title={translate("createGroup")} {...props}>
      <SimpleForm>
        <TextInput
          label="autobizUserId"
          source="autobizUserId"
          validate={required()}
        ></TextInput>
      </SimpleForm>
    </Create>
  );
};

export const EditGroupUser = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <ReferenceField
          label="userName"
          source="autobizUserId"
          reference="facadeUser"
        >
          <TextField source="name" />
        </ReferenceField>

        <ArrayInput label="hasGroups" source="hasGroups">
          <SimpleFormIterator>
            <ReferenceInput
              label="group"
              source="id"
              reference="group"
              allowEmpty
            >
              <SelectInput optionValue="id" optionText="name" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>

        <ArrayInput label="inGroups" source="inGroups">
          <SimpleFormIterator>
            <ReferenceInput
              label="group"
              source="id"
              reference="group"
              allowEmpty
            >
              <SelectInput optionValue="id" optionText="name" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};
