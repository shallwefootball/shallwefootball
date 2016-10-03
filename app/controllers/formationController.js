var formationModel = require('../models/formationModel'),
	async		   = require('async');

var Q = require('q');
require('q-foreach')(Q);


exports.formationView = function (req, res) {

	var clubId 	 = req.params.clubId,
		leagueId = req.params.leagueId;

	formationModel.selectPlayersForFormation (clubId, function (err, allPlayers) {

		var starting = [],
			sub      = [],
			excepted = [];

		for (var i = 0; i < allPlayers.length; i++) {

			switch (allPlayers[i].status) {
				case "starting" : starting.push(allPlayers[i]); break;
				case "sub"      : sub.push(allPlayers[i]); break;
				case "excepted" : excepted.push(allPlayers[i]); break;
			}
		}

		var players 	 = {};

		players.starting = starting;
		players.sub      = sub;
		players.excepted = excepted;

		formationModel.selectFormation (clubId, function (err, formation) {

			var defaultFormation = [
				"3-3-4",
				"3-4-3",
				"3-5-2",
				"3-6-1",
				"4-2-4",
				"4-3-3",
				"4-4-2",
				"4-5-1",
				"5-2-3",
				"5-3-2",
				"5-4-1",
				"6-2-2"
			];

			var anotherFormation = [];

			for (var i = 0; i < defaultFormation.length; i++) {

				if(defaultFormation[i] === formation){
					players.formation = formation;
				}else{
					anotherFormation.push(defaultFormation[i]);
				}
			}

			players.anotherFormation = anotherFormation;

			formationModel.selectMatchesForAClub (clubId, leagueId, function (err, matches) {

				players.matchesForAClub = matches;

				formationModel.selectSubmittedMatchesForAClub (clubId, leagueId, function (err, submittedMatches) {

					players.submittedMatches = submittedMatches;

					if (players.starting.length >= 12 || players.sub.length >= 6) {
						return console.log('스타팅 혹은 후보가 지정인원을 초과합니다.');
					}

					res.render( '../views/formation/formation', {players : players} );

				});
			});
		});
	});
};

exports.saveFormation = function (req, res) {

	var savePlayers 	  = req.body.savePlayers,
		selectedFormation = req.body.selectedFormation,
		clubId 			  = req.params.clubId;

	var count = 0;

	async.parallel([
		function (callback) {

			for (var i = 0; i < savePlayers.length; i++) {

				var squadNumber 	= savePlayers[i][0],
					matchPosition   = savePlayers[i][1],
					status		    = savePlayers[i][2],
					orderNumber 	= i,
					data 			= [matchPosition, orderNumber, status, squadNumber, clubId];

				formationModel.updatePlayerStatusMatchFormation(data, function(err, result){
					if (result.affectedRows === 1) {
						count ++
					}else {
						return res.json({isSuccess : "fails"});
					}

					if (savePlayers.length === count) {

						callback(null);
					}
				});
			}
		},
		function (callback) {

			var data = [ selectedFormation, clubId ]

			formationModel.updateClubFormation (data, function (err, result) {
				if (result.affectedRows === 1) {
					callback(null);
				}else {
					return res.json({isSuccess : "fails"});
				}
			})
		}
	], function (err, result) {
		if (err) return console.error('formation err : ', err);
		res.json({isSuccess : "success"})
	});
};

exports.sendLineups = function (req, res) {

	formationModel.selectLineups (req.body.clubId, function (err, players) {

		//q
		Q.forEach(players, function (player, index) {

			var playerId      = player['playerId'],
				matchId       = req.body.matchId,
				matchPosition = player['matchPosition'],
				status 		  = player['status'],
				orderNumber   = player['orderNumber'],
				data 		  = [ playerId, matchId, matchPosition, status, orderNumber ];

			var defer = Q.defer();
			formationModel.insertLineup (data, function (err, result){
				if (err) return console.error('err  : ', err);
			});

		    defer.resolve(player);

			return defer.promise;
		}).then(function (result){

			res.json({ isSuccess : "success" });
		});
	});
}







