var webpack = require("webpack");
var UglifyJSWebpackPlugin = require("uglifyjs-webpack-plugin");

var moduleConfig = {
    rules:  [
		{
			test:  /\.js$/,
			loader: 'babel-loader'
		}
	]
};
var config = {
    entry: {
        "stopmotion": `./index.js`,
        "stopmotion.min": `./index.js`,
    },
    output: {
        filename: `./[name].js`,
        path: `${__dirname}/dist/`,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: "StopMotion",
    },
	plugins: [
		new UglifyJSWebpackPlugin({
            include: /\.min\.js$/,
        }),
	],
    module: moduleConfig
};

module.exports = function (env) {
    return config;
}