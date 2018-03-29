const UglifyJSWebpackPlugin = require("uglifyjs-webpack-plugin");

const config = {
	entry: {
		"scene": `./src/index.js`,
		"scene.min": `./src/index.js`,
	},
	output: {
		filename: `./[name].js`,
		path: `${__dirname}/dist/`,
		libraryTarget: "umd",
		umdNamedDefine: true,
		library: "Scene",
	},
	plugins: [
		new UglifyJSWebpackPlugin({
			include: /\.min\.js$/,
			uglifyOptions: {
				mangle: {
					keep_fnames: true,
				},
			},
		}),
	],
	mode: "none",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
			},
		],
	},
};

module.exports = function(env) {
	return config;
};
