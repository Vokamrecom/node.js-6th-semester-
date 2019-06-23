const React = require('React');

class ToDoClear extends React.PureComponent {
  render() {
    return (
      <div className="todo__clear" onClick={this.props.removeCompleted}>
        Clear
      </div>
    );
  }
}

module.exports = ToDoClear;
