/** 另一个Model 命名为test **/
import { message } from "antd";
import Server from "../util/fetch-api";

const model = {
  state: {
    count: 0
  },
  rerucers: {
    add(state, payload) {
      return { ...state, count: state.count + 1 };
    }
  },
  actions: {
    actionAdd() {
      this.add();
    }
  }
};

export default model;
