const path = require("path");			// 获取绝对路径有用
const express = require("express");		// express服务器端框架
const webpack = require("webpack");		// webpack核心

const webpackDevMiddleware = require("webpack-dev-middleware");		// webpack服务器
const webpackHotMiddleware = require("webpack-hot-middleware");		// HMR热更新中间件
const webpackConfig = require('./webpack.dev.config.js');			// webpack配置文件

const app = express();	// 实例化express服务
const DIST_DIR = webpackConfig.output.path;	// webpack配置中设置的文件输出路径，所有文件存放在内存中
const PORT = 8888;	// 服务启动端口号
const compiler = webpack(webpackConfig);	// 实例化webpack

app.use(webpackDevMiddleware(compiler, {	// 挂载webpack小型服务器
    publicPath: webpackConfig.output.publicPath,	// 对应webpack配置中的publicPath
    quiet: false, // 是否不输出启动时的相关信息
    stats: {
        colors: true // 不同信息不同颜色
    },
}));
app.use(webpackHotMiddleware(compiler));	// 挂载HMR热更新中间件

app.get("*", (req, res, next) =>{ 			// 所有请求都返回index.html
    const filename = path.join(DIST_DIR, 'index.html');

    // 由于index.html是由html-webpack-plugin生成到内存中的，所以使用下面的方式获取
    compiler.outputFileSystem.readFile(filename, (err, result) =>{
        if(err){
            return(next(err))
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    })
});

app.listen(PORT, function(){
    console.log('启动地址: http://localhost:'+PORT);
});
