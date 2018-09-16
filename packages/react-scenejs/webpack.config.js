module.exports = {
	devtool: "source-map",
	entry: "./src/index.tsx",
	externals: {
		react: "React",
		"react-dom": "ReactDOM",
	},
	mode: "development",
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"],
	},
	output: {
		filename: "bundle.js",
		path: `${__dirname}/examples`,
		publicPath: "/exmaples/",
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
			{
				test: /\.css$/,
				loader: "style-loader",
			},
			{
				test: /\.css$/,
				loader: "css-loader",
			},
		],
	},
};
