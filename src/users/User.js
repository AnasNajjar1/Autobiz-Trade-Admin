// in src/posts.js
import React from "react";
import {
  List,
  Edit,
  TextField,
  SimpleForm,
  SelectInput,
  DateField,
  NumberField
} from "react-admin";


const User = props => (
  <Edit {...props}>
    <SimpleForm submitOnEnter={false}>
      <TextField label="username" source="id" />
      <SelectInput source="b2bRole" choices={[
          { id: 'read', name: 'read' },
          { id: 'auctionneer', name: 'auctionneer' },
          { id: 'admin', name: 'admin' },
      ]} />
    </SimpleForm>
  </Edit>
);

export default User