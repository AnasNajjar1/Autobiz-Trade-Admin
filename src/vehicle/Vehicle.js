import React from "react";
import {
  Create,
  AutocompleteInput,
  Edit,
  TextInput,
  ImageField,
  NumberInput,
  TabbedForm,
  FormTab,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  SelectArrayInput,
  ReferenceInput,
  FormDataConsumer,
  required,
  minValue,
  number,
  BooleanInput,
  regex,
  TabbedShowLayout,
  Tab,
  TextField,
  Show,
  DateField,
  NumberField,
  Datagrid,
  ReferenceManyField,
  ChipField,
  CreateButton,
  ReferenceField,
} from "react-admin";

import { Link } from "react-router-dom";
import { KeyboardDateInput, KeyboardTimeInput } from "./CustomInput";
import moment from "moment";
import MomentUtils from "@date-io/moment";

import RimSizeInput from "./components/RimSizeInput";

import keyPointsChoices from "../assets/choices/keyPoints";
import fuelChoices from "../assets/choices/fuel";
import declaredEquipmentsChoices from "../assets/choices/declaredEquipments";
import constructorEquipmentsChoices from "../assets/choices/constructorEquipments";
import rimTypeChoices from "../assets/choices/rimType";
import profileCostsChoices from "../assets/choices/profileCosts";
import offerTypeChoices from "../assets/choices/offerType";
import wheelsTireBrandChoices from "../assets/choices/wheelsTireBrand";
import vehicleTypeChoices from "../assets/choices/vehicleType";
import originChoices from "../assets/choices/origin";
import servicingHistoryChoices from "../assets/choices/servicingHistory";
import gearBoxChoices from "../assets/choices/gearBox";
import boolOrNullChoices from "../assets/choices/boolOrNull";
import salesTypeChoices from "../assets/choices/salesType";
import distributionBeltChoices from "../assets/choices/distributionBelt";
import zone from "../assets/choices/zone";
import salesSpeedNameChoices from "../assets/choices/salesSpeedName";

export const CreateVehicle = (props) => {
  const form = commonForm("create");
  return <Create {...props}>{form}</Create>;
};

export const EditVehicle = (props, { basePath, data, resource }) => {
  const form = commonForm("edit");
  return (
    <Edit {...props} undoable={false}>
      {form}
    </Edit>
  );
};

const validateURL = regex(
  new RegExp("^https*://.*\\.[a-z].{2,3}"),
  "Must be an URL"
);

const saleDatesValidation = (value, allValues) => {
  let { startDateTime, endDateTime } = allValues.sale;

  if (!moment.isMoment(startDateTime)) {
    startDateTime = moment.utc(startDateTime);
  }

  if (!moment.isMoment(endDateTime)) {
    endDateTime = moment.utc(endDateTime);
  }

  if (endDateTime.isBefore(startDateTime)) {
    return "EndDateTime must be after StartDateTime";
  }
};

const validateSaleDates = [required(), saleDatesValidation];

const validateMonth = regex(new RegExp("^[0-9]{4}-[0-9]{2}$"), "Wrong Format");
const vehicleDefaultValue = {
  statusId: 1,
  auction: { startDateTime: new Date(), salesType: "auction" },
};

const validateVehicle = (values) => {
  const errors = {};
  if (
    values.sale &&
    !values.sale.acceptAuction &&
    !values.sale.acceptImmediatePurchase &&
    !values.sale.acceptSubmission
  ) {
    errors.sale = {
      acceptAuction: ["At least one type is mandatory"],
      acceptImmediatePurchase: ["At least one type is mandatory"],
      acceptSubmission: ["At least one type is mandatory"],
    };
  }

  return errors;
};

const commonForm = (type) => {
  return (
    <TabbedForm
      submitOnEnter={false}
      defaultValue={vehicleDefaultValue}
      validate={validateVehicle}
    >
      <FormTab label="record" key="record">
        {type === "edit" && <TextInput disabled source="id" />}
        {type === "edit" && <TextInput readOnly source="uuid" />}

        <TextInput
          label="fileNumber"
          source="fileNumber"
          validate={required()}
        />

        <TextInput label="userId" source="userId" placeholder="Ex: FR_1234" />
      </FormTab>

      <FormTab label="salesInfo">
        <KeyboardDateInput
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

        <SelectInput
          label="offerType"
          source="offerType"
          choices={offerTypeChoices}
        />

        <TextInput label="salesComment" source="salesComment"></TextInput>

        <BooleanInput label="acceptAuction" source="sale.acceptAuction" />

        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.sale &&
            formData.sale.acceptAuction && (
              <>
                <div>
                  <NumberInput
                    label="Sale auctionStartPrice"
                    source="sale.auctionStartPrice"
                    validate={[number(), minValue(0), required()]}
                  />
                </div>
                <div>
                  <NumberInput
                    label="Sale auctionStepPrice"
                    source="sale.auctionStepPrice"
                    validate={[number(), minValue(1), required()]}
                  />
                </div>
              </>
            )
          }
        </FormDataConsumer>

        <BooleanInput
          label="acceptImmediatePurchase"
          source="sale.acceptImmediatePurchase"
        />

        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.sale &&
            formData.sale.acceptImmediatePurchase && (
              <NumberInput
                label="sale immediatePurchasePrice"
                source="sale.immediatePurchasePrice"
                validate={[number(), minValue(1), required()]}
              />
            )
          }
        </FormDataConsumer>

        <BooleanInput label="acceptSubmission" source="sale.acceptSubmission" />

        <KeyboardDateInput
          label="Sale startDate"
          source="sale.startDateTime"
          providerOptions={{ utils: MomentUtils }}
          disablePast
          options={{
            format: "DD/MM/YYYY",
            ampm: false,
            clearable: true,
          }}
          validate={validateSaleDates}
        />

        <KeyboardTimeInput
          label="Sale startTime"
          source="sale.startDateTime"
          providerOptions={{ utils: MomentUtils }}
          disablePast
          options={{
            format: "HH:mm",
            ampm: false,
            clearable: true,
          }}
          validate={validateSaleDates}
        />

        <KeyboardDateInput
          label="Sale endDate"
          source="sale.endDateTime"
          providerOptions={{ utils: MomentUtils }}
          options={{
            format: "DD/MM/YYYY",
            ampm: false,
            clearable: true,
          }}
          validate={validateSaleDates}
        />

        <KeyboardTimeInput
          label="Sale endTime"
          source="sale.endDateTime"
          providerOptions={{ utils: MomentUtils }}
          disablePast
          options={{
            format: "HH:mm",
            ampm: false,
            clearable: true,
          }}
          validate={validateSaleDates}
        />
      </FormTab>

      <FormTab label="vehicle" key="vehicle">
        <ReferenceInput
          label="brandLabel"
          source="brandLabel"
          reference="facadeBrand"
        >
          <SelectInput optionValue="id" optionText="name" />
        </ReferenceInput>

        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <ReferenceInput
              label="modelLabel"
              source="modelLabel"
              reference="facadeModel"
              filter={{ brandLabel: formData.brandLabel }}
            >
              <SelectInput optionValue="id" optionText="name" />
            </ReferenceInput>
          )}
        </FormDataConsumer>

        <TextInput label="versionLabel" source="versionLabel" />

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
        <ImageField source="carPictures.three_quarters_front_picture" />
        <TextInput
          label="three_quarters_front_picture"
          source="carPictures.three_quarters_front_picture"
        />

        <ImageField source="carPictures.front_picture" />
        <TextInput label="front_picture" source="carPictures.front_picture" />

        <ImageField source="carPictures.left_side_picture" />
        <TextInput
          label="left_side_picture"
          source="carPictures.left_side_picture"
        />

        <ImageField source="carPictures.right_side_picture" />
        <TextInput
          label="right_side_picture"
          source="carPictures.right_side_picture"
        />

        <ImageField source="carPictures.back_picture" />
        <TextInput label="back_picture" source="carPictures.back_picture" />

        <ImageField source="carPictures.motor_picture" />
        <TextInput label="motor_picture" source="carPictures.motor_picture" />

        <ImageField source="carPictures.trunk_picture" />
        <TextInput label="trunk_picture" source="carPictures.trunk_picture" />

        <ImageField source="carPictures.inside_front_picture" />
        <TextInput
          label="inside_front_picture"
          source="carPictures.inside_front_picture"
        />

        <ImageField source="carPictures.dashboard_picture" />
        <TextInput
          label="dashboard_picture"
          source="carPictures.dashboard_picture"
        />

        <ImageField source="carPictures.inside_back_picture" />
        <TextInput
          label="inside_back_picture"
          source="carPictures.inside_back_picture"
        />

        <ImageField source="carPictures.counter_picture" />
        <TextInput
          label="counter_picture"
          source="carPictures.counter_picture"
        />

        <ImageField source="carPictures.vin_picture" />
        <TextInput label="vin_picture" source="carPictures.vin_picture" />

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

      <FormTab label="PointOfSale">
        <ReferenceInput
          source="pointOfSaleId"
          reference="pointOfSale"
          sort={{ field: "name", order: "ASC" }}
        >
          {/* <SelectInput source="id" /> */}
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
            <TextInput source="title" />
            <TextInput source="link" validate={validateURL} />
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

export const ShowVehicle = (props) => {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="vehicle">
          <TextField label="registration" source="registration" />
          <TextField source="brandLabel" />
          <TextField source="modelLabel" />
          <TextField source="versionLabel" />
          <DateField source="firstRegistrationDate" />
          <NumberField source="mileage" />
        </Tab>
        <Tab label="Partner requests" path="requests">
          <ReferenceManyField reference="partnerRequests" target="vehicleId">
            {/* target="post_id" addLabel={false}> */}
            <Datagrid rowClick="expand" expand={<Offers />}>
              <TextField source="partnerName" label="Partner" />
              <TextField source="comment" />
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
        <Tab label="Offers" path="offer">
          <ReferenceManyField reference="offer" target="vehicleId">
            {/* target="post_id" addLabel={false}> */}
            <Datagrid>
              <TextField label="fileNumber" source="fileNumber" />
              <TextField label="brandLabel" source="brandLabel" />
              <TextField label="modelLabel" source="modelLabel" />
              <DateField label="purchaseDate" source="purchaseDate" />
              <TextField label="pointOfSaleName" source="pointOfSaleName" />
              <NumberField
                source="amount"
                options={{
                  minimumFractionDigits: 0,
                  style: "currency",
                  currency: "EUR",
                }}
              />
              <TextField label="saleType" source="saleType" />
              <DateField label="createdAt" source="createdAt" showTime />
              <TextField label="userId" source="userId" />

              <ReferenceField
                label="User"
                source="userId"
                reference="facadeUser"
              >
                <TextField source="name" />
              </ReferenceField>
              <ReferenceField
                label="User"
                source="userId"
                reference="facadeUser"
              >
                <TextField source="email" />
              </ReferenceField>
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
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
