define([
	'jquery',
	'backbone',
	'models/searchResult'
	], function ($, Backbone, SearchResult) {

	var SearchResults = Backbone.Collection.extend({

		model : SearchResult,

		url : function (){
			var query = $("#search").val();
			return '/search/' + query;
		}
	});

	return new SearchResults();
})

