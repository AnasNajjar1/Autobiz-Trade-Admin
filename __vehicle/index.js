import DirectionsCar from "@material-ui/icons/DirectionsCar";

import { Vehicles } from "./Vehicles";

import { CreateVehicle, EditVehicle, ShowVehicle } from "./Vehicle";

export default {
  create: CreateVehicle,
  edit: EditVehicle,
  list: Vehicles,
  icon: DirectionsCar,
  show: ShowVehicle,
};
