/**
 * 测试页的Model 在src/store/index.js中被挂载到store上，命名为test
 * 项目中不同的大模块可以创建不同的js作为model
 * 此model中包含了用于src/container/test模块的数据和方法
 * **/
import { message } from 'antd';
import Server from '../util/fetch-api'; // 自己封装的异步请求方法

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
  effects: dispatch => ({
    // 测试 - 数字加1
    onTestAdd(params) {
      this.setCount(params + 1); // 这里会指向上面reducers中的setCount
    },
    // 测试 - ajax请求
    async serverAjax(params = {}, rootState) {
      try {
        const res = await Server.newPost('url.ajax', params);
        if (res.status === 200) {
          this.setFetchValue(res.data); // 异步请求成功后，可以把数据存入store，即走redux流程
        }
        return res; // 也可以直接返回给view层，在页面中直接处理
      } catch (e) {
        message.error('网络错误', 1);
      }
    },
    // 测试 - fetch请求
    async serverFetch(params = {}) {
      try {
        const res = await Server.newFetch('url.ajax', params);
        if (res && res.data.status === 200) {
          dispatch({ type: 'test/setFetchValue', payload: res.data.data }); // dispatch是全局根dispatch,也能这么用
        }
        return res.data;
      } catch (e) {
        message.error('网络错误', 1);
      }
    },
  }),
};
