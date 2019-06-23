const Sequelize = require("sequelize");

const config = require("./config.json");
const db = require("./context/context.js")(Sequelize, config);

const server = require("./server")(db);

db.sequelize.sync().then(() => {
  server.listen(1488, () => console.log("Running"));
});
