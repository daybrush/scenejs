module.exports = function(grunt) {
//grunt.loadNpmTasks('grunt-jsdoc');
//grunt.loadNpmTasks('grunt-contrib-concat');
//grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-webpack');

var Test = require("comment-plugin");
var moduleConfig =  {
    loaders:  [
        {
        	test:  /\.js$/,
			loader: 'comment-loader',
			query: {
				presets: ['es2015'],
			}
		}
	]
};

grunt.initConfig({
	qunit: {
		all : ["./test/Timeline.html"]
	},
    webpack: {
        timeline: {
            entry: './src/Timeline.js',
            output: {
                filename: 'Timeline.js',
                path: __dirname + "/dist/",
                library: 'Timeline',
            },
            module: moduleConfig,
            plugins: [new Test()]
        }
    }
});


grunt.registerTask('default', ["webpack:timeline"]);
grunt.registerTask('test', ["qunit"]);

}
