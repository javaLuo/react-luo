/** MOCK 模拟数据拦截ajax请求（注：真实开发时需删掉此文件） **/

const Mock = require("mockjs");

/** 数据模版 **/
const ajaxTest = {
  "code|1": "success",
  "data|1-10": [
    {
      "id|+1": 1,
      email: "@EMAIL"
    }
  ]
};

exports.mockApi = (url, params) => {
  return Mock.mock(ajaxTest);
};
