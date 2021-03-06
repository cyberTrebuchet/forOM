// v0.1

//dependencies
var express = require("express");
var app     = express();
var fs      = require("fs");
var ejs     = require("ejs");
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

app.get("/popular", function(req, res) {
  db.all("SELECT * FROM blinks WHERE parent_id=0 ORDER BY nods DESC", function(err, rows){
    if (err) {console.log(err)} else {
      var html = fs.readFileSync("views/index.html", "utf8");
      var rendered = ejs.render(html, {blinks: rows});
      res.send(rendered);
    }
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
        title     : "Here's a sample reply, short and sweet. Any thoughts?",
        author    : "Thompson!",
        winks     : 0
      });
      var rendered = ejs.render(html, {blinks: rows});
    }
    res.send(rendered);
  });
});

app.get("/popular/:parent_id", function(req, res) {
  db.all("SELECT * FROM blinks WHERE parent_id=? ORDER BY nods DESC", req.params.parent_id, function(err, rows){
    if (err) {console.log(err)} else {
      var html = fs.readFileSync("views/index.html", "utf8");
      var rendered = ejs.render(html, {blinks: rows});
      res.send(rendered);
    }
  });
});

app.get("/back/:parent_id", function(req, res) {
  db.get("SELECT * FROM blinks WHERE id=?", req.params.parent_id, function(err, row) {
    if (err) {console.log(err)} else if (row.parent_id) {
      res.redirect("/blinks/" + row.parent_id)
    } else {
      res.redirect("/");
    }
  });
});

app.get("/blinks/:id/:nods/:parent_id", function(req, res) {
  var id = req.params.id;
  db.run("UPDATE blinks SET nods=? WHERE id=?", parseInt(req.params.nods) + 1, id, function(err){
    if (err) {console.log(err)} else if (parseInt(req.params.parent_id)) {
      res.redirect("/blinks/" + req.params.parent_id);
    } else {
      res.redirect("/");
    }
  });
});

app.post("/blinks/:parent_id/winks", function(req, res) {
  var parent_id = req.params.parent_id;
  db.run("INSERT INTO blinks (parent_id, nods, title, author, winks) VALUES (?,?,?,?,?)", parent_id, 0, req.body.title, req.body.author, 0, function(err){
    if (err) {console.log(err)}
  }).get("SELECT * FROM blinks WHERE id=?", parent_id, function(err, row){
    if (err) {console.log(err)} else {
      console.log(row);
      db.run("UPDATE blinks SET winks=? WHERE id=?", row.winks + 1, row.id, function(err){
        if (err) {console.log(err)} else {
          res.redirect("/blinks/" + parent_id);
        }
      });
    }
  })
});

app.get("/search", function(req, res) {

  console.log("Search term(s): ", req.query);

});
