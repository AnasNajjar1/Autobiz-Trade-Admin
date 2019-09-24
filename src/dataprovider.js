import { getUserData } from "./users/dataproviderUsers";
import simpleRestProvider from "ra-data-simple-rest";
import { B2B_API } from "./config";

const restProvider = simpleRestProvider(B2B_API);

export default (type, resource, params) => {
  switch (resource) {
    case "vehicle": {
      return restProvider(type, resource, params);
    }
    case "users": {
      return getUserData(type, resource, params);
    }
  }
};

/* const getAuctionData = (type, resource, params) => {
  switch (type) {
    case GET_MANY:
      params.id = params.ids[0];
      return getAuction(params.id).then(res => {
        res.id = res.carId;
        return { data: [res] };
      });
    case GET_ONE: {
      return getAuction(params.id).then(res => {
        res.id = res.carId;
        return { data: res };
      });
    }
  }
}; */
