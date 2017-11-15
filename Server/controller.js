"use strict";

exports.getLocations = function(req, res) {
  var locations;
  try {
    locations = require("./locations.json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.send(JSON.stringify(locations));
  } catch (e) {
    res.status(404).send("Not found");
  }
};
