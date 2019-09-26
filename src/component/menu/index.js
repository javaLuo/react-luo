/** 导航 **/

import React from 'react';
import { Link } from 'react-router-dom';
import './index.less';

export default function Menu() {
  return (
    <div className="menu">
      <Link to="/home">首页</Link>|<Link to="/features">构建与特性</Link>|
      <Link
        to={{
          pathname: '/test',
          search: '?a=123&b=abc',
          state: { c: '456', d: 'ABC' },
        }}>
        测试(hooks)
      </Link>
      |
      <Link
        to={{
          pathname: '/testclass',
          search: '?a=123&b=abc',
          state: { c: '456', d: 'ABC' },
        }}>
        测试(class)
      </Link>
      |
      <a href="https://github.com/javaLuo/react-luo" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    </div>
  );
}
