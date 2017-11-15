"use strict";
module.exports = function(app) {
  var location = require("./controller");

  // todoList Routes
  app.route("/locations").get(location.getLocations);
};
