'use strict'

module.exports = function (grunt) {
	// var config;
	// config = require('./config.js');

	require('jit-grunt')(grunt);

	grunt.initConfig({
		watch: {
			frontend: {
				options: {
					livereload: {
						port: 9000
					}
				},
				files: [
					'public/js/libs/*',
					'public/js/backbone/*',
					'public/js/app/*',
					'public/js/models/*',
					'public/js/collections/*',
					'public/js/views/*',
					'public/js/templates/*'
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