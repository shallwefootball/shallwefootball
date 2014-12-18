var recordModel = require('../models/recordModel');
var async 		= require('async');

exports.renderRecordView = function(req, res) {
	var matchId    = req.params.matchId;
	var homeClubId = req.params.homeClubId;
	var awayClubId = req.params.awayClubId;

	var match = {};

	async.parallel([
	    function(callback){
	    	//home
			recordModel.selectPlayersAClubForRecord(matchId, homeClubId, function (err, players) {

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
	    	//away
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
	    	//match info
			recordModel.selectMatchForRecord (matchId, function (err, info){

	            callback(null, info);
			})
	    },
	    function(callback){
	    	//players Recorded
	    	var sortPlayers = [];

			recordModel.selectPlayersRecorded (matchId, function (err, playersRecorded) {

				for (var i = 0; i < playersRecorded.length; i++) {

					if (playersRecorded[i].recordName == "in"){
						var sub = [];
						sub.push(playersRecorded[i]);
						sub.push(playersRecorded[i+1]);
						sortPlayers.push(sub);

					}else if (playersRecorded[i].recordName == "out") {
						// break;
					}else {
						sortPlayers.push(playersRecorded[i]);
					}
				}
				// console.log('sortPlayers  : ', sortPlayers);
	            callback(null, sortPlayers);

			})
	    },
	    function(callback){
	    	//match scorers
			recordModel.selectScorers (matchId, function (err, dbScorers){
				var scorers = {};
				var home = [];
				var away = [];
				for (var i = 0; i < dbScorers.length; i++) {

					if (dbScorers[i].recordName == "goalScored" || dbScorers[i].recordName == "penaltyScored") {
						if (dbScorers[i].clubId == dbScorers[i].homeClubId) {
							home.push(dbScorers[i]);
						}else if (dbScorers[i].clubId == dbScorers[i].awayClubId) {
							away.push(dbScorers[i]);
						}

					//own Goal
					}else {
						if (dbScorers[i].clubId == dbScorers[i].homeClubId){
							away.push(dbScorers[i]);
						}else if (dbScorers[i].clubId == dbScorers[i].awayClubId) {
							home.push(dbScorers[i]);
						}
					}
				}
				scorers.home = home;
				scorers.away = away;


				// console.log(scorers);
	            callback(null, scorers);
			})
	    },
	],
	function(err, results){
		if(err){
			console.error(err);
			res.json(400, {error : "message"});
		}
		match.homePlayers 	  = results[0];
		match.awayPlayers 	  = results[1];
		match.info 		  	  = results[2];
		match.playersRecorded = results[3];
		match.scorers 		  = results[4];

		console.log('match   : ', match.homePlayers);
		console.log('match   : ', match.awayPlayers);
		res.render('../views/record/record', { match : match });

	});
};



exports.insertRecord = function (req, res) {
	var minutes = req.body.recordMinutes;
	var lineupId = req.body.selectedLineupId;
	var recordName = req.body.selectedRecordName;
	var recordTime = req.body.selectedRecordTime;
	var recordData = [recordName, recordTime, minutes, lineupId];

	var matchId = req.params.matchId;
	var score = req.body.score;

	async.waterfall([
		function (callback) {
			recordModel.insertRecord (recordData, function (err, result) {
				if (result.affectedRows > 0) {

					callback(null, result.insertId)
				}else {
					callback(err);
				}
			});
		},
		function (recordId, callback) {
			if(score){
				recordModel.updateScore (matchId, score, function (err, result) {
					if (result.affectedRows > 0) {

						callback(null, recordId);
					}else {
						callback(err);
					}
				});
			}else {
				callback(null, recordId);
			}
		}
	], function (err, result) {
		if(err){
			console.error(err);
			res.json(400, {error : "message"});
		}
		res.json(200, {recordId : result});
	});

}

exports.insertRecordSubs = function (req, res) {
	var minutes = req.body.recordMinutes;
	var recordTime = req.body.subRecordTime;
	var selectedLineupId = req.body.selectedLineupId;
	var subLineupId = req.body.subLineupId;

	var selectedData = ["out", recordTime, minutes, selectedLineupId];
	var subData = ["in", recordTime, minutes, subLineupId];

	async.waterfall([
	    function(callback){
			recordModel.insertRecord (selectedData, function (err, result) {
				if (result.affectedRows > 0) {
					callback(null, result.insertId);
				}else {
					callback(err);
				}
			});
	    },
	    function(selectedRecordId, callback){
			recordModel.insertRecord (subData, function (err, result) {
				if (result.affectedRows > 0) {

					callback(null, selectedRecordId, result.insertId);
				}else {
					callback(err);
				}
			});
	    }
	],
	function(err, selectedRecordId, subRecordId){
		if(err){
			console.error(err);
			res.json(400, {error : "message"});
		}
		res.json(200, {
			selectedRecordId : selectedRecordId,
			subRecordId : subRecordId
		});

	});



}

exports.deleteRecord = function (req, res) {
	var recordIds = req.body.recordIds;

	var matchId = req.params.matchId;
	var score = req.body.score;

	switch (recordIds.length) {
		case 1 :
			async.waterfall([
				function (callback) {
					recordModel.deleteRecord (recordIds[0], function (err, result){
						if (result.affectedRows > 0) {
							callback(null);
						}else {
							callback(err);
						}
					});
				},
				function (callback) {
					if(score){
						recordModel.updateScore (matchId, score, function (err, result) {
							if (result.affectedRows > 0) {
								callback(null);
							}else {
								callback(err);
							}
						});
					}else {
						callback(null);
					}
				}
			], function (err, result) {
				if(err){
					console.error(err);
					res.json(400, {error : "message"});
				}
				res.json(200, {message : "message"});
			});
			break;

		case 2 :
			async.parallel([
			    function(callback){
					recordModel.deleteRecord (recordIds[0], function (err, result){
						if (result.affectedRows > 0) {
							callback(null);
						}else {
							callback(err);
						}
					});
			    },
			    function(callback){
					recordModel.deleteRecord (recordIds[1], function (err, result){
						if (result.affectedRows > 0) {

							callback(null);
						}else {
							callback(err);
						}
					});
			    }
			],
			function(err, results){
				if(err){
					console.error(err);
					res.json(400, {error : "message"});
				}
				res.json(200, {message : "message"});
			});
			break;

	}

}







