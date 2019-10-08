import { getUserData } from "./users/dataproviderUsers";
import simpleRestProvider from "ra-data-simple-rest";
import _ from "lodash";
import { API } from 'aws-amplify'

//this method to get the signed api call
const httpClientAWS = async (path, options) =>{
  let { method } = options
  options.response = true
  if(method===undefined) method = "get"
  const response = await API[method]("b2bPlateform", path, options)
  const json = response.data
  var myHeaders = new Headers();
  Object.entries(response.headers).forEach(([key, value])=>{
    myHeaders.append(key,value)
  })
  
  return { headers : myHeaders, json }
}


const restProvider = simpleRestProvider("", httpClientAWS)

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
