import { Auth } from "aws-amplify";

const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });

var params = {
  Username: null,
  UserPoolId: "eu-west-1_YYMUabLh6" /* required */
  // AttributesToGet: [
  //   'STRING_VALUE',
  //   /* more items */
  // ],
  // Filter: 'STRING_VALUE',
  // Limit: 'NUMBER_VALUE',
  // PaginationToken: 'STRING_VALUE'
};
export async function getUser(username) {
  params.Username = username
  AWS.config.credentials = await Auth.currentUserCredentials();
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  const data = await cognitoidentityserviceprovider.adminGetUser(params).promise();
  console.log("data", data);
  return data;
}
