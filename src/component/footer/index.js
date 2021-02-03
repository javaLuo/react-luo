/** Footer 页面底部 **/
import React from "react";
import "./index.less";

export default function Footer() {
  return (
    <div className="footer">
      © 2018-{new Date().getFullYear()}{" "}
      <a
        href="https://blog.isluo.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        blog.isluo.com
      </a>
      , Inc.
    </div>
  );
}
