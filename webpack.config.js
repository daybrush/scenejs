const webpack = require("webpack");
const UglifyJSWebpackPlugin = require("uglifyjs-webpack-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const pkg = require("./package.json");

const banner = `Copyright (c) 2018 ${pkg.author}
license: ${pkg.license}
author: ${pkg.author}
repository: ${pkg.repository.url}
@version ${pkg.version}`;

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
		new webpack.BannerPlugin(banner),
	],
	mode: "none",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
			},
			{
				test: /(\.js)$/,
				loader: StringReplacePlugin.replace({
					replacements: [
						{
							pattern: /#__VERSION__#/ig,
							replacement: () => pkg.version,
						},
					],
				}),
			},
		],
	},
};

module.exports = function(env) {
	return config;
};
