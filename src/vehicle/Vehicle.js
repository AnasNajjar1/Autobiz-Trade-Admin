import React, { Fragment, useState } from "react";
import SetWinnerButton from "./SetWinnerButton";
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
  ReferenceField,
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
} from "react-admin";
import S3CustomUploader from "../components/S3CustomUploader";

import { Link } from "react-router-dom";
import { KeyboardDateInput, KeyboardTimeInput } from "./CustomInput";
import moment from "moment";
import MomentUtils from "@date-io/moment";

import RimSizeInput from "../components/RimSizeInput";

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

  if (
    values.sale &&
    values.sale.acceptAuction &&
    values.sale.auctionReservePrice > 0
  ) {
    if (values.sale.auctionReservePrice <= values.sale.auctionStartPrice) {
      errors.sale = {
        auctionStartPrice: [
          "auctionStartPrice should be greater than auctionReservePrice",
        ],
        auctionReservePrice: [
          "auctionReservePrice should be less than auctionStartPrice",
        ],
      };
    }
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
        {type === "edit" && <TextInput disabled source="id" label="id" />}
        {type === "edit" && <TextInput readOnly source="uuid" label="uuid" />}

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
          label="statut"
          validate={required()}
        >
          <SelectInput source="name" />
        </ReferenceInput>

        <ReferenceInput
          label="owner"
          source="ownerId"
          reference="groupUser"
          allowEmpty
        >
          <SelectInput optionValue="id" optionText="autobizUserId" />
        </ReferenceInput>

        <ReferenceInput
          label="group"
          source="groupId"
          reference="group"
          perPage="50"
          allowEmpty
        >
          <SelectInput optionValue="id" optionText="name" />
        </ReferenceInput>

        <ReferenceInput
          label="list"
          source="listId"
          reference="list"
          perPage="50"
          allowEmpty
        >
          <SelectInput optionValue="id" optionText="name" />
        </ReferenceInput>

        <SelectInput
          label="offerType"
          source="offerType"
          choices={offerTypeChoices}
          validate={[required()]}
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
                    label="auctionStartPrice"
                    source="sale.auctionStartPrice"
                    validate={[number(), minValue(0), required()]}
                  />
                </div>
                <div>
                  <NumberInput
                    label="auctionStepPrice"
                    source="sale.auctionStepPrice"
                    validate={[number(), minValue(1), required()]}
                  />
                </div>
                <div>
                  <NumberInput
                    label="auctionReservePrice"
                    source="sale.auctionReservePrice"
                    validate={[number()]}
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
                label="immediatePurchasePrice"
                source="sale.immediatePurchasePrice"
                validate={[number(), minValue(1), required()]}
              />
            )
          }
        </FormDataConsumer>

        <BooleanInput label="acceptSubmission" source="sale.acceptSubmission" />

        <KeyboardDateInput
          label="saleStartDate"
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
          label="saleStartTime"
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
          label="saleEndDate"
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
          label="saleEndTime"
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
          <TextField source="pointOfSale.name" />
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
          <TextField label="winner" source="sale.winner" />
          <ReferenceManyField reference="offer" target="vehicleId">
            <Datagrid>
              <TextField label="saleId" source="saleId" />
              <TextField label="winner" source="winner" />
              <TextField label="offerId" source="offerId" />
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
                label="Email"
                source="userId"
                reference="facadeUser"
              >
                <TextField source="email" />
              </ReferenceField>

              <ReferenceField
                label="CompanyName"
                source="userId"
                reference="facadeUser"
              >
                <ReferenceField source="companyId" reference="facadeCompany">
                  <TextField source="companyName" />
                </ReferenceField>
              </ReferenceField>

              <ReferenceField
                label="CompanyCity"
                source="userId"
                reference="facadeUser"
              >
                <ReferenceField source="companyId" reference="facadeCompany">
                  <TextField source="companyCity" />
                </ReferenceField>
              </ReferenceField>

              <ReferenceField
                label="companyZipcode"
                source="userId"
                reference="facadeUser"
              >
                <ReferenceField source="companyId" reference="facadeCompany">
                  <TextField source="companyZipcode" />
                </ReferenceField>
              </ReferenceField>
              <SetWinnerButton {...props} />
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
