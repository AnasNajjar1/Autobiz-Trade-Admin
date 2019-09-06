import React from "react";
import {
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  ReferenceField,
  ImageInput,
  DateField,
  NumberInput,
  TabbedForm,
  FormTab,
  BooleanInput
} from "react-admin";
//import RichTextInput from 'ra-input-rich-text';
import { vehSchema } from "./assets/contentVehicle";

export const Vehicle = props => {
  const content = generateForm(vehSchema, "");
  return (
    <Edit {...props}>
      <TabbedForm submitOnEnter={false}>{content}</TabbedForm>
    </Edit>
  );
};

const generateForm = function(schema, parent = "") {
  const mainTab = [];
  const content = Object.entries(schema).map(([key, value]) => {
    if (value.hasOwnProperty("type")) {
      if (parent === "") {
        mainTab.push(generateField({ ...value, key }, `content.${key}`));
      } else {
        let source = `content.${parent}.${key}`;
        return generateField({ ...value, key }, source);
      }
    } else {
      return <FormTab label={key}>{generateForm(value, key)}</FormTab>;
    }
  });
  content.unshift(<FormTab label={"main"}>{mainTab}</FormTab>);
  return content;
};

function generateField(content, source) {
  const { type, key } = content;
  switch (type) {
    case "int": {
      return <NumberInput label={key} source={source} />;
    }
    case "date": {
      return <DateInput label={key} source={source} />;
    }
    case "month": {
      return <DateInput label={key} source={source} />;
    }
    case "image": {
      return <ImageInput label={key} source={source} />;
    }
    case "boolean": {
      return <BooleanInput label={key} source={source} />;
    }
    default: {
      return <TextInput label={key} source={source} />;
    }
  }
}
