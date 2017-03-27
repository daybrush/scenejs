module.exports = function(grunt) {
//grunt.loadNpmTasks('grunt-jsdoc');
//grunt.loadNpmTasks('grunt-contrib-concat');
//grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-webpack');

var ExportPlugin = require("es6-export-plugin");
var moduleConfig =  {
    loaders:  [
        {
        	test:  /\.js$/,
			loader: 'comment-loader'
		}
	]
};
var obj = {};
function library(name) {
    return {
        entry: `./src/{name}.js`,
        output: {
            filename: `./{name}.js`,
            path: __dirname + "/dist/",
            library: name,
        },
        module: moduleConfig,
        plugins: [new ExportPlugin()]
    };
}

grunt.initConfig({
	qunit: {
		all : ["./test/Timeline.html"]
	},
    webpack: {
        timeline: library("Timeline"),
    }
});


grunt.registerTask('default', ["webpack:timeline"]);
grunt.registerTask('test', ["qunit"]);

}
