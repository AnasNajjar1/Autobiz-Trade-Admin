import React from "react";
import { Labeled, SelectInput } from "react-admin";

import {
  widthChoices,
  heightChoices,
  diameterChoices
} from "../../assets/choices/rimSize";

const RimSizeInput = props => {
  return (
    <Labeled label={props.label}>
      <span>
        <SelectInput
          label="width"
          source={`${props.source}.width`}
          choices={widthChoices}
        />
        &nbsp;
        <SelectInput
          label="height"
          source={`${props.source}.height`}
          choices={heightChoices}
        />
        &nbsp;
        <SelectInput
          label="diameter"
          source={`${props.source}.diameter`}
          choices={diameterChoices}
        />
      </span>
    </Labeled>
  );
};
export default RimSizeInput;
