/** MOCK 模拟数据拦截ajax请求 **/

const Mock = require("mockjs");

/** 数据模版 **/
const ajaxTest = {
  status: 200,
  "data|1-10": [
    {
      "id|+1": 1,
      email: "@EMAIL",
    },
  ],
};

exports.mockApi = (url, params) => {
  return Mock.mock(ajaxTest);
};
