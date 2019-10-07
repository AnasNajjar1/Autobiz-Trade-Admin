import { getUserData } from "./users/dataproviderUsers";
import simpleRestProvider from "ra-data-simple-rest";
import { B2B_API } from "./config";
import _ from "lodash";

const restProvider = simpleRestProvider(B2B_API);

export default async (type, resource, params) => {
  switch (resource) {
    case "pointOfSale":
    case "offer":
    case "facadePointOfSale":
    case "facadeBrand":
    case "facadeModel":
    case "status":
    case "auction":
    case "vehicle": {
      return restProvider(type, "admin/" + resource, params);
    }
    case "users": {
      return getUserData(type, resource, params);
    }
  }
};
