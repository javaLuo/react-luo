/** 测试页 **/

/** 所需的各种插件 **/
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import P from 'prop-types';

/** 所需的所有资源 **/
import { Button, Modal, message, Form } from 'antd';
import './index.less';
import ImgTest from '../../assets/test.jpg';
import Mp3 from '../../assets/starSky.mp3';
import Page1 from './container/page1'; // 子页面1
import Page2 from './container/page2'; // 子页面2
import Page3 from './container/page3'; // 子页面3

/** 组件 **/
@connect(
  state => ({
    userinfo: state.app.userinfo, // 引入app model中的userinfo数据
    count: state.test.count, // 引入test model中的count数据
  }),
  model => ({
    actions: {
      getUserinfo: model.app.getUserinfo, // 引入app model中的获取用户信息action
      onTestAdd: model.test.onTestAdd, // 引入test model中的数字+1 action
      serverAjax: model.test.serverAjax, // 引入test model中的ajax异步请求action
      serverFetch: model.test.serverFetch, // 引入test model中的fetch异步请求action
    },
  }),
)
@Form.create()
export default class TestPageContainer extends React.Component {
  static propTypes = {
    count: P.number, // 来自store - test model中的全局变量count
    location: P.any, // 自动注入的location对象
    match: P.any, // 自动注入的match对象
    history: P.any, // 自动注入的history对象
    actions: P.object, // 上面model中定义的actions对象，自动成为this.props.actions变量
    form: P.any, // antd的form表单高阶组件自动注入的form对象
  };

  /** react生命周期 - 构造函数 **/
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 模态框隐藏和显示
      mokeFetch: [], // 用于测试fetch请求
      mokeAjax: [], // 用于测试ajax请求
      count: 0, // 数字
    };
  }

  /** react生命周期 - 废弃 - 组件初始化完毕DOM挂载之前 触发1次 **/
  UNSAFE_componentWillMount() {}

  /** react生命周期 - 组件初始化完毕DOM挂载完毕后 触发1次 **/
  componentDidMount() {
    console.log('所有页面默认拥有的3个对象：', this.props.location, this.props.match, this.props.history);
    const set = new Set([1, 2, 3]);
    const map = new Map();
    console.log('Set 和 Map 测试:', set, map);

    const a = { a: 1, b: 2, c: 3 };
    const b = { d: 4, ...a };
    console.log('obj的扩展运算符测试：', b);

    // 获取用户信息测试
    this.props.actions
      .getUserinfo({ id: 1 })
      .then(res => {
        console.log('获取用户信息测试：', res);
      })
      .catch(() => {
        console.log('Promise catch');
      })
      .finally(() => {
        console.log('Promise finally');
      });
  }

  /**
   * react生命周期 - 是否执行下一次render
   * 当有props或state改变时，可手动决定是否更新
   * @param nextProps 下一轮最新的props对象
   * @param nextState 下一轮最新的state对象
   * @returns {boolean} 返回true表示更新，返回false表示跳过本次render
   */
  shoudComponentUpdate(nextProps, nextState) {
    return true;
  }

  /**
   * react生命周期 - 废弃 - 是否执行下一次render
   * props对象有变化时触发
   * @param nextProps 变化后的最新的props
   */
  UNSAFE_componentWillReceiveProps(nextProps) {}

  /**
   * react生命周期 - props改变时触发
   * @param nextProps 下一轮最新的props对象
   * @param prevState 当前的state对象
   * @returns {object} 返回一个对象或null，如果返回对象将自动覆盖this.state中对应的值
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.count !== prevState.count) {
      return {
        count: nextProps.count,
      };
    }
    return null;
  }

  /**
   * react生命周期 - 废弃 - 每次组件的props和state有变动时，触发1次
   * @param nextProps 下一轮最新的props
   * @param nextStates 下一轮最新的state
   */
  UNSAFE_componentWillUpdate(nextProps, nextStates) {}

  /** react生命周期
   * 在下一轮render即将开始时触发，比componentWillUpdate后执行
   * 即合并了所有的this.setState操作，最后真正要开始render时触发
   * 不应该在这里调用this.setState，会进入死循环
   * @param prevProps 当前的this.props对象
   * @param prevState 当前的this.state对象
   * @returns {any} 返回值将作为componentDidUpdate的第3个参数传入
   * **/
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return null;
  }

  /**
   * react生命周期 - 每次组件的props参数或state参数改变引起重新render完成后，触发1次
   * @param prevProps render完成后当前的this.props对象
   * @param prevState render完成后当前的this.state对象
   */
  componentDidUpdate(prevProps, prevState) {}

  /**
   * react生命周期 - 每次当前组件下的子组件中有任何报错时，触发1次
   * 这个方法比componentDidCatch先调用，在state更新之前调用
   * 所以可以在这个方法里改变state值，以显示给用户错误的提示而不会有空窗期
   * @param error 报的是什么错
   */
  static getDerivedStateFromError(error, info) {}

  /**
   * react生命周期 - 每次当前组件下的子组件中有任何报错时，触发1次
   * @param error 报的是什么错
   * @param info 错误的触发记录，会显示代码哪一行报的错
   */
  componentDidCatch(error, info) {}

  /**
   * react生命周期 - 组件即将被卸载时触发
   * **/
  componentWillUnmount() {}

  // 打开模态框按钮被点击时触发
  onBtnClick() {
    this.setState({
      visible: true,
    });
  }

  // 关闭模态框
  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  // Ajax测试按钮被点击时触发（这里是直接在类中定义箭头函数的语法）
  onAjaxClick = () => {
    this.props.actions.serverAjax().then(res => {
      if (res.status === 200) {
        this.setState({
          mokeAjax: res.data,
        });
      } else {
        message.error('获取数据失败');
      }
    });
  };

  // Fetch测试按钮点击时触发
  onFetchClick() {
    this.props.actions.serverFetch().then(res => {
      if (res.status === 200) {
        this.setState({
          mokeFetch: res.data,
        });
      } else {
        message.error('获取数据失败');
      }
    });
  }

  render() {
    const { form } = this.props;

    return (
      <div className="page-test">
        <h1 className="title">功能测试</h1>
        <div className="box">
          <div className="list">
            <h2>引入图片</h2>
            <p>
              <img src={ImgTest} style={{ height: '150px' }} />
              <span className="backImage" />
              <span>上方图片，一张是img,一张是background</span>
              <br />
              <span>请特别注意，现在webpack.production.config.js中的publicPath配置为"/"，</span>
              <br />
              <span>如果你的项目最终打包后放到服务器上的访问路径为https://xxx.com，这没有问题</span>
              <br />
              <span>如果你的项目访问路径为https://xxx.com/aaa，请把webpack.production.config.js中的publicPath配置为"/aaa/"</span>
            </p>
          </div>
          <div className="list">
            <h2>引入其他种类的资源</h2>
            <p>
              <audio src={Mp3} controls />
            </p>
          </div>
          <div className="list">
            <h2>LESS测试</h2>
            <p>
              <span className={'less_btn'}>来自LESS样式</span>
            </p>
          </div>
          <div className="list">
            <h2>Antd组件测试</h2>
            <p>
              <Button type="primary">普通按钮</Button>
              &nbsp;
              <Button type="primary" loading>
                加载中
              </Button>
              &nbsp;
              <Button type="primary" onClick={() => this.onBtnClick()}>
                打开模态框
              </Button>
              &nbsp;
            </p>
          </div>
          <div className="list">
            <h2>location对象测试</h2>
            <p>
              当前路由：
              {this.props.location.pathname}
              <br />
              search参数：
              {this.props.location.search}
              <br />
              state参数：
              {this.props.location.state
                ? Object.entries(this.props.location.state)
                    .map(v => `${v[0]}=${v[1]}`)
                    .join('，')
                : ''}
            </p>
            <p>所有页面都自动被注入location、match、history对象</p>
          </div>
          <div className="list">
            <h2>action测试</h2>
            <p>
              <Button type="primary" onClick={() => this.props.actions.onTestAdd(this.props.count)}>
                通过action改变数据num
              </Button>
              <br />
              store中数据num：
              {this.state.count}
            </p>
          </div>
          <div className="list">
            <h2>异步请求测试（Mock模拟数据）</h2>
            <div className="pbox">
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
            <div className="pbox">
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
          <div className="list">
            <h2>嵌套路由测试</h2>
            <div className="sonTest">
              <Link to={`${this.props.match.url}/Page1`}>子页1</Link>
              <Link to={`${this.props.match.url}/Page2`}>子页2</Link>
              <Link to={`${this.props.match.url}/Page3`}>子页3</Link>
              <Switch>
                <Route exact path={`${this.props.match.url}/`} component={Page1} />
                <Route exact path={`${this.props.match.url}/Page1`} component={Page1} />
                <Route exact path={`${this.props.match.url}/Page2`} component={Page2} />
                <Route exact path={`${this.props.match.url}/Page3`} component={Page3} />
              </Switch>
            </div>
          </div>
        </div>
        <Modal title="模态框" visible={this.state.visible} onOk={() => this.handleCancel()} onCancel={() => this.handleCancel()}>
          <p>内容...</p>
        </Modal>
      </div>
    );
  }
}
