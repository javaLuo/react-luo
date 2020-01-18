/** 测试页 **/

/** 所需的各种插件 **/
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";

/** 所需的所有资源 **/
import { Modal, Form, Button, message, Input, Icon } from "antd";
import "./index.less";

import ImgTest from "../../assets/test.jpg";
import Mp3 from "../../assets/starSky.mp3";
import Page1 from "./container/page1"; // 子页面1
import Page2 from "./container/page2"; // 子页面2
import Page3 from "./container/page3"; // 子页面3

/** 组件 **/
function TestPageContainer({
  count, // 来自store - test model中的全局变量count
  location, // 自动注入的location对象
  match, // 自动注入的match对象
  history, // 自动注入的history对象
  actions, // 上面model中定义的actions对象，自动成为this.props.actions变量
  form // antd的form表单高阶组件自动注入的form对象
}) {
  const [visible, setVisible] = useState(false); // 模态框隐藏和显示
  const [mokeFetch, setMokeFetch] = useState([]); // 用于测试fetch请求
  // const [mokeAjax, setMokeAjax] = useState([]); // 用于测试ajax请求
  const [localCount, setLocalCount] = useState(0); // 数字

  // 仅组件加载完毕时触发一次
  useEffect(() => {
    console.log("所有页面默认拥有的3个对象：", location, match, history);
    const set = new Set([1, 2, 3]);
    const map = new Map();
    console.log("Set 和 Map 测试:", set, map);

    const a = { a: 1, b: 2, c: 3 };
    const b = { d: 4, ...a };
    console.log("obj的扩展运算符测试：", b);

    // 获取用户信息测试
    actions
      .getUserinfo({ id: 1 })
      .then(res => {
        console.log("获取用户信息测试：", res);
      })
      .catch(() => {
        console.log("Promise catch");
      })
      .finally(() => {
        console.log("Promise finally");
      });
  }, []);

  // 当props.count改变时触发
  useEffect(() => {
    setLocalCount(count);
  }, [count]);

  // Fetch测试按钮点击时触发
  function onFetchClick() {
    actions.serverFetch().then(res => {
      if (res.status === 200) {
        setMokeFetch(res.data);
      } else {
        message.error("获取数据失败");
      }
    });
  }

  // 表单提交登录
  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        message.success("执行了登录操作");
      }
    });
  }

  const { getFieldDecorator } = form;

  return (
    <div className="page-test">
      <h1 className="title">功能测试</h1>
      <div className="box">
        <div className="list">
          <h2>引入图片</h2>
          <p>
            <img src={ImgTest} style={{ height: "150px" }} />
            <span className="backImage" />
            <span>上方图片，一张是img,一张是background</span>
            <br />
            <span>
              请特别注意，现在webpack.production.config.js中的publicPath配置为"/"，
            </span>
            <br />
            <span>
              如果你的项目最终打包后放到服务器上的访问路径为https://xxx.com，这没有问题
            </span>
            <br />
            <span>
              如果你的项目访问路径为https://xxx.com/aaa，请把webpack.production.config.js中的publicPath配置为"/aaa/"
            </span>
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
            <span className={"less_btn"}>来自LESS样式</span>
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
            <Button type="primary" onClick={() => setVisible(true)}>
              打开模态框
            </Button>
            &nbsp;
          </p>
        </div>
        <div className="list">
          <h2>Antd表单</h2>
          <div style={{ maxWidth: "400px" }}>
            <Form onSubmit={handleSubmit}>
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "请输入用户名" }]
                })(
                  <Input prefix={<Icon type="user" />} placeholder="用户名" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入密码" }]
                })(
                  <Input
                    type="password"
                    prefix={<Icon type="lock" />}
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="list">
          <h2>location对象测试</h2>
          <p>
            当前路由：
            {location.pathname}
            <br />
            search参数：
            {location.search}
            <br />
            state参数：
            {location.state
              ? Object.entries(location.state)
                  .map(v => `${v[0]}=${v[1]}`)
                  .join("，")
              : ""}
          </p>
          <p>所有页面都自动被注入location、match、history对象</p>
        </div>
        <div className="list">
          <h2>action测试</h2>
          <p>
            <Button type="primary" onClick={() => actions.onTestAdd(count)}>
              通过action改变数据num
            </Button>
            <br />
            store中数据num：
            {localCount}
          </p>
        </div>
        <div className="list">
          <h2>异步请求测试（Mock模拟数据）</h2>
          <div className="pbox">
            <Button type="primary" onClick={onFetchClick}>
              使用的axios库
            </Button>
            <br />
            数据：
            <ul>
              {mokeFetch.map((item, index) => (
                <li key={index}>{`id: ${item.id}, email: ${item.email}`}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="list">
          <h2>嵌套路由测试</h2>
          <div className="sonTest">
            <Link to={`${match.url}/Page1`}>子页1</Link>
            <Link to={`${match.url}/Page2`}>子页2</Link>
            <Link to={`${match.url}/Page3`}>子页3</Link>
            <Switch>
              <Route exact path={`${match.url}/`} component={Page1} />
              <Route exact path={`${match.url}/Page1`} component={Page1} />
              <Route exact path={`${match.url}/Page2`} component={Page2} />
              <Route exact path={`${match.url}/Page3`} component={Page3} />
            </Switch>
          </div>
        </div>
      </div>
      <Modal
        title="模态框"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <p>内容...</p>
      </Modal>
    </div>
  );
}

const FormComponent = Form.create()(TestPageContainer);

export default connect(
  state => ({
    userinfo: state.app.userinfo, // 引入app model中的userinfo数据
    count: state.test.count // 引入test model中的count数据
  }),
  dispatch => ({
    actions: {
      getUserinfo: dispatch.app.getUserinfo, // 引入app model中的获取用户信息action
      onTestAdd: dispatch.test.onTestAdd, // 引入test model中的数字+1 action
      serverFetch: dispatch.test.serverFetch // 引入test model中的fetch异步请求action
    }
  })
)(FormComponent);
