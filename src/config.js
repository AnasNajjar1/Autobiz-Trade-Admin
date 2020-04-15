const ENV = process.env.REACT_APP_ENV;

const apisB2bPlateform = {
  dev: "http://localhost:4000",
  staging: "https://stg72-api-trade.shakazoola.com",
  prod: "https://api-trade.autobiz.com"
};
exports.B2B_API = apisB2bPlateform[ENV];

const autobizTradeUlrs = {
  dev: "https://stg72-trade.shakazoola.com",
  staging: "https://stg72-trade.shakazoola.com",
  prod: "https://trade.autobiz.com"
};
exports.TRADE_URL = autobizTradeUlrs[ENV];
