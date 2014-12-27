var leagueModel = require('../models/leagueModel');
	clubModel   = require('../models/clubModel');
	playerModel = require('../models/playerModel');

var eachAsync   = require('each-async');


exports.renderLeagueView = function (req, res) {

	// console.log('req.user        :   ', req.user);

	res.render('../views/league/league');
}

exports.leagueJson = function (req, res) {

	leagueModel.selectLeague(req.params.leagueId, req.user.userId,function (err, league) {

		res.json({league : league});
	});
}

exports.joinLeague = function (req, res) {

	var oldClubId = req.body.clubId;

	playerModel.selectPlayerList(oldClubId, function (err, playerList) {

		// if not exist leaderId
		var leaderId = req.body.leaderId ? req.body.leaderId : req.user.userId;

		//create Club
		// clubId(auto), leaderId, formation, leagueId, teamId
		var data = [
			leaderId,
			'4-3-3',
			req.params.leagueId,
			req.body.teamId
		];

		clubModel.insertClub(data, function (err, result) {

			//insert결과로 클럽아이디를 받습니다.
			var newClubId = result.insertId;

			eachAsync(playerList, function (item, index, done) {

				// 유저아이디, 새로운클럽아이디, 스쿼드넘버, 포지션, 매치포지션, 오더넘버, 스테더스
				var playerData = [
					item.userId,
					newClubId,
					item.squadNumber,
					item.position,
					item.matchPosition,
					item.orderNumber,
					item.status
				];

				playerModel.insertPlayer(playerData, function (err, result){
					if (err) return console.error('err : ', err);
				});

				done();
			}, function (error) {
				if (err) return console.error('err : ', err);

				console.log('each-async finished');
				res.redirect('back');
			});
		});
	});
}

exports.outLeague = function (req, res) {

	var clubId = req.body.clubId;

	console.log('clubId1!!!!!!!!     : ', clubId);

	//delete playerLIst
	playerModel.selectPlayerList(clubId, function (err, playerList) {

		eachAsync(playerList, function (item, index, done) {

			playerModel.deletePlayer(item.playerId, function (err, result){});

			done();
		}, function (error) {
			if (err) return console.error('err : ', err);
			console.log('each-async finished');

			clubModel.deleteClub(clubId, function (err, result) {

				//delete club
				console.log('out');
				res.json({message : 'success'});

			});
		});
	});
}


