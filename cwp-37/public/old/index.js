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
    //alert(xhr.status + ": " + xhr.statusText); // пример вывода: 404: Not Found
    return null;
  } else {
    // вывести результат
    //alert(xhr.responseText); // responseText -- текст ответа.
    return JSON.parse(xhr.responseText).result;
  }
}

function getTasks() {
  const address = baseAddress + "";
  const obj = null;
  const type = "GET";
  const result = serverRequest(address, obj, type);
  //console.log(result);
  return result;
}

function deleteTask(id) {
  const address = baseAddress + id;
  const obj = null;
  const type = "DELETE";
  const result = serverRequest(address, obj, type);
  //console.log(result);
  return result;
}

function addTask(text) {
  const address = baseAddress + "create";
  const obj = { text: text, completed: false };
  const type = "POST";
  //console.log("addTask");
  //console.log(obj);
  const result = serverRequest(address, obj, type);
  //console.log(result);
  return result;
}

function updateTask(id, newText) {
  const address = baseAddress + id + "/update";
  const obj = { text: newText };
  const type = "POST";
  const result = serverRequest(address, obj, type);
  //console.log(result);
  return result;
}

function completeTask(id) {
    const address = baseAddress + id + "/complete";
    const obj = { completed: true };
    const type = "POST";
    const result = serverRequest(address, obj, type);
    //console.log(result);
    return result;
  }
  
class ToDoModel {
  constructor() {
    this.list = [];
  }
  updateItems() {
    console.log("updateItems");
    this.list = getTasks();
  }

  getItems() {
    console.log("getItems");
    this.updateItems();
    return this.list;
  }

  getActiveItems() {
    console.log("getActiveItems");
    //return this.list.filter(x => !x.completed);
    return this.getItems().filter(x => !x.completed);
  }

  getCompletedItems() {
    console.log("getCompletedItems");
    //return this.list.filter(x => x.completed);
    return this.getItems().filter(x => x.completed);
  }

  getActiveCount() {
    console.log("getActiveCount");
    return this.getActiveItems().length;
  }

  getCompletedCount() {
    console.log("getCompletedCount");
    return this.getCompletedItems().length;
  }

  addItem(text) {
    console.log("addItem");
    addTask(text);
    this.updateItems();
  }

  removeItem(id) {
    console.log("removeItem");
    deleteTask(id);
    this.updateItems();
  }

  removeCompleted() {
    console.log("removeCompleted");
    this.updateItems();
  }

  updateItem(id, text) {
    console.log("updateItem");
    updateTask(id, text, completed);
    this.updateItems();
  }

  toggleItem(id) {
    console.log("toggleItem");
    completeTask(id);
    this.updateItems();
  }

  switchAllTo(completed) {
    console.log("switchAllTo");
    this.list.forEach(x => (x.completed = completed));
  }
}

class NavModel {
  constructor() {
    this.links = [
      { title: "All" },
      { title: "Active" },
      { title: "Completed" }
    ];

    this.active = this.links[0];
  }

  getLinks() {
    return this.links;
  }

  getActive() {
    return this.active;
  }

  setActive(link) {
    this.active = link;
  }
}

const todoModel = new ToDoModel();
const navModel = new NavModel();

class ToDoSummary extends React.Component {
  render() {
    return (
      <div className="todo-info">
        <span className="todo-info__remains">{this.props.remains} remains</span>{" "}
        <span className="todo-info__completed">
          / {this.props.completed} completed
        </span>
      </div>
    );
  }
}

class ToDoTextInput extends React.Component {
  constructor(props) {
    super(props);

    this._save = this._save.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);

    this.state = {
      text: this.props.text ? this.props.text : ""
    };
  }

  render() {
    return (
      <input
        className={this.props.className}
        placeholder={this.props.placeholder}
        value={this.state.text}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
      />
    );
  }

  _save() {
    this.props.onSave(this.state.text);
    this.setState({ text: "" });
  }

  _onChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  _onKeyDown(event) {
    if (event.keyCode !== 13) return;

    this._save();
  }
}

class ToDoItem extends React.Component {
  constructor(props) {
    super(props);

    this._edit = this._edit.bind(this);
    this._save = this._save.bind(this);
    this._toggleItem = this._toggleItem.bind(this);
    this._removeItem = this._removeItem.bind(this);

    this.state = {
      isEditing: false
    };
  }

  render() {
    const text = this.state.isEditing ? (
      <ToDoTextInput
        className="todo__text todo__text_editing"
        text={this.props.task.text}
        onSave={this._save}
      />
    ) : (
      <span
        className={
          "todo__text" +
          (this.props.task.completed ? " todo__text_completed" : "")
        }
        onDoubleClick={this._edit}
      >
        {this.props.task.text}
      </span>
    );

    return (
      <div className="todo__item">
        <input
          type="checkbox"
          className="todo__checkbox"
          checked={this.props.task.completed}
          onChange={this._toggleItem}
        />
        <span className="todo__destroy" onClick={this._removeItem}>
          -
        </span>{" "}
        {text}
      </div>
    );
  }

  _edit() {
    this.setState({ isEditing: true });
  }

  _save(text) {
    this.setState({ isEditing: false });
    this.props.updateItem(this.props.task.id, text);
  }

  _toggleItem() {
    this.props.toggleItem(this.props.task.id);
  }

  _removeItem() {
    this.props.removeItem(this.props.task.id);
  }
}

class ToDoList extends React.Component {
  render() {
    const items = this.props.tasks.map(task => {
      return (
        <ToDoItem
          key={task.id}
          task={task}
          toggleItem={this.props.toggleItem}
          removeItem={this.props.removeItem}
          updateItem={this.props.updateItem}
        />
      );
    });

    return (
      <div className="todo__list">
        <div className="todo__toggle-all">
          <input
            type="checkbox"
            className="todo__checkbox"
            checked={this.props.areAllComplete}
            onChange={this.props.toggleAll}
          />{" "}
          Complete all
        </div>

        {items}
      </div>
    );
  }
}

class ToDoForm extends React.Component {
  constructor(props) {
    super(props);

    this._save = this._save.bind(this);
  }

  render() {
    return (
      <div className="todo__form">
        <ToDoTextInput
          className="todo__text-input"
          placeholder="I need to do..."
          onSave={this._save}
        />
      </div>
    );
  }

  _save(text) {
    this.props.addItem(text);
  }
}

class ToDoClear extends React.Component {
  render() {
    return (
      <div className="todo__clear" onClick={this.props.removeCompleted}>
        Clear
      </div>
    );
  }
}

class NavItem extends React.Component {
  constructor(props) {
    super(props);

    this._navigate = this._navigate.bind(this);
  }

  render() {
    return (
      <div
        className={
          "nav__item" + (this.props.isActive ? " nav__item_active" : "")
        }
        onClick={this._navigate}
      >
        {this.props.link.title}
      </div>
    );
  }

  _navigate() {
    this.props.navigate(this.props.link);
  }
}

class Nav extends React.Component {
  render() {
    const items = this.props.links.map(link => {
      return (
        <NavItem
          key={link.title}
          link={link}
          navigate={this.props.navigate}
          isActive={link.title === this.props.activeLink.title}
        />
      );
    });

    return <div className="nav">{items}</div>;
  }
}

class ToDo extends React.Component {
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

  render() {
    return (
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
        <ToDoClear removeCompleted={this._removeCompleted} />
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
    todoModel.removeItem(id);
    this._rerender();
  }

  _addItem(text) {
    todoModel.addItem(text);
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

if (getTasks().length == 0) {
  todoModel.addItem("Sleep");
  todoModel.addItem("Eat");
  todoModel.addItem("Code");
  todoModel.addItem("Repeat");
}

ReactDOM.render(<ToDo />, document.getElementById("app"));