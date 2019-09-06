import axios from "axios";
import { B2B_API } from "../config";

export const updateVehicle = async (id, data) => {
  console.log("PUT", `${B2B_API}/record?id=${id}`, data);
  const result = await axios.put(`${B2B_API}/record?id=${id}`, data);
  console.log("result push", result.data);
  return result.data;
};
