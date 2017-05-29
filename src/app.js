import React from 'react'; // react核心，用到jsx的地方，都需要这个
import ReactDOM from 'react-dom';	// react控制dom所需，用到了其reder方法
import {Provider} from 'react-redux'; // react和redux连接的桥梁
import { Router, hashHistory } from 'react-router'; // 路由组件
// babel本身只能转换ES6语法，但ES6新增的MAP、SET、Generator等新功能不会转换，所以需要此插件
// 直接引入到这里即可
import 'babel-polyfill';

// import store and history
import store from './store';
// 所有的CSS全部引入到入口文件即可
import './css/css.css';
import './css/less.less';
import './css/scss.scss';
// ====================
// Routes
// ====================

import AppRoutes from './route';	// 所有定义好的路由

ReactDOM.render(
  <Provider store={store}>
    <Router routes={AppRoutes} history={hashHistory} queryKey={false} />
  </Provider>,
  document.getElementById('app-root')
);
