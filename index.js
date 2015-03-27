//Main application file

"use strict";

var server = require("./server/app");

server.listen("8888", function() {
  console.log("Server is listening on port 8888");
});
