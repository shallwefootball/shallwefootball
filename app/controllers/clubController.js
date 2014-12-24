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
			console.log('clubController.js');
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

					leagueModel.selectLeague(leagueId, function (err, league) {

						req.user.playedLeagues.forEach(function (item, index) {
							if(league.leagueId == item.leagueId) {
								league.userJoined = true;
							}
						});

						var now 	  = new Date(),
							year 	  = now.getFullYear(),
							day 	  = now.getDate(),
							month 	  = now.getMonth() + 1,
							startDate = new Date(league.start),
							endDate   = new Date(league.end);

						if (now < startDate) {
							league.status = 'before';
						}

						if (startDate < now && now < endDate ) {
							league.status = 'playing';
						}

						if (now > endDate) {
							league.status = 'end';
						}

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


//안쓰고있음.
exports.createClub = function (req, res) {
	// var leagueId    = req.body.leagueId;
	// var clubName    = req.body.clubName;
	// var leaderId    = req.user.userId;
	// var information = req.body.information;
	// var position    = req.body.position;
	// var squadNumber = req.body.squadNumber;
	console.log('req. body      : ', req.body);

	var data        = [clubName, leaderId, information, position, squadNumber];

	if(!(clubName && leaderId && information && position && squadNumber)) {
		return res.redirect('/clubs');
	}

	clubModel.insertClubAndUpdateUser(data, function (err, result, clubId, insertTransactions) {

		if (result.affectedRows > 0) {

			var clubFolderPath = path.resolve(__dirname, '..', 'images/clubs/', clubId);
			var clubLogo = req.files.clubLogo;

			folderAPI.createFolder(clubFolderPath, function (err) {
				if(err) {
					insertTransactions(err);

				//로고 없음
				}else if (clubLogo.name === '') {
					insertTransactions(null, function (err) {

						res.redirect('/clubs/' + clubId);     //success!!
					});

				//로고 있음
				} else {
					folderAPI.createProfileImage(clubFolderPath, clubLogo, function(err){

						//이미지 실패시 생성된 폴더를 지워야함.
						if (err) {

							insertTransactions(err);
							folderAPI.removeFolder(clubFolderPath, function(err){});
						} else {
						  //성공시 commit
							insertTransactions(null, function (err) {
								if(err) {

									res.json({ createClubMessage : '트랜잭션 실패여'});
								}
								res.redirect('/clubs/' + clubId);    //success!!
							});
						}
					});
				}
			});


		} else {
			res.json({result: "fail", msg: "insertClub error"});
		}
	});
};

exports.deleteClub = function(req, res) {
	var leaderId = req.user.userId;
	var clubId   = req.body.clubId;

	clubModel.updateUserClubIdAndDeleteClub(clubId, leaderId, function(err, result, deleteTransaction){

		if(result.affectedRows > 0) {

			  var clubFolderPath = path.resolve(__dirname, '..', 'images/clubs/', clubId);
			folderAPI.rm_rfFolder(clubFolderPath, function(err){
				if(err){
					deleteTransaction(err);
				}else {
				  //성공시 commit
					deleteTransaction(null, function(err) {
						if(err) {

							res.json({ createClubMessage : '트랜잭션 실패여'});
						}
						// res.json({message : 'success'});    //success!!
						res.json({redirect : "/"});
					});
				}
			});
		}

	});
};












