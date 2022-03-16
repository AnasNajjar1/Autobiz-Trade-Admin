import { ImportContacts } from "@material-ui/icons";
import { ImportImages } from "./ImportImages";
import React from "react";
import { Show } from "react-admin";

export const Form = (props) => {
  return <Show {...props}></Show>;
};

export default {
  list: ImportImages,
  icon: ImportContacts,
};
