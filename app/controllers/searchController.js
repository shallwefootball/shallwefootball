var searchModel = require('../models/searchModel');

exports.player = function (req, res) {

	searchModel.selectLikePlayer(req.params.query, function (err, results) {
		console.log('lengtH    : ', results);
		if (results.length > 0) {
			res.send(results);
		}else {
			console.log('true????    : ', results.length);
			res.send([{
				playerName : "Sorry :(",
				teamName : "검색결과가 없습니다."
			}]);
		}
	});
}


exports.playerInfo = function (req, res) {

	playerModel.selectPlayerUserId(req.params.userId, function (err, result) {

		var player 		  = {};

		var transfer 	  = [],
			currentLeague = [],
			joinedLeagues = [];

		eachAsync(result, function (item, index, eachDone) {

			if (item.leagueStatus == 'end') {
				joinedLeagues.push(item);

			//	playerStatus null이면 현재 이적협상중이거나, 거절된겁니다.
			//	end가 아니면 현재 리그시작전이거나 진행중입니다.
			} else if (item.leagueStatus != 'end' && item.playerStatus != null) {
				currentLeague.push(item);
			} else if (item.leagueStatus != null &&  item.playerStatus == null) {
				transfer.push(item);
			} else if (item.leagueStatus != null) {
				//null
			}
			eachDone();
		}, function (error) {
			if (err) return console.error('err : ', err);

			player.userId 	  = result[0].userId;
			player.playerName = result[0].playerName;
			player.birthday   = result[0].birthday;
			player.email 	  = result[0].email;

			player.transfer      = transfer;
			player.currentLeague = currentLeague;
			player.joinedLeagues = joinedLeagues;

			res.json(player);

		});
	});
}