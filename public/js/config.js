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
		jqueryUi: {
			deps: [
				'jquery'
			]
		},
		jqueryUiTouchPunch: {
			deps: [
				'jquery',
				'jqueryUi'
			]
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
		},
		bootstrapValidator: {
			deps: ['jquery'],
			exports: 'BootstrapValidator'
		},
		bootstrapSelect: {
			deps: [
				'bootstrap',
				'bootstrapValidator'
			],
			exports: 'BootstrapSelect'
		}
	},
	paths: {
		jquery: '../../bower_components/jquery/dist/jquery',
		jqueryUi: '/js/libs/jquery-ui-1.10.4.min',
		jqueryUiTouchPunch: '/js/libs/jquery.ui.touch-punch',
		bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
		underscore: '../../bower_components/underscore/underscore',
		backbone: '../../bower_components/backbone/backbone',
		text: '../../bower_components/requirejs-text/text',
		nprogress: '/js/libs/nprogress',
		bootstrapValidator: '../../bower_components/bootstrapValidator/dist/js/bootstrapValidator',
		bootstrapSelect: '/js/libs/bootstrap-select'


	},

	deps: [
		"main",
		"app/app",
		"app/validate"
	]
});