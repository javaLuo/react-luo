/** APP入口 **/
// import "core-js/stable";
// import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import Root from "./root";

/** 公共样式 **/
import "./styles/css.css";
import "./styles/less.less";

ReactDOM.render(<Root />, document.getElementById("app-root"));

if (module.hot) {
  module.hot.accept();
}
