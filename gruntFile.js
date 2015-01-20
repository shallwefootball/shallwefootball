'use strict'

module.exports = function (grunt) {
	// var config;
	// config = require('./config.js');

	require('jit-grunt')(grunt);

	grunt.initConfig({
		watch: {
			frontend: {
				options: {
					livereload: true
					// livereload: {
					// 	port: 3026
					// }
				},
				files: [
					'app/views/club/*',
					'app/views/formation/*',
					'app/views/js/*',
					'app/views/jumbotron/*',
					'app/views/layout/*',
					'app/views/league/*',
					'app/views/match/*',
					'app/views/modal/*',
					'app/views/player/*',
					'app/views/record/*',
					'app/views/table/*',
					'app/views/team/*',
					'gruntFile.js',
					'public/js/libs/*',
					'public/js/backbone/*',
					'public/js/app/*',
					'public/js/models/*',
					'public/js/collections/*',
					'public/js/views/*',
					'public/js/templates/*',
					'public/js/*'
				]
			}
		},
		nodemon: {
			dev: {
				// nodemon application name
				script: 'server.js',
				options : {

					ignore: [
						'public/*'
					]
				}
			}
		},
		concurrent: {
			frontend : {
				tasks: [ "watch:frontend", "nodemon"],
				options: {
					logConcurrentOutput: true
				}
			}
		}

	});

	grunt.registerTask('default', ['concurrent:frontend']);
}