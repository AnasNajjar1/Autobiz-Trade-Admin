import React, { useState, useEffect } from "react";

import {
  TextInput,
  required,
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
import supplyTypeChoices from "../assets/choices/supplyType";
import validationStatusChoices from "../assets/choices/validationStatus";
import MomentUtils from "@date-io/moment";
import moment from "moment";

import {
  KeyboardDateInput,
  KeyboardTimeInput,
} from "../components/CustomInput";
import { API } from "aws-amplify";

export const CloneSale = (props) => {
  const saleId = props.match.params.saleId;
  const [sale, setSale] = useState(null);

  const getSales = async (saleId) => {
    try {
      return await API.get("b2bPlateform", `/v2/admin/sale/${saleId}`);
    } catch (e) {
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const sale = await getSales(saleId);
      setSale(sale);
    };

    fetchData();
  }, []);

  const redirect = (basePath, id, data) => `/sale/${data.id}`;
  var startDate = new Date();
  startDate.setHours(15, 30, 0);

  return (
    <Create {...props}>
      <SimpleForm
        validate={validateSale}
        submitOnEnter={false}
        defaultValue={{
          ...sale,
          endDateTime: null,
          validationStatus : "DRAFT",
          startDateTime: startDate,
        }}
        redirect={redirect}
      >
        <TextInput
          label="vehicleId"
          source="vehicleId"
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
          label="startDateTime"
          source="startDateTime"
          providerOptions={{ utils: MomentUtils }}
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

        <br />
        <TextInput label="salesComment" source="comment"></TextInput>

        <ReferenceInput
          label="group"
          source="groupId"
          reference="group"
          allowEmpty
        >
          <AutocompleteInput optionValue="id" optionText="name" />
        </ReferenceInput>

        <ReferenceInput
          label="list"
          source="listId"
          reference="list"
          allowEmpty
        >
          <AutocompleteInput optionValue="id" optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
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
const saleDatesValidation = (allValues) => {
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
