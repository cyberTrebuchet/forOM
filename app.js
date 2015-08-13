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

console.log(db);

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
  console.log("/ route triggered");
  db.all("SELECT * FROM topics", function(err, rows){
    if (err) {console.log(err)} else {
      var topics = rows;
      console.log(topics);
      var html = fs.readFileSync("views/index.html", "utf8");
      var rendered = ejs.render(html, {topics: topics});
      res.send(rendered);
    }
  });
});

app.post("/topics", function(req, res) {
  console.log("/topics route triggered");
  console.log(req.body);
  db.run("INSERT INTO topics (approval, title, author, comments) VALUES (?,?,?,?)", 0, req.body.topic, req.body.author, 0, function(err){
    if (err) {console.log(err)} else {res.redirect("/")}
  });
});

app.get("/search", function(req, res) {

  console.log("Search term(s): ", req.query);

});
