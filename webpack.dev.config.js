/** 这是用于开发环境的webpack配置文件 **/

const path = require("path"); // 获取绝对路径用
const webpack = require("webpack"); // webpack核心
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 动态生成html插件
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin"); // 用于直接复制public中的文件到打包的最终文件夹中
// const HappyPack = require("happypack"); // 多线程编译
const webpackbar = require("webpackbar");
const ESLintPlugin = require("eslint-webpack-plugin"); // eslint插件，代替原来的eslint-loader
const PUBLIC_PATH = "/"; // 基础路径

module.exports = {
  mode: "development",
  entry: [
    "webpack-hot-middleware/client?reload=true&path=/__webpack_hmr", // webpack热更新插件，就这么写
    "./src/index.js", // 项目入口
  ],
  output: {
    path: __dirname + "/", // 将打包好的文件放在此路径下，dev模式中，只会在内存中存在，不会真正的打包到此路径
    publicPath: PUBLIC_PATH, // 文件解析路径，index.html中引用的路径会被设置为相对于此路径
    filename: "bundle-[contenthash].js", // 编译后的文件名字
    assetModuleFilename: "assets/[name].[hash:4][ext]",
  },
  devtool: "eval-source-map", // 报错的时候在控制台输出哪一行报错
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        // .js .jsx用babel解析
        test: /\.js?$/,
        use: ["babel-loader"],
        include: path.resolve(__dirname, "src"),
      },
      {
        // .css 解析
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        // .less 解析
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      {
        // 文件解析
        test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        include: path.resolve(__dirname, "src"),
        type: "asset/resource",
      },
      {
        // 图片解析
        test: /\.(png|jpg|jpeg|gif)(\?|$)/i,
        include: path.resolve(__dirname, "src"),
        type: "asset",
      },
      {
        // wasm文件解析
        test: /\.wasm$/,
        include: path.resolve(__dirname, "src"),
        type: "webassembly/experimental",
      },
      {
        // xml文件解析
        test: /\.xml$/,
        include: path.resolve(__dirname, "src"),
        use: ["xml-loader"],
      },
    ],
  },
  plugins: [
    new webpackbar(),
    new ESLintPlugin({
      context: path.resolve(__dirname, "src"),
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new AntdDayjsWebpackPlugin(), // dayjs 替代 momentjs
    new webpack.DefinePlugin({
      "process.env": "dev",
    }),
    // new HappyPack({
    //   loaders: ["babel-loader"],
    // }),
    new HtmlWebpackPlugin({
      // 根据模板插入css/js等生成最终HTML
      filename: "index.html", //生成的html存放路径，相对于 output.path
      favicon: "./public/favicon.png", // 自动把根目录下的favicon.ico图片加入html
      template: "./public/index.html", //html模板路径
      inject: true, // 是否将js放在body的末尾
    }),
    // 拷贝public中的文件到最终打包文件夹里
    new CopyPlugin({
      patterns: [
        {
          from: "./public/**/*",
          to: "./",
          globOptions: {
            ignore: ["**/favicon.png", "**/index.html"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".less", ".css", ".wasm"], //后缀名自动补全
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
