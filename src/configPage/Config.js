import React from "react";
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  ReferenceInput,
  FormDataConsumer,
  NumberInput,
  required,
  TabbedForm,
  SimpleFormIterator,
  ArrayInput,
  FormTab
} from "react-admin";
import offerTypes from "../assets/choices/offerType";
import auctionDateChoices from "../assets/choices/auctionDateChoices";
import salesType from "../assets/choices/salesType";
import auctionSelection from "../assets/choices/auctionSelection";
import auctionOperator from "../assets/choices/auctionOperator";

export const EditConfig = props => {

  if(props.id === "auction")  return (
    <Edit {...props}>
      <TabbedForm submitOnEnter={false}>
        {offerTypes.map(offerType => (
          <Auction {...props} offerType={offerType.id} />
        ))}
      </TabbedForm>
    </Edit>
  );

  if(props.id === "documentFilters")  return (
    <Edit {...props}>
      <TabbedForm submitOnEnter={false}>
        {offerTypes.map(offerType => (
          <DocumentFilters {...props} offerType={offerType.id} />
        ))}
      </TabbedForm>
    </Edit>
  );

  return null
};

const Auction = props => {
  const { offerType } = props;
  console.log("offerType", offerType);
  return (
    <FormTab {...props} label={offerType} key={offerType}>
      <SelectInput
        label="salesType"
        source={`${offerType}.salesType`}
        choices={salesType}
      />
      <NumberInput
        label="delay before sale (working days)"
        source={`${offerType}.delay`}
      />
      <NumberInput
        label="sale duration (working days)"
        source={`${offerType}.duration`}
      />
      <SelectInput
        label="Start time"
        source={`${offerType}.startTime`}
        choices={auctionDateChoices}
      />
      <SelectInput
        label="End time"
        source={`${offerType}.endTime`}
        choices={auctionDateChoices}
      />
      <SelectInput
        label="value to select"
        source={`${offerType}.selection`}
        choices={auctionSelection}
      />
      <ArrayInput label="values" source={`${offerType}.values`}>
        <SimpleFormIterator>
          <TextInput label="path" source="path" />
          <SelectInput source="operator" choices={auctionOperator} />
          <NumberInput source="value" />
          <BooleanInput source="required" />
        </SimpleFormIterator>
      </ArrayInput>
    </FormTab>
  );
};


const DocumentFilters = props => {
  const { offerType } = props;
  return (
    <FormTab {...props} label={offerType} key={offerType}>
        <ArrayInput label="documents" source={`${offerType}.documents`}>
        <SimpleFormIterator>
          <TextInput label="id" source="id" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput label="pictures" source={`${offerType}.pictures`}>
        <SimpleFormIterator>
          <TextInput label="id" source="id" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput label="damages" source={`${offerType}.damages`}>
        <SimpleFormIterator>
          <TextInput label="id" source="id" />
        </SimpleFormIterator>
      </ArrayInput>
    </FormTab>
  );
};