const React = require('React');
class ToDoSummary extends React.PureComponent {
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

module.exports = ToDoSummary;
