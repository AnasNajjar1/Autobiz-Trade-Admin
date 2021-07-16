// in src/App.js
import React from "react";
import { Admin, Resource, Login } from "react-admin";
import vehicle from "./vehicle";
import group from "./group";
import groupUser from "./groupUser";
import list from "./list";
import facadeUsers from "./facadeUsers";
import pointOfSale from "./pointOfSale";
import configPage from "./configPage";
import facadeCarcheck from "./carcheck";
import sale from "./sale";
import offer from "./offer";
import log from "./log";
import partnerRequests from "./partnerRequests";
import dataProvider from "./dataprovider";
import authProvider from "./authProvider";
import Amplify from "aws-amplify";
import awsconfig from "./aws-config";
import { muiThemeOverrides } from "./assets/theme/muiThemeOverrides";
import MyLayout from "./Layout/MyLayout";
import customRoutes from "./routes";

import { TranslateProvider } from "autobiz-translate";
import { stage } from "./utils/getStage";
import { i18nProvider, locale } from "./utils/language";
Amplify.configure(awsconfig);

const MyLoginPage = () => <Login backgroundImage="/background.jpg" />;

const App = () => {
  return (
    <TranslateProvider
      projectName="trade-admin"
      language={locale}
      stage={stage}
    >
      <Admin
        theme={muiThemeOverrides}
        dataProvider={dataProvider}
        authProvider={authProvider}
        customRoutes={customRoutes}
        loginPage={MyLoginPage}
        appLayout={MyLayout}
        i18nProvider={i18nProvider()}
      >
        {() => [
          <Resource name="vehicle" {...vehicle} />,
          <Resource name="sale" {...sale} />,
          <Resource name="offer" {...offer} />,
          <Resource name="facadeCarcheck" {...facadeCarcheck} />,
          <Resource name="partnerRequests" {...partnerRequests} />,
          <Resource name="partner" />,
          <Resource name="pointOfSale" {...pointOfSale} />,
          <Resource name="groupUser" {...groupUser} />,
          <Resource name="config" {...configPage} />,
          <Resource name="group" {...group} />,
          <Resource name="list" {...list} />,
          <Resource name="facadeModel" />,
          <Resource name="facadeBrand" />,
          <Resource name="facadeUser" {...facadeUsers} />,
          <Resource name="facadePointOfSale" />,
          <Resource name="log" {...log} />,
        ]}
      </Admin>
    </TranslateProvider>
  );
};

export default App;
