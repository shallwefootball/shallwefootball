/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		jquery: {
			exports: '$'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		bootstrap: {
			deps: ['jquery'],
			exports: 'Bootstrap'
		},
		nprogress: {
			deps: ['jquery'],
			exports: 'NProgress'
		}
	},
	paths: {
		jquery: '../../bower_components/jquery/dist/jquery',
		bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
		underscore: '../../bower_components/underscore/underscore',
		backbone: '../../bower_components/backbone/backbone',
		text: '../../bower_components/requirejs-text/text',
		nprogress: '/js/libs/nprogress'

	},

	deps: [
		"main",
		"app/page-nprogress"
	]
});