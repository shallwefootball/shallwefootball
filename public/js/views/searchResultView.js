define([
	'jquery',
	'backbone',
	'bootstrap',
	'text!templates/searchResult.html',
	'views/playerModalView'
	], function ($, Backbone, Bootstrap, SearchTemplate, PlayerModalView) {

	var SearchResultView = Backbone.View.extend({

		tagName : 'li',

		className : "list-group-item",

		// template : _.template($('#item-template').html()),
		template : _.template(SearchTemplate),

		events : {
			'click a' : 'getInfo'
			// 'click a[data-toggle="modal"]' : 'getInfo'
		},

		initialize : function () {

			// console.log("itemView initialized");
		},

		render : function () {
			var item = this.model.toJSON();
			if(!item.more) {
				this.$el.html(this.template(this.model.toJSON()));
				return this;
			}
		},

		getInfo : function (e) {
			var playerModalView = new PlayerModalView({ model : this.model });
			playerModalView.render();
		}
	});

	return SearchResultView;
})