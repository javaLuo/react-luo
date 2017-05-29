/* 根页 */
import React from 'react';
import P from 'prop-types';
import { connect } from 'react-redux';

// ==================
// Import Components
// ==================

// ==================
// Map store states to props
// ==================

const mapStoreStateToProps = (state) => ({
  dispatch: state.dispatch,
});

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

export default connect(mapStoreStateToProps)(RootContainer);
