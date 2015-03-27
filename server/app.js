// Server application file

var express = require("express");
var http = require("http");
var path = require("path");

var app =  express();


var server = module.exports = require("http").createServer(app);

//Serve client files
app.use(express.static(path.join(__dirname, "../client/")));

//Setup routes
app.get("/api/400", badRequest);
app.get("/api/401", unauthorized);
app.get("/api/402", paymentRequired);
app.get("/api/403", forbidden);
app.get("/api/404", notFound);
app.get("/api/405", methodNotAllowed);


function badRequest(req, res) {
  res
    .status(400)
    .send();
}

function unauthorized(req, res) {
  res
    .status(401)
    .send();
}

function paymentRequired(req, res) {
  res
    .status(402)
    .send();
}

function forbidden(req, res) {
  res
    .status(403)
    .send();
}

function notFound(req, res) {
  res
    .status(404)
    .send();
}

function methodNotAllowed(req, res) {
  res
    .status(405)
    .send();
}
