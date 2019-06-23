const functions = require("../../services/api");
const getTasks = functions.getTasks;
const addTask = functions.addTask;
const completeTask = functions.completeTask;
const deleteTask = functions.deleteTask;
const updateTask = functions.updateTask;

const Immutable = require("immutable");

class ToDoModel {
  constructor() {
    this.immutableList = [];
  }
  updateItems() {
    const tasks = getTasks();
    this.immutableList = Immutable.Map({value: tasks});
    console.log(this.immutableList);
    console.log(this.immutableList.get('value'));
  }

  getItems() {
    this.updateItems();
    console.log(this.immutableList.get("value"));
    return this.immutableList.get("value");
  }

  getImmutableList() {
    return this.immutableList;
  }

  getActiveItems() {
    return this.getItems().filter(x => !x.completed);
  }

  getCompletedItems() {
    return this.getItems().filter(x => x.completed);
  }

  getActiveCount() {
    return this.getActiveItems().length;
  }

  getCompletedCount() {
    return this.getCompletedItems().length;
  }

  addItem(text) {
    return addTask(text);
  }

  removeItem(id) {
    deleteTask(id);
    this.updateItems();
  }

  removeCompleted() {
    this.updateItems();
  }

  updateItem(id, text) {
    updateTask(id, text, completed);
    this.updateItems();
  }

  toggleItem(id) {
    completeTask(id);
    this.updateItems();
  }

  switchAllTo(completed) {
    this.immutableList.get("value").forEach(x => (x.completed = completed));
  }
}

module.exports = ToDoModel;
