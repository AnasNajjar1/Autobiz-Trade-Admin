import { Auth } from "aws-amplify";
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

const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });


export const getUserData = async (type, resource, params) => {
  console.log(type, resource, params)
  switch (type) {
    case GET_LIST: {
      const res = await getUsers()
        const users = res.Users.map(user=>{
          return user = formatUserData(user, "Attributes")
        })
        console.log(users)
        return { data: users, total: res.Users.length }
    }
    case GET_ONE: {
      let user = await getUser(params.id)
      console.log("user before",user)
      user = formatUserData(user)
      console.log("user after", user)
      return { data : user }
    }
    case UPDATE: {
      console.log("update user", params)
      const b2bRole = {  
        Name : "custom:b2bRole",
        Value : params.data["custom:b2bRole"]
      }
      const username = params.id

      await updateAttributes(username, b2bRole, params)
      let user = await getUser(username)
      user = formatUserData(user)
      console.log("user retrived", user)
      return { data : user }

      //return update(params.id, )
    }
  }
};


var params = {
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

export async function getUsers() {
    AWS.config.credentials = await Auth.currentUserCredentials();
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    const data = await cognitoidentityserviceprovider.listUsers(params).promise();
    console.log("data", data);
    return data;
  }
  
  export async function updateAttributes(username, attr) {
    AWS.config.credentials = await Auth.currentUserCredentials();
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});
    params.Username = username
    params.UserAttributes = [attr]
    console.log(params)
    const data = await cognitoidentityserviceprovider.adminUpdateUserAttributes(params).promise();
    console.log("data", data);
    return data;
  }

  function formatUserData(userInput, attr = "UserAttributes"){
    const userOutput = {}
    userOutput.id = userInput.Username
    userInput[attr].forEach(({Name, Value})=>{
      userOutput[Name] = Value
      })
    return userOutput
  }