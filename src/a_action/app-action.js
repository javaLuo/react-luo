import _ from 'lodash';
import Fetchapi from '../util/fetch-api';
import { message } from 'antd';
 
export default class AdviserActions {
  static onTestAdd(num) {
    return {
      type: 'TEST::add',
      payload: num + 1,
    };
  }


  // Fetch 异步请求
  static fetchApi(params) {
    return (dispatch) => {
      Fetchapi.newPost(
        'url', params
      ).then(
          msg => {
            console.log('返回数据', msg);
            dispatch({
              type: 'TEST::testFetch',
              payload: msg,
            });
          }
        ).catch(() => {
          message.error('网络错误，请重试');
        });
    };
  }
}
