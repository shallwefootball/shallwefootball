
require([
	'jquery',
	'nprogress',
	'bootstrap'
	], function ($, NProgress, Bootstrap) {

		/* ---------------------------------------------------------
		 *	global
		 *  -------------------------------------------------------- */

		/* ---------------------------------------------------------
		 * NProgress
		 */

		NProgress.configure({ ease: 'ease', speed: 500});
		NProgress.inc();

		$(document).ready(function () {

			NProgress.done();
		});


		/* ---------------------------------------------------------
		 * Brand Navigator
		 */
		+function () {
			'use strict';

			var url = window.location.pathname;

			var leaguePath = "/league/" + url.split('/')[2];

			if (url.split('/')[1] == 'league') {
				$.ajax({
					type        : 'get',
					async       : true,
					url         : leaguePath,
					beforeSend  : function() {
						NProgress.inc();
						// $('#ajax_load_indicator').show().fadeIn('fast');
					},
					success     : function(data) {
						NProgress.inc();
						$(".navbar-header").append(
							'<a class="navbar-brand" href="/league/' + data.league.leagueId +
							'/match"><small>' + data.league.community +
							' ' + data.league.season +
							'</small></a>'
						);
					},
					error       : function(data, status, err) {
						console.log("error forward : "+data);
						alert('서버와의 통신이 실패했습니다.');
					},
					complete    : function (xhr, status) {
						NProgress.done();
					}
			    });
			}

		}();


		/* ---------------------------------------------------------
		 * Move to.
		 */
		+function () {
			'use strict';

			// Formation
			$("#getFormation").click( function (e) {
				location.href = location.origin +
								"/league/" +
								location.pathname.split("/")[2] +
								"/formation/" +
								location.pathname.split("/")[4];
			});


	    	// Record
			$(".getRecordViewBtn").click( function (e) {
				location.href = location.origin +
								"/league/" +
								location.pathname.split("/")[2] +
								"/records/" +
								$(this).attr("value") +
								"/home/" +
								$(this).attr("data-homeClubId") +
								"/away/" +
								$(this).attr("data-awayClubId");
			});

			// Club Info
			$(".panel [data-clubId]").click( function (e) {
				console.log('teamId click~~~!!!');
				location.href = location.origin +
							"/league/" +
							location.pathname.split("/")[2] +
							"/club/" +
							$(this).attr("data-clubId");
			});

		}();


		/* ---------------------------------------------------------
		 * Player Stat Total Sum
		 */
		+function () {
			'use strict';

			$(".playerCareer tfoot tr:first td:not(:first)").text(function(i){
			    var total = 0;

			    $(".playerCareer tbody").find("td:nth-child("+(i+2)+")").each(function(){

			        total += parseInt( $(this).text(), 10 ) || 0;
			    });
			    return total;
			});

		}();


		/* ---------------------------------------------------------
		 * Load Default Image
		 */
		+function () {
			'use strict';

			$(".img-circle").each(function () {
				if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {

					this.src = '/images/default/defaultUser40.png';
				}
			});

			$("#teamLogo").is(function () {
				if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {

					this.src = '/images/default/defaultClub.png';
				}
			});

		}();


		/* ---------------------------------------------------------
		 * Set Data in Modal(Player Name, Squad Number, Position) For Leader.
		 */
		+function () {
			'use strict';


			//click glyphicon-pencil
			$('.glyphicon-pencil, .positionSquad-btn').click(function (e) {

				var playerId 	  = $(this).attr('data-player-id'),
					clubId	 	  = $(this).attr('data-club-id'),
					playerName 	  = $(this).attr('data-player-name'),
					modal 		  = $(this).attr('data-target');

				//set player
				$(modal).find('[name="playerId"]').val(playerId);
				switch ($(e.target).attr('data-target')) {
					case '.responseCallModal' :
						$(modal).find('form').attr('action', "/club/" + clubId + "/player/" + playerId)
						$(modal).find('.media-heading').text(playerName);
						$(modal).find('.text-muted').text($(this).attr('data-player-position'));
						break;
					case '.squadNumberModal' :
						$(modal).find('.modal-title').children('strong').text(playerName);
						$(modal).find('.text-muted').text($(this).attr('data-player-squadNumber'));
						 break;
					case '.positionModal' :
						$(modal).find('.modal-title').children('strong').text(playerName);
						$(modal).find('.text-muted').text($(this).attr('data-player-position'));
						break;
				}
			});

		}();


		/* ---------------------------------------------------------
		 * Update Positioin and SquadNumnber For Leader.
		 */
		+function () {
			'use strict';

			$('#positionForm').submit(function (e){

				e.preventDefault();

				var $form = $(e.target);

				$.ajax({
					type        : 'PUT',
					async       : true,
					url         : "/position",
					data        : $form.serialize(),
					success     : function(data) {
						switch (data.message) {

							case "success" :
								alert("포지션이 변경되었습니다.");
								location.reload(); break;

							case "fail" :

								alert('실패했습니다.'); break;
						}
					},
					error       : function(data, status, err) {
						console.log("error forward : "+data);
							alert('서버와의 통신이 실패했습니다.');
					}
				});
			});

			$('#squadNumberForm').submit(function (e){

				e.preventDefault();

				var $form = $(e.target);

				$.ajax({
					type        : 'PUT',
					async       : true,
					url         : "/squadNumber",
					data        : $form.serialize(),
					success     : function(data) {
						switch (data.message) {

							case "success" :
								alert("스쿼드넘버가 변경되었습니다.");
								location.reload(); break;

							case "fail" :

								alert('실패했습니다.'); break;
						}
					},
					error       : function(data, status, err) {
						console.log("error forward : "+data);
							alert('서버와의 통신이 실패했습니다.');
					}
				});
			});

		}();


		/* ---------------------------------------------------------
		 * Update Positioin and SquadNumnber For Leader.
		 */
		+function () {
			'use strict';

			$('.glyphicon-remove.text-danger').click(function (e) {

				var playerName = $(this).attr('data-player-name'),
					playerId   = $(this).attr('data-player-id');

				$("#outClub").attr('data-player-id', playerId)
				$(".confirmPlayerOutModal").find('center > h4').text(playerName);
				$(".confirmPlayerOutModal").modal('show');
			});

			$("#outClub").click(function (e) {

				var url = '/signoutClub/' + $(this).attr('data-player-id');

				$.ajax({
					type        : 'delete',
					async       : true,
					url         : url,
					beforeSend  : function() {
						NProgress.inc();
					},
					success     : function(data) {
						if (data.message == 'success') {
							alert('제외되었습니다.');
						}
					},
					error       : function(data, status, err) {
						console.log("error forward : "+ data);
						alert('서버와의 통신이 실패했습니다.');
					},
					complete    : function (xhr, status) {
						NProgress.done();
						location.reload();
					}
				});
			});

		}();


		/* ---------------------------------------------------------
		 * get playerList for appointment leader
		 */
		+function () {
			'use strict';

			$('button[data-clubId]').click(function (e) {

				var url    = '/playerList/' + this.dataset.clubid;

				var $modal = $('#joinLeague');

				$.ajax({
					type        : 'get',
					async       : true,
					url         : url,
					beforeSend  : function() {
						NProgress.inc();
						// $('#ajax_load_indicator').show().fadeIn('fast');
					},
					success     : function(data) {
						var playerList = data.playerList;

						var html = '<option value="">리더가 바뀌지않았다면 무시하셔도 됩니다.</option>';

						for (var i = 0; i < playerList.length; i++) {
								html += '<option value="' + playerList[i].userId + '">' + playerList[i].playerName + '</option>';
						}

						$('select[name="leaderId"]').html(html);
					},
					error       : function(data, status, err) {
						console.log("error forward : "+data);
						alert('서버와의 통신이 실패했습니다.');
					},
					complete    : function (xhr, status) {
						NProgress.done();
						$modal.modal('show');
					}
				});
			});

		}();


		/* ---------------------------------------------------------
		 * Love Call and Request Call
		 */
		+function () {
			'use strict';

			$('.responseCallModal form').submit(function (e){

				// Prevent form submission
				e.preventDefault();

				var $form = $(e.target);

				$.ajax({
					type        : 'PUT',
					async       : true,
					url         : $form.context.action,
					data        : $form.serialize(),
					success     : function(data) {
						switch (data.message) {

							case "success" :
								alert("등록되었습니다.");
								location.reload(); break;

							case "fail" :
								alert('실패했습니다.'); break;
						}
					},
					error       : function(data, status, err) {
						console.log("error forward : "+data);
							alert('서버와의 통신이 실패했습니다.');
					}
				});
			});

			$('.reject-btn').click(function (e) {
				var body 	 = $(this).parent().prev(),
					playerId = $(body).find('input').val();
					url		 = '/player/' + playerId;

				$.ajax({
					type        : 'PUT',
					async       : true,
					url         : url,
					success     : function(data) {
						switch (data.message) {

							case "success" :
								alert("요청을 거절했습니다.");
								location.reload(); break;

							case "fail" :
								alert('실패했습니다.'); break;
						}
					},
					error       : function(data, status, err) {
						console.log("error forward : "+data);
							alert('서버와의 통신이 실패했습니다.');
					}
				});
			})

		}();


		/* ---------------------------------------------------------
		 * Out League For Team.
		 */
		+function () {
			'use strict';

			$("#outLeague").click(function (e) {

				// '/league/:leagueId/outLeague'
				var url = "/league/" + location.pathname.split("/")[2] + "/outLeague";

				$.ajax({
					type        : 'delete',
					async       : true,
					url         : url,
					data 		: {clubId : location.pathname.split("/")[4]},
					beforeSend  : function() {
						NProgress.inc();
					},
					success     : function(data) {
						console.log('통신성공');
					},
					error       : function(data, status, err) {
						console.log("error forward : "+data);
						alert('서버와의 통신이 실패했습니다.');
					},
					complete    : function (xhr, status) {
						NProgress.done();
						location.href = location.origin + "/league/" + location.pathname.split("/")[2] + "/match";
					}
				});
			});

		}();


		/* ---------------------------------------------------------
		 * Remove Club and Out Club For User
		 */
		+function () {
			'use strict';


			$("#deleteClub").click(function(e) {

				$.ajax({
					type        : 'delete',
					async       : true,
					url         : '/club',
					data        : {clubId: $("#clubNumber").val()},
					beforeSend  : function() {
							 $('#ajax_load_indicator').show().fadeIn('fast');
					},
					success     : function(data) {
						console.log('success data : ' + data);
						console.log(data.redirect);
						alert( "success" );
						window.location.href = data.redirect;
					},
					error       : function(data, status, err) {
						console.log("error forward : "+data);
							alert('서버와의 통신이 실패했습니다.');
					},
					complete    : function() {
						$('#ajax_load_indicator').fadeOut();
					}
				});
			});

			//<button type="button" class="btn btn-danger btn-lg btn-block" id="signoutClub">이 클럽 탈퇴 </button>
			$("#signoutClub").click(function(e) {
				$.ajax({
					type        : 'delete',
					async       : true,
					crossDomain : true,
					url         : '/signoutClub',
					data        : {playerId: $("#playerId").val()},
					beforeSend  : function() {
							 $('#ajax_load_indicator').show().fadeIn('fast');
					},
					success     : function(data) {
						console.log('success data : ' + data);
						console.log(data);
						console.log(data.redirect);
						alert( "success" );
						window.location.href = data.redirect;
					},
					error       : function(data, status, err) {
						console.log("error forward : "+data);
							alert('서버와의 통신이 실패했습니다.');
					},
					complete    : function() {
						$('#ajax_load_indicator').fadeOut();
					}
				});
			});

		}();


		/* ---------------------------------------------------------
		 * Some Word...
		 */
		+function () {
			'use strict';

		}();

});

