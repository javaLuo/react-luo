/** 导航 **/

import React from "react";
import { Link } from "react-router-dom";
import "./index.less";

export default class Menu extends React.PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="menu">
        <Link to="/home">首页</Link>|<Link to="/features">构建与特性</Link>|
        <Link
          to={{
            pathname: "/test",
            search: "?a=123&b=abc",
            state: { c: "456", d: "ABC" }
          }}
        >
          测试页面
        </Link>
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
