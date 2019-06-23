var util = require('util');
module.exports = {  hello: hello};
var helper = require('../../services/helper');
function hello(req, res) {
  var name = req.swagger.params.name.value || 'stranger';
  var hello = util.format('Hello, %s!', name);
  console.log(hello);
  helper.fixCORS(res);
  res.json(hello);
}