/** 404 NotFound **/

/** 所需的各种插件 **/
import React from "react";
import { connect } from "react-redux";

/** 所需的所有资源 **/
import css from "./index.less";

@connect(
  state => ({}),
  model => ({
    actions: {}
  })
)
export default class HomePageContainer extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={css.page}>
        <div className={css.box}>404 not found</div>
      </div>
    );
  }
}
