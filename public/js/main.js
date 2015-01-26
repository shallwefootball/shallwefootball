
require([
	'backbone',
	'views/searchResultListView'
	], function (Backbone, SearchResultsView) {
		var Router = Backbone.Router.extend({
			routes: {
				'league/:leagueId/club/:clubId' : 'clubView'
			},

			initialize : function () {

				new SearchResultsView();
				console.log('initialize and new SearchResultsView()');
			}

		});

		var router = new Router();
		Backbone.history.start({pushState: true, root: '/'});
		router.navigate(location.pathname, {trigger: true});

});
