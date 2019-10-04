import React from "react";
import {
  Create,
  Edit,
  TextInput,
  ImageField,
  DisabledInput,
  NumberInput,
  TabbedForm,
  FormTab,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  SelectArrayInput,
  LongTextInput,
  ReferenceInput,
  FormDataConsumer,
  required,
  minValue,
  number,
  regex
} from "react-admin";
import { DateTimeInput, DateInput } from "react-admin-date-inputs";
import MomentUtils from "material-ui-pickers/utils/moment-utils";

import RimSizeInput from "./components/RimSizeInput";

import keyPointsChoices from "../assets/choices/keyPoints";
import fuelChoices from "../assets/choices/fuel";
import declaredEquipmentsChoices from "../assets/choices/declaredEquipments";
import constructorEquipmentsChoices from "../assets/choices/constructorEquipments";
import rimTypeChoices from "../assets/choices/rimType";
import profileCostsChoices from "../assets/choices/profileCosts";
import typeChoices from "../assets/choices/type";
import wheelsTireBrandChoices from "../assets/choices/wheelsTireBrand";
import vehicleTypeChoices from "../assets/choices/vehicleType";
import originChoices from "../assets/choices/origin";
import servicingHistoryChoices from "../assets/choices/servicingHistory";
import gearBoxChoices from "../assets/choices/gearBox";
import boolOrNullChoices from "../assets/choices/boolOrNull";

export const CreateVehicle = props => {
  const form = commonForm("create");
  return <Create {...props}>{form}</Create>;
};

export const EditVehicle = (props, { basePath, data, resource }) => {
  const form = commonForm("edit");
  return <Edit {...props}>{form}</Edit>;
};

const validateURL = regex(
  new RegExp("^https*://.*\\.[a-z].{2,3}"),
  "Must be an URL"
);

const validateMonth = regex(new RegExp("^[0-9]{4}-[0-9]{2}$"), "Wrong Format");

const largerInput = {
  width: "50%"
};
const fullWidth = {
  width: "100%"
};

const inlineBlock = {
  width: "50%",
  display: "inline-block"
};

const commonForm = type => {
  return (
    <TabbedForm submitOnEnter={false}>
      <FormTab label="record" key="record">
        {type === "edit" && <DisabledInput source="id" />}
        {type === "edit" && <DisabledInput source="uuid" style={largerInput} />}

        <TextInput
          label="fileNumber"
          source="fileNumber"
          validate={required()}
        />

        <TextInput label="userId" source="userId" placeholder="Ex: FR_1234" />
      </FormTab>

      <FormTab label="salesInfo">
        <DateInput
          source="purchaseDate"
          label="purchaseDate"
          providerOptions={{ utils: MomentUtils }}
          options={{ format: "DD/MM/YYYY", clearable: true }}
        />

        <ReferenceInput
          source="statusId"
          reference="status"
          validate={required()}
        >
          <SelectInput source="name" />
        </ReferenceInput>

        <SelectInput label="type" source="type" choices={typeChoices} />

        <NumberInput
          label="minimalPrice"
          source="minimalPrice"
          validate={[number(), minValue(0)]}
        />

        <DateTimeInput
          label="salesDateTimeEnd"
          source="salesDateTimeEnd"
          providerOptions={{ utils: MomentUtils }}
          options={{
            format: "DD/MM/YYYY, HH:mm:ss",
            ampm: false,
            clearable: true
          }}
        />

        <LongTextInput
          label="salesComment"
          source="salesComment"
        ></LongTextInput>
      </FormTab>

      <FormTab label="vehicle" key="vehicle">
        <ReferenceInput
          label="brandLabel"
          source="brandLabel"
          reference="facadeBrand"
        >
          <SelectInput optionValue="name" optionText="name" />
        </ReferenceInput>

        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <ReferenceInput
              label="modelLabel"
              source="modelLabel"
              reference="facadeModel"
              filter={{ brandLabel: formData.brandLabel }}
            >
              <SelectInput optionValue="name" optionText="name" />
            </ReferenceInput>
          )}
        </FormDataConsumer>

        <TextInput label="versionLabel" source="versionLabel" />

        <DateInput
          source="firstRegistrationDate"
          label="firstRegistrationDate"
          providerOptions={{ utils: MomentUtils }}
          options={{ format: "DD/MM/YYYY", clearable: true }}
        />

        <SelectInput
          label="profileCosts"
          source="profileCosts"
          choices={profileCostsChoices}
        />
      </FormTab>

      <FormTab label="carPictures">
        <ImageField source="carPictures.left_side_picture" />
        <TextInput
          label="left_side_picture"
          source="carPictures.left_side_picture"
          style={fullWidth}
        />

        <ImageField source="carPictures.front_picture" />
        <TextInput
          label="front_picture"
          source="carPictures.front_picture"
          style={fullWidth}
        />

        <ImageField source="carPictures.right_side_picture" />
        <TextInput
          label="right_side_picture"
          source="carPictures.right_side_picture"
          style={fullWidth}
        />

        <ImageField source="carPictures.back_picture" />
        <TextInput
          label="back_picture"
          source="carPictures.back_picture"
          style={fullWidth}
        />

        <ImageField source="carPictures.motor_picture" />
        <TextInput
          label="motor_picture"
          source="carPictures.motor_picture"
          style={fullWidth}
        />

        <ImageField source="carPictures.trunk_picture" />
        <TextInput
          label="trunk_picture"
          source="carPictures.trunk_picture"
          style={fullWidth}
        />

        <ImageField source="carPictures.inside_front_picture" />
        <TextInput
          label="inside_front_picture"
          source="carPictures.inside_front_picture"
          style={fullWidth}
        />

        <ImageField source="carPictures.dashboard_picture" />
        <TextInput
          label="dashboard_picture"
          source="carPictures.dashboard_picture"
          style={fullWidth}
        />

        <ImageField source="carPictures.inside_back_picture" />
        <TextInput
          label="inside_back_picture"
          source="carPictures.inside_back_picture"
          style={fullWidth}
        />

        <ImageField source="carPictures.counter_picture" />
        <TextInput
          label="counter_picture"
          source="carPictures.counter_picture"
          style={fullWidth}
        />

        <ImageField source="carPictures.vin_picture" />
        <TextInput
          label="vin_picture"
          source="carPictures.vin_picture"
          style={fullWidth}
        />

        <ImageField source="carPictures.purchase_invoice_picture" />
        <TextInput
          label="purchase_invoice_picture"
          source="carPictures.purchase_invoice_picture"
          style={fullWidth}
        />

        <ImageField source="carPictures.purchase_invoice_picture2" />
        <TextInput
          label="purchase_invoice_picture2"
          source="carPictures.purchase_invoice_picture2"
          style={fullWidth}
        />
      </FormTab>

      <FormTab label="PointOfSale">
        <ReferenceInput
          source="pointOfSaleId"
          reference="pointOfSale"
          sort={{ field: "name", order: "ASC" }}
        >
          <SelectInput source="id" />
        </ReferenceInput>
      </FormTab>

      <FormTab label="keyPoints">
        <SelectArrayInput
          label="keyPoints"
          source="keyPoints"
          choices={keyPointsChoices}
        />
      </FormTab>

      <FormTab label="documents">
        <ArrayInput label="documents" source="documents">
          <SimpleFormIterator>
            <TextInput source="title" />
            <TextInput source="link" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>

      <FormTab label="equipments">
        <SelectArrayInput
          label="declaredEquipments"
          source="declaredEquipments"
          choices={declaredEquipmentsChoices}
          style={largerInput}
        />
        <SelectArrayInput
          label="constructorEquipments"
          source="constructorEquipments"
          choices={constructorEquipmentsChoices}
          style={largerInput}
        />
      </FormTab>

      <FormTab label="characteristics">
        <NumberInput
          label="mileage"
          source="mileage"
          validate={[number(), minValue(0)]}
        />

        <SelectInput
          label="fuelLabel"
          source="fuelLabel"
          choices={fuelChoices}
        />
        <NumberInput label="liter" source="liter" />
        <SelectInput
          label="gearBoxLabel"
          source="gearBoxLabel"
          choices={gearBoxChoices}
        />
        <TextInput label="seats" source="seats" />
        <TextInput label="door" source="door" />
        <NumberInput label="ch" source="ch" />
        <NumberInput label="kw" source="kw" />
        <NumberInput label="fiscal" source="fiscal" />

        <RimSizeInput
          label="wheelsFrontDimensions"
          source="wheelsFrontDimensions"
        />

        <RimSizeInput
          label="wheelsBackDimensions"
          source="wheelsBackDimensions"
        />

        <SelectInput
          label="wheelsFrontTireBrand"
          source="wheelsFrontTireBrand"
          choices={wheelsTireBrandChoices}
        />

        <SelectInput
          label="wheelsBackTireBrand"
          source="wheelsBackTireBrand"
          choices={wheelsTireBrandChoices}
        />

        <SelectInput
          label="rimTypeFront"
          source="rimTypeFront"
          choices={rimTypeChoices}
        />

        <SelectInput
          label="rimTypeBack"
          source="rimTypeBack"
          choices={rimTypeChoices}
        />
        <SelectInput
          label="metallic"
          source="metallic"
          choices={boolOrNullChoices}
        />
      </FormTab>

      <FormTab label="administrativeDetails">
        <DateInput
          source="gcDate"
          label="gcDate"
          providerOptions={{ utils: MomentUtils }}
          options={{ format: "DD/MM/YYYY", clearable: true }}
        />

        <SelectInput
          label="firstHand"
          source="firstHand"
          choices={boolOrNullChoices}
        />
        <SelectInput
          label="vehicleType"
          source="vehicleType"
          choices={vehicleTypeChoices}
        />
        <NumberInput label="co2" source="co2" />
      </FormTab>

      <FormTab label="history">
        <SelectInput label="origin" source="origin" choices={originChoices} />
        <SelectInput
          label="servicingHistory"
          source="servicingHistory"
          choices={servicingHistoryChoices}
        />

        <TextInput
          label="nextTechnicalCheckDate"
          source="nextTechnicalCheckDate"
          validate={validateMonth}
        />
        <div>
          <small>
            <i>Format (YYYY-MM)</i>
          </small>
        </div>
        <TextInput
          label="lastservicingDate"
          source="lastservicingDate"
          validate={validateMonth}
        />
        <div>
          <small>
            <i>Format (YYYY-MM)</i>
          </small>
        </div>

        <SelectInput
          label="servicingInBrandNetwork"
          source="servicingInBrandNetwork"
          choices={boolOrNullChoices}
        />

        <TextInput
          label="purchaseInvoice"
          source="purchaseInvoice"
          validate={validateURL}
        />

        <SelectInput label="vat" source="vat" choices={boolOrNullChoices} />
      </FormTab>

      <FormTab label="market">
        <TextInput
          label="marketLink"
          source="marketLink"
          validate={validateURL}
        />
        <NumberInput
          label="b2cMarketValue"
          source="b2cMarketValue"
          validate={[number(), minValue(0)]}
        />
        <NumberInput
          label="standardMileage"
          source="standardMileage"
          validate={[number(), minValue(0)]}
        />
      </FormTab>
    </TabbedForm>
  );
};
