const ENV = process.env.REACT_APP_ENV;

const apisB2bPlateform = {
  dev: "http://localhost:4000",
  staging: "https://eob0vo3eq3.execute-api.eu-west-1.amazonaws.com/dev",
  prod : "https://ttqmvnrudk.execute-api.eu-west-1.amazonaws.com/prod"
};
exports.B2B_API = apisB2bPlateform[ENV];

const autobizTradeUlrs = {
  dev: "https://stg72-trade.shakazoola.com",
  staging: "https://stg72-trade.shakazoola.com",
  prod : "https://trade.autobiz.com"
};
exports.TRADE_URL = autobizTradeUlrs[ENV];