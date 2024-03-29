/** 这是用于生产环境的webpack配置文件 **/

const path = require("path");
const webpack = require("webpack"); // webpack核心
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将CSS提取出来，而不是和js混在一起
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // 对CSS进行压缩
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 每次打包前清除旧的build文件夹
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin"); // 用于直接复制public中的文件到打包的最终文件夹中
const FaviconsWebpackPlugin = require("favicons-webpack-plugin"); // 自动生成各尺寸的favicon图标 webpack5 wating up
const TerserPlugin = require("terser-webpack-plugin"); // 对js进行压缩
const webpackbar = require("webpackbar"); // 进度条
const ESLintPlugin = require("eslint-webpack-plugin"); // eslint插件，代替原来的eslint-loader
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 分析打包后各个包的大小
/**
 * 基础路径
 * 比如我上传到自己的服务器填写的是："/work/pwa/"，最终访问为"https://isluo.com/work/pwa/"
 * 根据你自己的需求填写
 * "/" 就是根路径，假如最终项目上线的地址为：https://isluo.com/， 那就不用改
 * **/
const PUBLIC_PATH = "/";

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src", "index"),
  output: {
    path: path.resolve(__dirname, "build"), // 将文件打包到此目录下
    publicPath: PUBLIC_PATH, // 在生成的html中，文件的引入路径会相对于此地址，生成的css中，以及各类图片的URL都会相对于此地址
    filename: "dist/[name].[chunkhash:8].js",
    chunkFilename: "dist/[name].[chunkhash:8].chunk.js",
  },
  stats: {
    children: false, // 不输出子模块的打包信息
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多线程并行构建
        terserOptions: {
          // https://github.com/terser/terser#minify-options
          compress: {
            warnings: false, // 删除无用代码时是否给出警告
            drop_debugger: true, // 删除所有的debugger
            // drop_console: true, // 删除所有的console.*
            pure_funcs: ["console.log"], // 删除所有的console.log
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        // .js .jsx用babel解析
        test: /\.js?$/,
        include: path.resolve(__dirname, "src"),
        use: ["babel-loader"],
      },
      {
        // .css 解析
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        // .less 解析
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    /**
     * 打包前删除上一次打包留下的旧代码（根据output.path）
     * https://github.com/johnagan/clean-webpack-plugin
     * **/
    new CleanWebpackPlugin(),
    new webpackbar(), // 打包时美化进度条
    new ESLintPlugin({
      context: path.resolve(__dirname, "src"),
    }),
    new AntdDayjsWebpackPlugin(), // dayjs 替代 momentjs
    /**
     * 在window环境中注入全局变量,虽然暂时没用上，不过在真实开发中应该会用到
     * **/
    new webpack.DefinePlugin({
      "process.env": "prod",
    }),
    /**
     * 提取CSS等样式生成单独的CSS文件,不然最终文件只有js； css全部包含在js中
     * https://github.com/webpack-contrib/mini-css-extract-plugin
     * **/
    new MiniCssExtractPlugin({
      filename: "dist/[name].[chunkhash:8].css", // 生成的文件名
    }),
    /**
     * 自动生成HTML，并注入各参数
     * https://github.com/jantimon/html-webpack-plugin
     * **/
    new HtmlWebpackPlugin({
      filename: "index.html", // 生成的html存放路径，相对于 output.path
      template: "./public/index.html", // html模板路径
      hash: false, // 防止缓存，在引入的文件后面加hash (PWA就是要缓存，这里设置为false)
      inject: true, // 是否将js放在body的末尾
      // 正式环境，把注册service-worker的代码加入到index.html中
      registerServiceWorker: `<script>
        if ("serviceWorker" in navigator) {
          window.addEventListener("load", () => {
            navigator.serviceWorker.register("./service-worker.js");
          });
        }
      </script>`,
    }),
    /**
     * 拷贝public中的文件到最终打包文件夹里
     * https://github.com/webpack-contrib/copy-webpack-plugin
     * */
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
    /**
     * 自动生成各种类型的favicon图标 webpack5 wating up
     * 自动生成manifest.json文件
     * 这么做是为了各种设备上的扩展功能，PWA桌面图标/应用启动图标等，主题等
     * https://github.com/itgalaxy/favicons#usage
     * **/
    new FaviconsWebpackPlugin({
      logo: "./public/favicon.png", // 原始图片路径
      // prefix: "", // 自定义目录，把生成的文件存在此目录下
      favicons: {
        appName: "ReactPWA", // 你的APP全称
        appShortName: "React", // 你的APP简称，手机某些地方会显示，比如切换多个APP时显示的标题
        appDescription: "ReactPWA Demo", // 你的APP简介
        background: "#222222", // APP启动页的背景色
        theme_color: "#222222", // APP的主题色
        appleStatusBarStyle: "black-translucent", // 苹果手机状态栏样式
        display: "standalone", // 是否显示搜索框，PWA就别显示了
        start_url: PUBLIC_PATH, // 起始页，‘.’会自动到主页，比'/'好，尤其是网站没有部署到根域名时
        logging: false, // 是否输出日志
        pixel_art: false, // 是否自动锐化一下图标，仅离线模式可用
        loadManifestWithCredentials: false, // 浏览器在获取manifest.json时默认不会代cookie。如果需要请设置true
        icons: {
          // 生成哪些平台需要的图标
          android: true, // 安卓
          appleIcon: false, // 苹果
          appleStartup: false, // 苹果启动页
          coast: false, // opera
          favicons: true, // web小图标
          firefox: false, // 火狐
          windows: false, // windows8 桌面应用
          yandex: false, // Yandex浏览器
        },
      },
    }),

    /**
     * PWA - 自动生成server-worker.js
     * https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW?hl=en
     *  */
    new WorkboxPlugin.GenerateSW({
      skipWaiting: true, // service-worker如果有更新的话，跳过等待直接更新
    }),

    // new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".less", ".css", ".wasm"], // 后缀名自动补全
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
