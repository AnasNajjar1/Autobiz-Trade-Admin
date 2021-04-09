import React from "react";
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  minValue,
  maxValue,
  number,
  regex,
  SelectInput,
  ReferenceInput,
  SimpleFormIterator,
  ArrayInput,
  FormDataConsumer,
  useTranslate,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import S3CustomUploader from "../components/S3CustomUploader";

import countryChoices from "../assets/choices/country";

export const CreatePointOfSale = (props) => {
  const translate = useTranslate();
  return (
    <Create title={translate("createAPointOfSale")} {...props}>
      <SimpleForm>
        <SelectInput
          label="country"
          source="country"
          choices={countryChoices}
          validate={required()}
        ></SelectInput>

        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.country && (
              <SelectInput
                source="action"
                validate={required()}
                choices={[
                  { id: "create", name: "createNewPointOfSale" },
                  {
                    id: "import",
                    name: "Import Point of sale from autobiz Database",
                  },
                ]}
              ></SelectInput>
            )
          }
        </FormDataConsumer>

        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.action === "import" && (
              <NumberInput
                label="concessionId"
                source="concessionId"
                validate={required()}
              ></NumberInput>
            )
          }
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.action === "import" &&
            formData.concessionId && (
              <ReferenceInput
                label="fromAutobizApi"
                source="autobizPosId"
                validate={required()}
                reference="facadePointOfSale"
                allowEmpty={true}
                filter={{
                  country: formData.country,
                  ids: [formData.concessionId],
                }}
              >
                <SelectInput optionValue="id" optionText="name" />
              </ReferenceInput>
            )
          }
        </FormDataConsumer>

        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.action === "create" && (
              <TextInput
                label="name"
                source="name"
                validate={required()}
              ></TextInput>
            )
          }
        </FormDataConsumer>

        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.action === "create" && (
              <TextInput label="city" source="city"></TextInput>
            )
          }
        </FormDataConsumer>

        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.action === "create" && (
              <TextInput label="zipCode" source="zipCode"></TextInput>
            )
          }
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
};

const validateURL = regex(
  new RegExp("^https*://.*\\.[a-z].{2,3}"),
  "Must be an URL"
);

export const EditPointOfSale = (props) => {
  return (
    <Edit undoable={false} {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="uuid" disabled />
        <TextInput label="name" source="name" validate={required()}></TextInput>
        <S3CustomUploader label="picture" source="picture" />
        <RichTextInput label="info" source="info"></RichTextInput>
        <TextInput label="zipCode" source="zipCode"></TextInput>
        <TextInput
          label="latitude"
          source="latitude"
          validate={[number(), minValue(-90), maxValue(90)]}
        ></TextInput>
        <TextInput
          label="longitude"
          source="longitude"
          validate={[number(), minValue(-180), maxValue(180)]}
        ></TextInput>
        <TextInput label="city" source="city"></TextInput>
        <SelectInput
          label="country"
          source="country"
          choices={countryChoices}
        ></SelectInput>

        <RichTextInput
          label="payment_deadline"
          source="paymentDeadline"
        ></RichTextInput>
        <RichTextInput
          label="pickup_deadline"
          source="pickupDeadline"
        ></RichTextInput>
        <RichTextInput label="comments" source="comments"></RichTextInput>

        <ArrayInput label="documentation" source="documentation">
          <SimpleFormIterator>
            <TextInput label="title" source="title" />
            <S3CustomUploader label="link" source="pdf" type="document"/>
            <RichTextInput label="details" source="text" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};
