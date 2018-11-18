var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./router.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


routes(app);

var server = app.listen(6050, function () {
    console.log("app running on port.", server.address().port);
});
