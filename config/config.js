require('dotenv').config();

const envs = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DB,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DB,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
module.exports = envs;
