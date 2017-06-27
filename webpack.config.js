const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });


const clientConfig = {
    entry: {
        app: './index.tsx'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/.build/client',
        libraryTarget: 'var',
        library: '[name]Module'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, use: 'ts-loader'}
        ]
    },
    context: __dirname + "/app",
    externals: {
        'services': 'servicesModule',
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};

const serverConfig = {
    target: 'node',
    entry: {
        server: './server/index.ts'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/.build/server'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            'services': '../services',
            'server': '../server'
        }
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, use: 'ts-loader'}
        ]
    },
    context: __dirname + "/app",
    externals: nodeModules
};

module.exports = [clientConfig, serverConfig];