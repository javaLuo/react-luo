import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


// ==================
// 组件
// ==================
class Page2 extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="son">B 子container 2</div>;
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)(Page2)