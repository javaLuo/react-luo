/** Loading组件 用于按需加载时过渡显示等 **/
import React from "react";
import "./index.less";
import ImgLoading from "../../assets/loading.gif";
export default function LoadingComponent(props) {
  function makeType(p) {
    let msg;
    if (p.error) {
      msg = "加载出错，请刷新页面";
    } else if (p.timedOut) {
      msg = "加载超时";
    } else if (p.pastDelay) {
      msg = "加载中…";
    }
    return msg;
  }

  return (
    <div className="loading">
      <img src={ImgLoading} />
      <div>{makeType(props)}</div>
    </div>
  );
}
