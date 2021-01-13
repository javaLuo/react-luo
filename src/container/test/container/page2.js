import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function Page2(props) {
  return <div className="son">B 子container 2</div>;
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    actions: bindActionCreators({}, dispatch),
  })
)(Page2);
