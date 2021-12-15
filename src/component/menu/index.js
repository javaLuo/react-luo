/** 导航 **/

import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.less";

export default function Menu() {
  const navigate = useNavigate();

  function goToTest() {
    navigate("/test?a=123&b=abc", { state: { c: 456, d: "ABC" } });
  }

  return (
    <div className="menu">
      <Link to="/home">首页</Link>|<Link to="/features">构建与特性</Link>|
      <Link to="/test?a=123&b=abc" state={{ c: 456, d: "ABC" }}>
        测试：Link跳转
      </Link>
      |
      <span
        onClick={() => goToTest()}
        to={{
          pathname: "/test",
          search: "?a=123&b=abc",
        }}
        state={{ c: 456, d: "ABC" }}
      >
        测试：api跳转
      </span>
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
