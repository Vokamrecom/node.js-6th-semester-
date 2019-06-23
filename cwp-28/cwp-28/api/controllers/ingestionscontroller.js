var helper = require("../../services/helper");
var service = require("../../services/db").ingestionsService;
 function getAll(req, res) {
     (async function(){
        helper.fixCORS(res);
        const elements = await service.readAll();
        const ress = JSON.stringify(elements);
        res.json({ result: ress });
     })();
}
function get(req, res) {
    (async function(){
        helper.fixCORS(res);
        const id = parseInt(req.swagger.params.id.value)
        const element = await service.read(id);
        const ress = JSON.stringify(element);
        res.json({ result: ress });
     })();
}
function create(req, res) {
    const body = req.swagger.params.body.value;
    (async function(){
        helper.fixCORS(res);
        const element = await service.create(body);
        const ress = JSON.stringify(element);
        res.json({ result: ress });
     })();
}
function deleteF(req, res) {
    let id = req.swagger.params.id.value;
    (async function() {
        helper.fixCORS(res);
        const element = await service.deleteF(id);
        const ress = JSON.stringify(element);
        res.json({ result: ress });
     })();
}
function update(req, res) {
    const body = req.swagger.params.body.value;
    const id = parseInt(req.swagger.params.id.value);
    (async function(){
        helper.fixCORS(res);
        const element = await service.update(id, body);
        const ress = JSON.stringify(element);
        res.json({ result: ress });
     })();
}
module.exports = {
    getAll: getAll,
    get: get,
    create: create,
    deleteF: deleteF,
    update: update
};
