const express = require("express");

function CommitsController(CommitsRepository) {
  async function create(req, res) {
    const result = CommitsRepository.create(req.body);
    res.json({ result: result });
  }

  async function readAll(req, res) {
    const result = CommitsRepository.readAll();
    res.json({ result: result });
  }

  async function read(req, res) {
    const result = CommitsRepository.read(req.params.id);
    res.json({ result: result });
  }

  async function update(req, res) {
    const result = CommitsRepository.update(req.params.id, req.body);
    res.json({ result: result });
  }

  async function deleteF(req, res) {
    const result = CommitsRepository.deleteF(req.params.id);
    res.json({ result: result });
  }
  const router = express.Router();
  router.get("/", readAll);
  router.get("/:id", read);
  router.post("/create", create);
  router.post("/:id/update", update);
  router.delete("/:id", deleteF);
  return router;
}

module.exports = CommitsRepository => {
  const controller = new CommitsController(CommitsRepository);
  return controller;
};
