import React, { Fragment } from "react";
import {
  Create,
  Edit,
  Show,
  SimpleShowLayout,
  ReferenceManyField,
  TopToolbar,
  EditButton,
  required,
  Datagrid,
  useRedirect,
  useDataProvider,
  useNotify,
  TextField,
  BooleanField,
  DateField,
  SimpleForm,
  TextInput,
  useTranslate,
  ReferenceInput,
  SelectInput,
  ReferenceField,
} from "react-admin";
import Button from "@material-ui/core/Button";
import MomentUtils from "@date-io/moment";
import S3CustomUploader from "../components/S3CustomUploader";
import {
  KeyboardDateInput,
  KeyboardTimeInput,
} from "../components/CustomInput";

export const CreateList = (props) => {
  const translate = useTranslate();
  return (
    <Create title={translate("createGroup")} {...props}>
      <SimpleForm>
        <TextInput label="name" source="name" validate={required()}></TextInput>
        <S3CustomUploader label="picture" source="picture" />
        <ReferenceInput
          label="group"
          source="groupId"
          reference="group"
          perPage="50"
          validate={required()}
        >
          <SelectInput optionValue="id" optionText="name" />
        </ReferenceInput>

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
          validate={required()}
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
          validate={required()}
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
          validate={required()}
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
          validate={required()}
        />
      </SimpleForm>
    </Create>
  );
};

export const EditList = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput label="name" source="name" validate={required()}></TextInput>
        <S3CustomUploader label="picture" source="picture" />

        <ReferenceInput
          label="group"
          source="groupId"
          reference="group"
          perPage="50"
          validate={required()}
        >
          <SelectInput optionValue="id" optionText="name" />
        </ReferenceInput>

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
          validate={required()}
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
          validate={required()}
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
          validate={required()}
        />

        <KeyboardTimeInput
          label="saleEndTime"
          source="endDateTime"
          providerOptions={{ utils: MomentUtils }}
          disablePast
          options={{
            format: "HH:mm",
            ampm: false,
          }}
          validate={required()}
        />
      </SimpleForm>
    </Edit>
  );
};

const ListShowActions = ({ record, basePath, data }) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const dataProvider = useDataProvider();

  let saleIds = [];
  if (data && data.sales) {
    saleIds = data.sales.map((a) => a.id);
  }

  const approve = () => {
    dataProvider
      .updateMany("sale", {
        ids: saleIds,
        data: {
          groupId: data.groupId,
          startDateTime: data.startDateTime,
          endDateTime: data.endDateTime,
        },
      })
      .then((response) => {
        redirect("/list");
        notify("vehicles updated");
      })
      .catch((error) => {
        notify(`vehicles approval error: ${error.message}`, "warning");
      });
  };
  return (
    <TopToolbar>
      <EditButton basePath={basePath} record={data} />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => approve()}
      >
        Apply to all sales
      </Button>
    </TopToolbar>
  );
};

export const ShowList = (props) => {
  const listId = props.id;
  return (
    <Show actions={<ListShowActions />} {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" />
        <DateField source="startDateTime" showTime />
        <DateField source="endDateTime" showTime />

        <ReferenceField
          label="group"
          source="groupId"
          reference="group"
          perPage="50"
        >
          <TextField source="name" />
        </ReferenceField>

        <ReferenceManyField label="sales" reference="sale" target="listId">
          <Datagrid>
            <TextField label="saleId" source="id" />
            <TextField label="vehicleId" source="vehicle.id" />
            <TextField label="fileNumber" source="vehicle.fileNumber" />
            <TextField label="registration" source="vehicle.registration" />
            <TextField label="validationStatus" source="validationStatus" />
            <TextField label="status" source="status" />
            <BooleanField source="acceptAuction" label="acceptAuction" />
            <BooleanField
              source="acceptImmediatePurchase"
              label="acceptImmediatePurchase"
            />
            <BooleanField source="acceptSubmission" label="acceptSubmission" />
            <DateField label="salesStart" source="startDateTime" />
            <DateField label="salesEnd" source="endDateTime" />
            <TextField label="BrandLabel" source="vehicle.brandLabel" />
            <TextField label="ModelLabel" source="vehicle.modelLabel" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
