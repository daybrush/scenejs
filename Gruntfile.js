module.exports = function(grunt) {
//grunt.loadNpmTasks('grunt-jsdoc');
//grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('qunit-tester');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-webpack');
grunt.loadNpmTasks('grunt-jsdoc');
grunt.loadNpmTasks('grunt-contrib-uglify');



var ExportPlugin = require("es6-export-plugin");
var moduleConfig =  {
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
var obj = {};
var config = {
	jsdoc : {
		dist : {
			src: ['./src/*.js', "./src/CSS/*.js", "./src/Util/*.js"],
			options: {
				destination: 'doc',
				template: "./template"
			}
		}
	},
	qunit: {
		all : ["./test/*.html", "./test/Util/*.html"]
	},
	webpack: {
	},
	tester: {
		
	},
	uglify: {
		
	},
};
function tester(target) {
	config.tester.test = {
		title: "Scene.js",
		dest: "./dist/Scene.js",
		test: "./test/",
		target
	}
}

function library(name, library, watch = false) {
	config.webpack[name] = {
		entry: `./src/${name}.js`,
		output: {
			filename: `./${library}.js`,
			path: `${__dirname}/dist/`,
			libraryTarget: 'umd',
			umdNamedDefine: true,
			library
		},
		watch: !!watch,
		module: moduleConfig,
		plugins: [
			new ExportPlugin(true),
		],
	};
}
function uglify(src, dist) {
	config.uglify[src] = {
		files: {
			[dist]: src,
		},
	};
}

var watch = grunt.option('watch');
var target =  grunt.option("target");

library("CSS/CSSScene", "Scene");
library("Scenario", "Scenario");
uglify("./dist/Scene.js", "./dist/Scene.min.js");
uglify("./dist/Scenario.js", "./dist/Scenario.min.js");
if (target) {
	tester(target);
}
grunt.initConfig(config);
grunt.registerTask('default', ["webpack", "uglify"]);
grunt.registerTask('maketest', ["tester"]);
grunt.registerTask('test', ["webpack", "qunit"]);
grunt.registerTask('doc', ["jsdoc"]);

}
