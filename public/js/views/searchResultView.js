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

		template : _.template(SearchTemplate),

		events : {
			'click a' : 'getInfo',
			'click .transfer' : 'transfer'
		},

		initialize : function () {

			// console.log("itemView initialized");
		},

		render : function () {
			var item = this.model.toJSON();
			if(!item.more) {
				this.$el.html(this.template({
					player : item,
					user : USER
				}));
				return this;
			}
		},

		getInfo : function (e) {
			var playerModalView = new PlayerModalView({ model : this.model });
			playerModalView.render();
		},

		transfer : function () {

			var clubId 	   = USER.currentLeague[0].clubId,
				teamName   = USER.currentLeague[0].teamName,
				userId     = this.model.attributes.userId;
				playerName = this.model.attributes.playerName;

			var Player = Backbone.Model.extend({
				sync : function (method, model, options) {

					switch (method) {
						case 'create' :
							options.url = '/club/' + clubId + '/user/' + userId;
							break;
					}
					return Backbone.sync(method, model, options);
				}
			});

			var newPlayer = new Player();
			// newPlayer.save();
			newPlayer.save();
			newPlayer.on('sync', function (event, callback, context){
				if(callback.message == 'success'){
					alert('"' + teamName + '" 팀에 "' + playerName + '"님이 추가되었습니다.');
					location.reload();
				}else{
					alert('추가 실패');
				}
			});

			console.log('transfer~~', clubId, userId);
		}

	});

	return SearchResultView;
})