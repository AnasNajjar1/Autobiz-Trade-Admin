// in src/authProvider.js
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_GET_PERMISSIONS,
  AUTH_CHECK
} from "react-admin";
import { Auth } from "aws-amplify";
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
    await Auth.signIn({
      username, // Required, the username
      password // Optional, the password
    });
    return await checkPermission(true);
  }
  if (type === AUTH_CHECK) {
    return await Auth.currentSession();
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
  const role = _.get(user, "attributes.custom:b2bRole", "");
  //console.log("role", role)
  if (["admin", "supervisor"].includes(role)) return role;
  throw new Error("user not allowed");
}
