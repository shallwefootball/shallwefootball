define([
	'jquery',
	'backbone',
	'views/searchResultView',
	'collections/searchResults'
	], function ($, Backbone, SearchResultView, SearchResults) {

	var searchResultsView = Backbone.View.extend({

		el: $(".navbar-nav"),

		events : {
			'keyup #search': 'getItem'
			// 'focusout #search' : 'clear'
		},

		initialize : function () {
			this.$list = $('ul#results');

			this.listenTo(SearchResults, 'reset', this.addAll);
		},

		getItem : function (e) {

			if(e.key == "Escape") return this.clear();

			var query = $("#search").val();
			if (query !== ''){
				SearchResults.fetch({reset : true});
			}else {
				return this.clear();
			}
		},

		addOne: function (player) {

			var attr = player.attributes;
			if (!attr.more && attr.userId) {
				var view = new SearchResultView({ model: player });
				this.$list.append(view.render().el);
			}else if(!attr.userId && !attr.more) {
				this.$list.append(
					'<li class="list-group-item">' +
					attr.playerName + ' <small class="text-muted">' + attr.teamName + '</small>' +
					'</li>'
				);
			}else {
				this.$list.append(
					'<li class="list-group-item">' +
					'<a href="">' + attr.more + '명의 결과 더 보기</a>' +
					'</li>'
				);
			}
		},

		addAll : function () {

			this.clear();
			SearchResults.each(this.addOne, this);
		},

		clear : function () {
			this.$list.html('');
		}
	});

	return searchResultsView;

});