import { getUserData } from "./users/dataproviderUsers";
import { HttpError } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import _ from "lodash";
import { API } from "aws-amplify";

//this method to get the signed api call
const httpClientAWS = async (path, options) => {
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
    if (e.response && e.response.data) {
      return Promise.reject(new HttpError(e.response.data));
    } else {
      throw new Error(e);
    }
  }
};

const restProvider = simpleRestProvider("", httpClientAWS);

export default async (type, resource, params) => {
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
      return restProvider(type, "admin/partner/requests", params);
    case "partnerOffers":
      return restProvider(type, "admin/partner/offers", params);
    case "pointOfSale":
    case "offer":
    case "status":
    case "vehicle":
    case "group":
    case "groupUser":
    case "list":
    case "config":
    case "partner":
    case "auction": {
      return restProvider(type, "admin/" + resource, params);
    }

    case "stock":

    case "stockOffline":
    case "stockPending":
    case "stockOnSale":
    case "stockAuctionFinished":
    case "stockAuctionFailed":
    case "stockPurchasedImmediately":
    case "stockSubmissionsOnlyFinished":
    case "stockSold":

    case "offertoprivate":

    case "offertoprivateOffline":
    case "offertoprivateOnSale":
    case "offertoprivatePending":
    case "offertoprivateAuctionFinished":
    case "offertoprivateAubmissionsOnlyFinished":
    case "offertoprivateAuctionFailed":
    case "offertoprivatePurchasedImmediately":
    case "offertoprivateSold": {
      return restProvider(type, "admin/" + "vehicle", params);
    }
    case "users": {
      return getUserData(type, resource, params);
    }
  }
};
