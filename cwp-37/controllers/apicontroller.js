const express = require("express");

module.exports = tasksService => {
  const router = express.Router();

  const tasks = require("./taskscontroller")(tasksService);
  router.use("/tasks", tasks);

  return router;
};
