import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


// ==================
// 组件
// ==================
class Page3 extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="son">C 子container 3</div>;
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)(Page3)