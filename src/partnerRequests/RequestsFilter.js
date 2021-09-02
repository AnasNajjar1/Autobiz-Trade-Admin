import React from 'react'
import { TextInput, Filter } from "react-admin";
const RequestsFilter = (props) => {
    return (
        <Filter {...props}>
        <TextInput
          label="vehicleId"
          source="vehicleId"
          defaultValue=""
          alwaysOn
          resettable
        />
      </Filter>
    )
}

export default RequestsFilter
