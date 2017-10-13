import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';	// 管理异步action的插件，为了解决某些问题
import RootReducer from '../a_reducer';

// ============================================
// Create store middlewares

const store = createStore(RootReducer, applyMiddleware(ReduxThunk));

if(module.hot) {
    module.hot.accept('../a_reducer', () => {
        const nextRootReducer = require('../a_reducer/index');
        store.replaceReducer(nextRootReducer);
    });
}
export default store;
