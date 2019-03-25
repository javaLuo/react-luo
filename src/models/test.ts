/**
 * 测试页的Model 在src/store/index.js中被挂载到store上，命名为test
 * 项目中不同的大模块可以创建不同的js作为model
 * 此model中包含了用于src/container/test模块的数据和方法
 * **/
import { message } from 'antd';
import Server from '../util/fetch-api'; // 自己封装的异步请求方法

interface Model {
  state: any;
  reducers: any;
  effects: any;
}

const model: Model = {
  /** store数据 **/
  state: {
    count: 0, // 测试数字
    fetchvalue: [], // 异步请求的测试数据
  },
  reducers: {
    setCount(state: any, payload: any) {
      return Object.assign({}, state, {
        count: payload,
      });
    },
    setFetchValue(state: any, payload: any) {
      return Object.assign({}, state, {
        fetchvalue: payload,
      });
    },
  },
  /** actions **/
  effects: (dispatch: any) => ({
    // 测试 - 数字加1
    onTestAdd(params: number) {
      this.setCount(params + 1);
    },
    // 测试 - ajax请求
    async serverAjax(params: object = {}) {
      try {
        const res = await Server.newPost('url.ajax', params);
        if (res.status === 'success') {
          this.setFetchValue(res.data); // 异步请求成功后，可以把数据存入store，即走redux流程
        }
        return res; // 也可以直接返回给view层，在页面中直接处理
      } catch (e) {
        message.error('网络错误', 1);
      }
    },
    // 测试 - fetch请求
    async serverFetch(params: object = {}) {
      try {
        const res = await Server.newPost('url.ajax', params);
        if (res.status === 'success') {
          dispatch({ type: 'test/setFetchValue', payload: res.data }); // 也可以这么用
        }
        return res;
      } catch (e) {
        message.error('网络错误', 1);
      }
    },
  }),
};

export default model;
