/** 导航 **/

import React from "react";
import { NavLink } from "react-router-dom";
import css from "./index.less";

export default class Menu extends React.PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={css.menu}>
        <NavLink to="/home">首页</NavLink>|
        <NavLink to="/features">构建与特性</NavLink>|
        <NavLink
          to={{
            pathname: "/test",
            search: "?a=123&b=abc",
            state: { c: "456", d: "ABC" }
          }}
        >
          测试页面
        </NavLink>
        |
        <a
          href="https://github.com/javaLuo/react-luo"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    );
  }
}
