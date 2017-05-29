/* 主页 */

// ==================
// 所需的各种插件
// ==================

import React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import P from 'prop-types';

// ==================
// 所需的所有组件
// ==================

import Meun from '../../a_component/menu';
import ImgLogo from '../../assets/react-logo.jpg';

// ==================
// 本页面所需action
// ==================

import appAction from '../../a_action/app-action';

// ==================
// 最终要交给redux管理的所有变量
// ==================

const mapStoreStateToProps = (state) => ({
  dispatch: state.dispatch,
  testvalue: state.app.inputvalue,
  fetchValue: state.app.fetchvalue,
});

// ==================
// 最终要交给redux管理的所有action
// 既定义哪些方法将成为action
// ==================

const mapDispatches = (dispatch) => ({
  fn: {
  },
});

// ==================
// Definition
// ==================
class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="page-home">
          <div className="box">
              <img src={ImgLogo} />
              <div className="title">React-Luo</div>
              <div className="info">react、redux、webpack2、eslint、babel6、antd</div>
              <Meun />
              <div className="link">
                  © 2017 <a href="http://isluo.com" target="_blank">isluo.com</a>, Inc.
              </div>
          </div>
      </div>
    );
  }
}

// ==================
// PropTypes
// ==================

HomePageContainer.propTypes = {
  dispatch: P.func,
  fn: P.object,
  location: P.any,
  history: P.any,
};

// ==================
// Export
// ==================

export default connect(mapStoreStateToProps, mapDispatches)(HomePageContainer);
