# React-Luo
[![Build Status](https://travis-ci.org/javaLuo/react-luo.svg?branch=master)](https://travis-ci.org/javaLuo/react-luo)
[![codebeat badge](https://codebeat.co/badges/eb91ca34-7c1b-424f-be1c-a5d79fd3d269)](https://codebeat.co/projects/github-com-javaluo-react-luo-master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## what is this?
react automaticaly<br/>
这是一个React脚手架，没有使用create-react-app<br/>
标准的React+Redux分层结构<br/>
经过了多个项目的实践，不停的更新和优化出来的。目前自己做项目也在用。


## 构建 Start

```
npm install		# 安装依赖模块
```

```
npm run start		# 运行开发环境，默认监听8888端口
```

```
npm run build		# 正式打包，用于生产环境
```

```
npm run prettier	# 自动格式化src、mock目录下的所有.js/.css/.scss/.less文件
```

```
npm run dist		# 运行正式打包后的最终文件（build目录下的文件），默认监听8888端口
```

## Yarn构建

```
yarn install		# 安装依赖模块
```

```
yarn run start		# 运行开发环境，默认监听8888端口
```

```
yarn run build		# 正式打包，用于生产环境
```

```
yarn run prettier	# 自动格式化src、mock目录下的所有.js/.css/.scss/.less文件
```

```
yarn run dist		# 运行正式打包后的最终文件（build目录下的文件），默认监听8888端口
```

## 更新日志 Update log
* 2018-03-05
	<br/>1.webpack升级为4.1.0，更新相关配置
	<br/>2.代码分割使用了react-loadable,异步加载时有loading动画，具体查看src/a_container/root/index.js中代码
	<br/>3.异步加载的代码可以配置预加载，具体查看src/a_container/root/index.js中代码
	<br/>4.目前webpack4.0刚出现不久，与其相关的某些插件会提示一些奇怪的警告，但不影响代码执行
* 2018-03-04
	<br/>1.webpack升级到4.0，相关配置和插件修改
* 2018-02-23
    <br/>1.增加了prettier自动代码格式化，npm run prettier 将自动按照prettier风格对{src,mock}/**/*.{js,css,scss,less}的文件进行格式化
    <br/>2.Eslint现在会根据pretter风格进行代码检测，不符合的会在控制台输出warning
* 2018-02-21
	<br/>1.mock改为随server.js一起使用，请求在server.js中有配置。代码正式打包不再包含mock
* 2018-01-25
	<br/>1.propTypes父级参数类型判断均提到了class的顶部
	<br/>2.高阶组件等方法均用@修饰器提到了class的顶部，比如@connect、@From.create
* 2018-01-10
	<br/>1.className均改为module形式,自动设置局部css命名空间
	<br/>2.npm i classnames --save, 用于添加多个className时，对所有className进行封装
* 2018-01-07
	<br/>1.支持修饰器，修改了Eslint的检测规则
	<br/>2.支持class中定义箭头函数的语法
	<br/>3.Babel插件设置细节调整
	<br/>4.增加了依赖清单说明(依赖清单.js)
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

* 代码分割按需加载

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
