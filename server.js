var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, function () {
  console.log("Sever live and listening on PORT " + PORT + "!");
});
