var verbose = true; // if (verbose) {console.log('');}
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
//// --------NEED TO ENTER ***: Database Name
var connectionString = 'postgress://localhost:5432/TreatDB';

app.use(bodyParser.urlencoded( {extended: false } ));
app.use(bodyParser.json());

var portDecision = process.env.PORT || 3000;
// spin up server
app.listen(portDecision, function(){
  if (verbose) {console.log('Server is listening on Heroku or port 3000');}
});

// base url hit
app.get('/', function(req,res){
  if (verbose) {console.log('base url hit');}
  res.sendFile(path.resolve('public/views/index.html'));
});

// setup 'public' as a static resource
app.use(express.static('public'));
