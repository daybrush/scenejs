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
        "scene": `./index.js`,
        "scene.min": `./index.js`,
    },
    output: {
        filename: `./[name].js`,
        path: `${__dirname}/dist/`,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: "Scene",
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