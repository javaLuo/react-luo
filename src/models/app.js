/** 一个Model 命名为app **/
import { message } from "antd";
import Server from "../util/fetch-api";

const model = {
  state: {
    num: 0,
    fetchvalue: [] // 异步测试数据
  },
  reducers: {
    add(state, payload) {
      console.log(state, payload);
      return { ...state, num: payload };
    },
    updateFetchApi(state, payload) {
      return { ...state, fetchvalue: payload };
    }
  },
  actions: {
    onTestAdd(params) {
      this.add(params + 1);
    },
    async serverAjax(params = {}) {
      try {
        const res = await Server.newPost("url.ajax", params);
        if (res.status === "success") {
          this.updateFetchApi(res.data);
        }
        return res;
      } catch (e) {
        message.error("网络错误", 1);
      }
    },
    async serverFetch(params = {}) {
      try {
        const res = await Server.newPost("url.ajax", params);
        if (res.status === "success") {
          this.updateFetchApi(res.data);
        }
        return res;
      } catch (e) {
        message.error("网络错误", 1);
      }
    }
  }
};

export default model;
