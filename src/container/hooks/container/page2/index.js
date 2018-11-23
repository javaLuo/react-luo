import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import P from "prop-types";

// ==================
// 组件
// ==================
@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)
export default class Page2 extends React.Component {
  static propTypes = {
    location: P.any,
    history: P.any
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="son">B 子container 2</div>;
  }
}
