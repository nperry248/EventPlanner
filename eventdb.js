//
// eventdb.js
//
// Exports 
// eventdb: connection object to MySQL database in AWS RDS
//

const mysql = require('mysql');
const fs = require('fs');
const ini = require('ini');

const config = require('./config.js');

const events_config = ini.parse(fs.readFileSync(config.events_config, 'utf-8'));
const endpoint = events_config.rds.endpoint;
const port_number = events_config.rds.port_number;
const db_name = events_config.rds.db_name;
const user_name = events_config.rds.user_name;
const user_pass = events_config.rds.user_pass;

//
// creates connection object, but doesn't open connnection:
//
let eventdb = mysql.createConnection(
  {
    host: endpoint,
    port: port_number,
    database: db_name,
    user: user_name,
    password: user_pass,
    multipleStatements: true  // allow multiple queries in one call
  }
);


module.exports = eventdb;
