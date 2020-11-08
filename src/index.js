const pug = require("pug");
const express = require("express");

var mongo = require("mongodb");
var assert = require("assert");
var path = require("path");

const app = express();
const port = 8000;

var url = ("mongodb://localhost:" + port);

app.use("/src",express.static("src"));
app.use("/views", express.static("views"));

app.set("view engine", "pug");

app.get("/", (req, res) => {
  console.log(url);
  res.render("index")
});

app.get("/qwe", (req, res) => {
  res.send("qweqweqwee");
});

app.listen(port, () => console.log("Listening on port: " + port));
