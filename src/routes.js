import React from "react";
import { Route } from "react-router-dom";
import UserParameters from "./userParameters/UserParameters";
import { CloneSale } from "./sale/CloneSale";
export default [
  <Route exact path="/user-parameters" render={() => <UserParameters />} />,
  <Route
    exact
    path="/sale/:saleId/duplicate"
    render={(props) => (
      <CloneSale resource="sale" basePath={props.match.url} {...props} />
    )}
  />,
];
