/** 主页 **/

// ==================
// 所需的各种插件
// ==================
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, hashHistory } from "react-router";
import classNames from "classnames";
import P from "prop-types";

// ==================
// 所需的所有资源
// ==================
import css from "./index.scss";
import ImgLogo from "../../assets/react-logo.jpg";

// ==================
// 组件
// ==================
@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)
export default class HomePageContainer extends React.Component {
  static propTypes = {
    location: P.any,
    history: P.any,
    actions: P.any
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={classNames(css.home, "all_nowarp")}>
        <div className={css.box}>
          <img src={ImgLogo} />
          <div className={css.title}>React-Luo</div>
          <div className={css.info}>
            react、redux、webpack3、eslint、babel6、antd
          </div>
        </div>
      </div>
    );
  }
}
