/** MOCK 模拟数据拦截ajax请求 **/

const Mock = require("mockjs");

/** 数据模版 **/
const ajaxTest = (url: string, params: Record<string, any>) => {
  return {
    status: 200,
    "data|1-10": [
      {
        "id|+1": 1,
        email: "@EMAIL",
        url,
      },
    ],
  };
};

exports.mockApi = (url: string, params: Record<string, any>) => {
  return Mock.mock(ajaxTest);
};
