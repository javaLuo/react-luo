/* 测试页 */

// ==================
// 所需的各种插件
// ==================

import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import P from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';
import { bindActionCreators } from 'redux';

// ==================
// 所需的所有组件
// ==================

import ImgTest from '../../assets/test.jpg';
import Mp3 from '../../assets/starSky.mp3';

import Page1 from './container/page1';
import Page2 from './container/page2';
import Page3 from './container/page3';

// ==================
// 本页面所需action
// ==================

import { onTestAdd, fetchApi, testPromise } from '../../a_action/app-action';


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

    componentDidMount() {
        // testPromise 测试。可以在此直接拿到结果。同时也会自动走reducer更新state
        // 传1将返回成功，其他数返回失败
        // this.props.actions.testPromise(1).then((res) => {
        //     console.log('返回什么：', res);
        // }).catch(() => {
        //     console.log('错误：');
        // });
        console.log('this.props.location', this.props.location, this.props.match, this.props.history);
    }
    render() {
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
                            search参数：{ this.props.location.search }<br/>
                            state参数：{this.props.location.state ? Object.entries(this.props.location.state).map((v) => `${v[0]}=${v[1]}`).join('，') : ''}
                        </p>
                        <p>所有页面都自动被注入location、match、history对象</p>
                    </div>
                    <div className="list">
                        <h2>action测试</h2>
                        <p>
                            <Button type="primary" onClick={() => this.props.actions.onTestAdd(this.props.num)}>通过action改变数据num</Button>&nbsp;<br/>
                            store中数据num：{this.props.num}
                        </p>
                    </div>
                    <div className="list">
                        <h2>嵌套路由测试</h2>
                        <div className='son-test'>
                            <Link to={`${this.props.match.url}/Page1`} >子页1</Link>
                            <Link to={`${this.props.match.url}/Page2`} >子页2</Link>
                            <Link to={`${this.props.match.url}/Page3`} >子页3</Link>
                            <Switch>
                                <Route exact path={`${this.props.match.url}/`} component={Page1} />
                                <Route exact path={`${this.props.match.url}/Page1`} component={Page1} />
                                <Route exact path={`${this.props.match.url}/Page2`} component={Page2} />
                                <Route exact path={`${this.props.match.url}/Page3`} component={Page3} />
                            </Switch>
                        </div>
                    </div>
                </div>
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
    num: P.number,
    location: P.any,
    actions: P.any,
    match: P.any,
    history: P.any,
};

// ==================
// Export
// ==================


export default connect(
    (state) => ({
        num: state.app.num,
    }), 
    (dispatch) => ({
        actions: bindActionCreators({ onTestAdd, fetchApi, testPromise }, dispatch),
    }),
)(TestPageContainer);

