var formationModel = require('../models/formationModel');
var async		   = require('async');

exports.renderFormationView = function (req, res) {

	var clubId = req.params.clubId;
	var leagueId = req.params.leagueId;
	formationModel.selectPlayersForFormation (clubId, function (err, allPlayers) {

		var starting = [];
		var sub      = [];
		var excepted = [];
		for (var i = 0; i < allPlayers.length; i++) {
			switch (allPlayers[i].status) {
				case "starting" : starting.push(allPlayers[i]); break;
				case "sub" : sub.push(allPlayers[i]); break;
				case "excepted" : excepted.push(allPlayers[i]); break;
			}
		}

		var players = {};
		players.starting = starting;
		players.sub = sub;
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
				"5-3-2",
				"5-4-1"
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

	var savePlayers 	  = req.body.savePlayers;
	var selectedFormation = req.body.selectedFormation;
	var clubId 			  = req.params.clubId;

	var count = 0;

	async.parallel([
		function (callback) {

			for (var i = 0; i < savePlayers.length; i++) {

				var squadNumber 	= savePlayers[i][0];
				var matchPosition   = savePlayers[i][1];
				var status		    = savePlayers[i][2];
				var orderNumber 	= i;
				var data 			= [matchPosition, orderNumber, status, squadNumber, clubId];

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
		for (var i = 0; i < players.length; i++){
			var playerId      = players[i].playerId;
			var matchId       = req.body.matchId;
			var matchPosition = players[i].matchPosition;
			var status 		  = players[i].status;
			var orderNumber   = players[i].orderNumber;
			var data 		  = [ playerId, matchId, matchPosition, status, orderNumber ];

			formationModel.insertLineup (data, function (err, result){
				if(players.length == i){
					res.json({ isSuccess : "success" });
				}
			});
		}

	});
}







