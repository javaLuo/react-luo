/* 这是用于开发环境的webpack配置文件 */
var os = require("os");
var path = require('path');
var webpack = require('webpack');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports = {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8888',  // 热更新监听此地址
            'webpack/hot/dev-server',                           // 启用热更新
            path.resolve(__dirname, 'src', 'app')               // 项目的入口文件
        ]
    },
    output: {
        publicPath: '/dev',                         // 这是在启动webpack-dev-server时，index.html中引用的路径应该相对于此路径
        path: path.resolve(__dirname, '/dev'),      // 将打包好的文件放在此路径下，dev模式中，只会在内存中存在，不会真正的打包到此路径，只有在真正执行打包命令时，才会生成到此路径中
        filename: 'bundle.js'                       //编译后的文件名字
    },
    devtool: 'eval-source-map',                          // 正确的输出代码行数
    module: {
        rules: [
            {   // 编译前通过eslint检查代码
                test: /\.js?$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                include: path.resolve(__dirname, "src")
            },
            {   // .js .jsx用babel解析
                test: /\.js?$/,
                include: path.resolve(__dirname, "src"),
                loader: 'happypack/loader?id=happybabel',
            },
            {   // .css 解析
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {   // .less 解析
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            {   // .scss 解析
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {   // 文件解析
                test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|pdf)(\?|$)/,
                include: path.resolve(__dirname, "src"),
                loader: 'file-loader?name=[name].[ext]'
            },
            {   // 图片解析
                test: /\.(png|jpg|gif)$/,
                include: path.resolve(__dirname, "src"),
                loader: 'url-loader?limit=8192&name=images/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/dev/vendor-manifest.json')
        }),
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader'],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
        new webpack.HotModuleReplacementPlugin(),   // 热更新插件
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css', '.scss'] //后缀名自动补全
    }
};