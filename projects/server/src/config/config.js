const { join } = require("path");
require('dotenv').config({ path: join(__dirname, '../.env') });
const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env
const mysql2 = require('mysql2');

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "dialect": "mysql",
    "dialectModule" : mysql2 
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "dialect": "mysql",
    "dialectModule" : mysql2 
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "dialect": "mysql",
    "dialectModule" : mysql2 
  }
}