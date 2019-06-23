const Commit = require("../models/Commit");
function CommitsRepository() {
  let items = [
    new Commit(1, 1, "I'm Anya", "kjhdkj"),
    new Commit(2, 2, "I'm Sasha", "difodo"),
    new Commit(3, 3, "I'm Liza", "kdjkfdk")
  ];

  function readAll() {
    return items;
  }

  function read(id) {
    return items.find(function(element) {
      if(element.id == id){
          return element;
      }
    });
  }

  function create(body) {
    let repoId = body.repoId;
    let message = body.message;
    let hash = body.hash;
    const toAdd = new Commit(items[items.length-1].id + 1, repoId, message, hash);
    items.push(toAdd);
    return toAdd;
  }
  function deleteR(id) {
    let index = items.findIndex(function(element) {
      return element.id == id;
    });
    if (index == -1) {
      return { error: "not found" };
    }
    let item = items[index];
    items.splice(index, 1);
    return item;
  }

  function update(id, body) {
    let repoId = body.repoId;
    let message = body.message;
    let hash = body.hash;
    let item = items.find(function(element) {
      return element.id == id;
    });

    item.repoId = repoId;
    item.message = message;
    item.hash = hash;
    return item;
  }

  return { read, readAll, create, deleteR, update };
}

module.exports = CommitsRepository;
