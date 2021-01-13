import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import P from "prop-types";

class Page3 extends React.Component {
  static propTypes = {
    location: P.any,
    history: P.any,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="son">C 子container 3</div>;
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    actions: bindActionCreators({}, dispatch),
  })
)(Page3);
