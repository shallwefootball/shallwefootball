define([
	'jquery',
	'backbone',
	'text!templates/playerModal.html'
	], function ($, Backbone, PlayerModal) {

	var PlayerModalView = Backbone.View.extend({

		className: 'modal fade',

		template : _.template(PlayerModal),

		events : {
			'click button.loveCall' : 'loveCall',
			'click button.loveCalled' : 'removeLoveCall',
			'hidden.bs.modal' : 'removeModal'
		},

		initialize : function () {
			console.log('initialize');
			this.listenTo(this.model, 'change', function () {
				this.$('.loveCall').removeClass('loveCall').addClass('loveCalled').html('러브콜을 보냈습니다.<i class="fa fa-plus"></i>');
			});

		},

		render : function () {
			this.$el.attr('tabindex', -1).attr('role', 'dialog').attr('aria-hidden', true).attr('aria-labelledby', 'playerTitle');

			this.$el.html(this.template({
					player : this.model.toJSON(),
					user : USER
				}
			)).modal();
			return this;
		},

		loveCall : function () {
			console.log('click loveCall');
			this.model.save();
		},

		removeLoveCall : function () {

			this.model.set({playerId : '12341234'});
			console.log('destroy!', this.model);
			this.model.destroy();
			// this.model.destroy({success: function (model, res){
			// 	console.log('destroy.model  : ', model);
			// 	console.log('destroy.res  : ', res);
			// 	this.$('.loveCalled').removeClass('loveCalled').addClass('loveCall').html('러브콜 보내기<i class="fa fa-plus"></i>');
			// }});
		},

		removeModal: function() {
			this.remove();
        }
	})

	return PlayerModalView;
});