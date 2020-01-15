import { connect } from 'react-redux';
import { toggleTodo } from '../store/actions';
// import TodoList from '../components/TodoList';
import { VisibilityFilters } from '../store/actions';

import React from 'react';

import Todo from './Todo';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let todos = this.props.todos;
    let onTodoClick = this.props.onTodoClick;
    return (
      <ul>
        {todos.map((todo, index) => (
          <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
        ))}
      </ul>
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
      throw new Error('Unknown filter: ' + filter);
  }
};

// 从redux中获取当前所有的todos，且获取当前的visibility状态，然后根据状态进行数据处理。然后返回处理完的数据
const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

// 单个点击、表示完成，告诉redux更新数据
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id));
    }
  };
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
