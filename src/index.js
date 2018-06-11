/** APP入口 **/

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Root from "./a_container/root";
import registerServiceWorker from "./registerServiceWorker";
/** 数据中心 **/
import store from "./store";

/** 公共样式 **/
import "./styles/css.css";
import "./styles/less.less";

const rootDom = document.getElementById("app-root");

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  rootDom
);
registerServiceWorker();
if (module.hot) {
  module.hot.accept();
}
