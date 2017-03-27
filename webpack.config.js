var moduleConfig =  {
	loaders: [
		{
        	test:  /\.js$/,
			loader: 'babel-loader',
//			query: {
//				presets: ['es2015'],
//			}
		}
	]
};
module.exports = [
{
	entry: './vod.js',
	output: {
		filename: 'vod.js',
		path: "./dist/",
		libraryTarget: 'umd',
		library: 'Player',
		umdNamedDefine: true
	},
	module: moduleConfig
},
{
	entry: './live.js',
	output: {
		filename: 'live.js',
		path: "./dist/",
		libraryTarget: 'umd',
		library: 'Player',
		umdNamedDefine: true
	},
	module: moduleConfig
},
{
	entry: './mobilevod.js',
	output: {
		filename: 'mobilevod.js',
		path: "./dist/",
		libraryTarget: 'umd',
		library: 'Player',
		umdNamedDefine: true
	},
	module: moduleConfig
},
/*
{
	entry: './hls.js/transmuxer/TSTransmuxer.js',
	output: {
		filename: 'TSTransmuxer.js',
		path: "./dist/",
		libraryTarget: 'umd',
		library: 'TSTransmuxer',
		umdNamedDefine: true
	},
	module: moduleConfig
}
,
{
	entry: './hlsplayer.js/hlsplayer.js',
	output: {
		filename: 'hlsplayer.js',
		path: "./dist/",
		libraryTarget: 'umd',
		library: 'HLSPlayer',
		umdNamedDefine: true
	},
	module: moduleConfig
}
*/

]
