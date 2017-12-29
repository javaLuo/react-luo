# React-Luo
[![Build Status](https://travis-ci.org/javaLuo/react-luo.svg?branch=master)](https://travis-ci.org/javaLuo/react-luo)
[![codebeat badge](https://codebeat.co/badges/eb91ca34-7c1b-424f-be1c-a5d79fd3d269)](https://codebeat.co/projects/github-com-javaluo-react-luo-master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

## what fuck this?
react automaticaly<br/>
这就是个React脚手架，没有使用create-react-app<br/>
经过了多个项目的实践，不停的更新和优化出来的。目前自己做项目也在用。


## 构建 Start

```
npm install       # 安装依赖模块
```

```
npm run dev       # 运行开发环境，默认监听8888端口
```

```
npm run build     # 正式打包，用于生产环境
```

```
npm run dist     # 运行正式打包后的最终代码，默认监听8888端口
```

## 更新日志 Update log
* 2017-11-10
	<br/>1.action均改为async/await形式
	<br/>2.加入mock模拟数据测试ajax请求
	<br/>3.加入axios库，可用于fetch请求，reqwest仍然保留
	<br/>4.a_container/root/index.js中用render方法渲染路由，加入了模拟onEnter方法的例子
* 2017-10-13
	<br/>1.HMR热更新现在使用了webpack-dev-middleware 和 webpack-hot-middleware 的配置方式
	<br/>2.更合理的路由跳转方式
	<br/>3.其他包更新
* 2017-10-11
	<br/>1.加入代码分割的例子，运用bundle-loader的懒加载方式
	<br/>2.babel-preset-env代替原来的其他babel插件
* 2017-09-21
	<br/>1.主分支master也已升级为react-router 4.2
	<br/>2.其他包更新
	
* 2017-09-13
	<br/>1.创建了新的分支 配置了react-router 4.0
	
* 2017-09-07
	<br/>1.使用react-hot-loader 3.0.0 配置了HMR热替换，不再需要以前的静态资源预编译了
	<br/>2.配置了Antd自定义主题所需的代码，现在可以直接在package.json中的theme字段定义自己的Antd主题
## 特性 Characteristic

* HMR局部热替换

* HappyPack多线程编译

* 最终打包后，会在/build文件夹下生成 index.html 和 /dist文件夹，这两个东西是最终需要的。

## 目录结构 Structure

```
.
├── build				# 正式打包后，会自动生成该文件夹，其中会包含最终用于生产环境的文件
├── src                                 # 项目代码目录
│   ├── a_action                        # 所有的action
│   ├── a_component                     # 所有的公共类UI组件
│   ├── a_container                     # 所有的页面级容器组件
|	├── ...
|   	└── root			# 根页，里面配置了顶级的路由
│   ├── a_reducer                       # 所有的reducer
│   ├── assets                          # 所有的图片、文件等静态资源
│   ├── styles                          # 所有的样式文件
│   ├── store                           # store数据中心
│   ├── util                            # 自定义工具
|   	├── tools.js			# 封装了一些工具函数，比如去掉两端空格之类的
|	├── fetch-api.js		# 封装了2个异步请求，所有的action都调用的这个js中的方法
|	└── mock-data.js		# mock模拟数据的模版，只在fetch-api.js中有用到
│   ├── index.js                        # 项目入口JS
│   └── index.html                      # 主页html文件,开发环境和生产打包共用
├── server.js				# 用于开发环境的服务部署
├── webpack.dev.config.js		# 用于开发环境的webpack配置
└── webpack.production.config.js	# 用于生产环境正式打包的webpack配置
```

## 预览地址 Demo

http://isluo.com/work/react-luo/index.html

## 参阅资料 Consult
React GitHub地址：https://github.com/facebook/react <br/>
react-router GitHub地址：https://github.com/ReactTraining/react-router <br/>
React官方更新日志：https://github.com/facebook/react/releases <br/>
React16更新内容：http://blog.csdn.net/lx376693576/article/details/78192768 <br/>
mockjs官网：http://mockjs.com/ <br/>
Eslint中文站：http://eslint.cn/ <br/>
