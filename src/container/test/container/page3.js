import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function Page3(props) {
  return <div className="son">C 子container 3</div>;
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    actions: bindActionCreators({}, dispatch),
  })
)(Page3);
