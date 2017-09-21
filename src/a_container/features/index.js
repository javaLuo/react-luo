/* 主页 */

// ==================
// 所需的各种插件
// ==================

import React from 'react';
import P from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
// ==================
// 所需的所有组件
// ==================


// ==================
// 本页面所需action
// ==================

import appAction from '../../a_action/app-action';

// ==================
// Definition
// ==================
class FeaturesPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="page-features">
        <h1 className="title">构建与特性</h1>
        <div className="box">
          <div className="list">
            <h2>安装依赖文件</h2>
            <p>npm install</p>
          </div>
          <div className="list">
            <h2>启动开发环境</h2>
            <p>npm run dev</p>
            <div>代码打包编译，默认监听8888端口</div>
            <div>访问http://localhost:8888 即可查看</div>
          </div>
          <div className="list">
            <h2>正式打包</h2>
            <p>npm run build</p>
            <div>会将最终代码打包至/build文件夹中</div>
            <div>/build文件夹中的index.html 和 /build/dist文件夹 仅这两样东西是最终需要的</div>
          </div>
          <div className="list">
            <h2>HMR局部热更新</h2>
            <div>使用了react-hot-loader 3.0 实现局部刷新</div>
          </div>
          <div className="list">
            <h2>HappyPack多线程编译</h2>
            <div>使用了HappyPack插件，使编译速度更快</div>
          </div>
        </div>
      </div>
    );
  }
}

// ==================
// PropTypes
// ==================

FeaturesPageContainer.propTypes = {
  location: P.any,
  history: P.any,
};

// ==================
// Export
// ==================

export default connect(
  (state) => ({
  }), 
  (dispatch) => ({
    actions: bindActionCreators({}, dispatch),
  })
)(FeaturesPageContainer);
