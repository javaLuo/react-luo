import reqwest from 'reqwest';

export default class ApiService {
  static newPost(url, bodyObj = {}) {
    return reqwest({
      url,
      method: 'post',
      contentType: 'application/json',
      crossOrigin: true,
      data: JSON.stringify(bodyObj),
      dataType: 'json',
    });
  }
}
