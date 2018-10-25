/** 主页 **/

/** 所需的各种插件 **/
import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import P from "prop-types";

/** 所需的各种资源 **/
import css from "./index.less";
import ImgLogo from "../../assets/react-logo.jpg";

@connect(
  state => ({}),
  model => ({
    actions: {}
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
            react16、redux4、router4、webpack4、eslint、babel7、antd
          </div>
        </div>
      </div>
    );
  }
}
