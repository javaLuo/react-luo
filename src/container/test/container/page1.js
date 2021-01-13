import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function Page1(props) {
  return <div className="son">A 子container 1</div>;
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    actions: bindActionCreators({}, dispatch),
  })
)(Page1);
