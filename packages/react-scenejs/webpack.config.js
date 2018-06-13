const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const WriteFilePlugin = require("write-file-webpack-plugin");

const JS_DR = path.resolve(__dirname, "examples/apps");


function buildEntries() {
	return fs.readdirSync(JS_DR).reduce((entries, dir) => {
		entries[dir] = path.join(JS_DR, dir);

		return entries;
	}, {});
}


module.exports = {
	devtool: "inline-source-map",
	entry: buildEntries(),
	output: {
		filename: "[name]",
		path: `${__dirname}/examples/build/`,
		publicPath: "/exmaples/build/",
	},
	devServer: {
		contentBase: `${__dirname}/examples`,
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "babel-loader",
			},
			{
				test: /\.css$/,
				use: [
					{loader: "style-loader"},
					{loader: "css-loader"},
				],
			},
		],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons",
			filename: "commons.js",
		}), new WriteFilePlugin(),
	],
};
