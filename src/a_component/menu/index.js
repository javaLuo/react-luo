import React from 'react';
import { NavLink } from 'react-router-dom';
import P from 'prop-types';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 5,
        };
    }

    // 组件初始化完毕时触发
    componentDidMount() {
    }

    render() {
        return (
            <div className="menu">
                <NavLink to="/home">首页</NavLink>|
                <NavLink to="/features">构建与特性</NavLink>|
                <NavLink to={{ pathname: '/test', search: '?a=123&b=abc', state: { c: '456', d: 'ABC'} }}>测试页面</NavLink>|
                <a href="https://github.com/javaLuo/react-luo" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
        );
    }
}

Menu.propTypes = {
    value: P.number,
    onClick: P.func,
    fetchValue: P.array,
};

export default Menu;
