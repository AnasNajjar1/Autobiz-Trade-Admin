import { ImportContacts } from "@material-ui/icons";
import { Imports } from "./Imports";
import React from "react";
import { Show } from "react-admin";
export const Form = (props) => {
  return <Show {...props}></Show>;
};

export default {
  list: Imports,
  icon: ImportContacts,
};
