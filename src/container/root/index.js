/** 根页 - 包含了根级路由 **/

/** 所需的各种插件 **/
import React, { Fragment, lazy, Suspense } from "react";
import { StoreProvider } from "redux-react-hook";
import { Provider } from "react-redux";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import store from "../../store";

// import createHistory from 'history/createBrowserHistory';   // URL模式的history
import createHistory from "history/createHashHistory"; // 锚点模式的history
import Loadable from "react-loadable"; // 用于代码分割时动态加载模块

/** 普通组件 **/
import Menu from "../../component/menu";
import Footer from "../../component/footer";
import css from "./index.less";
import Loading from "../../component/loading"; // loading动画，用于动态加载模块进行中时显示

/** 下面是代码分割异步加载的方式引入各页面 **/
const Home = Loadable({
  loader: () => import("../home"),
  loading: Loading, // 自定义的Loading动画组件
  timeout: 10000 // 可以设置一个超时时间(s)来应对网络慢的情况（在Loading动画组件中可以配置error信息）
});
const Features = Loadable({
  loader: () => import("../features"),
  loading: Loading
});
const Test = Loadable({
  loader: () => import("../test"),
  loading: Loading
});
const Hooks = Loadable({
  loader: () => import("../hooks"),
  loading: Loading
});
const NotFound = Loadable({
  loader: () => import("../notfound"),
  loading: Loading
});

// React原生lazy方式
// const Home = lazy(() => import("../home"));
// const Features = lazy(() => import("../features"));
// const Test = lazy(() => import("../test"));
// const Hooks = lazy(() => import("../hooks"));
// const NotFound = lazy(() => import("../notfound"));

/** 下面是代码不分割的方式引入各页面 **/
// import Home from '../home';
// import Features from '../features';
// import Test from '../test';
// import NotFound from '../notfound';

const history = createHistory(); // 实例化history对象

export default class RootContainer extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 可以手动在此预加载指定的模块：
    //Features.preload(); // 预加载Features页面
    //Test.preload(); // 预加载Test页面
    // 也可以直接预加载所有的异步模块
    // Loadable.preloadAll();
  }

  /** 简单权限控制 **/
  onEnter(Component, props) {
    // 例子：如果没有登录，直接跳转至login页
    // if (sessionStorage.getItem('userInfo')) {
    //   return <Component {...props} />;
    // } else {
    //   return <Redirect to='/login' />;
    // }

    return <Component {...props} />;
  }

  componentDidCatch(e) {
    console.log("报错了：", e);
  }
  render() {
    return (
      <StoreProvider value={store}>
        <Fragment>
          <Router history={history}>
            <Route
              render={() => {
                return (
                  <div className={css.boss}>
                    <Switch>
                      <Redirect exact from="/" to="/home" />
                      <Route
                        path="/home"
                        render={props => this.onEnter(Home, props)}
                      />
                      <Route
                        path="/features"
                        render={props => this.onEnter(Features, props)}
                      />
                      <Route
                        path="/test"
                        render={props => this.onEnter(Test, props)}
                      />
                      <Route
                        path="/hooks"
                        render={props => this.onEnter(Hooks, props)}
                      />
                      <Route component={NotFound} />
                    </Switch>
                    <Menu />
                  </div>
                );
              }}
            />
          </Router>
          <Footer />
        </Fragment>
      </StoreProvider>
    );
  }
}
