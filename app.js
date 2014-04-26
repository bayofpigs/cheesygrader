var fs = require('fs');
var express = require('express');
var multiparty = require('multiparty');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Add a favicon later
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index', {});
});

app.post('/upload', function(req, res, next) {
  var form = new multiparty.Form();
  var name;
  var code;
  var output;

  form.on('error', next);
  form.on('close', function() {
    res.send("Thanks for your response!");
  });

  form.on('field', function(name, val) {
    if (name !== 'myname') return;
    name = val; 
  });

  form.parse(req, function(err, fields, files) {
    console.log(fields);
    console.log(files);
  });

  /*
  form.on('file', function(name, val) {
    if (!part.filename) return;
    if (part.name != 'codeupload' && part.name != 'outputupload') return part.resume();
    if (part.name == 'codeupload') {
      var tmp_path = file.path;
      var target_path = './uploads/code/' + Date.getDay() + Date.getMonth() + Date.getFullYear() + '/' +
        Date.now() + file
    } else if (part.name == 'outputupload') {

    }

  });
  */
});

app.listen(8080);
