/** APP入口 **/
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Root from "./container/root";
import registerServiceWorker from "./registerServiceWorker";

/** 数据中心 **/
import store from "./store";

/** 公共样式 **/
import "./styles/css.css";
import "./styles/less.less";

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("app-root")
);
registerServiceWorker();
if (module.hot) {
  module.hot.accept();
}
