import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";

/** 所需的所有资源 **/
import { Button, Modal, message, Form } from "antd";
import css from "./index.less";
import ImgTest from "../../assets/test.jpg";
import Mp3 from "../../assets/starSky.mp3";
import Page1 from "./container/page1"; // 子页面1
import Page2 from "./container/page2"; // 子页面2
import Page3 from "./container/page3"; // 子页面3

const Hooks = props => {
  // Declare a new state variable, which we'll call "count"
  console.log("props:", props);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(
    () => {
      // Update the document title using the browser API
      console.log("被触发");
      document.title = `You clicked ${String(visible)} times`;
    },
    [visible]
  );

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
            <Button type="primary">普通按钮</Button>
            &nbsp;
            <Button type="primary" loading>
              加载中
            </Button>
            &nbsp;
            <Button type="primary" onClick={() => setVisible(true)}>
              打开模态框({String(visible)})
            </Button>
            &nbsp;
          </p>
        </div>
        <div className={css.list}>
          <h2>location对象测试</h2>
          <p>
            当前路由：
            {props.location.pathname}
            <br />
            search参数：
            {props.location.search}
            <br />
            state参数：
            {props.location.state
              ? Object.entries(props.location.state)
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
              onClick={() =>
                setCount(res => {
                  console.log("res:", res);
                  return ++res;
                })
              }
            >
              通过action改变数据num
            </Button>
            <br />
            store中数据num：
            {count}
          </p>
        </div>
        <div className={css.list}>
          <h2>嵌套路由测试</h2>
          <div className={css.sonTest}>
            <Link to={`${props.match.url}/Page1`}>子页1</Link>
            <Link to={`${props.match.url}/Page2`}>子页2</Link>
            <Link to={`${props.match.url}/Page3`}>子页3</Link>
            <Switch>
              <Route exact path={`${props.match.url}/`} component={Page1} />
              <Route
                exact
                path={`${props.match.url}/Page1`}
                component={Page1}
              />
              <Route
                exact
                path={`${props.match.url}/Page2`}
                component={Page2}
              />
              <Route
                exact
                path={`${props.match.url}/Page3`}
                component={Page3}
              />
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
};

export default Form.create()(Hooks);
