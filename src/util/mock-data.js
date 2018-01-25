/** MOCK 模拟数据拦截ajax请求（注：真实开发时需删掉此文件） **/

import Mock from 'mockjs';

/** 数据模版 **/
const ajaxTest = {
	'code|1':'success',
	'data|1-10': [{
        'id|+1': 1,
        'email': '@EMAIL'
    }]
};

/** 拦截ajax请求 **/
Mock.mock(/\.ajax/, ajaxTest);  // 拦截url中带.ajax的异步请求，返回模拟数据