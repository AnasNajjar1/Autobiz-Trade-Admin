import { ImportContacts } from "@material-ui/icons";
import { ImportVehicleSales } from "./ImportVehicleSales";
import React from "react";
import { Show } from "react-admin";
export const Form = (props) => {
  return <Show {...props}></Show>;
};

export default {
  list: ImportVehicleSales,
  icon: ImportContacts,
};
