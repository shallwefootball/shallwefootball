!function () {

	var Search = Search || {};

	var playerModal = {};

	playerModal.View = Backbone.View.extend({

		template : _.template($('#player-modal-template').html()),

		events : {
			'click button.loveCall' : 'loveCall',
			'click button.loveCalled' : 'removeLoveCall',
		},

		initialize : function () {
			// this.listenTo(this.model, 'change', function(){
			// 	console.log('initialize  saved!!!');
			// });
		},

		render : function () {


			this.$el.html(this.template({
					player : this.model.toJSON(),
					user : serverUser
				}
			));
			return this;
		},

		loveCall : function () {
			console.log('click loveCall');
			this.model.save();
		},

		removeLoveCall : function () {

			this.model.set({playerId : '12341234'});
			this.model.destroy();
			console.log('destroy!', this.model);
		}

	})

	Search.Item = Backbone.Model.extend({

		idAttribute : 'playerId',

		sync : function (method, model, options) {

			switch (method) {
				case 'read' :
					options.url = '/search/' + $("#search").val();
					break;
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

	Search.ItemList = Backbone.Collection.extend({

		model : Search.Item,

		// url : '/loveCall',
		url : function (){
			var query = $("#search").val();
			return '/search/' + query;
		}
	});

	Search.ItemView = Backbone.View.extend({

		tagName : 'li',

		className : "list-group-item",

		template : _.template($('#item-template').html()),

		events : {
			'click a[data-toggle="modal"]' : 'getInfo'
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
			playerModalView = new playerModal.View({ model : this.model });
			$(".playerModal").html(playerModalView.render().el);
			$(".playerModal").modal('show');
		}
	});

	Search.AppView = Backbone.View.extend({

		el: $(".navbar-nav"),

		events : {
			'keyup #search': 'getItem'
		},

		initialize : function () {
			this.$list = $('ul#results');

			Search.itemList = new Search.ItemList;
			this.listenTo(Search.itemList, 'reset', this.addAll);
		},

		getItem : function (e) {

			if(e.key == "Esc") return this.clear();

			var query = $("#search").val();
			if (query !== ''){
				Search.itemList.fetch({reset : true});
			}else {
				return this.clear();
			}
		},

		addOne: function (player) {

			var attr = player.attributes;
			if (!attr.more && attr.userId) {
				var view = new Search.ItemView({ model: player });
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
			Search.itemList.each(this.addOne, this);
		},

		clear : function () {
			this.$list.html('');
		}
	});

	new Search.AppView();

}();