# react-luo

## 构建

```
npm install       # 安装依赖模块
```

```
npm run dev       # 运行开发环境，默认监听8888端口
```

```
npm run build     # 正式打包，用于生产环境
```
## 分支
* react-luo-react-routerV4
	<br/> 配置了react-router4.0版本的分支
* react-luo-noEslint-ES7
	<br/> 取消了Eslint,配置了支持ES7装饰器的分支
	
## 更新日志
* 2-17-09-21
	<br/>1.主分支master也已升级为react-router 4.2
	<br/>2.其他包更新
	
* 2017-09-13
	<br/>1.创建了新的分支 配置了react-router 4.0
	
* 2017-09-07
	<br/>1.使用react-hot-loader 3.0.0 配置了HMR热替换，不再需要以前的静态资源预编译了
	<br/>2.配置了Antd自定义主题所需的代码，现在可以直接在package.json中的theme字段定义自己的Antd主题
## 特性

* HMR局部热替换

* HappyPack多线程编译

* 最终打包后，会在/build文件夹下生成 index.html 和 /dist文件夹，这两个东西是最终需要的。

## 目录结构

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

## 预览地址

http://isluo.com/work/react-luo/index.html
