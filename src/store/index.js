import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';	// 管理异步action的插件，为了解决某些问题
import RootReducer from '../a_reducer';

// ============================================
// Create store middlewares

const store = createStore(RootReducer, applyMiddleware(ReduxThunk));

// REDUX 2.x 中，HMR检测不到reducer的变化，所以在创建store的文件中加入下面代码
if(module.hot) {
    module.hot.accept('../a_reducer', () => {
        const nextRootReducer = require('../a_reducer/index');
        store.replaceReducer(nextRootReducer);
    });
}
export default store;
