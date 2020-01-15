/*
 * @Author:      Arya
 * @DateTime:    2020-01-08
 * @Description: 添加todo
 */

import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../store/actions';
class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: ''
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  // 当数据改变时候触发
  componentDidUpdate(prevProps, prevState) {
    if (this.props.todos !== prevProps.todos) {
      console.log(this.props.todos);
    }
  }

  inputChange(e) {
    this.setState({
      inputVal: e.target.value
    });
  }

  handleAdd(e) {
    e.preventDefault();
    let inputVal = this.state.inputVal;
    if (!inputVal.trim()) {
      return;
    }
    this.props.addTodo(this.state.inputVal);
    this.setState({
      inputVal: ''
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleAdd}>
          <input
            type="text"
            value={this.state.inputVal}
            onChange={this.inputChange}
          />
          <button type="submit">确定</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});
const mapDispatchToProps = dispatch => {
  return {
    addTodo: val => dispatch(addTodo(val))
  };
};

AddTodo = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo);

export default AddTodo;
