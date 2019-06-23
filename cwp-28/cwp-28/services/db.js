const Sequelize = require("sequelize");
const config = require("../config.json");
const db = require("../Context/db")(Sequelize, config);
const AgentsService = require("./agentsservice");
const FoodsService = require("./foodsservice");
const IngestionsService = require("./ingestionsservice");
const PersonsService = require("./personsservice");
const agentsService = new AgentsService(db.Agents);
const foodsService = new FoodsService(db.Foods);
const ingestionsService = new IngestionsService(db.Ingestions);
const personsService = new PersonsService(db.Persons);
module.exports = {
  db,
  agentsService,
  foodsService,
  ingestionsService,
  personsService
};
