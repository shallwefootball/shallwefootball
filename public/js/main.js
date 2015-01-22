
require([
	'backbone',
	'views/searchResultsView'
	], function (Backbone, SearchResultsView){
		var Router = Backbone.Router.extend({
			routes: {
				'backbone/club' : 'clubView'
			},

			initialize : function () {

				new SearchResultsView();
				console.log('initialize and new SearchResultsView()');
			},

			call: function () {
				console.log('call');
			},

			clubView: function () {

				console.log('clubView~~');
			}

		});

		var router = new Router();
		Backbone.history.start({pushState: true, root: '/'});
		router.navigate(location.pathname, {trigger: true});

});
