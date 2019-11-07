// in src/authProvider.js
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_GET_PERMISSIONS,
  AUTH_CHECK
} from "react-admin";
import { Auth } from 'aws-amplify';
import { API } from 'aws-amplify';
import _ from "lodash";
export default async (type, params) => {
  if (type === AUTH_ERROR) {
    const status = params.status;
    if (status === 401 || status === 403) {
      return Promise.reject({ redirectTo: "/no-access" });
    }
    return Promise.resolve();
  }
  if (type === AUTH_LOGOUT) {
    return await Auth.signOut();
  }
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    await signInAutobiz(
      username, // Required, the username
      password // Optional, the password
    );
    return await checkPermission(true);
  }
  if (type === AUTH_CHECK) {
    return await Auth.currentAuthenticatedUser();
  }
  if (type === AUTH_GET_PERMISSIONS) {
    return checkPermission();
  }
  return Promise.reject("Unknown method");
};

async function checkPermission(bypassCache = false) {
  const user = await Auth.currentAuthenticatedUser({
    bypassCache: bypassCache
  });
  let role = _.get(user, "rules", "");
  //console.log("role", role)
  role = role.split(":")
  if (role.includes("adminCarcheck")){
    console.log("user is admin")
    return "admin";
  }
  throw new Error("user not allowed");
}


async function signInAutobiz(username, password) {
  console.log("try log")
  const authAutobiz = await API.post("b2bPlateform", "/auth", {
    body: { username, password }
  });

  // To derive necessary data from the provider
  const {
    token, // the token you get from the provider
    domain,
    expiresIn,
    user,
    identity_id
  } = authAutobiz;
  return Auth.federatedSignIn(
    domain,
    {
      token,
      identity_id, // Optional
      expires_at: expiresIn * 1000 + new Date().getTime() // the expiration timestamp
    },
    user
  )
    .then(cred => {
      // If success, you will get the AWS credentials
      return Auth.currentAuthenticatedUser();
    })
    .then(user => {
      // If success, the user object you passed in Auth.federatedSignIn
      Auth.currentUserCredentials().then(credentials => {
      });
      return user;
    })
    .catch(e => {
      console.log("error", e.message);
    });
}

async function refreshToken() {
  // refresh the token here and get the new token info
  // ......
  const authAutobiz = await API.post("b2bPlateform", "/auth/refresh");
  const {
    token, // the token you get from the provider
    expiresIn,
    identity_id
  } = authAutobiz;

  return {
      token, // the token from the provider
      expires_at: expiresIn * 1000 + new Date().getTime(), // the expiration timestamp
      identity_id, // optional, the identityId for the credentials
  }
}

Auth.configure({
  refreshHandlers: {
      'developer': refreshToken
  }
})