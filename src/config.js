const ENV = process.env.REACT_APP_ENV;

const apisB2bPlateform = {
  dev: "http://localhost:4000",
  staging: "https://sskra8rrdj.execute-api.eu-west-1.amazonaws.com/dev"
};
exports.B2B_API = apisB2bPlateform[ENV];