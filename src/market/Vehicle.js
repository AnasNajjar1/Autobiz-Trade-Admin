import React from "react";
import {
  Edit,
  TextInput,
  DateInput,
  ImageInput,
  NumberInput,
  TabbedForm,
  FormTab,
  BooleanInput,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  SelectArrayInput,
  LongTextInput,
  regex
} from "react-admin";
import RimSizeInput from "./components/RimSizeInput";
import { DateTimeInput } from "react-admin-date-inputs";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import frLocale from "date-fns/locale/fr";
import { vehSchema } from "./assets/contentVehicle";
import { fuelChoices } from "./assets/fuelChoices";
import { gearChoices } from "./assets/gearChoices";
import { statusChoices } from "./assets/statusChoices";

export const Vehicle = props => {
  const form = generateForm(vehSchema, "");
  return (
    <Edit {...props}>
      <TabbedForm submitOnEnter={false}>{form}</TabbedForm>
    </Edit>
  );
};

const generateForm = function(schema) {
  const form = Object.keys(schema.properties).map(tab => {
    const { required = [] } = schema;
    const field = generateField(
      tab,
      schema.properties[tab],
      "content",
      required.includes(tab)
    );
    return (
      <FormTab label={tab} key={tab}>
        {field}
      </FormTab>
    );
  });

  return form;
};

const required = (message = "Required") => value => {
  return value ? undefined : message;
};

const generateField = (key, content, parentSource, isRequired) => {
  let source = "";
  if (parentSource !== "") {
    source = `${parentSource}.`;
  }

  source += key;

  const { name, type, pattern } = content;

  let validate = [];
  if (isRequired) {
    validate.push(required());
  }
  if (pattern) {
    validate.push(regex(new RegExp(pattern), "incorrect value"));
  }

  if (type === "object" && typeof content.name === "undefined") {
    const fields = Object.keys(content.properties).map(field => {
      const { required = [] } = content;
      return generateField(
        field,
        content.properties[field],
        `${parentSource}.${key}`,
        required.includes(field)
      );
    });
    return fields;
  }

  switch (name) {
    case "string":
      return (
        <TextInput key={key} label={key} source={source} validate={validate} />
      );
    case "text": {
      return (
        <LongTextInput
          key={key}
          label={key}
          source={source}
          validate={validate}
        />
      );
    }
    case "int": {
      return (
        <NumberInput
          key={key}
          label={key}
          source={source}
          validate={validate}
        />
      );
    }
    case "boolean": {
      return (
        <BooleanInput
          key={key}
          label={key}
          source={source}
          validate={validate}
        />
      );
    }
    case "date": {
      return (
        <DateInput key={key} label={key} source={source} validate={validate} />
      );
    }
    case "datetime": {
      return (
        <DateTimeInput
          key={key}
          label={key}
          source={source}
          providerOptions={{ utils: MomentUtils }}
          options={{
            format: "DD/MM/YYYY, HH:mm:ss",
            ampm: false,
            clearable: true
          }}
          validate={validate}
        />
      );
    }
    case "month": {
      return (
        <React.Fragment key={key}>
          <TextInput label={key} source={source} validate={validate} />
          <div>
            <small>
              <i>Format ({pattern})</i>
            </small>
          </div>
        </React.Fragment>
      );
    }
    case "rimSize": {
      return (
        <RimSizeInput
          key={key}
          label={key}
          content={content.properties}
          source={source}
          validate={validate}
        />
      );
    }
    case "iterator": {
      return (
        <ArrayInput key={key} label={key} source={source}>
          <SimpleFormIterator>
            {Object.keys(content.properties).map(k => {
              return generateField(k, content.properties[k], "", false);
            })}
          </SimpleFormIterator>
        </ArrayInput>
      );
    }
    case "array": {
      let choices = [];

      if (content.enum) {
        content.enum.map(keyValue => {
          choices.push({ id: keyValue, name: keyValue });
        });
      }

      switch (content.$ref) {
        case "fuelChoices":
          choices = fuelChoices;
          break;
        case "gearChoices":
          choices = gearChoices;
          break;
        case "statusChoices":
          choices = statusChoices;
          break;
      }

      if (type === "array") {
        return (
          <SelectArrayInput
            key={key}
            label={key}
            source={source}
            choices={choices}
            validate={validate}
          />
        );
      }

      if (type === "string" || type === "integer") {
        return (
          <SelectInput
            key={key}
            label={key}
            source={source}
            choices={choices}
            validate={validate}
          />
        );
      }
    }
  }
};
