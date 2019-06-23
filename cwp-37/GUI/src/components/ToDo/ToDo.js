const React = require("React");
const ToDoModel = require("./ToDoModel");
const Nav = require("../Nav/Nav");
const ToDoSummary = require("./ToDoSummary");
const ToDoList = require("./ToDoList");
const ToDoForm = require("./ToDoForm");
const ToDoClear = require("./ToDoClear");
const NavModel = require("../Nav/NavModel");
const Immutable = require("immutable");

import { confirmAlert } from "react-confirm-alert";

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
const todoModel = new ToDoModel();
const navModel = new NavModel();
let idTaskToConfirmDelete = -1;
class ToDo extends React.PureComponent {
  constructor(props) {
    super(props);

    this._rerender = this._rerender.bind(this);
    this._toggleItem = this._toggleItem.bind(this);
    this._toogleAll = this._toogleAll.bind(this);
    this._removeItem = this._removeItem.bind(this);
    this._addItem = this._addItem.bind(this);
    this._updateItem = this._updateItem.bind(this);
    this._removeCompleted = this._removeCompleted.bind(this);
    this._navigate = this._navigate.bind(this);

    this.state = this._getState();
  }

  submit = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log("Click Yes");
            todoModel.removeItem(idTaskToConfirmDelete);
            this._rerender();
          }
        },
        {
          label: "No",
          onClick: () => {
            console.log("Click No");
          }
        }
      ]
    });
  };

  shouldComponentUpdate(nextProps) {
    return this.props == nextProps;
  }

  createNotification = type => {
    return () => {
      switch (type) {
        case "success":
          NotificationManager.success("Success!", "Adding task");
          break;
        case "error":
          NotificationManager.error(
            "Error!",
            "Click me to get more info!",
            5000,
            () => {
              alert("Your task was not added before my server is very drunk");
            }
          );
          break;
      }
    };
  };

  render() {
    return (
      <div id="bodyId">
        <div>
          <NotificationContainer />
        </div>
        <div className="todo">
          <div className="todo__title">React ToDo</div>
          <Nav
            links={this.state.links}
            activeLink={this.state.activeLink}
            navigate={this._navigate}
          />
          <ToDoSummary
            remains={this.state.remains}
            completed={this.state.completed}
          />
          <ToDoList
            tasks={this.state.tasks}
            areAllComplete={this.state.areAllCompleted}
            toggleItem={this._toggleItem}
            toggleAll={this._toogleAll}
            removeItem={this._removeItem}
            updateItem={this._updateItem}
          />
          <ToDoForm addItem={this._addItem} />
        </div>
      </div>
    );
  }

  _getState() {
    const state = {
      remains: todoModel.getActiveCount(),
      completed: todoModel.getCompletedCount(),

      links: navModel.getLinks(),
      activeLink: navModel.getActive()
    };

    state.areAllCompleted = state.remains === 0;

    if (state.activeLink.title === "All") {
      state.tasks = todoModel.getItems();
    } else if (state.activeLink.title === "Completed") {
      state.tasks = todoModel.getCompletedItems();
    } else {
      state.tasks = todoModel.getActiveItems();
    }

    return state;
  }

  _rerender() {
    todoModel.updateItems();
    this.setState(this._getState());
  }

  _toggleItem(id) {
    todoModel.toggleItem(id);
    this._rerender();
  }

  _toogleAll() {
    todoModel.switchAllTo(!this.state.areAllCompleted);
    this._rerender();
  }

  _removeItem(id) {
    idTaskToConfirmDelete = id;
    this.submit();
  }

  _addItem(text) {
    const flag = todoModel.addItem(text);
    if (flag) {
      this.createNotification("success")();
    } else {
      this.createNotification("error")();
    }
    this._rerender();
  }

  _updateItem(id, text) {
    todoModel.updateItem(id, text);
    this._rerender();
  }

  _removeCompleted() {
    todoModel.removeCompleted();
    this._rerender();
  }

  _navigate(link) {
    navModel.setActive(link);
    this._rerender();
  }
}

/*if (getTasks().length == 0) {
  todoModel.addItem("Sleep");
  todoModel.addItem("Eat");
  todoModel.addItem("Code");
  todoModel.addItem("Repeat");
}*/

module.exports = ToDo;
