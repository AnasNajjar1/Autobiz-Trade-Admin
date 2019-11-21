// in src/App.js
import React from "react";
import { Route } from 'react-router-dom';
import { Admin, Resource, Login } from "react-admin";
import vehicle from "./vehicle";
import { Offline, Online, AuctionFinished, AuctionFailed, PurchasedImmediately, Sold } from "./vehicle/Vehicles";
import pointOfSale from "./pointOfSale";
import facadeCarcheck from "./carcheck"
import offer from "./offer";
import { Users } from "./users/Users";
import User from "./users/User";
import dataProvider from "./dataprovider";
import authProvider from "./authProvider";
import Amplify, { Auth, API } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import awsconfig from "./aws-config";
import { muiThemeOverrides } from "./assets/theme/muiThemeOverrides";
import MyLayout from "./Menu/CustomLayout"

Amplify.configure(awsconfig);

const MyLoginPage = () => <Login backgroundImage="/background.jpg" />;

const App = () => {
  return (
    <Admin
      theme={muiThemeOverrides}
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={MyLoginPage}
      appLayout={MyLayout}
    >
      {permission => [
        //Restrict access to the edit and remove views to admin only
        <Resource name="offline" list={Offline} create={vehicle.create} edit={vehicle.edit} icon={vehicle.icon} />,
        <Resource name="online" list={Online} create={vehicle.create} edit={vehicle.edit}  icon={vehicle.icon}/>,
        <Resource name="auctionFinished" list={AuctionFinished} create={vehicle.create} edit={vehicle.edit}  icon={vehicle.icon} />,
        <Resource name="auctionFailed" list={AuctionFailed} create={vehicle.create} edit={vehicle.edit}  icon={vehicle.icon} />,
        <Resource name="purchasedImmediately" list={PurchasedImmediately} create={vehicle.create} edit={vehicle.edit}  icon={vehicle.icon} />,
        <Resource name="sold" list={Sold} create={vehicle.create} edit={vehicle.edit} icon={vehicle.icon} />,
        <Resource name="vehicle" {...vehicle} />,
        <Resource name="facadeCarcheck" {...facadeCarcheck} />,
        <Resource name="offer" {...offer} />,
        <Resource name="pointOfSale" {...pointOfSale} />,
        <Resource name="facadeBrand" />,
        <Resource name="facadeModel" />,
        <Resource name="facadePointOfSale" />,
        <Resource name="status" />,
        <Resource name="facadeUser" />,
        <Resource name="carcheckImport" />,
        // Only include the categories resource for admin users
        // permission === "admin" ? (
        //   <Resource name="users" list={Users} edit={User} icon={VisitorIcon} />
        // ) : null
      ]}
    </Admin>
  );
};

export default App;
