// in src/App.js
import React from "react";
import { Admin, Resource } from "react-admin";
import { Vehicles } from "./market/Vehicles";
import { Vehicle } from "./market/Vehicle";
import { Users } from "./users/Users";
import User from "./users/User";
import dataProvider from "./dataprovider";
import Amplify, { Auth, API } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import awsconfig from "./aws-config";


Amplify.configure(awsconfig);

//const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

const App = () => {

  return (
    <Admin dataProvider={dataProvider}>

      {/* <Resource name="albums" list={UserList}   edit={EditGuesser} /> */}
      <Resource name="market" list={Vehicles} edit={Vehicle} />
      <Resource name="users" list={Users} edit={User} />
    </Admin>
  );
};

export default withAuthenticator(App, true);
