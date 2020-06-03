import React from "react";
import { Route } from "react-router-dom";
import UserParameters from "./userParameters/UserParameters";

export default [
  <Route exact path="/user-parameters" render={() => <UserParameters />} />,
];
