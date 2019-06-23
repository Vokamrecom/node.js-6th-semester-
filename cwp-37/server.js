const express = require("express");
const bodyParser = require("body-parser");

module.exports = db => {
  const tasksService = require("./services/TasksService")(db.Tasks);
  const api = require("./controllers/apicontroller")(tasksService);
  const app = express();
  app.use(express.static("public"));
  app.use(bodyParser.json());
  app.use("/api", api);
  return app;
};
