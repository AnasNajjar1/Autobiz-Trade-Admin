// in src/App.js
import React, { useState, useEffect } from "react";
import { Admin, Resource, Login } from "react-admin";
import vehicle from "./vehicle";
import {
  Offline,
  Online,
  AuctionFinished,
  AuctionFailed,
  PurchasedImmediately,
  Sold,
  SubmissionsOnlyFinished,
} from "./vehicle/Vehicles";
import pointOfSale from "./pointOfSale";
import configPage from "./configPage";
import facadeCarcheck from "./carcheck";
import offer from "./offer";
import partnerRequests from "./partnerRequests";
import partnerOffers from "./partnerOffers";
import { Users } from "./users/Users";
import User from "./users/User";
import dataProvider from "./dataprovider";
import authProvider from "./authProvider";
import Amplify, { Auth, API } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import awsconfig from "./aws-config";
import { muiThemeOverrides } from "./assets/theme/muiThemeOverrides";
import MyLayout from "./Layout/MyLayout";
import {
  Home,
  Computer,
  Gavel,
  MonetizationOn,
  SyncDisabled,
  ErrorOutline,
} from "@material-ui/icons";
import customRoutes from "./routes";
import polyglotI18nProvider from "ra-i18n-polyglot";
import frenchMessages from "ra-language-french";

Amplify.configure(awsconfig);

const MyLoginPage = () => <Login backgroundImage="/background.jpg" />;

const i18nProvider = polyglotI18nProvider((locale) => {
  const localTranslation = JSON.parse(
    localStorage.getItem("translation_" + locale)
  );

  if (localTranslation) {
    return localTranslation;
  } else {
    return frenchMessages;
  }
}, "fr");

const App = () => {
  return (
    <Admin
      theme={muiThemeOverrides}
      dataProvider={dataProvider}
      authProvider={authProvider}
      customRoutes={customRoutes}
      loginPage={MyLoginPage}
      appLayout={MyLayout}
      i18nProvider={i18nProvider}
    >
      {(permission) => [
        //Restrict access to the edit and remove views to admin only
        <Resource name="offline" {...vehicle} list={Offline} icon={Home} />,
        <Resource name="onSale" {...vehicle} list={Online} icon={Computer} />,
        <Resource
          name="auctionFinished"
          {...vehicle}
          list={AuctionFinished}
          icon={Gavel}
        />,
        <Resource
          name="auctionFailed"
          {...vehicle}
          list={AuctionFailed}
          icon={ErrorOutline}
        />,
        <Resource
          name="purchasedImmediately"
          {...vehicle}
          list={PurchasedImmediately}
          icon={MonetizationOn}
        />,
        <Resource name="sold" {...vehicle} list={Sold} icon={SyncDisabled} />,
        <Resource
          name="submissionsOnlyFinished"
          {...vehicle}
          list={SubmissionsOnlyFinished}
          icon={Gavel}
        />,
        <Resource name="vehicle" {...vehicle} />,
        <Resource name="facadeCarcheck" {...facadeCarcheck} />,
        <Resource name="offer" {...offer} />,
        <Resource name="partnerRequests" {...partnerRequests} />,
        <Resource name="partnerOffers" {...partnerOffers} />,
        <Resource name="pointOfSale" {...pointOfSale} />,
        <Resource name="facadeBrand" />,
        <Resource name="partner" />,
        <Resource name="facadeModel" />,
        <Resource name="facadePointOfSale" />,
        <Resource name="status" />,
        <Resource name="facadeUser" />,
        <Resource name="carcheckImport" />,
        <Resource name="config" {...configPage} />,
        // Only include the categories resource for admin users
        // permission === "admin" ? (
        //   <Resource name="users" list={Users} edit={User} icon={VisitorIcon} />
        // ) : null
      ]}
    </Admin>
  );
};

export default App;
