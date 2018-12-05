/** APP入口 **/
import React from "react";
import ReactDOM from "react-dom";

import registerServiceWorker from "./registerServiceWorker";
import Root from "./root";

/** 公共样式 **/
import "./styles/css.css";
import "./styles/less.less";
import "./styles/scss.scss";

ReactDOM.render(<Root />, document.getElementById("app-root"));

registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
