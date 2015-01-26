define([
	'jquery',
	'backbone',
	'text!templates/playerModal.html'
	], function ($, Backbone, PlayerModal) {

	var PlayerModalView = Backbone.View.extend({

		className: 'modal fade',

		template : _.template(PlayerModal),

		events : {
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

		removeModal: function() {
			this.remove();
        }
	})

	return PlayerModalView;
});