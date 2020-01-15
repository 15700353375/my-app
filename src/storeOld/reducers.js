/*
 * @Author:      Arya
 * @DateTime:    2019-12-30
 * @Description: redux reducers
 */

import { combineReducers } from 'redux';
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions';

const { SHOW_ALL } = VisibilityFilters;

// 默认显示所有
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      // return Object.assign({}, state, {
      //   todos: [
      //     ...state.todos,
      //     {
      //       text: action.text,
      //       completed: false
      //     }
      //   ]
      // });
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];

    case TOGGLE_TODO:
      // return Object.assign({}, state, {
      //   todos: state.todos.map((todo, index) => {
      //     if (index === action.index) {
      //       return Object.assign({}, todo, {
      //         completed: !todo.completed
      //       });
      //     }
      //     return todo;
      //   })
      // });
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    default:
      return state;
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;
