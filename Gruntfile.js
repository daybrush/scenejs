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
		},
        {
        	test:  /\.js$/,
			loader: 'comment-loader'
		}  
	]
};
var obj = {};
var config = {
	jsdoc : {
		dist : {
			src: ['./src/*.js'],
			options: {
				destination: 'doc',
				template: "./template"
			}
		}
	},
	qunit: {
		all : []
	},
    webpack: {
    },
    tester: {
        
    }
};
function tester(title, dest, name) {
    config.tester.test = {
        title: title,
        dest: dest,
        test: "./test/",
        target: name
    }
}
function test(name) {
    config.qunit.all.push("./test/" + name +".html");
}
function library(name, libray, watch = false) {
    var library = name.split("/");
    library = library[library.length - 1];
    config.webpack[name] = {
        entry: `./src/${name}.js`,
        output: {
            filename: `./${name}.js`,
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
if(target) {
	test(target);
	library("Scene", watch);	
	tester("Scene.js","./dist/Scene.js", target);
}

grunt.initConfig(config);


grunt.registerTask('default', ["webpack:timeline"]);
grunt.registerTask('test', ["webpack", "tester", "qunit"]);
grunt.registerTask('doc', ["jsdoc"]);

}
