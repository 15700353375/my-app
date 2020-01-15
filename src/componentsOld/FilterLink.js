import React from 'react';
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../store/actions';
// import Link from '../components/Link';

class Link extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let children = this.props.children;
    let onClick = this.props.onClick;
    return (
      <a
        href=""
        onClick={e => {
          e.preventDefault();
          onClick();
        }}
      >
        {children}
      </a>
    );
  }
}

// 匹配当前选择的按钮
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

// 点击之后修改状态
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter)); //filter是父组件传递给子组件的props
    }
  };
};

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FilterLink;
