import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../storeOld/actions';

class AddTodo extends Component {
  componentDidMount() {
    // 只触发一次
    // console.log(this.props.todos);
  }

  componentDidUpdate(prevProps) {
    if (this.props.todos !== prevProps.todos) {
      console.log(111111);
    }
  }

  render() {
    // 每次store改变都会触发
    // console.log(this.props.todos);
    let input;
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            // this.props.dispatch(addTodo(input.value));
            this.props.addTodo(input.value);
            input.value = '';
          }}
        >
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
}

/* ***************mapStateToProps的返回结果必须是纯对象******************** */
const mapStateToProps = state => ({
  todos: state.todos
});
// or
// const mapStateToProps = state => {
//   return {
//     todos: state.todos
//   };
// };

/* ***************mapStateToProps传递的可以是对象也可以是函数******************** */
// const mapDispatchToProps = dispatch => ({
//   addTodo: (...args) => dispatch(addTodo(...args))
// });

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addTodo: val => dispatch(addTodo(val))
  };
};

AddTodo = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo);

export default AddTodo;
