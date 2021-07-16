import { B2B_API } from "./config";
import auth from "./providers/Auth";

const config = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "eu-west-1:e8cbcb21-aa17-41e1-bdfc-58c09cb55566",

    // REQUIRED - Amazon Cognito Region
    region: "eu-west-1",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: "eu-west-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "eu-west-1_YYMUabLh6",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "6eaakrfqbdouvvshcku3bl3feq",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //     domain: '.yourdomain.com',
    // // OPTIONAL - Cookie path
    //     path: '/',
    // // OPTIONAL - Cookie expiration in days
    //     expires: 365,
    // // OPTIONAL - Cookie secure flag
    // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //     secure: true
    // },

    // OPTIONAL - customized storage object
    //storage: new MyStorage(),

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    //authenticationFlowType: 'USER_PASSWORD_AUTH'
  },
  API: {
    endpoints: [
      {
        name: "b2bPlateform",
        region: "eu-west-1",
        endpoint: B2B_API,
        custom_header: async () => {
          // Alternatively, with Cognito User Pools use this:
          return auth.token()
            ? {
                Authorization: `Bearer ${auth.token()}`,
              }
            : {};
        },
      },
    ],
  },
  Storage: {
    bucket: "b2b-upload", //REQUIRED -  Amazon S3 bucket
    region: "eu-west-1", //OPTIONAL -  Amazon service region
  },
};

export default config;
