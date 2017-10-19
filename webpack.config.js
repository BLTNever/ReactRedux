const fs = require('fs');
const path = require('path');
const webpack = require('atool-build/lib/webpack');
const pxtorem = require('postcss-pxtorem');
module.exports = function (webpackConfig, env) {
    webpackConfig.babel.plugins.push('transform-runtime');
    // Support hmr
    //去掉commonjs
    webpackConfig.plugins.shift();
    webpackConfig.babel.plugins.push(['import', [{ libraryName: 'antd', style: true }]]);

    if (env === 'development') {
        webpackConfig.output.path = path.join(__dirname, './build');
        webpackConfig.devtool = 'cheap-module-source-map';
        webpackConfig.plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(env)
                }
            })
        );
    } else {
        webpackConfig.externals = {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'redux': 'Redux',
            'react-redux': 'ReactRedux',
            'react-router': 'ReactRouter',
            'react-router-redux': 'ReactRouterRedux'
        }
        //云构建逻辑
        webpackConfig.output.path = path.join(process.cwd(), process.env.BUILD_DEST || 'build');
    }


    //flexible rem布局方案
    // webpackConfig.postcss.push(pxtorem({
    //     rootValue: 75,  //设计稿宽度 / 10
    //     propList: ['*'], //默认所有属性都会转为rem。  配置排除属性示例：propList : ['*', '!*border*']  //排除border、border-top ...
    //     selectorBlackList: [/-usepx$/], //如果className以-usepx结尾，就不会转rem
    //     minPixelValue: 2 // >= 2px，才转为rem
    // }));

    return webpackConfig;
};
