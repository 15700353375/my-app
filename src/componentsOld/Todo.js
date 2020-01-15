import React from 'react';

class Todo extends React.Component {
  render() {
    let onClick = this.props.onClick;
    let completed = this.props.completed;
    let text = this.props.text;
    return (
      <li
        onClick={onClick}
        style={{
          textDecoration: completed ? 'line-through' : 'none'
        }}
      >
        {text}
      </li>
    );
  }
}

export default Todo;
