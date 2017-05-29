var path    = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        vendor: [
            'react',
            'react-dom',
            'antd',
            'babel-polyfill',
            'lodash',
            'react-redux',
            'react-router',
            'react-router-redux',
            'redux',
            'redux-thunk',
            'reqwest',
            'prop-types'
        ]
    },
    output: {
        path: path.join(__dirname, 'build', 'dev'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'build', 'dev', '[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
};