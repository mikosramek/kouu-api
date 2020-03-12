const mysql = require('mysql');

const sqlConnectionSettings = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_ADMIN_USER,
  password: process.env.DB_ADMIN_PASS
}

const Database = function(config, callback) {
  Database.connection = mysql.createConnection(sqlConnectionSettings);
  callback();
}
Database.getSingle = (query) => {
  return new Promise((res, rej) => {
    connection = mysql.createConnection(sqlConnectionSettings);
    connection.connect((err) => {
      if(err) rej(err);
      connection.query(query, (err, data) => {
        if(err) rej(err);
        if(data && data.length === 1){
          res(data[0]);
        }else{
          rej('No exact match found.');
        }
        connection.end();
      });
    })
  })
}
Database.generalQuery = (query) => {
  return new Promise((res, rej) => {
    connection = mysql.createConnection(sqlConnectionSettings);
    connection.connect((err) => {
      if(err) rej(err);
      connection.query(query, (err, data) => {
        if(err) rej(err);
        if(data){
          res(data);
        }else{
          rej('Query found no results.');
        }
        connection.end();
      });
    })
  })
}
Database.insert = (query) => {
  return new Promise((res, rej) => {
    connection = mysql.createConnection(sqlConnectionSettings);
    connection.connect((err) => {
      if(err) rej(err);
      connection.query(query, (err, response) => {
        if(err){
          rej(err);
        } else {
          res(response);
        }
        connection.end();
      })
    })
  })
}

module.exports = Database;