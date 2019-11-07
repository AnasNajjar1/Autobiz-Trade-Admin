// in src/App.js
import React from "react";
import { Admin, Resource, Login } from "react-admin";
import vehicle from "./vehicle";
import pointOfSale from "./pointOfSale";
import offer from "./offer";
import { Users } from "./users/Users";
import User from "./users/User";
import dataProvider from "./dataprovider";
import authProvider from "./authProvider";
import Amplify, { Auth, API } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import awsconfig from "./aws-config";
import { muiThemeOverrides } from "./assets/theme/muiThemeOverrides";
import VisitorIcon from "@material-ui/icons/People";
Amplify.configure(awsconfig);

const MyLoginPage = () => <Login backgroundImage="/background.jpg" />;

const App = () => {
  return (
    <Admin
      theme={muiThemeOverrides}
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={MyLoginPage}
    >
      {permissions => [
        // Restrict access to the edit and remove views to admin only

        <Resource name="vehicle" {...vehicle} />,
        <Resource name="offer" {...offer} />,
        <Resource name="pointOfSale" {...pointOfSale} />,
        <Resource name="facadeBrand" />,
        <Resource name="facadeModel" />,
        <Resource name="facadePointOfSale" />,
        <Resource name="status" />,
        <Resource name="facadeUser" />
        // Only include the categories resource for admin users
        // permissions === "admin" ? (
        //   <Resource name="users" list={Users} edit={User} icon={VisitorIcon} />
        // ) : null
      ]}
    </Admin>
  );
};

export default App;
