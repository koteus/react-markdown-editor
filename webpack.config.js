'use strict';

var path = require('path');

var config = {
    entry: path.join(__dirname, 'app', 'app.js'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    }
};

if (process.env.NODE_ENV !== 'production') {
    config.cache = true;
    config.devtool = 'source-map';
}

module.exports = config;
