/*
  一些公共的action可以写在这里，比如用户登录、退出登录、权限查询等
  其他的action可以按模块不同，创建不同的js文件
*/
import _ from 'lodash';
import Fetchapi from '../util/fetch-api';
import { message } from 'antd';

// 测试页：num数据测试
export const onTestAdd = (num) => async(dispatch) => {
  dispatch({
    type: 'TEST::add',
    payload: ++num,
  });
};

// 异步请求测试 ajax
export const fetchApi = (params = {}) => async(dispatch) => {
  try {
    const res = await Fetchapi.newPost('url.ajax', params);
    dispatch({
      type: 'TEST::ajax',
      payload: res,
    });
    return res;
  } catch(err) {
    message.error('网络错误，请重试');
  }
};

// 异步请求测试 fetch
export const fetchTest = (params = {}) => async(dispatch) => {
  try {
    const res = await Fetchapi.newFetch('url.ajax', params);
    dispatch({
      type: 'TEST::fetch',
      payload: res.data,
    });
    return res.data;
  } catch(err) {
    message.error('网络错误，请重试');
  }
};