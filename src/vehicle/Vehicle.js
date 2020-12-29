import React, { Fragment, useState } from "react";
import {
  TabbedShowLayout,
  Tab,
  TextField,
  Show,
  DateField,
  NumberField,
  ReferenceManyField,
  Datagrid,
  Create,
  Edit,
  regex,
  TabbedForm,
  FormTab,
  number,
  TextInput,
  required,
  AutocompleteInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
  minValue,
  SelectArrayInput,
  FormDataConsumer,
  ArrayInput,
  EditButton,
  SimpleFormIterator,
  ImageField,
  ShowButton,
  useEditController,
  ReferenceField,
} from "react-admin";
import S3CustomUploader from "../components/S3CustomUploader";
import { LogActionLabel } from "../components/LogActionLabel";
import { LogPanel } from "../components/LogPanel";
import {
  KeyboardDateInput,
  KeyboardTimeInput,
} from "../components/CustomInput";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import ButtonChangeValidationStatus from "../components/ButtonChangeValidationStatus";

import RimSizeInput from "../components/RimSizeInput";

import keyPointsChoices from "../assets/choices/keyPoints";
import fuelChoices from "../assets/choices/fuel";
import declaredEquipmentsChoices from "../assets/choices/declaredEquipments";
import constructorEquipmentsChoices from "../assets/choices/constructorEquipments";
import rimTypeChoices from "../assets/choices/rimType";
import profileCostsChoices from "../assets/choices/profileCosts";
import wheelsTireBrandChoices from "../assets/choices/wheelsTireBrand";
import vehicleTypeChoices from "../assets/choices/vehicleType";
import originChoices from "../assets/choices/origin";
import servicingHistoryChoices from "../assets/choices/servicingHistory";
import gearBoxChoices from "../assets/choices/gearBox";
import boolOrNullChoices from "../assets/choices/boolOrNull";
import distributionBeltChoices from "../assets/choices/distributionBelt";
import zone from "../assets/choices/zone";
import salesSpeedNameChoices from "../assets/choices/salesSpeedName";

export const CreateVehicle = (props) => {
  const form = VehicleForm("create");
  return <Create {...props}>{form}</Create>;
};

export const EditVehicle = (props, { basePath, data, resource }) => {
  const form = VehicleForm("edit");
  return (
    <Edit {...props} undoable={false}>
      {form}
    </Edit>
  );
};

export const ShowVehicle = (props) => {
  const controllerProps = useEditController(props);

  const { record } = controllerProps;
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="vehicle">
          <TextField source="registration" />
          <TextField source="brandLabel" />
          <TextField source="modelLabel" />
          <TextField source="versionLabel" />
          <DateField source="firstRegistrationDate" />
          <NumberField source="mileage" />
          <TextField source="gearBoxLabel" />

          <TextField label="pointOfSaleName" source="pointofsale.name" />
          <TextField label="zipCode" source="pointofsale.zipCode" />
          <TextField label="city" source="pointofsale.city" />
        </Tab>
        <Tab label="sales" path="sale">
          <ReferenceManyField reference="sale" target="vehicleId">
            <Datagrid>
              <TextField label="saleId" source="id" />
              <TextField label="validationStatus" source="validationStatus" />
              <TextField label="status" source="status" />
              <TextField label="supplyType" source="supplyType" />
              <DateField label="salesStart" source="startDateTime" />
              <DateField label="salesEnd" source="endDateTime" />
              <EditButton label="edit" sortable={false} />
              <ShowButton label="show" sortable={false} />
              <ButtonChangeValidationStatus {...props} />
              {/* {(props.record.validationStatus === "CANCELED" && (
                <DeleteButton label="delete" sortable={false} />
              )) || <></>} */}
              {/* <ButtonChangeValidationStatus
                {...props}
                newValidationStatus="CANCELED"
                color="default"
              /> */}
              {/* <Button variant="contained" color="default" size="small">
                cancel
              </Button> */}
            </Datagrid>
          </ReferenceManyField>
        </Tab>
        <Tab label="Logs" path="logs">
          <ReferenceManyField
            reference="log"
            filter={{
              referenceTable: "vehicles",
              referenceId: record && record.id,
            }}
          >
            <Datagrid expand={<LogPanel />}>
              <LogActionLabel label="label" />
              <DateField label="date" source="createdAt" showTime />
              <TextField label="userId" source="user" />
              <ReferenceField
                label="userName"
                source="user"
                reference="facadeUser"
              >
                <TextField source="name" />
              </ReferenceField>
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

const VehicleForm = (type) => {
  return (
    <TabbedForm submitOnEnter={false}>
      <FormTab label="record" key="record">
        {type === "edit" && <TextInput disabled source="id" label="id" />}
        {type === "edit" && <TextInput readOnly source="uuid" label="uuid" />}

        <TextInput
          label="fileNumber"
          source="fileNumber"
          validate={required()}
        />

        <TextInput label="userId" source="userId" placeholder="Ex: FR_1234" />
      </FormTab>

      <FormTab label="infos" key="infos">
        <ReferenceInput
          label="vehicule_brand"
          source="brandLabel"
          reference="facadeBrand"
        >
          <SelectInput optionValue="id" optionText="name" />
        </ReferenceInput>

        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <ReferenceInput
              label="vehicule_model"
              source="modelLabel"
              reference="facadeModel"
              filter={{ brandLabel: formData.brandLabel }}
            >
              <SelectInput optionValue="id" optionText="name" />
            </ReferenceInput>
          )}
        </FormDataConsumer>
        <TextInput label="version" source="versionLabel" />

        <KeyboardDateInput
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

        <SelectInput
          label="profileBodyCosts"
          source="profileBodyCosts"
          choices={profileCostsChoices}
        />
      </FormTab>

      <FormTab label="carPictures">
        <S3CustomUploader
          label="three_quarters_front_picture"
          source="carPictures.three_quarters_front_picture"
        />
        <S3CustomUploader
          label="front_picture"
          source="carPictures.front_picture"
        />
        <S3CustomUploader
          label="left_side_picture"
          source="carPictures.left_side_picture"
        />
        <S3CustomUploader
          label="right_side_picture"
          source="carPictures.right_side_picture"
        />
        <S3CustomUploader
          label="back_picture"
          source="carPictures.back_picture"
        />
        <S3CustomUploader
          label="motor_picture1"
          source="carPictures.motor_picture"
        />
        <S3CustomUploader
          label="trunk_picture"
          source="carPictures.trunk_picture"
        />

        <S3CustomUploader
          label="inside_front_picture"
          source="carPictures.inside_front_picture"
        />
        <S3CustomUploader
          label="dashboard_picture"
          source="carPictures.dashboard_picture"
        />
        <S3CustomUploader
          label="inside_back_picture"
          source="carPictures.inside_back_picture"
        />
        <S3CustomUploader
          label="counter_picture"
          source="carPictures.counter_picture"
        />
        <S3CustomUploader
          label="vin_picture"
          source="carPictures.vin_picture"
        />
        <ArrayInput label="carPicturesOthers" source="carPicturesOthers">
          <SimpleFormIterator>
            <TextInput source="dommage" label="description" />
            <TextInput source="value" validate={validateURL} label="url" />
            <ImageField source="value" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>

      <FormTab label="damages">
        <ArrayInput label="damages" source="damages">
          <SimpleFormIterator>
            <SelectInput
              label="is_custom"
              source="is_custom"
              choices={boolOrNullChoices}
            />
            <TextInput source="custom_damage" />
            <SelectInput source="zone" choices={zone} />
            <TextInput source="element" />
            <TextInput source="damage" />
            <TextInput source="damage_picture" validate={validateURL} />
            <TextInput source="damage_picture2" validate={validateURL} />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>

      <FormTab label="pointOfSale">
        <ReferenceInput
          label="pointOfSale"
          source="pointofsale.id"
          reference="pointOfSale"
          sort={{ field: "name", order: "ASC" }}
        >
          <AutocompleteInput optionText="name" />
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
            <TextInput source="title" label="title" />
            <TextInput source="link" label="link" validate={validateURL} />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>

      <FormTab label="equipments">
        <SelectArrayInput
          label="declaredEquipments"
          source="declaredEquipments"
          choices={declaredEquipmentsChoices}
        />
        <SelectArrayInput
          label="constructorEquipments"
          source="constructorEquipments"
          choices={constructorEquipmentsChoices}
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
        <TextInput label="liter" source="liter" />
        <SelectInput
          label="gearBoxLabel"
          source="gearBoxLabel"
          choices={gearBoxChoices}
        />
        <TextInput label="seats" source="seats" />
        <TextInput label="door" source="door" />
        <TextInput label="ch" source="ch" />
        <TextInput label="kw" source="kw" />
        <TextInput label="fiscal" source="fiscal" />

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
        <KeyboardDateInput
          source="purchaseDate"
          label="purchaseDate"
          providerOptions={{ utils: MomentUtils }}
          options={{ format: "DD/MM/YYYY", clearable: true }}
        />
        <KeyboardDateInput
          source="gcDate"
          label="gcDate"
          providerOptions={{ utils: MomentUtils }}
          options={{ format: "DD/MM/YYYY", clearable: true }}
        />

        <TextInput source="registration" label="registration" />

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
        <TextInput label="co2" source="co2" />
        <SelectInput
          label="userManual"
          source="userManual"
          choices={boolOrNullChoices}
        />
        <SelectInput
          label="secondSetKey"
          source="secondSetKey"
          choices={boolOrNullChoices}
        />
      </FormTab>

      <FormTab label="history">
        <SelectInput label="origin" source="origin" choices={originChoices} />

        <TextInput
          label="purchaseInvoice"
          source="purchaseInvoice"
          validate={validateURL}
        />

        <SelectInput label="vat" source="vat" choices={boolOrNullChoices} />
        <SelectInput
          label="imported"
          source="imported"
          choices={boolOrNullChoices}
        />
      </FormTab>

      <FormTab label="servicing">
        <SelectInput
          label="servicingHistory"
          source="servicingHistory"
          choices={servicingHistoryChoices}
        />
        <SelectInput
          label="servicingInBrandNetwork"
          source="servicingInBrandNetwork"
          choices={boolOrNullChoices}
        />
        <TextInput
          label="servicingManualPicture"
          source="servicingManualPicture"
          validate={validateURL}
        />
        <SelectInput
          label="servicingInvoices"
          source="servicingInvoices"
          choices={boolOrNullChoices}
        />

        <TextInput
          label="lastServicingDate"
          source="lastServicingDate"
          validate={validateMonth}
        />
        <div>
          <small>
            <i>Format (YYYY-MM)</i>
          </small>
        </div>

        <TextInput label="lastServicingKm" source="lastServicingKm" />

        <SelectInput
          label="distributionBelt"
          source="distributionBelt"
          choices={distributionBeltChoices}
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

        <NumberInput label="dpaProAmt" source="dpaProAmt" />

        <SelectInput
          label="salesSpeedName"
          source="salesSpeedName"
          choices={salesSpeedNameChoices}
        />
      </FormTab>
    </TabbedForm>
  );
};

const validateURL = regex(
  new RegExp("^https*://.*\\.[a-z].{2,3}"),
  "Must be an URL"
);

const validateMonth = regex(new RegExp("^[0-9]{4}-[0-9]{2}$"), "Wrong Format");
