const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const ReposRepository = require("./repositories/RepoRepository")();
const CommitsRepository = require("./repositories/CommitsRepository")();
const api = require("./controllers/api")(CommitsRepository, ReposRepository);
const abilitiesChecker = require("./repositories/abilitiesHelper");
const app = express();
app.get("/api/abilities", abilitiesChecker.rules);
app.use("/*", abilitiesChecker.checkAbilities);
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api", api);


const port = 3000;
app.listen(port, () => {
    console.log("Server started " + port);
});