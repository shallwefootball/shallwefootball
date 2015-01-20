define(
	['backbone'], function (Backbone) {

	var SearchResult = Backbone.Model.extend({

		idAttribute : 'playerId',

		sync : function (method, model, options) {

			switch (method) {
				case 'create' :
					options.url = '/loveCall/' + this.userId;
					break;
				case 'delete' :
					options.url = '/loveCall/' + this.id;
					break;
			}
			return Backbone.sync(method, model, options);
		}
	});

	return SearchResult;
})