/* 测试页 */

// ==================
// 所需的各种插件
// ==================

import React from 'react';
import P from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Modal } from 'antd';

// ==================
// 所需的所有组件
// ==================

import Menu from '../../a_component/menu';
import ImgTest from '../../assets/test.jpg';
import Mp3 from '../../assets/starSky.mp3';

// ==================
// 本页面所需action
// ==================

import appAction from '../../a_action/app-action';

// ==================
// 最终要交给redux管理的所有变量
// ==================

const mapStoreStateToProps = (state) => ({
    dispatch: state.dispatch,
    num: state.app.num,
});

// ==================
// 最终要交给redux管理的所有action
// 既定义哪些方法将成为action
// ==================

const mapDispatches = (dispatch) => ({
    fn: {
        onTestAdd: (num) => {
            dispatch(appAction.onTestAdd(num));
        },
    },
});

// ==================
// Definition
// ==================
class TestPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, // 模态框隐藏和显示
        };
    }

    onBtnClick() {
        this.setState({
            visible: true,
        });
    }

    handleOk() {
        this.setState({
            visible: false,
        });
    }

    handleCancel() {
        this.setState({
            visible: false,
        });
    }

    render() {
        console.log(this.props.location);
        return (
            <div className="page-test">
                <h1 className="title">功能测试</h1>
                <div className="box">
                    <div className="list">
                        <h2>引入图片</h2>
                        <p><img src={ImgTest} style={{ height: '150px' }}/></p>
                    </div>
                    <div className="list">
                        <h2>引入其他种类的资源</h2>
                        <p><audio src={Mp3} controls/></p>
                    </div>
                    <div className="list">
                        <h2>LESS、SASS测试</h2>
                        <p>
                            <span className='less_btn'>来自LESS样式</span>&nbsp;
                            <span className='scss_btn'>来自SASS样式</span>
                        </p>
                    </div>
                    <div className="list">
                        <h2>Antd组件测试</h2>
                        <p>
                            <Button type="primary">
                              普通按钮
                            </Button>&nbsp;
                            <Button type="primary" loading>
                              加载中
                            </Button>&nbsp;
                            <Button type="primary" onClick={() => this.onBtnClick()}>
                              打开模态框
                            </Button>&nbsp;
                        </p>
                    </div>
                    <div className="list">
                        <h2>location对象测试</h2>
                        <p>
                            当前路由：{ this.props.location.pathname }<br/>
                            当前路由参数：{ Object.keys(this.props.location.query).map((v, i) => `${v}: ${this.props.location.query[v]}`).join('，') }
                        </p>
                    </div>
                    <div className="list">
                        <h2>action测试</h2>
                        <p>
                            <Button type="primary" onClick={() => this.props.fn.onTestAdd(this.props.num)}>通过action改变数据num</Button>&nbsp;<br/>
                            store中数据num：{this.props.num}
                        </p>
                    </div>
                </div>
                <Menu />
                <Modal
                  title="模态框"
                  visible={this.state.visible}
                  onOk={() => this.handleOk()}
                  onCancel={() => this.handleCancel()}
                >
                  <p>内容...</p>
                </Modal>
            </div>
        );
    }
}

// ==================
// PropTypes
// ==================

TestPageContainer.propTypes = {
    dispatch: P.func,
    fn: P.object,
    num: P.number,
    location: P.any,
};

// ==================
// Export
// ==================

export default connect(mapStoreStateToProps, mapDispatches)(TestPageContainer);
