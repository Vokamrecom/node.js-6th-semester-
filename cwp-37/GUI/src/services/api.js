const baseAddress = "/api/tasks/";
function serverRequest(address, obj, type) {
  var xhr = new XMLHttpRequest();
  xhr.open(type || "GET", address, false);
  if (obj !== null) {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(obj));
  } else {
    xhr.send();
  }
  if (xhr.status != 200) {
    // console.log(xhr.status + ": " + xhr.statusText);
    return null;
  } else {
    // console.log(xhr.responseText);
    return JSON.parse(xhr.responseText).result;
  }
}

function getTasks() {
  const address = baseAddress + "";
  const obj = null;
  const type = "GET";
  const result = serverRequest(address, obj, type);
  return result;
}

function deleteTask(id) {
  const address = baseAddress + id;
  const obj = null;
  const type = "DELETE";
  const result = serverRequest(address, obj, type);
  return result;
}

function addTask(text) {
  const address = baseAddress + "create";
  const obj = { text: text, completed: false };
  const type = "POST";
  const result = serverRequest(address, obj, type);
  return result;
}

function updateTask(id, newText) {
  const address = baseAddress + id + "/update";
  const obj = { text: newText };
  const type = "POST";
  const result = serverRequest(address, obj, type);
  return result;
}

function completeTask(id) {
  const address = baseAddress + id + "/complete";
  const obj = { completed: true };
  const type = "POST";
  const result = serverRequest(address, obj, type);
  return result;
}

module.exports = {getTasks, deleteTask, addTask, updateTask, completeTask}