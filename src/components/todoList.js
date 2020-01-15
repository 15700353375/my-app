/*
 * @Author:      Arya
 * @DateTime:    2020-01-08
 * @Description: 列表
 */

import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo, VisibilityFilters } from '../store/actions';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.todos.map((todo, index) => (
          <div
            key={index}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}
            onClick={() => this.props.todoClick(todo.id)}
          >
            {todo.text}
          </div>
        ))}
      </div>
    );
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
};

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});
const mapDispatchToProps = dispatch => {
  return {
    todoClick: id => {
      dispatch(toggleTodo(id));
    }
  };
};
TodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
export default TodoList;
