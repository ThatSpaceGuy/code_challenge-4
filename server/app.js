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

var portDecision = process.env.PORT || 8080;
// spin up server
app.listen(portDecision, function(){
  if (verbose) {console.log('Server is listening on port 8080');}
});

// base url hit
app.get('/', function(req,res){
  if (verbose) {console.log('base url hit');}
  res.sendFile(path.resolve('server/public/views/index.html'));
});

// setup 'public' as a static resource
app.use(express.static('server/public'));


// GET route with a Database call
app.get('/treats', function(req,res){
  pg.connect(connectionString, function(err, client, done){
    if (err){
      if (verbose) {console.log(err);}
    } else {
      if (verbose) {console.log('app.get/treats connected');}
      var resultsArray=[];
      var queryResults=client.query('SELECT * FROM treat ORDER BY name;');
      queryResults.on('row',function(row){
        resultsArray.push(row);
      });
      queryResults.on('end',function(){
        if (verbose) {console.log('resultsArray from getRoute query:',resultsArray);}
        done();
        return res.send(resultsArray);
      }); // end queryResults.on('end')
    }// end else
  }); // end pg.connect
}); // end app.get getRout


// post route to receive information from client
app.post('/routeName', function(req,res){
  if (verbose) {console.log('Route /routeName hit', req.body);}
  res.send('/routeName response. Received: '+req.body);
});

//post route to add information in Database
app.post( '/postRouteA', function( req, res ){
  if (verbose) {console.log( 'postRouteA route hit', req.body );}
  //// --------NEED TO ENTER ***: SQL Query
  var queryString = 'INSERT INTO <table> (<field1>, <field2>) VALUES (($1),($2));';
  if (verbose) {console.log('sending to database:', queryString);}
  //send queryString to database
  pg.connect(connectionString, function(err, client, done){
    if (err){
      if (verbose) {console.log(err);}
    }
    else{
      client.query(queryString,[variableToReplaceBling]);
      done();
      return res.sendStatus(200);
    }
  });
});//end /postRouteA

// post route that adds information in Database and also receives info
app.post( '/postRouteB', function( req, res ){
  if (verbose) {console.log( 'postRouteB route hit', req.body );}
  //// --------NEED TO ENTER ***: SQL Query
  var queryString = 'INSERT INTO <table> (<field1>, <field2>) VALUES (($1),($2));';
  if (verbose) {console.log('sending to database:', queryString);}
  //send queryString to database
  pg.connect(connectionString, function(err, client, done){
    if (err){
      if (verbose) {console.log(err);}
    }
    else{
      client.query(queryString,[variableToReplaceBling]);
      //// --------NEED TO ENTER ***: SQL Query
      var queryResult = client.query('***');
      var resultsArray = [];
      queryResult.on('row', function(row){
        resultsArray.push(row);
      });
      queryResult.on('end', function(){
        if (verbose) {console.log(resultsArray);}
        done();
        return res.json(resultsArray);
      });
    }
  });
});//end /postRouteB

//post route to update information in Database
app.put( '/putRouteA', function( req, res ){
  if (verbose) {console.log( 'putRouteA route hit', req.body );}
  //// --------NEED TO ENTER ***: SQL Query
  var queryString = 'UPDATE <table> SET <field> = '+variable+' WHERE <field> = ($1);';
  if (verbose) {console.log('sending to database:', queryString);}
  //send queryString to database
  pg.connect(connectionString, function(err, client, done){
    if (err){
      if (verbose) {console.log(err);}
    }
    else{
      client.query(queryString,[variableToReplaceBling]);
      done();
      return res.sendStatus(200);
    }
  });
});//end /putRouteA

// put route that updates information in Database and also receives info
app.put( '/putRouteB', function( req, res ){
  if (verbose) {console.log( 'putRouteB route hit', req.body );}
  //// --------NEED TO ENTER ***: SQL Query
  var queryString = 'UPDATE <table> SET <field> = '+variable+' WHERE <field> = ($1);';
  if (verbose) {console.log('sending to database:', queryString);}
  //send queryString to database
  pg.connect(connectionString, function(err, client, done){
    if (err){
      if (verbose) {console.log(err);}
    }
    else{
      client.query(queryString,[variableToReplaceBling]);
      //// --------NEED TO ENTER ***: SQL Query
      var queryResult = client.query('***');
      var resultsArray = [];
      queryResult.on('row', function(row){
        resultsArray.push(row);
      });
      queryResult.on('end', function(){
        if (verbose) {console.log(resultsArray);}
        done();
        return res.json(resultsArray);
      });
    }
  });
});//end /putRouteB
