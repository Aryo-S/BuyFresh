const { join } = require("path");
require('dotenv').config({ path: join(__dirname, '../.env') });
const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = process.env
const mysql2 = require('mysql2');
const fs = require('fs');
const path = require('path');
const caPath = path.resolve(__dirname, 'ca.pem');
let caCert;

try {
  caCert = fs.readFileSync(caPath);
} catch (error) {
  process.exit(1);
}

const sslConfig = {
  ssl: {
    ca: caCert,
    rejectUnauthorized: false
  },
  connectTimeout: 60000
};

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": "mysql",
    "dialectModule" : mysql2,
    "dialectOptions": sslConfig
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": "mysql",
    "dialectModule" : mysql2,
    "dialectOptions": sslConfig
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": "mysql",
    "dialectModule" : mysql2,
    "dialectOptions": sslConfig 
  }
}