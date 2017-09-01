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

import Menu from '../../a_component/menu';

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
            <h2>打包静态资源</h2>
            <p>npm run dll</p>
            <div>代码中用到的npm包将被预编译到/build/dev 文件夹下</div>
            <div>您应该首先执行这一步。然后在接下来的开发过程中就不需要执行这一步了</div>
            <div>静态资源预编译将有效的缩短开发过程中反复修改保存时代码重编译的时间</div>
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
        </div>
        <Menu />
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
