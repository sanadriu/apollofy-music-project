require("dotenv").config();

const {
  NODE_ENV = "development",
  MONGO_DB_URL_PRODUCTION,
  MONGO_DB_URL_DEVELOPMENT,
  MONGO_DB_URL_TEST,
  CLIENT_URL,
  DEPLOY_URL,
  PORT = 4000,
  SECRET,
} = process.env;

const baseConfig = {
  app: {
    port: PORT || 4000,
  },
  client: {
    url: CLIENT_URL || "http://localhost:3000",
  },
  deploy: {
    url: DEPLOY_URL,
  },
  encryption: {
    secret: SECRET,
  },
};

const config = {
  development: {
    ...baseConfig,
    db: {
      url: MONGO_DB_URL_DEVELOPMENT,
    },
  },
  test: {
    ...baseConfig,
    db: {
      url: MONGO_DB_URL_TEST,
    },
  },
  production: {
    ...baseConfig,
    db: {
      url: MONGO_DB_URL_PRODUCTION,
    },
  },
};

module.exports = {
  config: config[NODE_ENV],
  mode: NODE_ENV,
};
