var webpack = require("webpack");

var moduleConfig = {
    loaders:  [
		{
			test:  /\.js$/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015'],
			}
		}
	]
};
var config = {
    entry: `./index.js`,
    output: {
        filename: `./StopMotion.js`,
        path: `${__dirname}/dist/`,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: "StopMotion",
    },
    module: moduleConfig
};

module.exports = function (env) {
    return config;
}