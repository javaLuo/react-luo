/**
 * 由于现在使用了parcel打包工具
 * 所以此server.js只用于运行测试正式打包后的代码
 * 即运行build目录下的代码，并且提供mock支持
 * **/

const path = require("path");			// 获取绝对路径有用
const bodyParser = require('body-parser');  // 解析post请求的body部分
const express = require("express");		// express服务器端框架

const mock = require("./mock/mock-server");    // mock模拟数据，模拟后台业务

const app = express();                      // 实例化express服务

const PORT = 8888;                          // 服务启动端口号

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static("build"));

app.get("*", function(req, res) {
 console.log('GET请求', req.originalUrl);
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/** 监听POST请求，返回MOCK模拟数据 **/
app.post("*", (req, res, next) => {
  const result = mock.mockApi(req.originalUrl, req.body);
  res.send(result);
});

/** 启动服务 **/
app.listen(PORT, () => {
  console.log("本地服务启动地址: http://localhost:%s", PORT);
});
