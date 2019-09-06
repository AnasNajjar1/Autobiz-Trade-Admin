import axios from "axios"
import { B2B_API } from '../config'
import _ from "lodash";

export const getVehicle = async (id) => {
    const result = await axios.get(
    `${B2B_API}/record?id=${id}`
  );
  console.log(result.data)
    return result.data
}


export const getVehicles = async (query = {}) => {
  let apiQuery = {
    ProjectionExpression:
      "id, content.fileNumber, content.vehicle.brandLabel, content.vehicle.modelLabel, content.vehicle.versionLabel, content.vehicle.firstRegistrationDate, content.vehicle.fuelLabel, content.vehicle.mileage, content.vehicle.profileCosts, content.vehicle.carPictures.front_picture, content.pointOfSale.city, content.pointOfSale.zipCode, content.salesInfo.#TYPE"
  };
  const ExpressionAttributeNames = { "#TYPE": "type" };
  let ExpressionAttributeValues = {};
  let arrayFilterExpression = [];

  if (query.brandLabel) {
    ExpressionAttributeValues[":brandLabel"] = query.brandLabel;
    arrayFilterExpression.push("content.vehicle.brandLabel = :brandLabel");
  }

  if (query.modelLabel) {
    ExpressionAttributeValues[":modelLabel"] = query.modelLabel;
    arrayFilterExpression.push("content.vehicle.modelLabel = :modelLabel");
  }

  if (query.kmMin) {
    ExpressionAttributeValues[":mileageMin"] = query.kmMin;
    arrayFilterExpression.push("content.vehicle.mileage >= :mileageMin");
  }

  if (query.kmMax) {
    ExpressionAttributeValues[":mileageMax"] = query.kmMax;
    arrayFilterExpression.push("content.vehicle.mileage <= :mileageMax");
  }

  if (query.yearMecMin) {
    const dateMin = new Date(Date.UTC(query.yearMecMin, 0, 1));
    ExpressionAttributeValues[":yearMecMin"] = dateMin.toISOString();
    arrayFilterExpression.push(
      "content.vehicle.firstRegistrationDate >= :yearMecMin"
    );
  }

  if (query.yearMecMax) {
    const dateMax = new Date(Date.UTC(query.yearMecMax, 11, 31, 23, 59, 59));
    ExpressionAttributeValues[":yearMecMax"] = dateMax.toISOString();
    arrayFilterExpression.push(
      "content.vehicle.firstRegistrationDate <= :yearMecMax"
    );
  }

  if (query.pointOfSales && !query.pointOfSales.includes("all")) {
    let citiesKeys = [];
    query.pointOfSales.forEach(function(pointOfSale, key) {
      ExpressionAttributeValues[`:city_${key}`] = pointOfSale;
      citiesKeys.push(`:city_${key}`);
    });

    arrayFilterExpression.push(
      `content.pointOfSale.city IN(${citiesKeys.join(",")})`
    );
  }

  if (query.offersTypes && !query.offersTypes.includes("all")) {
    let offersTypeKeys = [];
    query.offersTypes.forEach(function(type, key) {
      ExpressionAttributeValues[`:offersType_${key}`] = type;
      offersTypeKeys.push(`:offersType_${key}`);
    });

    arrayFilterExpression.push(
      `content.salesInfo.#TYPE IN(${offersTypeKeys.join(",")})`
    );
  }

  if (arrayFilterExpression.length > 0) {
    apiQuery.FilterExpression = arrayFilterExpression.join(" and ");
  }
  apiQuery.ExpressionAttributeNames = ExpressionAttributeNames;
  if (!_.isEmpty(ExpressionAttributeValues)) {
    apiQuery.ExpressionAttributeValues = ExpressionAttributeValues;
  }

  const result = await axios.post(
    `${B2B_API}/records`, //?sortBy=${form.sortBy}
    JSON.stringify(apiQuery)
  );
  // setRecordsCount(result.data.Count);
  // setRecords(result.data.Items);
  return result.data;
};

export const getAuction = async (id) => {
  const result = await axios.get(
  `${B2B_API}/auction?id=${id}`
);
console.log(result.data)
return result.data
}

export const updateVehicle = async (id, data) => {
  console.log("PUT", `${B2B_API}/record?id=${id}`, data);
  const result = await axios.put(`${B2B_API}/record?id=${id}`, data);
  console.log("result push", result.data);
  return result.data;
};
