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

import './index.scss';
import ImgLogo from '../../assets/react-logo.jpg';
import ReactTree from '../../a_component/ReactTree';
// ==================
// 本页面所需action
// ==================


// ==================
// Definition
// ==================
class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, pid: null, title: '根节点1'},
        {id:2, pid: 1, title: '0-0'},
        {id:3, pid: 1, title: '0-1'},
        {id:4, pid: 2, title: '0-0-0'},
        {id:5, pid: 2, title: '0-0-1'},
        {id:6, pid: 3, title: '0-1-0'},
        {id:7, pid: 3, title: '0-1-1'},
        {id:8, pid: 3, title: '0-1-2'},
        {id:9, pid: 7, title: '0-1-1-0'},
        {id:10, pid: null, title: '根节点2'},
      ],
      data2: [
        {id: 1, title: '根节点A', children: [
          {id: 2, title: '0-0', children: [
            {id: 4, title: '0-0-0'},
            {id: 5, title: '0-0-1'},
          ]},
          {id: 3, title: '0-1', children: [
            {id: 6, title: '0-1-0'},
            {id: 7, title: '0-1-1', children: [
              {id: 9, title: '0-1-1-0'}
            ]},
            {id: 8, title: '0-1-2'},
          ]}
        ]},
        {id: 10, title: '根节点B', children: []}
      ]
    };
  }

  onOk(obj, keys) {
      console.log('选择返回：', obj, keys);
   }

  render() {
    return (
      <div className="page-home">
          <div style={{width: '500px'}}>
            <ReactTree
              data={this.state.data2}
              dataIsCascade={true}
              checkable={true}
              defaultChecked={[6]}
              defaultDisabled={['6']}
              defaultHide={[9]}
              lengthen={true}
              onOk={(obj,keys) => this.onOk(obj,keys)}
            />
          </div>
          <div className="box">
              <img src={ImgLogo} />
              <div className="title">React-Luo</div>
              <div className="info">react、redux、webpack3、eslint、babel6、antd</div>
          </div>
      </div>
    );
  }
}

// ==================
// PropTypes
// ==================

HomePageContainer.propTypes = {
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
)(HomePageContainer);
