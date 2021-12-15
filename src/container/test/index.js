/** 测试页 **/

/** 所需的各种插件 **/
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, Outlet } from "react-router-dom";

/** 所需的所有资源 **/
import { Modal, Form, Button, message, Input } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import "./index.less";

import ImgTest from "../../assets/test.jpg";
import Mp3 from "../../assets/starSky.mp3";

/** 组件 **/
export default function TestPageContainer() {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.test.count); // 引入test model中的count数据

  const location = useLocation();
  console.log("location:=", location);
  // 引入test model中的add
  const onTestAdd = () => {
    dispatch({
      type: "test/onTestAdd",
    });
  };

  // 引入test model中的fetch异步请求action
  const serverFetch = async () => {
    const res = await dispatch({
      type: "test/serverFetch",
    });
    if (res.status === 200) {
      setMokeFetch(res.data);
    } else {
      message.error("获取数据失败");
    }
  };

  const [visible, setVisible] = useState(false); // 模态框隐藏和显示
  const [mokeFetch, setMokeFetch] = useState([]); // 用于测试异步请求

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  // 仅组件加载完毕时触发一次
  useEffect(async () => {
    // console.log("所有页面默认拥有的3个对象：", location, match, history);
    const set = new Set([1, 2, 3]);
    const map = new Map();
    console.log("Set 和 Map 测试:", set, map);

    const a = { a: 1, b: 2, c: 3 };
    const b = { d: 4, ...a };
    console.log("obj的扩展运算符测试：", b);

    // 获取用户信息测试
    const userInfo = await dispatch({
      type: "app/getUserinfo",
      payload: { id: 1 },
    });
    console.log("获取到userInfo:", userInfo);
  }, []);

  // 表单提交且验证通过时触发
  function handleSubmit(e) {
    message.success("执行了登录操作");
  }

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
            <Form {...layout} onFinish={handleSubmit}>
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: "请输入用户名" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="用户名" />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input
                  type="password"
                  prefix={<KeyOutlined />}
                  placeholder="密码"
                />
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
            {JSON.stringify(location.state)}
          </p>
          <p>所有页面都自动被注入location、match、history对象</p>
        </div>
        <div className="list">
          <h2>action测试</h2>
          <p>
            <Button type="primary" onClick={() => onTestAdd(count)}>
              通过action改变数据num
            </Button>
            <br />
            store中数据num：
            {count}
          </p>
        </div>
        <div className="list">
          <h2>异步请求测试（Mock模拟数据）</h2>
          <div className="pbox">
            <Button type="primary" onClick={serverFetch}>
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
          <Link to="page1">第一页 </Link>
          <Link to="page2">第二页 </Link>
          <Link to="page3">第三页</Link>
          <div className="sonTest">
            <Outlet />
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
