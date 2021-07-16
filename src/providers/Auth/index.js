import AutobizAuth from "autobiz-auth";
import AuthClass from "./Auth";
import { B2B_API, domain } from "../../config";

const isDevLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const authInstance = new AutobizAuth(
  B2B_API,
  isDevLocalhost ? "localhost" : domain
);
const auth = new AuthClass(authInstance);
export default auth;
