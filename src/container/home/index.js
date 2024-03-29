/** 主页 **/

/** 所需的各种插件 **/
import React from "react";
import { useStore } from "react-redux";

/** 所需的各种资源 **/
import "./index.less";
import ImgLogo from "../../assets/react-logo.jpg";

export default function HomePageContainer(props) {
  const store = useStore();
  console.log("store:", store);
  console.log("what props:", props);
  return (
    <div className="page-home all_nowarp">
      <div className="box">
        <img src={ImgLogo} />
        <div className="title">React-Luo</div>
        <div className="info">
          react17、redux4、router6、webpack5、eslint、babel7、antd4
        </div>
      </div>
    </div>
  );
}
