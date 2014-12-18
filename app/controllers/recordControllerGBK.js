var recordModel = require('../models/recordModel');
var async 		= require('async');

exports.renderRecordView = function(req, res) {
	var matchId = req.params.matchId;
	var homeClubId = req.params.homeClubId;
	var awayClubId = req.params.awayClubId;

	var match = {};

	async.parallel([
	    function(callback){
			recordModel.selectPlayersAClubForRecord (matchId, homeClubId, function (err, players) {

	            var playersObj 		= {};
				playersObj.starting = [];
				playersObj.sub      = [];
				for (var i = 0; i < players.length; i++) {
					switch (players[i].status) {

						case "starting" : playersObj.starting.push(players[i]); break;
						case "sub" : playersObj.sub.push(players[i]); break;
						default : break;
					}
				}

	            callback(null, playersObj);
			})
	    },
	    function(callback){
			recordModel.selectPlayersAClubForRecord (matchId, awayClubId, function (err, players) {

	            var playersObj	    = {};
				playersObj.starting = [];
				playersObj.sub      = [];

				for (var i = 0; i < players.length; i++) {
					switch (players[i].status) {

						case "starting" : playersObj.starting.push(players[i]); break;
						case "sub" : playersObj.sub.push(players[i]); break;
						default : break;
					}
				}

	            callback(null, playersObj);
			})
	    },
	    function(callback){

			recordModel.selectMatchForRecord (matchId, function (err, info){
	            callback(null, info);
			})
	    }
	],
	function(err, results){
		match.homePlayers = results[0];
		match.awayPlayers = results[1];
		match.info 		  = results[2];

		// console.log('match   : ', match);
		res.render('../views/record/record', { match : match });

	});
};



exports.insertRecord = function (req, res) {
	var time = req.body.recordTime;
	var lineupId = req.body.selectedLineupId;
	var recordName = req.body.selectedRecord;
	var data = [recordName, time, lineupId];
	recordModel.insertRecord (data, function (err, result) {
		if (result.affectedRows > 0) {
			console.log(result);
			res.json(200, {recordId : result.insertId});
		}else {
			res.json(400);
		}
	});

}

exports.insertRecordSubs = function (req, res) {
	var time = req.body.recordTime;
	var selectedLineupId = req.body.selectedLineupId;
	var subLineupId = req.body.subLineupId;

	var selectedData = ["out", time, selectedLineupId];
	var subData = ["in", time, subLineupId];

	async.parallel([
	    function(callback){
			recordModel.insertRecord (selectedData, function (err, result) {
				if (result.affectedRows > 0) {
					callback(null, result.insertId);
				}else {
					callback(err);
				}
			});
	    },
	    function(callback){
			recordModel.insertRecord (subData, function (err, result) {
				if (result.affectedRows > 0) {
					callback(null, result.insertId);
				}else {
					callback(err);
				}
			});
	    }
	],
	function(err, results){
		res.json(200, {
			selectedRecordId : results[0],
			subRecordId : results[1]
		});

	});


}

exports.deleteRecord = function (req, res) {
	var recordIds = req.body.recordIds;
	switch (recordIds.length) {
		case 1 :
			recordModel.deleteRecord (recordIds[0], function (err, result){
				if (result.affectedRows > 0) {

					res.json(200);
				}
			});
			break;
		case 2 :
			recordModel.deleteRecord (recordIds, function (err, result){

				if (result.affectedRows > 0) {

					res.json(200);
				}
			});
			break;
	}

}







