import _ from 'lodash';
import Fetchapi from '../util/fetch-api';
import { message } from 'antd';


export function onTestAdd(num) {
  return {
    type: 'TEST::add',
    payload: num + 1,
  };
}

// Fetchapi 异步请求测试
export function fetchApi(params) {
  return (dispatch) => {
      return Fetchapi.newPost(
        'url', params
      ).then(
          msg => {
            console.log('返回数据', msg);
            dispatch({
              type: 'TEST::testFetch',
              payload: msg,
            });
            return msg;
          }
        ).catch(() => {
          message.error('网络错误，请重试');
        });
    };
}

// promise测试
export function testPromise(params) {
  return (dispatch) => {
      return new Promise((resolve, reject) => {
        if (params === 1) {
          resolve('success');
          dispatch({
              type: 'TEST::add',
              payload: 10000,
            });
        } else {
          reject('error');
        }
      });
    };
}