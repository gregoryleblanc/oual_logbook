/*
//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 9999;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

*/

//Load MySQL module

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'no',
  password : 'nope',
  database : 'logbook'
});

// connect to database, check for errors
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

// SQL statement to select logbook entries
var query = connection.query('SELECT name, message, when_posted, ipaddr, private from logbook ORDER BY when_posted ASC LIMIT 1');

query
  .on('error', function(err) {
    // Handle error, an 'end' event will be emitted after this as well
    console.log(err);
  })
  .on('fields', function(fields) {
    // the field packets for the rows to follow
    // console.log(fields);
  })
  .on('result', function(row) {
    var data = {
      source: 'old_database',
      description: row.message,
      createdDate: row.when_posted,
      owner: row.name
    }
    console.log(data);
  })
  .on('end', function() {
    // all rows have been received
  });
