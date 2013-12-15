var express = require('express');
var app = express();

var testDoc = require('./example');


app.get('/', function(req, res){res.redirect('/index.html')});
app.use(express.static(__dirname + '/public'));

app.get('/doc', function(req, res){
  res.json( testDoc.jsonform({setDefaults: true}) );
});

app.listen(3000);