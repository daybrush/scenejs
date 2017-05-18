module.exports = function(grunt) {
//grunt.loadNpmTasks('grunt-jsdoc');
//grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('qunit-tester');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-webpack');
grunt.loadNpmTasks('grunt-jsdoc');



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
        
    }
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
            path: __dirname + "/dist/",
            library: library,
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        watch: !!watch,
        module: moduleConfig,
        plugins: [new ExportPlugin(true)]
    };
}
var watch = grunt.option('watch');
var target =  grunt.option("target");

library("CSS/CSSScene", "Scene");
library("Scenario", "Scenario");

if (target) {
	tester(target);
}
grunt.initConfig(config);


grunt.registerTask('default', ["webpack"]);
grunt.registerTask('maketest', ["tester"]);
grunt.registerTask('test', ["webpack", "qunit"]);
grunt.registerTask('doc', ["jsdoc"]);

}
