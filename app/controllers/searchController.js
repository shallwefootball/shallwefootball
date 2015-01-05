var searchModel = require('../models/searchModel'),
	playerModel = require('../models/playerModel');

var Q = require('q');

require('q-foreach')(Q);

exports.player = function (req, res) {

	searchModel.selectLikePlayer(req.params.query, function (err, likePlayers, rows) {

		if (likePlayers.length > 0) {

			Q.forEach(likePlayers, function (likePlayer, index) {

				var defer = Q.defer();
		        playerModel.selectPlayerUserId(likePlayer.userId, function (err, player) {
				    defer.resolve(player);
		        });

				return defer.promise;
			}).then(function (players){

				if (rows > 5) players.push(rows - 5);

				console.log('search players      ', players);
				res.send(players);
			});

		}else {

			res.send([{
				playerName : "Sorry :(",
				teamName : "검색결과가 없습니다."
			}]);
		}
	});
}


exports.playerInfo = function (req, res) {

	playerModel.selectPlayerUserId(req.params.userId, function (err, player) {

		res.json(player);

	});
}
