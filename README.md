# React-Luo

[![Build Status](https://travis-ci.org/javaLuo/react-luo.svg?branch=master)](https://travis-ci.org/javaLuo/react-luo)
[![codebeat badge](https://codebeat.co/badges/eb91ca34-7c1b-424f-be1c-a5d79fd3d269)](https://codebeat.co/projects/github-com-javaluo-react-luo-master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## what is this?

react automaticaly<br/>
这是一个 React 脚手架，没有使用 create-react-app<br/>
标准的 React+Redux 分层结构<br/>
经过了多个项目的实践，不停的更新和优化出来的。目前自己做项目也在用。

- PWA、Hooks、代码分割、热替换、dllPlugin 静态资源预编译、HappyPack 多线程构建、ES6+语法

## 注意的地方

- antd icon 打包体积过大：<a href="https://github.com/ant-design/ant-design/issues/12011" target="_blank">https://github.com/ant-design/ant-design/issues/12011</a>，开了 gzip 之后还行

## 构建 Start

```
yarn install		# 安装依赖模块
```

```
yarn dll		# 静态资源预编译
```

```
yarn start		# 运行开发环境，默认监听8888端口
```

```
yarn build		# 正式打包，用于生产环境
```

```
yarn prettier		# 自动格式化src、mock目录下的所有.js/.css/.scss/.less文件
```

```
yarn dist		# 运行正式打包后的最终文件（build目录下的文件），默认监听8888端口
yarn distmac	        # MAC下运行最终文件
```

## 更新日志 Update log

见<a href="https://github.com/javaLuo/react-luo/wiki/%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97" target="_blank">Wiki</a>

## 目录结构 Structure

```
.
├── build				# 正式打包后，会自动生成该文件夹，其中会包含最终用于生产环境的文件
│   ├── dist				# 编译后的资源文件
│   ├── icons				# 编译后自动生成的各尺寸favicon图标，有的会用于PWA配置
│   ├── asset-manifets.json		# 记录了将会被缓存的资源
│   ├── index.html			# 编译后的主页html
│   ├── manifest.json			# PWA配置文件，配置了桌面图标，以APP方式启动时的启动页面相关参数
│   └── service-worker.js		# PWA核心worker, 用于离线访问，缓存不变的资源文件
├── dll					# 静态资源预编译插件生成的dll文件
├── mock				# mock测试数据
├── public				# 静态文件，index.html等
├── src                                 # 项目代码目录
│   ├── component                     # 所有的公共类UI组件
│   ├── container                     # 所有的页面级容器组件
|	├── ...
|   	└── router			# 根组件，里面配置了顶级的路由
|   ├── models				# 模块（包含store数据/reducers/actions）
│   ├── assets                          # 所有的图片、文件等静态资源
│   ├── styles                          # 所有的样式文件
│   ├── store                           # store数据中心
│   ├── root                            # 根页
│   ├── store                           # store数据中心
│   ├── util                            # 自定义工具
│   ├── index.js                        # 项目入口JS
│   └── index.html                      # 主页html文件,开发环境和生产打包共用
├── server.js				# 用于开发环境的服务部署
├── webpack.dev.config.js		# 用于开发环境的webpack配置
├── webpack.dll.config.js		# 静态资源预编译所需webpack配置
└── webpack.production.config.js	# 用于生产环境正式打包的webpack配置
```

## 预览地址 Demo

https://isluo.com/work/pwa (线上没有 mock 环境)

## 参阅资料

React 英文官网：https://reactjs.org <br/>
React 中文文档：https://doc.react-china.org <br/>
React GitHub 地址：https://github.com/facebook/react <br/>
React 官方更新日志：https://github.com/facebook/react/releases <br/>
React 生命周期：https://reactjs.org/docs/react-component.html <br/>
mockjs 官网：http://mockjs.com/ <br/>
Eslint 中文站：http://eslint.cn/ <br/>
Babel GitHub 地址：https://github.com/babel/babel <br/>
