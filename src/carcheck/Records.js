// in src/posts.js
import React from "react";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {
  List,
  Datagrid,
  DateInput,
  TextField,
  DateField,
  AutocompleteInput,
  CheckboxGroupInput,
  NumberField,
  BooleanInput,
  Filter,
  TextInput,
  SelectInput,
  EditButton,
  ReferenceInput,
  Show,
  RichTextField,
  SimpleShowLayout
} from "react-admin";



export const Records = props => (
  <List {...props}>
    <Datagrid>
      <TextField label="ID" source="id" />
      <TextField label="REF" source="refHexaId" sortable={false} />
      <TextField label="BRAND" source="brandName" />  
       
    </Datagrid>
  </List>
);

export const Record = props => (
<Show {...props}>
  <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="fileNumber" />
      <RichTextField source="brandName" />
      <CreateRelatedCommentButton />  
  </SimpleShowLayout>
</Show>
)


const CreateRelatedCommentButton = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: '/vehicle/create',
            state: { record },
        }}
    >
        Import this car in plateform
    </Button>
);
