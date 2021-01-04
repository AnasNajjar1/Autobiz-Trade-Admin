const ENV = process.env.REACT_APP_ENV;

const apisB2bPlateform = {
  dev: "http://localhost:4000",
  staging: "https://e0ufgxwv4c.execute-api.eu-west-1.amazonaws.com/staging/",
  prod: "https://api-trade.autobiz.com",
};
exports.B2B_API = apisB2bPlateform[ENV];

const autobizTradeUlrs = {
  dev: "http://localhost:3000",
  staging: "https://stg72-trade.shakazoola.com",
  prod: "https://trade.autobiz.com",
};
exports.TRADE_URL = autobizTradeUlrs[ENV];

const translationBucket = {
  dev: "https://translations-host-dev.s3-eu-west-1.amazonaws.com/trade-admin",
  staging:
    "https://translations-host-dev.s3-eu-west-1.amazonaws.com/trade-admin",
  prod: "https://translations-host-prod.s3-eu-west-1.amazonaws.com/trade-admin",
};

exports.TRANSLATION_BUCKET = translationBucket[ENV];

exports.LANGUAGES = ["fr", "en", "es", "de", "it", "pt"];
