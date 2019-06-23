const express = require("express");

function TasksController(TasksService) {
  async function create(req, res) {
    var random_boolean = Math.random() >= 0.5;
    console.log(random_boolean)
    if (random_boolean) {
      await TasksService.create(req.body);
    }
    const result = random_boolean;
    res.json({ result: result });
  }

  async function readAll(req, res) {
    const result = await TasksService.readAll();
    res.json({ result: result });
  }

  async function read(req, res) {
    const result = await TasksService.read(req.params.id);
    res.json({ result: result });
  }

  async function update(req, res) {
    const result = await TasksService.update(req.params.id, req.body);
    res.json({ result: result });
  }

  async function deleteF(req, res) {
    const result = await TasksService.deleteF(req.params.id);
    res.json({ result: result });
  }

  async function complete(req, res) {
    const result = await TasksService.complete(req.params.id, req.body);
    res.json({ result: result });
  }

  const router = express.Router();
  router.get("/", readAll);
  router.get("/:id", read);
  router.post("/create", create);
  router.post("/:id/update", update);
  router.delete("/:id", deleteF);
  router.post("/:id/complete", complete);
  return router;
}

module.exports = TasksService => {
  const controller = new TasksController(TasksService);
  return controller;
};
