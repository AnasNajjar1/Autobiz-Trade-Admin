import React from "react";
import {
  TabbedShowLayout,
  Tab,
  TextField,
  Show,
  useEditController,
  Button,
  Link,
  DateField,
  NumberField,
  ReferenceManyField,
  Datagrid,
  BooleanField,
  ReferenceField,
  TextInput,
  required,
  Edit,
  Create,
  SelectInput,
  SimpleForm,
  ReferenceInput,
  AutocompleteInput,
  BooleanInput,
  FormDataConsumer,
  NumberInput,
  number,
  minValue,
} from "react-admin";
import { parse } from "query-string";
import supplyTypeChoices from "../assets/choices/supplyType";
import validationStatusChoices from "../assets/choices/validationStatus";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import SetWinnerButton from "./SetWinnerButton";
import { withStyles } from "@material-ui/core/styles";
import {
  KeyboardDateInput,
  KeyboardTimeInput,
} from "../components/CustomInput";
import { LogActionLabel } from "../components/LogActionLabel";
import { LogPanel } from "../components/LogPanel";
const styles = {
  link: {
    fontWeight: "bold",
    fontFamily: "Arial",
  },
};

export const EditSale = (props, { basePath, data, resource }) => {
  const form = SaleForm("edit", null);
  return (
    <Edit {...props} undoable={false}>
      {form}
    </Edit>
  );
};

export const CreateSale = (props) => {
  const { vehicleId: vehicleIdString } = parse(props.location.search);
  const vehicleId = vehicleIdString ? parseInt(vehicleIdString) : null;
  const form = SaleForm("create", vehicleId);

  return <Create {...props}>{form}</Create>;
};

const SaleForm = (type, vehicleId) => {
  //const vehicleInfo = formData.vehicle && formData.vehicle.brandLabel;
  return (
    <SimpleForm
      validate={validateSale}
      submitOnEnter={false}
      defaultValue={saleDefaultValue}
    >
      {type === "edit" && <TextInput disabled source="id" label="saleId" />}
      {type === "edit" && <TextInput disabled source="status" label="status" />}

      <ReferenceInput
        label="registration"
        source="vehicle.id"
        reference="vehicle"
        defaultValue={vehicleId}
        validate={[required()]}
      >
        <AutocompleteInput optionValue="id" optionText="registration" />
      </ReferenceInput>

      <SelectInput
        label="offerType"
        source="supplyType"
        choices={supplyTypeChoices}
        validate={[required()]}
      />

      <SelectInput
        label="validationStatus"
        source="validationStatus"
        choices={validationStatusChoices}
        validate={[required()]}
      />

      <ReferenceInput
        label="owner"
        source="ownerId"
        reference="groupUser"
        allowEmpty
      >
        <AutocompleteInput optionValue="id" optionText="autobizUserId" />
      </ReferenceInput>

      <BooleanInput label="acceptAuction" source="acceptAuction" />

      <FormDataConsumer>
        {({ formData, ...rest }) =>
          formData.acceptAuction && (
            <>
              <div>
                <NumberInput
                  label="auctionStartPrice"
                  source="auctionStartPrice"
                  validate={[number(), minValue(0), required()]}
                />
              </div>
              <div>
                <NumberInput
                  label="auctionStepPrice"
                  source="auctionStepPrice"
                  validate={[number(), minValue(1), required()]}
                />
              </div>
              <div>
                <NumberInput
                  label="auctionReservePrice"
                  source="auctionReservePrice"
                  validate={[number()]}
                />
              </div>
            </>
          )
        }
      </FormDataConsumer>

      <BooleanInput
        label="acceptImmediatePurchase"
        source="acceptImmediatePurchase"
      />

      <FormDataConsumer>
        {({ formData, ...rest }) =>
          formData.acceptImmediatePurchase && (
            <NumberInput
              label="immediatePurchasePrice"
              source="immediatePurchasePrice"
              validate={[number(), minValue(1), required()]}
            />
          )
        }
      </FormDataConsumer>

      <BooleanInput label="acceptSubmission" source="acceptSubmission" />

      <KeyboardDateInput
        label="saleStartDate"
        source="startDateTime"
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
        source="startDateTime"
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
        source="endDateTime"
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
        source="endDateTime"
        providerOptions={{ utils: MomentUtils }}
        disablePast
        options={{
          format: "HH:mm",
          ampm: false,
          clearable: true,
        }}
        validate={validateSaleDates}
      />

      <TextInput label="salesComment" source="comment"></TextInput>

      <ReferenceInput
        label="group"
        source="groupId"
        reference="group"
        allowEmpty
      >
        <AutocompleteInput optionValue="id" optionText="name" />
      </ReferenceInput>

      <ReferenceInput label="list" source="listId" reference="list" allowEmpty>
        <AutocompleteInput optionValue="id" optionText="name" />
      </ReferenceInput>

      {type === "edit" && <TextInput readOnly source="uuid" label="uuid" />}
    </SimpleForm>
  );
};

const WinnerStatus = withStyles(styles)(({ classes, record }) => {
  return (
    <>
      <p className={classes.link}>
        {record.winner ? "" : "No"} Winner{" "}
        {record.winner ? `: ${record.winner}` : ""}
      </p>
      <p className={classes.link}>
        Request Winner : {record.requestWinner ? `YES` : "NO"}
      </p>
    </>
  );
});
export const ShowSale = (props) => {
  const controllerProps = useEditController(props);

  const { record } = controllerProps;
  const vehicleId = record && record.vehicle.id;
  const groupId = record && record.groupId;
  const listId = record && record.listId;

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Sale">
          <TextField label="saleId" source="id" />
          <TextField label="validationStatus" source="validationStatus" />
          <TextField label="status" source="status" />
          <TextField source="supplyType" source="supplyType" />
          <DateField label="salesStart" source="startDateTime" showTime />
          <DateField label="salesEnd" source="endDateTime" showTime />
          <BooleanField source="acceptAuction" label="acceptAuction" />
          <BooleanField
            source="acceptImmediatePurchase"
            label="acceptImmediatePurchase"
          />
          <BooleanField source="acceptSubmission" label="acceptSubmission" />
          <NumberField
            source="auctionStartPrice"
            label="auctionStartPrice"
            locales="fr-FR"
            options={{ style: "currency", currency: "EUR" }}
          />
          <NumberField
            source="auctionStepPrice"
            label="auctionStepPrice"
            locales="fr-FR"
            options={{ style: "currency", currency: "EUR" }}
          />
          <NumberField
            source="auctionReservePrice"
            label="auctionReservePrice"
            locales="fr-FR"
            options={{ style: "currency", currency: "EUR" }}
          />
          <NumberField
            source="immediatePurchasePrice"
            label="immediatePurchasePrice"
            locales="fr-FR"
            options={{ style: "currency", currency: "EUR" }}
          />

          <TextField label="comment" source="comment" />

          {groupId && (
            <ReferenceField label="group" source="groupId" reference="group">
              <TextField source="name" />
            </ReferenceField>
          )}

          {listId && (
            <ReferenceField label="list" source="listId" reference="list">
              <TextField source="name" />
            </ReferenceField>
          )}

          <BooleanField source="expressSale" label="expressSale" />
          <BooleanField source="carcheckId" label="carcheckId" />

          <ReferenceField
            label="owner"
            source="ownerId"
            reference="groupUser"
            link={false}
          >
            <ReferenceField
              label="User"
              source="autobizUserId"
              reference="facadeUser"
              link={false}
            >
              <TextField label="name" source="name" />
            </ReferenceField>
          </ReferenceField>
        </Tab>
        <Tab label="vehicle">
          <TextField label="registration" source="vehicle.registration" />
          <TextField label="brand" source="vehicle.brandLabel" />
          <TextField label="model" source="vehicle.modelLabel" />
          <TextField label="version" source="vehicle.versionLabel" />
          <DateField
            label="firstRegistrationDate"
            source="vehicle.firstRegistrationDate"
          />
          <NumberField label="mileage" source="vehicle.mileage" />
          <TextField label="pointOfSale" source="vehicle.pointofsale.name" />
          {vehicleId && (
            <Button
              component={Link}
              variant="contained"
              color="default"
              to={{
                pathname: `/vehicle/${vehicleId}`,
              }}
              label="Edit Vehicle"
            ></Button>
          )}
        </Tab>
        <Tab label="Offers" path="offer">
          <WinnerStatus />
          <ReferenceManyField reference="offer" target="saleId">
            <Datagrid>
              <TextField label="offerId" source="id" />
              <NumberField
                source="amount"
                options={{
                  minimumFractionDigits: 0,
                  style: "currency",
                  currency: "EUR",
                }}
              />
              <TextField label="saleType" source="offerType" />
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
              *{record && record.requestWinner && <SetWinnerButton />}
            </Datagrid>
          </ReferenceManyField>
        </Tab>
        <Tab label="Logs" path="logs">
          <ReferenceManyField
            reference="log"
            filter={{
              referenceTable: "sales",
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

const saleDefaultValue = {
  startDateTime: new Date(),
  validationStatus: "DRAFT",
  //--
  supplyType: "STOCK",
  acceptSubmission: true,
  endDateTime: moment.utc().add(1, "day").format(),
};

const validateSale = (values) => {
  let errors = {};

  if (
    values.acceptAuction === false &&
    values.acceptImmediatePurchase === false &&
    values.acceptSubmission === false
  ) {
    errors.acceptAuction = ["At least one type is mandatory"];
    errors.acceptImmediatePurchase = ["At least one type is mandatory"];
    errors.acceptSubmission = ["At least one type is mandatory"];
  }

  if (values.acceptAuction && values.auctionReservePrice > 0) {
    if (values.auctionReservePrice <= values.auctionStartPrice) {
      errors.auctionStartPrice = [
        "auctionStartPrice should be less than auctionReservePrice",
      ];
      errors.auctionReservePrice = [
        "auctionReservePrice should be greater than auctionStartPrice",
      ];
    }
  }

  return errors;
};

const saleDatesValidation = (value, allValues) => {
  let { startDateTime, endDateTime } = allValues;

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
