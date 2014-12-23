var leagueModel = require('../models/leagueModel');


exports.renderLeagueView = function (req, res) {

	// console.log('req.user        :   ', req.user);

	res.render('../views/league/league');
}

exports.selectLeague = function (req, res) {


	leagueModel.selectLeague(req.params.leagueId, function (err, league) {

		res.json({league : league});
	});

}
