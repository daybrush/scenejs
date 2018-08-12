const TSLintPlugin = require("tslint-webpack-plugin");

module.exports = {
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"]
	},

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'awesome-typescript-loader'
			}
		]
	},

	plugins: [
		new TSLintPlugin({
			files: ["./src/**/*.ts"],
			project: "./tsconfig.json"
		})
	]
};