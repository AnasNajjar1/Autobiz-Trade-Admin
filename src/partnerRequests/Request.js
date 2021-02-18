import React from "react";
import {
  Create,
  SimpleForm,
  NumberInput,
  ReferenceInput,
  SelectInput,
  useTranslate,
  TextInput
} from "react-admin";
import { parse } from "query-string";

export const CreateRequest = (props) => {
  const translate = useTranslate();
  const { vehicleId: vehicleIdString } = parse(props.location.search);
  const vehicleId = vehicleIdString ? parseInt(vehicleIdString, 10) : null;

  return (
    <Create {...props} title={translate("createANewRequest")}>
      <SimpleForm {...props}>
        <NumberInput
          source="vehicleId"
          disabled={vehicleId !== null}
          defaultValue={vehicleId}
        />
        <ReferenceInput
          source="partnerId"
          reference="partner"
          sort={{ field: "name", order: "ASC" }}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput multiline label="comment" source="comment"/>
      </SimpleForm>
    </Create>
  );
};

const redirect = (basePath, id, data) =>
  `/vehicle/${data.vehicleId}/show/requests`;
