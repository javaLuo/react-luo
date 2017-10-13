import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'; // react和redux连接的桥梁
import Root from './a_container/root';
// babel本身只能转换ES6语法，但ES6新增的MAP、SET、Generator等新功能不会转换，所以需要此插件
// 直接引入到这里即可
import 'babel-polyfill';
// import store and history
import store from './store';
// 所有的CSS全部引入到入口文件即可
import './css/css.css';
import './css/less.less';
import './css/scss.scss';

const rootDom = document.getElementById('app-root');

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    rootDom
);

if (module.hot) {
    module.hot.accept();
}