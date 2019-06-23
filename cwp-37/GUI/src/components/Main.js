require("normalize.css/normalize.css");
require("styles/App.css");
const React = require("React");
const ReactDOM = require("react-dom");

const ToDo = require("./ToDo/ToDo");

ReactDOM.render(<ToDo />, document.getElementById("app"));
export default ToDo;
