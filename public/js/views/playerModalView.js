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
			)).modal().on('shown.bs.modal', function (e) {
				$(".playerCareerModal tfoot tr:first td:not(:first)").text(function(i){
				    var total = 0;

				    if(i == 0) return;
				    $(".playerCareerModal tbody").find("td:nth-child("+(i+2)+")").each(function(){

				        total += parseInt( $(this).text(), 10 ) || 0;
				    });
				    return total;
				});
			})
			return this;
		},

		removeModal: function() {
			this.remove();
        }
	})

	return PlayerModalView;
});