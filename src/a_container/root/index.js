/** 根页 - 包含了根级路由 **/

// ==================
// 所需的各种插件
// ==================
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import P from "prop-types";
// import createHistory from 'history/createBrowserHistory';   // URL模式的history
import createHistory from "history/createHashHistory"; // 锚点模式的history
import Loadable from "react-loadable"; // 用于代码分割时动态加载模块

/** 普通组件 **/
import Menu from "../../a_component/menu";
import Footer from "../../a_component/footer";
import css from "./index.scss";
import Loading from "../../a_component/loading"; // loading动画，用于动态加载模块进行中时显示

/** 下面是代码分割异步加载的方式引入各页面 **/
// import Bundle from "../../a_component/bundle"; // 异步加载高阶组件
// import lazeHome from "bundle-loader?lazy&name=home!../home"; // 首页
// import lazeFeatures from "bundle-loader?lazy&name=features!../features"; // 说明页
// import lazeTest from "bundle-loader?lazy&name=test!../test"; // 功能测试页
// import lazeNotFound from "bundle-loader?lazy&name=notfound!../notfound"; // 404页
// const Home = props => (
//   <Bundle load={lazeHome}>{Home => <Home {...props} />}</Bundle>
// );
// const Features = props => (
//   <Bundle load={lazeFeatures}>{Features => <Features {...props} />}</Bundle>
// );
// const Test = props => (
//   <Bundle load={lazeTest}>{Test => <Test {...props} />}</Bundle>
// );
// const NotFound = props => (
//   <Bundle load={lazeNotFound}>{NotFound => <NotFound {...props} />}</Bundle>
// );
const Home = Loadable({
  loader: () => import("../home"),
  loading: Loading
});
const Features = Loadable({
  loader: () => import("../features"),
  loading: Loading
});
const Test = Loadable({
  loader: () => import("../test"),
  loading: Loading
});
const NotFound = Loadable({
  loader: () => import("../notfound"),
  loading: Loading
});

/** 下面是代码不分割的方式引入各页面 **/
// import Home from '../home';
// import Features from '../features';
// import Test from '../test';
// import NotFound from '../notfound';

const history = createHistory();

// ==================
// 组件
// ==================
@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)
export default class RootContainer extends React.Component {
  static propTypes = {
    dispatch: P.func,
    children: P.any
  };

  constructor(props) {
    super(props);
  }

  /** 权限控制 **/
  onEnter(Component, props) {
    console.log("权限控制：", props);
    // 例子：如果没有登录，直接跳转至login页
    // if (sessionStorage.getItem('userInfo')) {
    //   return <Component {...props} />;
    // } else {
    //   return <Redirect to='/login' />;
    // }
    return <Component {...props} />;
  }

  render() {
    return [
      <Router history={history} key="history">
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
                  <Route component={NotFound} />
                </Switch>
                <Menu />
              </div>
            );
          }}
        />
      </Router>,
      <Footer key="footer" />
    ];
  }
}
