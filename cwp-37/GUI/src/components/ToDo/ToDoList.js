const React = require('React');
const ToDoItem = require('./ToDoItem');

class ToDoList extends React.PureComponent {
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

module.exports = ToDoList;
