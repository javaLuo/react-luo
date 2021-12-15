/**
 * 测试页的Model 在src/store/index.js中被挂载到store上，命名为test
 * 项目中不同的大模块可以创建不同的js作为model
 * 此model中包含了用于src/container/test模块的数据和方法
 * **/
import { message } from "antd";
import Server from "../util/server"; // 自己封装的异步请求方法

export default {
  state: {
    count: 0, // 测试数字
    fetchvalue: [], // 异步请求的测试数据
  },

  reducers: {
    setCount(state, payload) {
      return { ...state, count: payload };
    },
    setFetchValue(state, payload) {
      return { ...state, fetchvalue: payload };
    },
  },

  /** actions **/
  effects: (dispatch) => ({
    // 测试 - 数字加1
    onTestAdd(params, rootState) {
      this.setCount(rootState.test.count + 1); //. 这里会指向上面reducers中的setCount
    },

    // 测试 - 异步请求
    async serverFetch(params = {}) {
      try {
        const res = await Server(
          "/api/url.ajax",
          null,
          { a: 123, b: "456" },
          "POST"
        );
        if (res && res.data.status === 200) {
          dispatch({ type: "test/setFetchValue", payload: res.data.data }); // test/setFetchValue对应上面reducers中的setFetchValue
        }
        return res.data;
      } catch (e) {
        message.error("请求错误，请稍后重试");
      }
    },
  }),
};
