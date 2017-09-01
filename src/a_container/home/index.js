/* 主页 */

// ==================
// 所需的各种插件
// ==================

import React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
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
                  © 2017 <a href="http://isluo.com" target="_blank" rel="noopener noreferrer">isluo.com</a>, Inc.
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

export default connect(
  (state) => ({
    testvalue: state.app.inputvalue,
    fetchValue: state.app.fetchvalue,
  }), 
  (dispatch) => ({
    actions: bindActionCreators({}, dispatch),
  })
)(HomePageContainer);
