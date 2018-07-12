/** 构建与特性页 **/

/** 所需的各种插件 **/
import React from "react";
import { connect } from "react-redux";
import P from "prop-types";

/** 所需的所有资源 **/
import css from "./index.less";

@connect(
  state => ({}),
  model => ({
    actions: {}
  })
)
export default class FeaturesPageContainer extends React.Component {
  static propTypes = {
    location: P.any,
    history: P.any,
    actions: P.any
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={css.page}>
        <h1 className={css.title}>构建与特性</h1>
        <div className={css.box}>
          <div className={css.list}>
            <h2>安装依赖文件</h2>
            <p>npm install</p>
          </div>
          <div className={css.list}>
            <h2>静态资源预编译</h2>
            <p>npm run dll</p>
          </div>
          <div className={css.list}>
            <h2>启动开发环境</h2>
            <p>npm run start</p>
            <div>代码打包编译，默认监听8888端口</div>
            <div>访问http://localhost:8888 即可查看</div>
          </div>
          <div className={css.list}>
            <h2>正式打包</h2>
            <p>npm run build</p>
            <div>会将最终代码打包至/build文件夹中</div>
          </div>
          <div className={css.list}>
            <h2>运行生产环境的代码</h2>
            <p>npm run dist</p>
            <div>运行build文件夹下生成好的最终代码</div>
          </div>
          <div className={css.list}>
            <h2>代码自动格式化</h2>
            <p>npm run prettier</p>
            <div>自动美化js/css/less等文件</div>
          </div>
          <div className={css.list}>
            <h2>HMR局部热更新</h2>
            <div>
              使用webpack-dev-middleware 和 webpack-hot-middleware设置了热更新
            </div>
          </div>
          <div className={css.list}>
            <h2>代码分割</h2>
            <div>react-loadable实现的代码分割</div>
            <div>src/container/root/index.js中能查看例子</div>
          </div>
          <div className={css.list}>
            <h2>webpack4.x</h2>
            <div>使用了最新版本的webpack，编译速度更快</div>
          </div>
        </div>
      </div>
    );
  }
}
