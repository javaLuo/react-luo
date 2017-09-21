/* 根页 */
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import P from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../home';
import Features from '../features';
import Test from '../test';
import NotFound from '../notfound';

import Menu from '../../a_component/menu';
import Footer from '../../a_component/footer';
class RootContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  onEnter(v) {
    console.log('onEnter=', v);
    alert('111');
  }

  render() {
    return (
      <div className="boss">
        <BrowserRouter getUserConfirmation={(v) => this.onEnter(v)}>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/features" component={Features} />
              <Route path="/test" component={Test} />
              <Route path="*" component={NotFound} />
            </Switch>
            <Menu />
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
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
