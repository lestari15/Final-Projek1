var pg = require('pg')
var PGUSER = 'postgres'
var PGDATABASE = 'fp1'
var password = 'postgres'
var config = {
  user: PGUSER, // name of the user account
  database: PGDATABASE,
  password: password, // name of the dabase
  host: 'localhost',
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 
}

var pool = new pg.Pool(config);

module.exports = pool;