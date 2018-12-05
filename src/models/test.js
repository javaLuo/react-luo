/**
 * 测试页的Model 在src/store/index.js中被挂载到store上，命名为test
 * 项目中不同的大模块可以创建不同的js作为model
 * 此model中包含了用于src/container/test模块的数据和方法
 * **/
import { message } from 'antd';
import Server from '../util/fetch-api'; // 自己封装的异步请求方法

const model = {
  /** store数据 **/
  state: {
    count: 0, // 测试数字
    fetchvalue: [], // 异步请求的测试数据
  },
  /** reducers **/
  reducers: {
    add(state, payload) {
      return { ...state, count: payload };
    },
    updateFetchApi(state, payload) {
      return { ...state, fetchvalue: payload };
    },
  },
  /** actions **/
  actions: {
    // 测试 - 数字加1
    onTestAdd(params) {
      this.add(params + 1); // 调用上面reducers中的add方法
    },
    // 测试 - ajax请求
    async serverAjax(params = {}) {
      try {
        const res = await Server.newPost('url.ajax', params);
        if (res.status === 'success') {
          this.updateFetchApi(res.data); // 异步请求成功后，可以把数据存入store，即走redux流程
        }
        return res; // 也可以直接返回给view层，在页面中直接处理
      } catch (e) {
        message.error('网络错误', 1);
      }
    },
    // 测试 - fetch请求
    async serverFetch(params = {}) {
      try {
        const res = await Server.newPost('url.ajax', params);
        if (res.status === 'success') {
          this.updateFetchApi(res.data);
        }
        return res;
      } catch (e) {
        message.error('网络错误', 1);
      }
    },
    // 测试 - graphql请求
    async serverGraphql(params = {}) {
      const ql = `
      {
        rates(currency: "USD") {
          currency
        }
      }
      `;
      try {
        const res = await Server.newGraphql(ql);
        console.log('获取到了什么：', res);
        return res;
      } catch (e) {
        message.error('网络错误', 1);
      }
    },
  },
};

export default model;
