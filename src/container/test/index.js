/** 测试页 **/

// ==================
// 所需的各种插件
// ==================
import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import P from "prop-types";

// ==================
// 所需的所有资源
// ==================
import { Button, Modal, message, Form } from "antd";
import css from "./index.less";
import ImgTest from "../../assets/test.jpg";
import Mp3 from "../../assets/starSky.mp3";
import Page1 from "./container/page1"; // 子页面1
import Page2 from "./container/page2"; // 子页面2
import Page3 from "./container/page3"; // 子页面3

// ==================
// 本页面所需actions
// ==================

// ==================
// 组件
// ==================
@connect(
  state => ({
    num: state.app.num
  }),
  model => ({
    actions: {
      onTestAdd: model.app.onTestAdd,
      serverAjax: model.app.serverAjax,
      serverFetch: model.app.serverFetch
    }
  })
)
@Form.create()
export default class TestPageContainer extends React.Component {
  static propTypes = {
    num: P.number, // 测试： 来自store的全局变量num
    location: P.any, // 自动注入的location对象
    match: P.any, // 自动注入的match对象
    history: P.any, // 自动注入的history对象
    actions: P.object, // connect高阶函数注入的actions，见本页面最下面的actions
    form: P.any
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 模态框隐藏和显示
      mokeFetch: [], // 用于测试fetch请求
      mokeAjax: [], // 用于测试ajax请求
      num: 0 // 数字
    };
  }

  // react生命周期 - 组件加载完毕时触发一次
  componentDidMount() {
    console.log(
      "所有页面默认拥有的3个对象：",
      this.props.location,
      this.props.match,
      this.props.history
    );
    const set = new Set([1, 2, 3]);
    const map = new Map();
    console.log("Set 和 Map 测试:", set, map);

    const a = { a: 1, b: 2, c: 3 };
    const b = { d: 4, ...a };
    console.log("obj的解构赋值测试：", b);
  }

  componentDidUpdate(prevProps, prevState) {}

  /** react生命周期
   * 在下一轮render即将被开始时触发，比componentWillUpdate后执行
   * 即合并了所有的操作，最后真正要开始渲染时触发
   * 不应该在这里调用this.setState，会进入死循环
   * **/
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return null;
  }

  /** react生命周期
   * 原componentWillReceiveProps方法被此方法代替
   * 组件挂载完毕和每次props有改变时触发一次
   * **/
  static getDerivedStateFromProps(nextP, prevState) {
    if (nextP.num !== prevState.num) {
      return {
        num: nextP.num
      };
    }
    return null;
  }

  // 打开模态框按钮被点击时触发
  onBtnClick() {
    this.setState({
      visible: true
    });
  }

  // 关闭模态框
  handleCancel() {
    this.setState({
      visible: false
    });
  }

  // Ajax测试按钮被点击时触发
  onAjaxClick = () => {
    this.props.actions.serverAjax().then(res => {
      if (res.status === 200) {
        this.setState({
          mokeAjax: res.data
        });
      } else {
        message.error("获取数据失败");
      }
    });
  };

  // Fetch测试按钮点击时触发
  onFetchClick() {
    this.props.actions.serverFetch().then(res => {
      console.log("前台得到数据：", res);
      if (res.status === 200) {
        this.setState({
          mokeFetch: res.data
        });
      } else {
        message.error("获取数据失败");
      }
    });
  }

  render() {
    const { form } = this.props;
    console.log("通过修饰器注入的form对象：", form);
    return (
      <div className={css.page}>
        <h1 className={css.title}>功能测试</h1>
        <div className={css.box}>
          <div className={css.list}>
            <h2>引入图片</h2>
            <p>
              <img src={ImgTest} style={{ height: "150px" }} />
              <span className={css.backImage} />
              <span>上方图片，一张是img,一张是background</span>
              <br />
              <span>
                {
                  '请特别注意，现在webpack.production.config.js中的publicPath配置为"/dist/"，'
                }
              </span>
              <br />
              <span>
                如果你的项目最终打包后放到服务器上的访问路径为https://xxx.com，这没有问题
              </span>
              <br />
              <span>
                {
                  '如果你的项目访问路径为https://xxx.com/aaa，请把webpack.production.config.js中的publicPath配置为"/aaa/dist/"'
                }
              </span>
            </p>
          </div>
          <div className={css.list}>
            <h2>引入其他种类的资源</h2>
            <p>
              <audio src={Mp3} controls />
            </p>
          </div>
          <div className={css.list}>
            <h2>LESS测试</h2>
            <p>
              <span className={"less_btn"}>来自LESS样式</span>
            </p>
          </div>
          <div className={css.list}>
            <h2>Antd组件测试</h2>
            <p>
              <Button type="primary">普通按钮</Button>&nbsp;
              <Button type="primary" loading>
                加载中
              </Button>&nbsp;
              <Button type="primary" onClick={() => this.onBtnClick()}>
                打开模态框
              </Button>&nbsp;
            </p>
          </div>
          <div className={css.list}>
            <h2>location对象测试</h2>
            <p>
              当前路由：{this.props.location.pathname}
              <br />
              search参数：{this.props.location.search}
              <br />
              state参数：{this.props.location.state
                ? Object.entries(this.props.location.state)
                    .map(v => `${v[0]}=${v[1]}`)
                    .join("，")
                : ""}
            </p>
            <p>所有页面都自动被注入location、match、history对象</p>
          </div>
          <div className={css.list}>
            <h2>action测试</h2>
            <p>
              <Button
                type="primary"
                onClick={() => this.props.actions.onTestAdd(this.props.num)}
              >
                通过action改变数据num
              </Button>&nbsp;<br />
              store中数据num：{this.state.num}
            </p>
          </div>
          <div className={css.list}>
            <h2>异步请求测试（Mock模拟数据）</h2>
            <div className={css.pbox}>
              <Button type="primary" onClick={this.onAjaxClick}>
                ajax请求测试(使用的reqwest库)
              </Button>
              <br />
              数据：
              <ul>
                {this.state.mokeAjax.map((item, index) => (
                  <li key={index}>{`id: ${item.id}, email: ${item.email}`}</li>
                ))}
              </ul>
            </div>
            <div className={css.pbox}>
              <Button type="primary" onClick={() => this.onFetchClick()}>
                fetch请求测试(使用的axios库)
              </Button>
              <br />
              数据：
              <ul>
                {this.state.mokeFetch.map((item, index) => (
                  <li key={index}>{`id: ${item.id}, email: ${item.email}`}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={css.list}>
            <h2>嵌套路由测试</h2>
            <div className={css.sonTest}>
              <Link to={`${this.props.match.url}/Page1`}>子页1</Link>
              <Link to={`${this.props.match.url}/Page2`}>子页2</Link>
              <Link to={`${this.props.match.url}/Page3`}>子页3</Link>
              <Switch>
                <Route
                  exact
                  path={`${this.props.match.url}/`}
                  component={Page1}
                />
                <Route
                  exact
                  path={`${this.props.match.url}/Page1`}
                  component={Page1}
                />
                <Route
                  exact
                  path={`${this.props.match.url}/Page2`}
                  component={Page2}
                />
                <Route
                  exact
                  path={`${this.props.match.url}/Page3`}
                  component={Page3}
                />
              </Switch>
            </div>
          </div>
        </div>
        <Modal
          title="模态框"
          visible={this.state.visible}
          onOk={() => this.handleCancel()}
          onCancel={() => this.handleCancel()}
        >
          <p>内容...</p>
        </Modal>
      </div>
    );
  }
}
