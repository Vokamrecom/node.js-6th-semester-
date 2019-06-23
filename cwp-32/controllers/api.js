const express = require("express");

module.exports = (commitsRepository, reposRepository) => {
  const router = express.Router();

  const commitsController = require("./commitsController")(commitsRepository);
  const reposController = require("./reposController")(reposRepository);
  router.use("/repos/commits", commitsController);
  router.use("/repos", reposController);

  return router;
};
