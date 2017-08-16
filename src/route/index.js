import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';

// ===================
// Containers
// ===================

import RootContainer from '../a_container/root';
import HomeContainer from '../a_container/home/index';
import FeaturesContainer from '../a_container/features/index';
import TestContainer from '../a_container/test/index';

// ===================
// 异步加载container 代码分割按需加载
// ===================

// 如果某个路由页面需要代码分割，就像下面这样配置
// 最下面<Route>标签中，就不是component={...},而要用getComponent={...}
//而下面的TestContainer就要定义成一个方法
const TestContainer2 = (nextState, cb) => {
  require.ensure([], require => {
//如果使用的是ES6的模块，那么模块中肯定有一个export default,所以下面第2个参数后面就是要加载这个default对象
    cb(null, require('../a_container/features/index').default);
  }, 'features');
};
/*
	require.ensure 参数
	1：一个字符串数组，在所有的回调函数执行前，可以将所有依赖的模块在这个数组中声明
	2：回调函数，当第1个参数依赖的模块加载完后，就执行此方法
	3：生成的js文件的名字
*/

// ===================
// Exports
// ===================

// 可以在这里写一些在路由即将被改变时触发的函数
// 可以用参数replace改变接下来的路由地址
const requireAuth = (nextState, replace) => {
    // replace({ pathname: '/login' });
};

export default (
  <Route path="/" component={RootContainer}>
    <IndexRedirect to="/home" />
    <Route onEnter={requireAuth} path="/home" component={HomeContainer} />
    <Route onEnter={requireAuth} path="/features" component={FeaturesContainer} />
    <Route onEnter={requireAuth} path="/tests" component={TestContainer} />
    <Redirect from='*' to='/'  />
  </Route>
);
