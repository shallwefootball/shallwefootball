
require([
	'jquery',
	'nprogress',
	'bootstrap',
	'jqueryUi',
	'jqueryUiTouchPunch'
	], function ($, NProgress, Bootstrap, JqueryUi, JqueryUiTouchPunch) {

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
		 * Formation
		 */
		+function () {
			'use strict';

			//온로드하자마자 포메이션 바꾼다.
			$(function(){
				changeStartingFormation();
			})

			/*********************************** 대기선수 포지션 변경 ***********************************/
			// popover start 2014 6.5
			var table =
					'<table style="margin-top: 8px; margin-bottom: 8px;">' +
						'<tr>' +
							'<td class="subPositionTd"><span class="label subPositionLabel label-warning">GK</span></td>' +
							'<td class="subPositionTd"><span class="label subPositionLabel label-success">DF</span></td>' +
							'<td class="subPositionTd"><span class="label subPositionLabel label-primary">MF</span></td>' +
							'<td class="subPositionTd"><span class="label subPositionLabel label-danger">FW</span></td>' +
						'</tr>' +
					'</table>';


			// $(document).on('click', '[data-toggle="popover"]', function(e){
				// console.log('test');
				// console.log($('[data-toggle="popover"]'));
				// console.log($(this));
				// $('[data-toggle="popover"]').popover();
				$('[data-toggle="popover"]').popover({
					html: true,
					placement : 'top',
					content : table
				});
				// $(this).popover({
				// });
			// })



			//바디부분찍으면 팝오버가 사라집니다.
			$('body').on('click', function (e) {
					$('[data-toggle="popover"]').each(function () {
							if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {

								//기존에 있던 팝오버 디스플레이 블럭을 none으로 바꿔준 부분
								$(this).next(".popover").css('display', 'none');
								$(this).popover('hide');
							}
					});
			});


			//포지션 선택하고 나서 팝오버 사라지게 해주는 부분
			//아래처럼 해줘야하는데,,,,,  $(".subPo").on('click', function()) --> 안된다,, 왜냐면,음,,,문서로드관련???
			$(document).on('click', '.subPositionLabel', function(e){
				var originPosition = $(this).parents('.popover').prev();
				var selectedPosition = e.target
				originPosition.text(selectedPosition.textContent);
				// console.log('ori : ', originPosition);

				originPosition.removeClass().addClass("label " + selectedPosition.classList[2]);
				// console.log('target  : ', selectedPosition.classList[2]);
				// console.log('origin : ', originPosition.context.classList[2]);

				//포지션 선택하면 남아있는 display:block을 바꿔주는 부분
				$('.popover').css('display', 'none')
				$('[data-toggle="popover"]').popover('hide');
			});

			//end 2014 6.5

			/*********************************** 포메이션 변경 ***********************************/
			$("#selectedFormation").change(function () {
				changeStartingFormation();
			});



			//선발 대기 제외 Sortable
			$("#bStarting").sortable({
				receive: function( event, ui ) {
					if($("#bStarting li").length == 12){
						if($("#bSub li").length == 5){
							$("#bStarting li:last-child").appendTo("#bExcepted");
						} else {
							$("#bStarting li:last-child").appendTo("#bSub");
						}
					}
					changeStartingFormation();
				},
				stop : function(event, ui){
					changeStartingFormation();
				},
				connectWith : ".bConnectedSortable"
			}).disableSelection();
			$("#bSub").sortable({
				receive : function(event, ui){
					if(($("#bSub li").length == 6) && ($("#bStarting li").length == 10)){
						$("#bSub li:first-child").appendTo("#bStarting");
					}else if(($("#bSub li").length == 6) || ($("#bStarting li").length == 11)){
						if($("#bSub li").length == 6){
							$("#bSub li:last-child").appendTo("#bExcepted");
						}
					}else if($("#bStarting li").length == 10){
						$("#bSub li:first-child").appendTo("#bStarting");
					}
				},
				connectWith : ".bConnectedSortable"
			}).disableSelection();
			$("#bExcepted").sortable({
				receive : function(event, ui){
					if($("#bStarting li").length == 10 && $("#bSub li").length == 0){
						$("#bExcepted li:first-child").appendTo("#bStarting");
					}else if($("#bStarting li").length == 10 && $("#bSub li").length >= 1 ){
						$("#bSub li:first-child").appendTo("#bStarting");
					}
				},
				connectWith : ".bConnectedSortable"
			}).disableSelection();

			function changeStartingFormation(){
				var val = $("#selectedFormation option:selected").val();
				var df = val.charAt(0);
				var mf = val.charAt(2);
				var fw = val.charAt(4);

				$("#bStarting li").each(function(i){
					if(i == 0){
						$("#bStarting li:eq(0) > span:eq(0)").text('GK');
						$("#bStarting li:eq(0) > span:eq(0)").removeClass().addClass('label label-warning gk');
					}else if(i > (parseInt(df) + parseInt(mf)) && i < 11){
						$("#bStarting li:eq("+i+") > span:eq(0)").text('FW');
						$("#bStarting li:eq("+i+") > span:eq(0)").removeClass().addClass('label label-danger fw');
					}else if(i > (df) && i <= (parseInt(df) + parseInt(mf))){
						$("#bStarting li:eq("+i+") > span:eq(0)").text('MF');
						$("#bStarting li:eq("+i+") > span:eq(0)").removeClass().addClass('label label-primary mf');
					}else if(i >= 1 && i <= df){
						$("#bStarting li:eq("+i+") > span:eq(0)").text('DF');
						$("#bStarting li:eq("+i+") > span:eq(0)").removeClass().addClass('label label-success df');
					}
				});
			}



			$("#save").click(function(){
				var savePlayers = [];
				var selectedFormation = $('#selectedFormation').val();
				$("#bStarting li").each(function(i){
					var squadNumber   = $("#bStarting li:eq(" + i + ") strong").text().slice(1);
					var status        = $("#bStarting li:eq(" + i + ") span").text().trim();
					var matchPosition = $("#bStarting li:eq(" + i + ") span:eq(0)").text();
					var player = []
					player.push(squadNumber);
					// player.push(status);
					player.push(matchPosition);
					player.push("starting");
					savePlayers.push(player);
				});
				$("#bSub li").each(function(i){
					var squadNumber   = $("#bSub li:eq(" + i + ") strong").text().slice(1);
					var status        = $("#bSub li:eq(" + i + ") span").text().trim();
					var matchPosition = $("#bSub li:eq(" + i + ") span:eq(0)").text();
					var player = []

					player.push(squadNumber);
					// player.push(status);
					player.push(matchPosition);
					player.push("sub");
					savePlayers.push(player);

				});
				$("#bExcepted li").each(function(i){
					var squadNumber   = $("#bExcepted li:eq(" + i + ") strong").text().slice(1);
					var status        = $("#bExcepted li:eq(" + i + ") span").text().trim();
					var matchPosition = $("#bExcepted li:eq(" + i + ") span:eq(0)").text();
					var player = []
					player.push(squadNumber);
					// player.push(status);
					player.push(matchPosition);
					player.push("excepted");
					savePlayers.push(player);
				});
				console.log('savePlayers   : ', savePlayers);
				$.ajax({
					type        : 'PUT',
					async       : true,
					url         : window.location.pathname,
					data        : {
							savePlayers: savePlayers,
							selectedFormation: selectedFormation
					},
					beforeSend  : function() {
							$('#ajax_load_indicator').show().fadeIn('fast');
					},
					success     : function(data) {
							console.log(data);
							console.log('통신은 일단성공');
							alert('성공~');
							location.reload();
					},
					error       : function(data, status, err) {
						console.log("error forward : "+data);
							alert('서버와의 통신이 실패했습니다.');
					}
					// ,complete    : function() {

					// }
				});
			})

			//명단 제출
			$("#sendLineups").click(function(){
				$.ajax({
					type        : 'POST',
					async       : true,
					url         : '/sendLineups',
					data        : {
							clubId    : location.pathname.split("/")[4],
							leagueId  : location.pathname.split("/")[2],
							matchId   : $('#selectMatch').val()
					},
					beforeSend  : function() {
							$('#ajax_load_indicator').show().fadeIn('fast');
					},
					success     : function(data) {
							console.log(data);
							console.log('통신은 일단성공');
							alert('제출성공~');
							location.reload();
					},
					error       : function(data, status, err) {
						console.log("error forward : "+data);
							alert('서버와의 통신이 실패했습니다.');
					}
				});
			});

			String.prototype.trim = function(){
				 this.replace(/(^\s*)|(\s*$)/gi, "");
			}

		}();



		/* ---------------------------------------------------------
		 * Some Word...
		 */
		+function () {
			'use strict';

		}();

});

