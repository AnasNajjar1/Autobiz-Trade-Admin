// in src/dataProvider
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  fetchUtils
} from "react-admin";
import { stringify } from "query-string";
import { getVehicles } from "./market/dataproviderMarket";
import { getVehicle } from "./market/dataproviderMarket";
import { getAuction } from "./market/dataproviderMarket";
import { updateVehicle } from "./market/dataproviderMarket";
import { getUserData } from "./users/dataproviderUsers";

const API_URL = "my.api.url";

/**
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {
  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter)
      };
      return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case GET_ONE:
      return { url: `${API_URL}/${resource}/${params.id}` };
    // case GET_MANY: {
    //     const query = {
    //         filter: JSON.stringify({ id: params.ids }),
    //     };
    //     return { url: `${API_URL}/${resource}?${stringify(query)}` };
    // }
    // case GET_MANY_REFERENCE: {
    //     const { page, perPage } = params.pagination;
    //     const { field, order } = params.sort;
    //     const query = {
    //         sort: JSON.stringify([field, order]),
    //         range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
    //         filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
    //     };
    //     return { url: `${API_URL}/${resource}?${stringify(query)}` };
    // }
    // case UPDATE:
    //     return {
    //         url: `${API_URL}/${resource}/${params.id}`,
    //         options: { method: 'PUT', body: JSON.stringify(params.data) },
    //     };
    // case CREATE:
    //     return {
    //         url: `${API_URL}/${resource}`,
    //         options: { method: 'POST', body: JSON.stringify(params.data) },
    //     };
    // case DELETE:
    //     return {
    //         url: `${API_URL}/${resource}/${params.id}`,
    //         options: { method: 'DELETE' },
    //     };
    // default:
    //     throw new Error(`Unsupported fetch action type ${type}`);
    // }
  }
};
/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (
  response,
  type,
  resource,
  params
) => {
  const { headers, json } = response;
  switch (type) {
    case GET_LIST:
      return {
        data: json.map(x => x),
        total: parseInt(
          headers
            .get("content-range")
            .split("/")
            .pop(),
          10
        )
      };
    case CREATE:
      return { data: { ...params.data, id: json.id } };
    default:
      return { data: json };
  }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (type, resource, params) => {
  console.log("test", type, resource, params);

  switch (resource) {
    case "market": {
      return getMarketData(type, resource, params);
    }
    case "auctions": {
      return getAuctionData(type, resource, params);
    }
    case "users": {
      return getUserData(type, resource, params)
    }
  }

  const { fetchJson } = fetchUtils;
  const { url, options } = convertDataProviderRequestToHTTP(
    type,
    resource,
    params
  );

  return fetchJson(url, options).then(response =>
    convertHTTPResponseToDataProvider(response, type, resource, params)
  );
};

const getMarketData = (type, resource, params) => {
  switch (type) {
    case GET_LIST: {
      return getVehicles().then(res => ({ data: res.Items, total: res.Count }));
    }
    case GET_ONE: {
      return getVehicle(params.id).then(res => ({ data: res }));
    }
    case UPDATE: {
      return updateVehicle(params.id, params.data.content).then(res => {
        res.id = res.postData.Key.id;
        return { data: res };
      });
    }
  }
};

const getAuctionData = (type, resource, params) => {
  switch (type) {
    case GET_MANY:
      params.id = params.ids[0];
      return getAuction(params.id).then(res => {
        console.log("results auction", res);
        res.id = res.carId;
        return { data: [res] };
      });
    case GET_ONE: {
      return getAuction(params.id).then(res => {
        console.log("results auction", res);
        res.id = res.carId;
        return { data: res };
      });
    }
  }
};

