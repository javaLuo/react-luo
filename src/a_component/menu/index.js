import React from 'react';
import { Link } from 'react-router';
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
                <Link to="/home">首页</Link>|
                <Link to="/features">构建与特性</Link>|
                <Link to={{ pathname: '/tests', query: { t1: 123, t2: 'abc' } }}>测试页面</Link>|
                <a href="https://github.com/javaLuo/react-luo" target="_blank">GitHub</a>
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
