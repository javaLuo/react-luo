/**
 * 根reducer
 * 用于结合 App 中所有的 reducer.
 * 由于Redux中只能有一个store和一个reducer ,
 * 因此不要创建多个store！相反，使用 combineReducers 来把多个 reducer 合并成一个根 reducer。
 **/

import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import appReducer from "./app-reducer";

const RootReducer = combineReducers({
  // 注意一定要加上routing: routerReducer 这是用于redux和react-router的连接
  routing: routerReducer,
  // 其他自定义的reducer
  app: appReducer // 这里的命名，会成为store命名空间，取不同store区域中的值时，需指定不同的命名空间
});

export default RootReducer;
