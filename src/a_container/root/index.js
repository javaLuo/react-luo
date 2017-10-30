/* 根页 */
import React from 'react';
import { Router, BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import P from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createHistory from 'history/createBrowserHistory';
/* 下面是代码分割异步加载的例子 */
import Bundle from '../../a_component/bundle';
import lazeHome from 'bundle-loader?lazy!../home';
import lazeFeatures from 'bundle-loader?lazy!../features';
import lazeTest from 'bundle-loader?lazy!../test';
import lazeNotFound from 'bundle-loader?lazy!../notfound';
const Home = (props) => (
  <Bundle load={lazeHome}>
    {(Home) => <Home {...props} />}
  </Bundle>
);
const Features = (props) => (
  <Bundle load={lazeFeatures}>
    {(Features) => <Features {...props} />}
  </Bundle>
);
const Test = (props) => (
  <Bundle load={lazeTest}>
    {(Test) => <Test {...props} />}
  </Bundle>
);
const NotFound = (props) => (
  <Bundle load={lazeNotFound}>
    {(NotFound) => <NotFound {...props} />}
  </Bundle>
);
/* 上面是代码分割异步加载的例子 */

/* 下面是代码不分割的用法 */
// import Home from '../home';
// import Features from '../features';
// import Test from '../test';
// import NotFound from '../notfound';

import Menu from '../../a_component/menu';
import Footer from '../../a_component/footer';

const history = createHistory();
class RootContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ([
      <Router history={history} key="history">
        <Route render={(props) => {
          return (
            <div className="boss">
                <Switch>
                  <Redirect exact from='/' to='/home' />
                  <Route path="/home" component={Home} />
                  <Route path="/features" component={Features} />
                  <Route path="/test" component={Test} />
                  <Route component={NotFound} />
                </Switch>
                <Menu />
            </div>
          );
        }}/>
      </Router>,
      <Footer key="footer"/>
    ]);
  }
}

// ==================
// PropTypes
// ==================

RootContainer.propTypes = {
  dispatch: P.func,
  children: P.any,
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
)(RootContainer);
