// import Fundebug from 'fundebug-javascript';
import React from 'react'; // react核心，用到jsx的地方，都需要这个
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
// ====================
// Routes
// ====================

// import AppRoutes from './route';	// 所有定义好的路由

// Fundebug.apikey = '2845eb5f5743bc042554e472fff8e1d711a3650e07edc6fd4d4400548d5c90fc';

class App extends React.Component {
	render() {
        return (
          <Provider store={store}>
          	<Root />
		  </Provider>
        );
    }
}

export default App;