var leagueModel = require('../models/leagueModel');


exports.renderLeagueView = function (req, res) {

	// console.log('req.user        :   ', req.user);

	res.render('../views/league/league');
}
