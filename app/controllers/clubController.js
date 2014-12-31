var fs            = require('fs'),
	path          = require('path'),
	async         = require('async'),
	eachAsync     = require('each-async'),
	config        = require('../config/config'),
	clubModel     = require('../models/clubModel'),
	userModel     = require('../models/userModel'),
	playerModel   = require('../models/playerModel'),
	leagueModel   = require('../models/leagueModel'),
	setForeignKey = require('../models/setForeignKey'),
	folderAPI     = require('../controllers/API/folderAPI');

exports.myClubView = function (req, res) {
	console.log('myClubControllerView       : ', req.params.clubId);

	res.render('../views/club/myClub');

};

exports.joinedClubsView = function (req, res) {

	clubModel.selectJoinedClubs(req.params.leagueId, function (err, clubs) {
		console.log("clubs   : ", clubs);

		res.render('../views/club/joinedClub', {
			user : req.user,
			joinedClub : clubs
		});
	});
};

exports.clubDetailView = function (req, res) {

	var clubId = req.params.clubId;
	var leagueId = req.params.leagueId;

	clubModel.selectClub(clubId, function (err, club) {

		if(club === undefined){
			console.log('club이 없습니다.');
			res.redirect('/clubs');

		}else{

			playerModel.selectPlayerListForLeague(clubId, leagueId, function (err, players) {
				var squadNumbers = [],
					readyPlayers = [],
					transfered   = [],
					transfering  = [];


				for (var i = 0; i < players.length; i++) {

					squadNumbers.push(players[i].squadNumber);

					if (players[i].status == 'starting' || players[i].status == 'sub' || players[i].status == 'excepted') {

						readyPlayers.push(players[i]);

					}else if (players[i].status == 'transfered') {

						transfered.push(players[i]);
					}else {

						transfering.push(players[i]);
					}
				}

				club.squadNumbers = squadNumbers;
				club.readyPlayers = readyPlayers;
				club.transfered   = transfered;
				club.transfering  = transfering;

				clubModel.selectClubStatDetail(clubId, function (err, clubStat) {

					club.stats = clubStat;

					leagueModel.selectLeague(leagueId, req.user.userId, function (err, league) {

						res.render('../views/club/detailedClub', {
							club   : club,
							league : league
						});
					});

				});

			});
		}

	});
};

exports.insertUserPlayer = function (req, res) {

	// 중복되는 이메일..
	// new user..
	// selectOrderNumber
	// insert player..

	var userData = [
		req.body.email,
		null,
		req.body.lastName,
		req.body.firstName,
		req.body.birthday
	]

	userModel.selectUserEmail(req.body.email, function(err, email) {

		if (email[0]) {
			return res.json({message : 'existed'});
		} else {

			userModel.insertUser(userData, function (err, newUser) {

				playerModel.selectOrderNumber (req.params.clubId, function (err, countResult) {

					var orderNumber = countResult.orderNumber + 1;

					var newUserId     		 = newUser.insertId,
						clubId        		 = req.params.clubId,
						squadNumber   		 = req.body.squadNumber,
						position      		 = req.body.position,
						matchPosition 		 = req.body.position,
						status 				 = '';

					if (orderNumber < 11) {
						status = "starting";
					}else if (orderNumber < 16 && orderNumber > 10) {
						status = "sub";
					}else if (orderNumber >= 16) {
						status = "excepted";
					}

					var playerData = [
						newUserId,
						clubId,
						squadNumber,
						position,
						matchPosition,
						orderNumber,
						status,
						null, 	// transferStatus
						null 	// transfer
					];

					playerModel.insertPlayer(playerData, function (err, result) {

						if(result.affectedRows > 0) {
							res.json({message : "success"});
							// res.redirect('back');
						}else {
							res.json({message : "클럽가입 실패입니다."});
						}
					});
				});
			});



		}     //end if existedUser
	});     //end selectPlayerEmail
}

exports.transferedPlayer = function (req, res) {

	playerModel.selectOrderNumber (req.params.clubId, function (err, countResult) {

		var orderNumber = countResult.orderNumber + 1;

		var playerId       = req.params.playerId,
			position       = req.body.position,
			matchPosition  = req.body.position,
			squadNumber    = req.body.squadNumber,
			status 		   = 'transfered',
			transferStatus = 'transfered';

		// player Status 를 transfered로 두는 이유는 새로들어온 이적생들을 따로 보여주기위해서임.
		// formation 부분수정하고 어차피 excepted하면됨

		var data        = [
			squadNumber,
			position,
			matchPosition,
			orderNumber,
			status,
			transferStatus,
			playerId
		];

		playerModel.updateTransferedPlayer(data, function (err, result) {

			if(result.affectedRows > 0) {
				res.json({message : "success"});
			}else {
				console.error('transfered fail..... ', result);
				res.json({message : "fali"});
			}
		});

	});

}






