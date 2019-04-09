import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import P from "prop-types";

// ==================
// 组件
// ==================
class Page1 extends React.Component {
  static propTypes = {
    location: P.any,
    history: P.any
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="son">A 子container 1</div>;
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)(Page1);
