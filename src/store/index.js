/** 全局唯一数据中心 **/
import { createStore } from "retalk";

import ModelApp from "../models/app";
import ModelTest from "../models/test";
const store = createStore({
  app: ModelApp,
  test: ModelTest
});

export default store;
