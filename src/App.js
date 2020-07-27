// in src/App.js
import React from "react";
import { Admin, Resource, Login } from "react-admin";
import vehicle from "./vehicle";
import {
  OfferToPrivate,
  OffertoprivateOffline,
  OffertoprivateOnSale,
  OffertoprivateAuctionFinished,
  OffertoprivateAuctionFailed,
  OffertoprivatePurchasedImmediately,
  OffertoprivateSold,
  OffertoprivatePending,
  OffertoprivateSubmissionsOnlyFinished,
  Stock,
  StockOffline,
  StockPending,
  StockOnSale,
  StockAuctionFinished,
  StockAuctionFailed,
  StockPurchasedImmediately,
  StockSubmissionsOnlyFinished,
  StockSold,
} from "./vehicle/Vehicles";
import group from "./group";
import groupUser from "./groupUser";
import pointOfSale from "./pointOfSale";
import configPage from "./configPage";
import facadeCarcheck from "./carcheck";
import offer from "./offer";
import partnerRequests from "./partnerRequests";
import partnerOffers from "./partnerOffers";
import dataProvider from "./dataprovider";
import authProvider from "./authProvider";
import Amplify from "aws-amplify";
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
  AvTimer,
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
        <Resource
          name="offertoprivateOffline"
          {...vehicle}
          list={OffertoprivateOffline}
          icon={Home}
        />,
        <Resource
          name="stockOffline"
          {...vehicle}
          list={StockOffline}
          icon={Home}
        />,
        <Resource
          name="offertoprivatePending"
          {...vehicle}
          list={OffertoprivatePending}
          icon={AvTimer}
        />,
        <Resource
          name="stockPending"
          {...vehicle}
          list={StockPending}
          icon={AvTimer}
        />,

        <Resource
          name="offertoprivateOnSale"
          {...vehicle}
          list={OffertoprivateOnSale}
          icon={Computer}
        />,
        <Resource
          name="stockOnSale"
          {...vehicle}
          list={StockOnSale}
          icon={Computer}
        />,
        <Resource
          name="offertoprivateAuctionFinished"
          {...vehicle}
          list={OffertoprivateAuctionFinished}
          icon={Gavel}
        />,
        <Resource
          name="stockAuctionFinished"
          {...vehicle}
          list={StockAuctionFinished}
          icon={Gavel}
        />,

        <Resource
          name="offertoprivateAuctionFailed"
          {...vehicle}
          list={OffertoprivateAuctionFailed}
          icon={ErrorOutline}
        />,
        <Resource
          name="stockAuctionFailed"
          {...vehicle}
          list={StockAuctionFailed}
          icon={ErrorOutline}
        />,

        <Resource
          name="offertoprivatePurchasedImmediately"
          {...vehicle}
          list={OffertoprivatePurchasedImmediately}
          icon={MonetizationOn}
        />,
        <Resource
          name="stockPurchasedImmediately"
          {...vehicle}
          list={StockPurchasedImmediately}
          icon={MonetizationOn}
        />,

        <Resource
          name="offertoprivateSold"
          {...vehicle}
          list={OffertoprivateSold}
          icon={SyncDisabled}
        />,
        <Resource
          name="stockSold"
          {...vehicle}
          list={StockSold}
          icon={SyncDisabled}
        />,

        <Resource
          name="offertoprivateSubmissionsOnlyFinished"
          {...vehicle}
          list={OffertoprivateSubmissionsOnlyFinished}
          icon={Gavel}
        />,

        <Resource
          name="stockSubmissionsOnlyFinished"
          {...vehicle}
          list={StockSubmissionsOnlyFinished}
          icon={Gavel}
        />,

        ,
        <Resource name="vehicle" {...vehicle} />,

        <Resource name="stock" {...vehicle} list={Stock} />,
        <Resource name="offertoprivate" {...vehicle} list={OfferToPrivate} />,
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
        <Resource name="facadeCompany" />,
        <Resource name="carcheckImport" />,
        <Resource name="config" {...configPage} />,
        <Resource name="group" {...group} />,
        <Resource name="groupUser" {...groupUser} />,
        // Only include the categories resource for admin users
        // permission === "admin" ? (
        //   <Resource name="users" list={Users} edit={User} icon={VisitorIcon} />
        // ) : null
      ]}
    </Admin>
  );
};

export default App;
