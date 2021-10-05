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
  ChipField,
  CreateButton,
  useTranslate,
  DateInput,
} from "react-admin";

import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import S3CustomUploader from "../components/S3CustomUploader";
import { LogActionLabel } from "../components/LogActionLabel";
import { LogPanel } from "../components/LogPanel";
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
import vatChoices from "../assets/choices/vat";
import vatDetailsChoices from "../assets/choices/vatDetails";
import boolOrNullOrDnk from "../assets/choices/boolOrNullOrDnk";
import { colorChoices } from "../assets/choices/vehicleColor";

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
          <TextField label="registration" source="registration" />
          <TextField labe="make" source="brandLabel" />
          <TextField label="model" source="modelLabel" />
          <TextField label="version" source="versionLabel" />
          <DateField
            label="firstRegistrationDate"
            source="firstRegistrationDate"
          />
          <NumberField label="mileage" source="mileage" />
          <TextField label="gearBoxLabel" source="gearBoxLabel" />

          <TextField label="pointOfSaleName" source="pointofsale.name" />
          <TextField label="zipCode" source="pointofsale.zipCode" />
          <TextField label="city" source="pointofsale.city" />
        </Tab>
        <Tab label="sales" path="sale">
          <CreateSaleButton />
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
            </Datagrid>
          </ReferenceManyField>
        </Tab>
        <Tab label="PartnerRequests" path="requests">
          <ReferenceManyField reference="partnerRequests" target="vehicleId">
            {/* target="post_id" addLabel={false}> */}
            <Datagrid rowClick="expand" expand={<Offers />}>
              <TextField source="partnerName" label="Partner" />
              <TextField source="comment" />
              <TextField source="saleComment" label="Sale Comment" />
              <DateField source="createdAt" showTime />
              <DateField
                label="Last offer received at"
                source="lastOfferCreatedAt"
                showTime
              />
              <NumberField
                source="value"
                label="last offer"
                locales="fr-FR"
                options={{ style: "currency", currency: "EUR" }}
              />
              <ChipField source="status" />
            </Datagrid>
          </ReferenceManyField>
          <AddRequestButton />
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
    <TabbedForm submitOnEnter={false} redirect="show">
      <FormTab label="record" key="record">
        {type === "edit" && (
          <TextInput disabled label="vehicleId" source="id" label="id" />
        )}
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
        <DateInput
          source="firstRegistrationDate"
          label="firstRegistrationDate"
          format={(v) => (v !== "" ? v : null)}
        />
        <br />

        <DateInput
          source="entryStockDate"
          label="entryStockDate"
          format={(v) => (v !== "" ? v : null)}
        />
        <br />
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
            <TextInput source="title" label="description" />
            <S3CustomUploader source="link" label="url" />
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
            <S3CustomUploader label="link" source="link" type="document" />
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

        {type === "edit" ? (
          <TextInput label="color" source="color" validate={validateColor} />
        ) : (
          <SelectInput label="color" source="color" choices={colorChoices} />
        )}

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
        <DateInput
          source="purchaseDate"
          label="purchaseDate"
          format={(v) => (v !== "" ? v : null)}
        />

        <DateInput
          source="gcDate"
          label="gcDate"
          format={(v) => (v !== "" ? v : null)}
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
          choices={boolOrNullOrDnk}
        />
        <SelectInput
          label="secondSetKey"
          source="secondSetKey"
          choices={boolOrNullOrDnk}
        />
      </FormTab>

      <FormTab label="history">
        <SelectInput label="origin" source="origin" choices={originChoices} />

        <TextInput
          label="purchaseInvoice"
          source="purchaseInvoice"
          validate={validateURL}
        />
        <SelectInput
          label="vat"
          source="vat"
          choices={vatChoices}
          options={{
            SelectProps: { displayEmpty: true },
            InputLabelProps: { shrink: true },
          }}
        />
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.vat === true && (
              <SelectInput
                label="vatDetails"
                source="vatDetails"
                choices={vatDetailsChoices}
                options={{
                  SelectProps: { displayEmpty: true },
                  InputLabelProps: { shrink: true },
                }}
              />
            )
          }
        </FormDataConsumer>
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

const CreateSaleButton = ({ record }) => {
  const translate = useTranslate();
  return (
    <Button
      size="small"
      color="primary"
      variant="contained"
      component={Link}
      to={`/sale/create?vehicleId=${record.id}`}
    >
      {translate("createSale")}
    </Button>
  );
};

const AddRequestButton = ({ classes, record }) => (
  <CreateButton
    component={Link}
    to={`/partnerRequests/create?vehicleId=${record.id}`}
  ></CreateButton>
);

const Offers = (props) => {
  return (
    <ReferenceManyField
      {...props}
      basePath="partnerOffers"
      target="partnerRequestId"
      reference="partnerOffers"
    >
      <Datagrid>
        <TextField label="id" source="id" />
        <TextField label="comment" source="comment" />
        <NumberField
          source="value"
          options={{
            minimumFractionDigits: 0,
            style: "currency",
            currency: "EUR",
          }}
        />
        <NumberField label="partnerRequestId" source="partnerRequestId" />
        <DateField label="createdAt" source="createdAt" showTime />
      </Datagrid>
    </ReferenceManyField>
  );
};

const validateURL = regex(
  new RegExp("^https*://.*\\.[a-z].{2,3}"),
  "Must be an URL"
);

const validateMonth = regex(new RegExp("^[0-9]{4}-[0-9]{2}$"), "Wrong Format");

const validateColor = regex(
  new RegExp("^[a-zA-ZàÀâÂäÄáÁéÉèÈêÊëËìÌîÎïÏòÒôÔöÖùÙûÛüÜçÇ’'ñ0-9 ]*$"),
  "Wrong Format Color"
);
