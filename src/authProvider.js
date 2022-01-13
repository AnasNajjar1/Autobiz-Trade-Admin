import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK,
  AUTH_GET_PERMISSIONS,
} from "react-admin";
import auth from "./providers/Auth";
import clearAuthData from "./providers/Auth/clearAuthData";
import _ from "lodash";
import { TRANSLATION_BUCKET, LANGUAGES } from "./config";
import frenchMessages from "ra-language-french";
import englishMessages from "ra-language-english";
import germanMessages from "ra-language-german";
import italianMessages from "ra-language-italian";
import spanishMessages from "ra-language-spanish";
import portugueseMessages from "ra-language-portuguese";

export default async (type, params) => {
  try {
    if (type === AUTH_ERROR) {
      const status = params.status;
      if (status === 401 || status === 403) {
        await clearAuthData();
        return Promise.reject();
      }
      return Promise.resolve();
    }

    if (type === AUTH_LOGIN) {
      //storeTranslations();
      const { username, password, recaptchaRef } = params;
      let recaptchaToken;
      if (recaptchaRef?.current)
        recaptchaToken = await recaptchaRef.current.executeAsync();
      await auth
        .login(username, password, recaptchaToken)
        .catch(() => Promise.reject());
      return Promise.resolve();
    }

    if (type === AUTH_LOGOUT) {
      await auth
        .logout()
        .then(async () => await clearAuthData())
        .catch(() => Promise.reject());
      return Promise.resolve();
    }

    if (type === AUTH_CHECK) {
      return auth.token() ? Promise.resolve() : Promise.reject();
    }

    if (type === AUTH_GET_PERMISSIONS) {
      const role = auth.isAdmin();
      return role
        ? Promise.resolve("admin")
        : Promise.reject("user not allowed");
    }

    return Promise.reject("Unknown method");
  } catch (e) {
    console.log(e ? e : "error");
  }
};

async function storeTranslations() {
  let raMessages;
  for (const lang of LANGUAGES) {
    switch (lang) {
      case "fr":
        raMessages = frenchMessages;
        break;
      case "de":
        raMessages = germanMessages;
        break;
      case "it":
        raMessages = italianMessages;
        break;
      case "es":
        raMessages = spanishMessages;
        break;
      case "pt":
        raMessages = portugueseMessages;
        break;
      default:
      case "en":
        raMessages = englishMessages;
        break;
    }

    await fetch(TRANSLATION_BUCKET + "/" + lang + "/locale.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const messages = { ...raMessages, ...data };
        localStorage.setItem("translation_" + lang, JSON.stringify(messages));
      });
  }
}
