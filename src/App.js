// in src/App.js
import React from "react";
import { Admin, Resource } from "react-admin";
import { Vehicles } from "./Vehicles";
import { Vehicle } from "./Vehicle";
import { getVehicles } from "./api/getVehicles";
import dataProvider from "./dataprovider";

//const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

const App = () => {
  getVehicles().then(res => console.log(res));

  return (
    <Admin dataProvider={dataProvider}>
      {/* <Resource name="albums" list={UserList}   edit={EditGuesser} /> */}
      <Resource name="vehicles" list={Vehicles} edit={Vehicle} />
    </Admin>
  );
};

export default App;
