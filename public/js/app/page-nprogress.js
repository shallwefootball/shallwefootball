
	NProgress.configure({ ease: 'ease', speed: 500});
	NProgress.inc();

	$(window).load(function() {
		// executes when complete page is fully loaded, including all frames, objects and images
		NProgress.done();
	});

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
				// console.log('통신성공');
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
