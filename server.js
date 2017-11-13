var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var http = require('http');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('home', {msg: 'Hello World!'});
});

app.get('/posts/new', function (req, res) {
  res.render('posts-new', {msg: 'Hello World!'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
