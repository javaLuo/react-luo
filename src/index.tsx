/** APP入口 **/
import * as React from "react";
import * as ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import Root from "./root";

/** 公共样式 **/
import "./styles/css.css";
import "./styles/less.less";

ReactDOM.render(<Root />, document.getElementById("app-root"));

serviceWorker.register();

if (module.hot) {
  module.hot.accept();
}
