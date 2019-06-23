const Repo = require("../models/Repo");
function ReposRepository() {
    let items = [
        new Repo(1, "Hello", "Anya"),
        new Repo(2, "I love you", "Sasha"),
        new Repo(3, "I'm fine", "Liza")
    ];

    function readAll() {
        return items;
    }

    function read(id) {
        return items.find(function (element) {
            return element.id == id;
        });
    }

    function create(body) {
        let name = body.name;
        let author = body.author;
        const repo = new Repo(items[items.length-1].id + 1, name, author);
        items.push(repo);
        return repo;
    }

    function deleteR(id) {
        let index = items.findIndex(function (element) {
            return element.id == id;
        });
        if (index == -1) {
            return {error: "Not found"};
        }
        let repo = items[index];
        items.splice(index, 1);
        return repo;
    }

    function update(id, body) {
        let name = body.name;
        let author = body.author;
        let item = items.find(function (element) {
            return element.id == id;
        });

        item.name = name;
        item.author = author;
        return item;
    }

    return {read, readAll, create, deleteR, update};
}

module.exports = ReposRepository;
