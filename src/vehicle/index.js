import DirectionsCar from "@material-ui/icons/DirectionsCar";

import { Vehicles } from "./Vehicles";
import { editVehicle, createVehicle } from "./Vehicle";

export default {
  list: Vehicles,
  create: createVehicle,
  edit: editVehicle,
  icon: DirectionsCar
};
