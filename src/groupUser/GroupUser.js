import React from "react";
import {
  Create,
  Edit,
  SimpleForm,
  required,
  TextInput,
  useTranslate,
  TextField,
  BooleanInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  SelectInput,
  ReferenceField,
  AutocompleteInput,
} from "react-admin";

// const validateOnlyOneGroup = (value, allValues) => {
//   if (allValues.hasGroups && allValues.hasGroups.length > 1) {
//     return "User must have only one group";
//   }
// };

export const CreateGroupUser = (props) => {
  const translate = useTranslate();
  return (
    <Create undoable={false} title={translate("createGroup")} {...props}>
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
    <Edit undoable={false} {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <ReferenceField
          label="userName"
          source="autobizUserId"
          reference="facadeUser"
        >
          <TextField source="name" />
        </ReferenceField>

        <BooleanInput label="notificationDaily" source="notificationDaily" />
        <BooleanInput
          label="notificationNewPush"
          source="notificationNewPush"
        />
        <BooleanInput
          label="notificationAuction"
          source="notificationAuction"
        />

        <ArrayInput
          label="hasGroups"
          source="hasGroups"
          // validate={validateOnlyOneGroup}
        >
          <SimpleFormIterator>
            <ReferenceInput
              sort={{ field: "name", order: "ASC" }}
              label="group"
              source="id"
              reference="group"
              allowEmpty
            >
              <AutocompleteInput optionValue="id" optionText="name" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>

        <ArrayInput label="inGroups" source="inGroups">
          <SimpleFormIterator>
            <ReferenceInput
              sort={{ field: "name", order: "ASC" }}
              label="group"
              source="id"
              reference="group"
              allowEmpty
            >
              <AutocompleteInput optionValue="id" optionText="name" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};
