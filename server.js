/** 用于开发环境的服务启动 **/

// import Bodyparser from "koa-bodyparser";

const http = require("http");
const koaStatic = require("koa-static-plus");
const convert = require("koa-convert");
const json = require("koa-json");
const Koa = require("Koa");

const path = require("path"); // 获取绝对路径有用
// const Koa = require("Koa"); // express服务器端框架
const env = process.env.NODE_ENV; // 模式（dev开发环境，production生产环境）
const webpack = require("webpack"); // webpack核心
const webpackDevMiddleware = require("webpack-dev-middleware"); // webpack服务器
const webpackHotMiddleware = require("webpack-hot-middleware"); // HMR热更新中间件
const webpackConfig = require("./webpack.dev.config.js"); // webpack开发环境的配置文件

const mock = require("./mock/mock-data"); // mock模拟数据，模拟后台业务

const app = new Koa(); // 实例化express服务
const DIST_DIR = webpackConfig.output.path; // webpack配置中设置的文件输出路径，所有文件存放在内存中
let PORT = 8882; // 服务启动端口号

// app.use(convert(bodyparser));
app.use(convert(json()));

// 路由
// app.use(async (ctx, next) => {
//   const url = ctx.path;
//   const request = ctx.request;
//   const query = request.query;
//   console.log("请求：", url, query);
//   if (ctx.url === "/") {
//   }
// });

// response router
app.use(async (ctx, next) => {
  console.log("收到一个请求：", ctx);
  // await require("./routes").routes()(ctx, next);
});

// static
// app.use(
//   convert(
//     koaStatic(path.join(__dirname, "./build"), {
//       pathPrefix: "",
//     }),
//   ),
// );

// app.use(convert(koaStatic(path.join(__dirname, "dll"))));

// const compiler = webpack(webpackConfig); // 实例化webpack
// app.use(
//   webpackDevMiddleware(compiler, {
//     publicPath: webpackConfig.output.publicPath, // 对应webpack配置中的publicPath
//   }),
// );

// app.use(webpackHotMiddleware(compiler)); // 挂载HMR热更新中间件

/** 启动服务 **/
app.listen(PORT, () => {
  console.log("本地服务启动地址1: http://localhost:%s", PORT);
});
