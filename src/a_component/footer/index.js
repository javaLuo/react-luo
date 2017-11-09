/* Footer 页面底部 */
import React from 'react';
import P from 'prop-types';
import './index.scss';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="footer">
                © 2017 <a href="http://isluo.com" target="_blank" rel="noopener noreferrer">isluo.com</a>, Inc.
            </div>
        );
    }
}

Footer.propTypes = {
};

export default Footer;
