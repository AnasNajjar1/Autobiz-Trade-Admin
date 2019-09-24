import React from "react";
import { Field } from "redux-form";
import { Labeled, TextInput, SelectInput } from "react-admin";

const RimSizeInput = props => {
  const { width, height, diameter } = props.content;

  let choicesWidth = [];
  if (width.enum) {
    width.enum.map(keyValue => {
      choicesWidth.push({ id: keyValue, name: keyValue });
    });
  }

  let choicesHeight = [];
  if (height.enum) {
    height.enum.map(keyValue => {
      choicesHeight.push({ id: keyValue, name: keyValue });
    });
  }

  let choicesDiameter = [];
  if (diameter.enum) {
    diameter.enum.map(keyValue => {
      choicesDiameter.push({ id: keyValue, name: keyValue });
    });
  }

  return (
    <Labeled label={props.label}>
      <span>
        <SelectInput
          label="width"
          source={`${props.source}.width`}
          choices={choicesWidth}
        />
        &nbsp;
        <SelectInput
          label="height"
          source={`${props.source}.height`}
          choices={choicesHeight}
        />
        &nbsp;
        <SelectInput
          label="diameter"
          source={`${props.source}.diameter`}
          choices={choicesDiameter}
        />
      </span>
    </Labeled>
  );
};
export default RimSizeInput;
