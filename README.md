# React-Luo
[![Build Status](https://travis-ci.org/javaLuo/react-luo.svg?branch=master)](https://travis-ci.org/javaLuo/react-luo)
[![codebeat badge](https://codebeat.co/badges/eb91ca34-7c1b-424f-be1c-a5d79fd3d269)](https://codebeat.co/projects/github-com-javaluo-react-luo-master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

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
## 更新日志 Update log
* 2017-11-10
	<br/>1.action均改为async/await形式
	<br/>2.加入mock模拟数据测试ajax请求
	<br/>3.加入axios库，可用于fetch请求，reqwest仍然保留
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
├── src                                 # 项目代码目录
│   ├── a_action                        # 所有的action
│   ├── a_component                     # 所有的UI类组件
│   ├── a_container                     # 所有的控制类组件
│   ├── a_reducer                       # 所有的reducer
│   ├── assets                          # 所有的图片、文件等资源
│   ├── css                             # 所有的样式文件
│   ├── route                           # 路由
│   ├── store                           # store数据中心
│   ├── util                            # 自定义工具
│   ├── app.js                          # 项目入口文件
│   ├── index.html                      # 开发环境所用的主页html文件
│   └── index_template.html             # 生产环境打包时所用的主页html文件
```

## 预览地址 Demo

http://isluo.com/work/react-luo/index.html

## 参阅资料 Consult

React16更新内容：http://blog.csdn.net/lx376693576/article/details/78192768
