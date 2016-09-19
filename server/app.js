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
  console.log('query is:',req.query.q );
  pg.connect(connectionString, function(err, client, done){
    if (err){
      if (verbose) {console.log(err);}
    } else {
      if (verbose) {console.log('app.get/treats connected');}
      var resultsArray=[];
      var queryResults;
      var q = req.query.q;
      // Choose query based on search string
      if(q){
        // ILIKE works in postgreSQL for a case-insensitive search
        queryResults=client.query('SELECT * FROM treat WHERE '+
        '(name ILIKE \'%'+q+'%\') OR (description ILIKE \'%'+q+'%\');');
      } else {
        // There was no specific search query so grab it all!
        queryResults=client.query('SELECT * FROM treat ORDER BY name;');
      }

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


//post route to add information in Database
app.post( '/treats', function( req, res ){
  if (verbose) {console.log( 'treats post route hit', req.body );}
  var queryString = 'INSERT INTO treat (name, description, pic) VALUES (($1),($2),($3));';
  if (verbose) {console.log('sending to database:', queryString);}
  //send queryString to database
  pg.connect(connectionString, function(err, client, done){
    if (err){
      if (verbose) {console.log(err);}
    }
    else{
      client.query(queryString,[req.body.name, req.body.description, req.body.url]);
      done();
      return res.sendStatus(200);
    }
  });
});//end /treats post
