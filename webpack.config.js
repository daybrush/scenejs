const webpack = require("webpack");
const UglifyJSWebpackPlugin = require("uglifyjs-webpack-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const pkg = require("./package.json");
const TSLintPlugin = require("tslint-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const banner = `Copyright (c) 2018 ${pkg.author}
license: ${pkg.license}
author: ${pkg.author}
repository: ${pkg.repository.url}
@version ${pkg.version}`;

const config = {
	devtool: "source-map",
	entry: {
		// "scene.common": `./src/index.ts`,
		// "scene": `./src/index.umd.ts`,
		"scene.min": `./src/index.umd.ts`,
	},
	output: {
		filename: `./[name].js`,
		path: `${__dirname}/dist/`,
		libraryTarget: "umd",
		umdNamedDefine: true,
		libraryExport: "default",
		library: "Scene",
	},
	mode: "production",
	optimization: {
		minimize: false,
		concatenateModules: false,
	},
	plugins: [
		new BundleAnalyzerPlugin({analyzerMode: "static"}),
		new TSLintPlugin({
			files: ["./src/**/*.ts"],
			project: "./tsconfig.json",
		}),
		new UglifyJSWebpackPlugin({
			include: /\.min\.js$/,
			sourceMap: true,
			uglifyOptions: {
				compress: {
					warnings: false
				},
				output: {
					comments: false,
					beautify: false
				},
			},
		}),
		new webpack.BannerPlugin(banner),
		new StringReplacePlugin(),
	],
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				
				exclude: /(node_modules|bower_components)/,
				loader: "awesome-typescript-loader",
			},
			{
				test: /\.js$/,
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
