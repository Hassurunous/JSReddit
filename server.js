//Required initializers
var express = require('express');
var app = express();
var methodOverride = require('method-override')
var exphbs  = require('express-handlebars');
var http = require('http');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Functions
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
mongoose.connect('mongodb://localhost/reddit-clone');
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// Models
// Posts
// var posts = [
//   { title: "First Post", content: "I made the very first post!" },
//   { title: "Next Post", content: "And I made the second!" }
// ]
var Post = mongoose.model('Post', {
  title: String,
  content: String,
  score: Number,
});

var Comment = mongoose.model('Comment', {
  content: String
});

// Routes
// Posts
// INDEX Post
app.get('/', function (req, res) {
  Post.find(function(err, posts) {
    res.render('posts-index', {posts: posts});
  })
})

// NEW Post
app.get('/posts/new', function (req, res) {
  res.render('posts-new', {});
})

// CREATE Post
app.post('/posts', function (req, res) {
  Post.create(req.body, function(err, post) {
    console.log(post);

    res.redirect('/posts/' + post._id);
  })
})

// SHOW Post
app.get('/posts/:id', function (req, res) {
  Post.findById(req.params.id).exec(function (err, post) {
    res.render('posts-show', {post: post});
  })
});

// EDIT Post
app.get('/posts/:id/edit', function (req, res) {
  Post.findById(req.params.id, function(err, post) {
    res.render('posts-edit', {post: post});
  })
});

// UPDATE Post
app.put('/posts/:id', function (req, res) {
  Post.findByIdAndUpdate(req.params.id,  req.body, function(err, post) {
    res.redirect('/posts/' + post._id);
  })
});
