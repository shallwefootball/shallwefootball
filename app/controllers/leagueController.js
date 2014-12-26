var leagueModel = require('../models/leagueModel');
	clubModel   = require('../models/clubModel');


exports.renderLeagueView = function (req, res) {

	// console.log('req.user        :   ', req.user);

	res.render('../views/league/league');
}

exports.leagueJson = function (req, res) {

	leagueModel.selectLeague(req.params.leagueId, req.user.userId,function (err, league) {

		res.json({league : league});
	});
}

exports.joinLeagueTeam = function (req, res) {

	//create Club
	// clubid(auto), leaderid, formation, temaid, leagueId
		// req.body.position,
		// req.body.squadNumber

	var data = [
		req.body.leaderId,
		req.body.teamId,
		'4-3-3',
		req.params.leagueId
	];

	console.log('data     : ', data);
	console.log('req.body.playerList     : ', typeof(req.body.playerList));
	console.log('req.body.playerList     : ', req.body.playerList);

	// clubModel.insertClub(data, function (err, result) {

	// 	//insert결과로 클럽아이디를 받습니다.
	// 	var userId = req.user.userId,
	// 		clubId = result.insertId,
	// 		squadNumber = req.body.squadNumber,
	// 		position = req.body.position,
	// 		matchPosition = req.body.position,
	// 		orderNumber = 0,
	// 		status = 'starting';

	// 	var playerData = [userId, clubId, squadNumber, position, matchPosition, orderNumber, status];
	// 	console.log('player data    : ', playerData);

	// 	playerModel.insertPlayer(playerData, function (err, result){
	// 		if (err) return console.error('err : ', err);
	// 		res.redirect('back');

	// 	});
	// 	//and insert player;

	// });



	// 	var leaderId = req.body.leaderId,
	// 	formation = "4-3-3",
	// 	leagueId = req.params.leagueId,
	// 	teamId = req.body.teamId;

	// var clubData = [ leaderId, formation, leagueId, teamId ];

	// console.log('clubData    : ', clubData);

}

