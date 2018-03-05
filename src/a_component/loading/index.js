/** Loading组件 用于按需加载时过渡显示等 **/
import React from "react";
import css from "./index.scss";
import ImgLoading from "../../assets/loading.gif";
export default class Footer extends React.PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={css.loading}>
        <img src={ImgLoading} />
        <div>Loading...</div>
      </div>
    );
  }
}
