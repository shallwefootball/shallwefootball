var fs            = require('fs'),
	path          = require('path'),
	async         = require('async'),
	eachAsync     = require('each-async'),
	config        = require('../config/config'),
	clubModel     = require('../models/clubModel'),
	userModel     = require('../models/userModel'),
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

			clubModel.selectPlayersInClubForLeague(clubId, leagueId, function (err, players) {
				var GK = [];
				var DF = [];
				var MF = [];
				var FW = [];
				var squadNumbers = [];

				for (var i = 0; i < players.length; i++) {

					squadNumbers.push(players[i].squadNumber);

					switch (players[i].position) {
						case "GK" : GK.push(players[i]); break;
						case "DF" : DF.push(players[i]); break;
						case "MF" : MF.push(players[i]); break;
						case "FW" : FW.push(players[i]); break;
						default : break;
					}
				}

				club.squadNumbers = squadNumbers;
				club.players = {};
				club.players.GK = GK;
				club.players.DF = DF;
				club.players.MF = MF;
				club.players.FW = FW;

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

					var newPlayerOrderNumber = countResult.orderNumber + 1;

					console.log('연산되었나요??? newPlayerOrderNumber       : ,', newPlayerOrderNumber);

					var newUserId     		 = newUser.insertId,
						clubId        		 = req.params.clubId,
						squadNumber   		 = req.body.squadNumber,
						position      		 = req.body.position,
						matchPosition 		 = req.body.position,
						status 				 = '';

					if (newPlayerOrderNumber < 11) {
						status = "starting";
					}else if (newPlayerOrderNumber < 16 && newPlayerOrderNumber > 10) {
						status = "sub";
					}else if (newPlayerOrderNumber >= 16) {
						status = "excepted";
					}

					var playerData = [
						newUserId,
						clubId,
						squadNumber,
						position,
						matchPosition,
						newPlayerOrderNumber,
						status,
						null// transfer
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







