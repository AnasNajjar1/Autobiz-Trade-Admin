import React from "react";
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  FormDataConsumer
} from "react-admin";

import countryChoices from "../assets/choices/country";

export const CreatePointOfSale = props => {
  return (
    <Create {...props}>
      <SimpleForm>
        <SelectInput source="country" choices={countryChoices}></SelectInput>

        <TextInput label="zipCode" source="zipCode"></TextInput>

        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.country &&
            formData.zipCode && (
              <SelectInput
                source="action"
                choices={[
                  { id: "create", name: "Create new Point of Sale" },
                  {
                    id: "import",
                    name: "Import Point of sale from autobiz Database"
                  }
                ]}
              ></SelectInput>
            )
          }
        </FormDataConsumer>

        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.action === "import" && (
              <ReferenceInput
                label="From autobiz API"
                source="autobizPosId"
                reference="facadePointOfSale"
                allowEmpty={true}
                filter={{
                  country: formData.country,
                  zipCode: formData.zipCode
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
              <TextInput label="name" source="name"></TextInput>
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
      </SimpleForm>
    </Create>
  );
};

export const EditPointOfSale = props => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="name" source="name"></TextInput>
        <TextInput label="zipCode" source="zipCode"></TextInput>
        <TextInput label="city" source="city"></TextInput>
        <SelectInput source="country" choices={countryChoices}></SelectInput>
      </SimpleForm>
    </Edit>
  );
};
