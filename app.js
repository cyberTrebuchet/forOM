// v0.1

//dependencies
var express = require("express");
var app     = express();
var fs      = require("fs");
var ejs     = require("ejs");
var request = require("request");
var _       = require("underscore");
var db      = require("sqlite3");

//damn css
app.use(express.static('views'));

//middleware
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
app.use(urlencodedBodyParser);
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

//config
app.listen(3000, function() {
  console.log("I'm listening on port 3000!");
});

//routes
app.get("/", function(req, res) {
  var html = fs.readFileSync("./views/index.html", "utf8");
  res.send(html);
});

app.post("/topics", function(req, res) {
  console.log(req.body);

  

  var html = fs.readFileSync("views/index.html");
  var render = ejs.render(html, {topics: topics});
  res.send(rendered);
});

app.get("/search", function(req, res) {

  console.log("Search term(s): ", req.query);

});
