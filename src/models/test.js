/**
 * 测试页的Model 在src/store/index.js中被挂载到store上，命名为test
 * 项目中不同的大模块可以创建不同的js作为model
 * 此model中包含了用于src/container/test模块的数据和方法
 * **/
import { message } from "antd";
import Server from "../util/server"; // 自己封装的异步请求方法

export default {
  /** store数据 **/
  state: {
    count: 0, // 测试数字
    fetchvalue: [], // 异步请求的测试数据
  },

  /** reducers **/
  reducers: {
    setCount(state, payload) {
      return Object.assign({}, state, {
        count: payload,
      });
    },
    setFetchValue(state, payload) {
      return Object.assign({}, state, {
        fetchvalue: payload,
      });
    },
  },
  /** actions **/
  effects: (dispatch) => ({
    // 测试 - 数字加1
    onTestAdd(params) {
      this.setCount(params + 1); // 这里会指向上面reducers中的setCount
    },
    // 测试 - 异步请求
    async serverFetch(params = {}) {
      try {
        const res = await Server.newServer(
          "url.ajax",
          { a: 123, b: "456" },
          "post"
        );
        if (res && res.data.status === 200) {
          dispatch({ type: "test/setFetchValue", payload: res.data.data }); // dispatch是全局根dispatch,也能这么用
        }
        return res.data;
      } catch (e) {
        message.error("网络错误", 1);
      }
    },
  }),
};
