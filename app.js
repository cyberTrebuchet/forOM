// v0.1

//dependencies
var express = require("express");
var app     = express();
var fs      = require("fs");
var ejs     = require("ejs");
var request = require("request");
var _       = require("underscore");
var sqlite3 = require("sqlite3").verbose();
var db      = new sqlite3.Database("data/forOM.db");

//publicize ./views for css and js
app.use(express.static('public'));

//middleware
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
app.use(urlencodedBodyParser);
// var methodOverride = require('method-override');
// app.use(methodOverride('_method'));

//config
app.listen(3000, function() {
  console.log("I'm listening on port 3000!");
});

//routes
app.get("/", function(req, res) {
  db.all("SELECT * FROM topics ORDER BY id DESC", function(err, rows){
    if (err) {console.log(err)} else {
      var html = fs.readFileSync("views/index.html", "utf8");
      var rendered = ejs.render(html, {topics: rows});
      res.send(rendered);
    }
  });
});

app.post("/topics", function(req, res) {
  db.run("INSERT INTO topics (approval, title, author, comments) VALUES (?,?,?,?)", 0, req.body.topic, req.body.author, 0, function(err){
    if (err) {console.log(err)} else {res.redirect("/")}
  });
});

app.get("/topics/:t_id", function(req, res) {
  console.log(req.params.t_id);
  db.all("SELECT * FROM comments INNER JOIN topics ON topics.topic_id = comments.parent_id WHERE parent_id=?", "t" + req.params.t_id, function(err, rows){
    if (err) {console.log(err)} else {
      console.log(rows);
      var html = fs.readFileSync("views/topic.html", "utf8");
      var rendered = ejs.render(html, {comments: rows});
      res.send(rendered);
    }
  });
});

// post top-level comments
app.post("/topics/:id/comments", function(req, res) {

});

// post nested comments
app.post("/topics/:t_id/comments/:c_id/comments", function(req, res) {

});

app.get("/search", function(req, res) {

  console.log("Search term(s): ", req.query);

});
