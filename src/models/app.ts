/**
 * 基本Model app.js, 在src/store/index.js中被挂载到store上，命名为app
 * 可用于存放通用信息，比如用户数据、角色、权限、省市区等通用数据
 * **/
interface UserinfoParams {
  id: number | string;
}
interface Model {
  state: any;
  reducers: any;
  effects: any;
}

const model: Model = {
  /** store数据 **/
  state: {
    userinfo: null, // 用户信息
  },
  reducers: {
    setUserInfo(state: any, payload: any) {
      return Object.assign({}, state, {
        userinfo: payload,
      });
    },
  },
  /** actions **/
  effects: {
    // 模拟获取用户信息
    async getUserinfo(params: UserinfoParams) {
      const user = { id: params.id, username: 'admin' };
      this.setUserInfo({ user });
      return user;
    },
  },
};

export default model;
