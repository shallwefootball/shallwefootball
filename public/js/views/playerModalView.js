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
		},

		render : function () {
			this.$el.attr('tabindex', -1).attr('role', 'dialog').attr('aria-hidden', true).attr('aria-labelledby', 'playerTitle');

			this.$el.html(this.template({
					player : this.model.toJSON(),
					user : serverUser
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
			this.model.destroy();
			console.log('destroy!', this.model);
		},

		removeModal: function() {
			this.remove();
        }
	})

	return PlayerModalView;
});