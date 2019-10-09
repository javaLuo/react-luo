/**
 * 自己封装的异步请求函数
 * APP中的所有请求都将汇聚于此
 * **/

import axios, { Method } from "axios";

export default class ApiService {
  static newServer(url: string, bodyObj: object = {}, method: Method = "post") {
    return axios({
      url,
      method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      withCredentials: true,
      data: JSON.stringify(bodyObj),
    });
  }
}
