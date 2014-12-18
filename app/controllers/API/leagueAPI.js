var leagueModel = require('../../models/leagueModel');

exports.selectLeague = function (req, res, next) {

	var locals   = res.locals;
	var leagueId = req.params.leagueId;

	leagueModel.selectLeague(leagueId, function (err, league) {
		locals.leagueId = leagueId;
		locals.community = league.community;
		locals.season = league.season;
		next();
	});

}