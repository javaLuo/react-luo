/**
 * 基本Model app.js, 在src/store/index.js中被挂载到store上，命名为app
 * 可用于存放通用信息，比如用户数据、角色、权限、省市区等通用数据
 * **/
import { message } from "antd";
import Server from "../util/fetch-api";

const model = {
  /** store数据 **/
  state: {
    userinfo: null // 用户信息
  },
  /** reducers **/
  reducers: {
    // reducer - 更新用户信息
    upadteUserinfo(state, payload) {
      return { ...state, userinfo: payload };
    }
  },
  /** actions **/
  actions: {
    // 模拟获取用户信息
    async getUserinfo(params = {}) {
      const user = { id: params.id, username: "admin" };
      this.upadteUserinfo(user);
      return user;
    }
  }
};

export default model;
