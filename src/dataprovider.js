import { getUserData } from "./users/dataproviderUsers";
import { HttpError } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import _ from "lodash";
import { API } from "aws-amplify";
import auth from "./providers/Auth";

//this method to get the signed api call
export const httpClientAWS = async (path, options) => {
  let { method, body } = options;

  if (body !== undefined) {
    body = JSON.parse(body);
    options.body = body;
  }

  options.response = true;
  if (method === undefined) method = "get";
  else if (method === "DELETE") method = "del";
  else {
    method = _.toLower(method);
    delete options.method;
  }
  try {
    const response = await API[method]("b2bPlateform", path, options);
    const json = response.data;
    var myHeaders = new Headers();
    Object.entries(response.headers).forEach(([key, value]) => {
      myHeaders.append(key, value);
    });

    return { headers: myHeaders, json };
  } catch (e) {
    if (e.response?.status === 403) await auth.refreshToken();
    return e.response?.data
      ? Promise.reject(e.response?.data)
      : Promise.reject(e);
  }
};

const restProvider = simpleRestProvider("", httpClientAWS);

export default async (type, resource, params) => {
  let path = "v2/admin/";
  switch (resource) {
    default:
    case "facadePointOfSale":
    case "facadeBrand":
    case "facadeModel":
    case "facadeUser":
    case "facadeCompany":
    case "facadeCarcheck": {
      resource = resource.replace("facade", "");
      return restProvider(type, "admin/facade/" + resource, params);
    }
    case "partnerRequests":
      return restProvider(type, "v2/admin/partner/requests", params);
    case "partnerOffers":
      return restProvider(type, "v2/admin/partner/offers", params);
    case "pointOfSale":
    case "log":
    case "status":
    case "group":
    case "groupUser":
    case "list":
    case "config":
    case "auction":
      return restProvider(type, "admin/" + resource, params);
    case "importVehicle":
      return restProvider(type, "admin/import", params);
    case "sale":
    case "offer":
      switch (type) {
        case "DELETE":
        case "DELETE_MANY":
          path = "admin/";
      }
      return restProvider(type, path + resource, params);
    case "vehicle":
      switch (type) {
        case "CREATE":
        case "DELETE":
        case "DELETE_MANY":
          path = "admin/";
      }
      return restProvider(type, path + resource, params);
    case "partner":
      return restProvider(type, path + resource, params);
    case "users": {
      return getUserData(type, resource, params);
    }
  }
};
