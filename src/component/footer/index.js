/** Footer 页面底部 **/
import React from "react";
import "./index.less";

export default class Footer extends React.PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer">
        © 2018-2019{" "}
        <a href="http://isluo.com" target="_blank" rel="noopener noreferrer">
          isluo.com
        </a>
        , Inc.
      </div>
    );
  }
}
