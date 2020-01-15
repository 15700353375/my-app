import { createStore } from 'redux';
import todoApp from './reducers';
// 使用redux-actions库，使用该库的createAction方法来创建action
import { createAction } from 'redux-actions';
// actions
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './actions';

let store = createStore(todoApp);
store.subscribe(() => {
  console.log(store.getState());
});

// 发起一系列 action
// store.dispatch(addTodo('Learn about actions'));
// store.dispatch(addTodo('Learn about reducers'));
// store.dispatch(addTodo('Learn about store'));
// store.dispatch(toggleTodo(0));
// store.dispatch(toggleTodo(1));
// store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL));

// 停止监听 state 更新
// unsubscribe();

export default store;
