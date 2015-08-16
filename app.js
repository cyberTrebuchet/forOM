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
  db.all("SELECT * FROM blinks WHERE parent_id=0 ORDER BY id DESC", function(err, rows){
    if (err) {console.log(err)} else {
      var html = fs.readFileSync("views/index.html", "utf8");
      var rendered = ejs.render(html, {blinks: rows});
      res.send(rendered);
    }
  });
});

app.post("/blinks", function(req, res) {
  db.run("INSERT INTO blinks (parent_id, nods, title, author, winks) VALUES (?,?,?,?,?)", 0, 0, req.body.title, req.body.author, 0, function(err){
    if (err) {console.log(err)} else {res.redirect("/")}
  });
});

app.get("/blinks/:id", function(req, res) {
  db.all("SELECT * FROM blinks WHERE parent_id=?", req.params.id, function(err, rows){
    var html = fs.readFileSync("views/blink.html", "utf8");
    if (err) {console.log(err)} else if (rows.length) {
      var rendered = ejs.render(html, {blinks: rows});
    } else { // placeholder post, not saved in db
      rows.push({
        id        : req.params.id,  
        parent_id : req.params.id, // for the form
        nods      : 0,
        title     : "Here's a sample wink, short and sweet. Any thoughts?",
        author    : "Thompson!",
        winks     : 0
      });
      var rendered = ejs.render(html, {blinks: rows});
    }
    res.send(rendered);
  });
});

app.post("/blinks/:parent_id/winks", function(req, res) {
  console.log(req);
  var path = "/blinks/" + req.params.parent_id;
  console.log(path);
  db.run("INSERT INTO blinks (parent_id, nods, title, author, winks) VALUES (?,?,?,?,?)", req.params.parent_id, 0, req.body.title, req.body.author, 0, function(err){
    if (err) {console.log(err)} else {res.redirect(path)}
  });
});

app.get("/search", function(req, res) {

  console.log("Search term(s): ", req.query);

});
