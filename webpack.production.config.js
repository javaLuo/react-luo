const path = require("path");
const webpack = require("webpack"); // webpack核心
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 为了单独打包css
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 每次打包前清除旧的build文件夹
const PreloadWebpackPlugin = require("preload-webpack-plugin"); // 预加载所有chunk
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 代码压缩插件，webpack本身自带了，引入这个是为了配置参数
const ManifestPlugin = require("webpack-manifest-plugin");  // 生成一个manifest.json文件
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");  // 生成一个server-worker用于缓存
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 打包分析插件，打包后会自动弹出tree图

module.exports = {
  mode: "production",
  entry: ["babel-polyfill", path.resolve(__dirname, "src", "index")],
  output: {
    path: path.resolve(__dirname, "build" ), // 将文件打包到此目录下
    publicPath: "/", // 在生成的html中，文件的引入路径会相对于此地址，生成的css中，以及各类图片的URL都会相对于此地址
    filename: "dist/[name].[chunkhash:8].js",
    chunkFilename: "dist/[name].[chunkhash:8].chunk.js"
  },
  context: __dirname,
  module: {
    rules: [
      {
        // .js .jsx用babel解析
        test: /\.js?$/,
        include: path.resolve(__dirname, "src"),
        use: [
            "babel-loader"
        ]
      },
      {
        // .css 解析
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[local]_[hash:base64:8]"
              }
            },
            "postcss-loader"
          ]
        })
      },
      {
        // .less 解析
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[local]_[hash:base64:8]"
              }
            },
            "postcss-loader",
            "less-loader"
          ]
        }),
        include: path.resolve(__dirname, "src")
      },
      {
        // .less 解析 (用于解析antd的LESS文件)
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "postcss-loader",
            "less-loader"
          ]
        }),
        include: path.resolve(__dirname, "node_modules")
      },
      {
        // .scss 解析
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[local]_[hash:base64:8]"
              }
            },
            "postcss-loader",
            "sass-loader"
          ]
        }),
      },
      {
        // 文件解析
        test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        include: path.resolve(__dirname, "src"),
        use: [
            "file-loader?name=dist/assets/[name].[ext]"
        ]
      },
      {
        // 图片解析
        test: /\.(png|jpg|gif)$/,
        include: path.resolve(__dirname, "src"),
        use: [
            "url-loader?limit=8192&name=dist/assets/[name].[ext]",
        ]
      },
      {
        // CSV/TSV文件解析
        test: /\.(csv|tsv)$/,
        use: [
            'csv-loader'
        ]
      },
      {
        // xml文件解析
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  },
  plugins: [
      new webpack.DefinePlugin({
          "process.env": JSON.stringify({
              PUBLIC_URL: '',
          })
      }),
      new InterpolateHtmlPlugin({
          PUBLIC_URL: '',
      }),
    new CleanWebpackPlugin(["build"]), // 打包前删除上一次打包留下的旧代码
    // https://github.com/mishoo/UglifyJS2/tree/harmony#compress-options 英文文档
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: false // 是否删除代码中所有的console
        }
      }
    }),
    // 配置了这个插件，再配合上面loader中的配置，将所有样式文件打包为一个单独的css文件
    new ExtractTextPlugin({
      filename: "dist/[name].[hash:8].css", // 生成的文件名
      allChunks: true // 从所有chunk中提取
    }),
    new ManifestPlugin({
      fileName: "asset-manifest.json"
    }),
      /**
       * 生成一个server-work用于缓存资源
       * */
      new SWPrecacheWebpackPlugin({
          dontCacheBustUrlsMatching: /\.\w{8}\./,
          filename: 'service-worker.js',
          logger(message) {
              if (message.indexOf('Total precache size is') === 0) {
                  // This message occurs for every build and is a bit too noisy.
                  return;
              }
              if (message.indexOf('Skipping static resource') === 0) {
                  // This message obscures real errors so we ignore it.
                  // https://github.com/facebookincubator/create-react-app/issues/2612
                  return;
              }
              console.log(message);
          },
          minify: true,
          navigateFallback: "index.html",    // 遇到不存在的URL时，跳转到主页
          navigateFallbackWhitelist: [/^(?!\/__).*/],   // 忽略从/__开始的网址，参考 https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
          staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],   // 不缓存sourcemaps,它们太大了
      }),
      new
    new HtmlWebpackPlugin({
      //根据模板插入css/js等生成最终HTML
      filename: "index.html", //生成的html存放路径，相对于 output.path
      template: "./public/index.html", //html模板路径
        templateParameters: true,
      favicon: "./public/favicon.ico", // 自动把根目录下的favicon.ico图片加入html
      hash: true, // 防止缓存，在引入的文件后面加hash
      inject: true // 是否将js放在body的末尾
    }),
    new PreloadWebpackPlugin() // 预加载插件，在index.html中加入chunk预加载link标签（可用可不用）
    // new BundleAnalyzerPlugin() // 打包分析插件，打包后会自动弹出tree图：127.0.0.1:8888（测试性能时可用）
  ],
  // 解析器， webpack提供的各种方便的工具函数
  resolve: {
    extensions: [".js", ".jsx", ".less", ".css", ".scss"] //后缀名自动补全
  }
};
