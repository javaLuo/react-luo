/**
 * 自己封装的异步请求函数
 * APP中的所有请求都将汇聚于此
 * **/

import axios from "axios";
import qs from "qs";

export default class ApiService {
  static newServer(url, bodyObj = {}, type = "post") {
    return axios({
      url,
      method: type,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      withCredentials: true,
      data: qs.stringify(bodyObj),
    });
  }
}
