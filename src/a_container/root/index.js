/* 根页 */
import React from 'react';
import P from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// ==================
// Definition
// ==================

class RootContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="boss">
        {this.props.children}
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
