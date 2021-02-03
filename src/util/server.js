/**
 * 自己封装的异步请求函数
 * 所有http请求都将经过这里
 * **/
import axios from "axios";

// 不需要下面这些mock配置，仅本地发布DEMO用
// import Mock from "mockjs";
// const mock = require("../../mock/mock-data");
// Mock.mock(/\/api.*/, options => {
//   const res = mock.mockApi(options);
//   return res;
// });

/**
 * 发起http请求
 * @param {String} url 请求的api地址
 * @param {Object} params 这些参数将直接加在api地址后面，如?a=123&b=456
 * @param {Object} body 这些参数将用于POST请求，加到请求的request body中去
 * @param {String} method 请求的方法，如POST/GET
 * @return {Promise} 返回一个Promise对象
 */
export default (url, params = {}, body = {}, method = "POST") => {
  return axios({
    url,
    method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    withCredentials: false, // 请求是否带cookie（跨域的请求一般是不能带cookie的）
    params, // GET请求的参数赋给params字段
    data: body, // POST请求的参数赋给data字段
  });
};
