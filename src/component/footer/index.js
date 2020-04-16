/** Footer 页面底部 **/
import React from "react";
import "./index.less";

export default function Footer(props) {
  return (
    <div className="footer">
      © 2018-2020{" "}
      <a
        href="https://blog.isluo.com"
        target="_blank"
        rel="noopener noreferrer">
        isluo.com
      </a>
      , Inc.
    </div>
  );
}
