import React from 'react';
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../store/actions';

class Footer extends React.Component {
  render() {
    return (
      <div>
        show:
        <a
          href=""
          onClick={e => {
            e.preventDefault();
            this.props.onClick('SHOW_ALL');
          }}
        >
          all
        </a>
        &nbsp;
        <a
          href=""
          onClick={e => {
            e.preventDefault();

            this.props.onClick('SHOW_COMPLETED');
          }}
        >
          completed
        </a>
        &nbsp;
        <a
          href=""
          onClick={e => {
            e.preventDefault();
            this.props.onClick('SHOW_ACTIVE');
          }}
        >
          active
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
});
const mapDispatchToProps = dispatch => {
  return {
    onClick: val => {
      dispatch(setVisibilityFilter(val));
    }
  };
};
Footer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
export default Footer;
