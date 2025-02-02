import React, { useState } from "react";
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
  EditButton,
  minValue,
  useTranslate,
  SaveButton,
  Toolbar,
} from "react-admin";
import RemoveIcon from "@material-ui/icons/Remove";
import { parse } from "query-string";
import supplyTypeChoices from "../assets/choices/supplyType";
import validationStatusChoices from "../assets/choices/validationStatus";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import SetWinnerButton from "./SetWinnerButton";
import DeletewinnerButton from "./DeleteWinnerButton";
import { withStyles } from "@material-ui/core/styles";
import {
  KeyboardDateInput,
  KeyboardTimeInput,
} from "../components/CustomInput";
import { LogActionLabel } from "../components/LogActionLabel";
import { LogPanel } from "../components/LogPanel";

//import { Button } from "@material-ui/core";
import ConfirmUpdateValidationStatus from "./ConfirmUpdateValidationStatus";

const styles = {
  link: {
    fontWeight: "bold",
    fontFamily: "Arial",
  },
};
export const EditSale = (props, { basePath, data, resource }) => {
  const form = SaleForm("edit", null, props);
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

const SaleForm = (type, vehicleId, props) => {
  //const vehicleInfo = formData.vehicle && formData.vehicle.brandLabel;
  const [validationStatus, setValidationStatus] = useState("");
  const handleChange = (e) => setValidationStatus(e.target.value);
  return (
    <SimpleForm
      {...props}
      validate={validateSale}
      submitOnEnter={false}
      defaultValue={saleDefaultValue}
      toolbar={
        type === "edit" ? (
          <CustomToolbar validationStatus={validationStatus} />
        ) : (
          <DefaultToolBar />
        )
      }
    >
      {type === "edit" && <TextInput disabled source="id" label="saleId" />}
      {type === "edit" && <TextInput disabled source="status" label="status" />}

      <TextInput
        label="vehicleId"
        source="vehicleId"
        defaultValue={vehicleId}
        validate={[required()]}
      ></TextInput>

      <SelectInput
        label="supplyType"
        source="supplyType"
        choices={supplyTypeChoices}
        validate={[required()]}
      />

      <SelectInput
        label="validationStatus"
        source="validationStatus"
        choices={validationStatusChoices}
        validate={[required()]}
        onChange={handleChange}
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
  const acceptAuction = record && record.acceptAuction;
  const acceptImmediatePurchase = record && record.acceptImmediatePurchase;
  const acceptSubmission = record && record.acceptSubmission;
  const expressSale = record && record.expressSale;

  const translate = useTranslate();

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
          <BooleanField
            source="acceptAuction"
            label="acceptAuction"
            color={acceptAuction ? "secondary" : "error"}
          />
          <BooleanField
            source="acceptImmediatePurchase"
            label="acceptImmediatePurchase"
            color={acceptImmediatePurchase ? "secondary" : "error"}
          />
          <BooleanField
            source="acceptSubmission"
            label="acceptSubmission"
            color={acceptSubmission ? "secondary" : "error"}
          />
          {acceptAuction ? (
            <NumberField
              source="auctionStartPrice"
              label="auctionStartPrice"
              locales="fr-FR"
              options={{ style: "currency", currency: "EUR" }}
            />
          ) : (
            <BooleanField
              label="auctionStartPrice"
              source="acceptAuction"
              FalseIcon={RemoveIcon}
            />
          )}
          {acceptAuction ? (
            <NumberField
              source="auctionStepPrice"
              label="auctionStepPrice"
              locales="fr-FR"
              options={{ style: "currency", currency: "EUR" }}
            />
          ) : (
            <BooleanField
              label="auctionStepPrice"
              source="acceptAuction"
              FalseIcon={RemoveIcon}
            />
          )}
          {acceptAuction ? (
            <NumberField
              source="auctionReservePrice"
              label="auctionReservePrice"
              locales="fr-FR"
              options={{ style: "currency", currency: "EUR" }}
            />
          ) : (
            <BooleanField
              label="auctionReservePrice"
              source="acceptAuction"
              FalseIcon={RemoveIcon}
            />
          )}
          {acceptImmediatePurchase ? (
            <NumberField
              source="immediatePurchasePrice"
              label="immediatePurchasePrice"
              locales="fr-FR"
              options={{ style: "currency", currency: "EUR" }}
            />
          ) : (
            <BooleanField
              label="immediatePurchasePrice"
              source="acceptImmediatePurchase"
              FalseIcon={RemoveIcon}
            />
          )}

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

          <BooleanField
            source="expressSale"
            label="expressSale"
            color={expressSale ? "secondary" : "error"}
          />
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

          <EditButton />
        </Tab>
        <Tab label="vehicle">
          <TextField label="registration" source="vehicle.registration" />
          <TextField label="make" source="vehicle.brandLabel" />
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
              label={translate("editVehicle")}
            />
          )}
        </Tab>
        <Tab label="offers" path="offer">
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
              <ReferenceField
                label="Phone"
                source="userId"
                reference="facadeUser"
              >
                <TextField source="phoneNumber" />
              </ReferenceField>
              *{record && record.requestWinner && <SetWinnerButton />}
              {record && record.deleteWinner && <DeletewinnerButton />}
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
  startDateTime: moment.utc().format(),
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

const CustomToolbar = (props) => {
  const { validationStatus } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (validationStatus === "CANCELED") setOpen(true);
    else return props.handleSubmit();
  };

  const handleDialogClose = () => setOpen(false);

  const handleConfirm = () => {
    setOpen(false);
    return props.handleSubmit();
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Toolbar {...props}>
      <ConfirmUpdateValidationStatus
        open={open}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
        cancel={handleCancel}
      />
      <SaveButton handleSubmitWithRedirect={handleClick} />
    </Toolbar>
  );
};

const DefaultToolBar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);
