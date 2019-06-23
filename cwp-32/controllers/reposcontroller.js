const express = require("express");

function ReposController(ReposRepository) {
  async function create(req, res) {
    const result = ReposRepository.create(req.body);
    res.json({result: result});
  }

  async function readAll(req, res) {
    const result = ReposRepository.readAll();
    res.json({result: result});
  }

  async function read(req, res) {
    const result = ReposRepository.read(req.params.id);
    res.json({result: result});
  }

  async function update(req, res) {
    const result =   ReposRepository.update(req.params.id, req.body);
    res.json({result: result});
  }

  async function deleteF(req, res) {
    const result =  ReposRepository.deleteF(req.params.id);
    res.json({result: result});
  }
  const router = express.Router();
  router.get("/", readAll);
  router.get("/:id", read);
  router.post("/create", create);
  router.post("/:id/update", update);
  router.delete("/:id", deleteF);
  return router;
}

module.exports = ReposRepository => {
  const controller = new ReposController(ReposRepository);
  return controller;
};
