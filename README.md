# React-Luo

[![Build Status](https://travis-ci.org/javaLuo/react-luo.svg?branch=master)](https://travis-ci.org/javaLuo/react-luo)
[![codebeat badge](https://codebeat.co/badges/eb91ca34-7c1b-424f-be1c-a5d79fd3d269)](https://codebeat.co/projects/github-com-javaluo-react-luo-master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## what is this?

react automaticaly<br/>
这是一个 React 脚手架，没有使用 create-react-app<br/>
标准的 React+Redux 分层结构<br/>
经过了多个项目的实践，不停的更新和优化出来的。目前自己做项目也在用。

- PWA、代码分割、HMR 热替换、dllPlugin 静态资源预编译、HappyPack 多线程构建、ES6+语法

## 注意的地方

- antd3.8.4 以后，Icon 的使用方式发生了变化，以前的使用方式会打包进所有的 Icon 导致打包体积过大，参见<br/>https://github.com/ant-design/ant-design/issues/12011 (目前只使用 3.8.2)
- babel-eslint9.0 对修饰器的格式化检测与 prettier 不符（目前只使用 8.x）

## 构建 Start

```
npm install		# 安装依赖模块 | 1⃣️首先运行这个
```

```
npm run dll		# 静态资源预编译 | 2⃣️接着必须运行这个
```

```
npm run start		# 运行开发环境，默认监听8888端口
```

```
npm run build		# 正式打包，用于生产环境
```

```
npm run prettier	# 一键格式化src、mock目录下的所有.js/.css/.less文件
```

```
npm run dist		# 运行正式打包后的最终文件（build目录下的文件），默认监听8888端
npm run distmac	        # MAC下运行最终文件
```

## Yarn 构建

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

- 2018-10-30
  <br/>1.React16.6 增加了一个新的生命周期函数
  <br/>2.React16.6 更新内容：https://zhuanlan.zhihu.com/p/47680420
- 2018-08-29
  <br/>1.babel 升级到 7, 相关插件也升级到最新版本
  <br/>2.babel-react eslint 插件目前使用 8.x 版本，9.0 与 prettier 格式化不符
- 2018-07-12
  <br/>1.引入了 retalk,轻度封装了 store,可以分 model 构建
- 2018-05-31
  <br/>1.React16.4，正式废弃了旧的几个生命周期，项目中用 static getDerivedStateFromProps(nextP, nowState)替代了 componentWillReceiveProps
- 2018-05-24
  <br/>1.完全拷贝了 create-react-app 的 registerServiceWorker.js, 那个写得比较好。处理了开发环境和生产环境的差异。
- 2018-04-26
  <br/>1.加入了 dllPlugin 静态资源预编译（仅开发环境生效）, 所以需要手动先 **npm run dll**，再 **npm run start**
  <br/>2.内置了 PWA 功能, webpack.production.config.js 中的 PUBLIC_PATH 和 public/manifest.json 中的 start_url 需保持一致
- 2018-04-18
  <br/>1.redux 4.0
  <br/>2.开发环境加入了最新的 HappyPack 插件
  <br/>3.打包输出细节及包版本更新
- 2018-03-05
  <br/>1.webpack 升级为 4.1.0，更新相关配置
  <br/>2.代码分割使用了 react-loadable,异步加载时有 loading 动画，具体查看 src/a_container/root/index.js 中代码
  <br/>3.异步加载的代码可以配置预加载，具体查看 src/a_container/root/index.js 中代码
  <br/>4.目前 webpack4.0 刚出现不久，与其相关的某些插件会提示一些奇怪的警告，但不影响代码执行
- 2018-03-04
  <br/>1.webpack 升级到 4.0，相关配置和插件修改
- 2018-02-23
  <br/>1.增加了 prettier 自动代码格式化，npm run prettier 将自动按照 prettier 风格对{src,mock}/\*_/_.{js,css,scss,less}的文件进行格式化
  <br/>2.Eslint 现在会根据 pretter 风格进行代码检测，不符合的会在控制台输出 warning
- 2018-02-21
  <br/>1.mock 改为随 server.js 一起使用，请求在 server.js 中有配置。代码正式打包不再包含 mock
- 2018-01-25
  <br/>1.propTypes 父级参数类型判断均提到了 class 的顶部
  <br/>2.高阶组件等方法均用@修饰器提到了 class 的顶部，比如@connect、@From.create
- 2018-01-10
  <br/>1.className 均改为 module 形式,自动设置局部 css 命名空间
  <br/>2.npm i classnames --save, 用于添加多个 className 时，对所有 className 进行封装
- 2018-01-07
  <br/>1.支持修饰器，修改了 Eslint 的检测规则
  <br/>2.支持 class 中定义箭头函数的语法
  <br/>3.Babel 插件设置细节调整
  <br/>4.增加了依赖清单说明(依赖清单.js)
- 2017-11-10
  <br/>1.action 均改为 async/await 形式
  <br/>2.加入 mock 模拟数据测试 ajax 请求
  <br/>3.加入 axios 库，可用于 fetch 请求，reqwest 仍然保留
  <br/>4.a_container/root/index.js 中用 render 方法渲染路由，加入了模拟 onEnter 方法的例子
- 2017-10-13
  <br/>1.HMR 热更新现在使用了 webpack-dev-middleware 和 webpack-hot-middleware 的配置方式
  <br/>2.更合理的路由跳转方式
- 2017-10-11
  <br/>1.加入代码分割的例子，运用 bundle-loader 的懒加载方式
  <br/>2.babel-preset-env 代替原来的其他 babel 插件
- 2017-09-21
  <br/>1.主分支 master 也已升级为 react-router 4.2
  <br/>2.其他包更新
- 2017-09-13
  <br/>1.创建了新的分支 配置了 react-router 4.0
- 2017-09-07
  <br/>1.使用 react-hot-loader 3.0.0 配置了 HMR 热替换，不再需要以前的静态资源预编译了
  <br/>2.配置了 Antd 自定义主题所需的代码，现在可以直接在 package.json 中的 theme 字段定义自己的 Antd 主题

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
|   	└── root			# 根页，里面配置了顶级的路由
|   ├── models				# 模块（包含store数据/reducers/actions）
│   ├── assets                          # 所有的图片、文件等静态资源
│   ├── styles                          # 所有的样式文件
│   ├── store                           # store数据中心
│   ├── util                            # 自定义工具
│   ├── index.js                        # 项目入口JS
│   └── index.html                      # 主页html文件,开发环境和生产打包共用
├── server.js				# 用于开发环境的服务部署
├── webpack.dev.config.js		# 用于开发环境的webpack配置
├── webpack.dll.config.js		# 静态资源预编译所需webpack配置
└── webpack.production.config.js	# 用于生产环境正式打包的webpack配置
```

## 预览地址 Demo

http://isluo.com/work/pwa (线上没有 mock 环境)

## 参阅资料

React 英文官网：https://reactjs.org <br/>
React 中文文档：https://doc.react-china.org <br/>
React GitHub 地址：https://github.com/facebook/react <br/>
React 官方更新日志：https://github.com/facebook/react/releases <br/>
React 生命周期：https://reactjs.org/docs/react-component.html <br/>
mockjs 官网：http://mockjs.com/ <br/>
Eslint 中文站：http://eslint.cn/ <br/>
Babel GitHub 地址：https://github.com/babel/babel <br/>
