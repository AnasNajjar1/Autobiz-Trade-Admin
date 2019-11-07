import { Auth } from "aws-amplify";
import { GET_LIST, GET_ONE, UPDATE } from "react-admin";

const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });

const UserPoolId = "eu-west-1_YYMUabLh6";

export const getUserData = async (type, resource, params) => {
  console.log(type, resource, params);
  switch (type) {
    default:
    case GET_LIST: {
      const res = await getUsers();
      const users = res.Users.map(user => {
        return (user = formatUserData(user, "Attributes"));
      });
      return { data: users, total: res.Users.length };
    }
    case GET_ONE: {
      let user = await getUser(params.id);
      user = formatUserData(user);
      return { data: user };
    }
    case UPDATE: {
      console.log("update user", params);
      const b2bRole = {
        Name: "custom:b2bRole",
        Value: params.data["custom:b2bRole"]
      };
      const username = params.id;

      await updateAttributes(username, b2bRole);
      let user = await getUser(username);
      user = formatUserData(user);
      console.log("user retrived", user);
      return { data: user };

      //return update(params.id, )
    }
  }
};

export async function getUser(username) {
  const params = { UserPoolId };
  params.Username = username;
  AWS.config.credentials = await Auth.currentUserCredentials();
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  const data = await cognitoidentityserviceprovider
    .adminGetUser(params)
    .promise();
  console.log("data", data);
  return data;
}

export async function getUsers() {
  const params = { UserPoolId };
  AWS.config.credentials = await Auth.currentUserCredentials();
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  const data = await cognitoidentityserviceprovider.listUsers(params).promise();
  console.log("data", data);
  return data;
}

export async function updateAttributes(username, attr) {
  AWS.config.credentials = await Auth.currentUserCredentials();
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: "2016-04-18"
  });
  const params = { UserPoolId };
  params.Username = username;
  params.UserAttributes = [attr];
  console.log(params);
  const data = await cognitoidentityserviceprovider
    .adminUpdateUserAttributes(params)
    .promise();
  console.log("data", data);
  return data;
}

function formatUserData(userInput, attr = "UserAttributes") {
  const userOutput = {};
  userOutput.id = userInput.Username;
  userInput[attr].forEach(({ Name, Value }) => {
    userOutput[Name] = Value;
  });
  return userOutput;
}
