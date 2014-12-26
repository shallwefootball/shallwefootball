var teamModel   = require('../models/teamModel'),
	playerModel = require('../models/playerModel');

exports.team = function (req, res, next) {

	var teamName    = req.body.teamName,
		information = req.body.information,
		createId = req.user.userId,
		data = [ teamName, information, createId ];

	var locals = res.locals;

	teamModel.insertTeam(data, function (err, result){
		if (err) return console.error('err : ', err);

		if (result.affectedRows > 0) {
			locals.teamName = teamName;
			locals.information = information;
			locals.createId = createId;

			// return next();
			res.redirect('back');

		} else{
			return console.log('팀만들다 뭔가 실패여');
		}

	})

};

exports.joinLeagueLeader = function (req, res, next){

	var leaderId = req.body.leaderId,
		formation = "4-3-3",
		leagueId = req.params.leagueId,
		teamId = req.body.teamId;

	var clubData = [ leaderId, formation, leagueId, teamId ];

	console.log('clubData    : ', clubData);


	clubModel.insertClub(clubData, function (err, clubResult){
		if (err) return console.error('err : ', err);

		if (clubResult.affectedRows > 0) {

			console.log('clubResult      : ', clubResult.insertId);

			//insert결과로 클럽아이디를 받습니다.
			var userId = req.user.userId,
				clubId = clubResult.insertId,
				squadNumber = req.body.squadNumbe,
				position = req.body.position,
				matchPosition = req.body.position,
				orderNumber = 0,
				status = 'starting';

			var playerData = [userId, clubId, squadNumber, position, matchPosition, orderNumber, status];
			console.log('player data    : ', playerData);


				playerModel.insertPlayer(playerData, function (err, result){
					if (err) return console.error('err : ', err);
					res.redirect('back');

				});

		} else{
			console.log('팀만들다 뭔가 실패여');
		}

	});

}
