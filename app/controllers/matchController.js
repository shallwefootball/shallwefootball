var matchModel 	= require('../models/matchModel');
var leagueModel = require('../models/leagueModel');
var clubModel 	= require('../models/clubModel');

exports.renderMatchTimeLineView = function(req, res) {

	matchModel.selectMatches(req.params.leagueId, function(err, matches){
		var groupMatchCount = 0;
		var tournamentMatchCount = 0;

		for (var i = 0; i < matches.length; i++) {
			if(matches[i].matchName.substring(0, 1) == "제") {
				groupMatchCount++;
			}else {
				tournamentMatchCount++;
			}
		};

		leagueModel.selectLeague(req.params.leagueId, function (err, league) {

			clubModel.selectClubForLeagueInMatchController(req.params.leagueId, function (err, clubs) {

				res.render('../views/match/match', {
					matches 			 : matches,
					league 				 : league,
					groupMatchCount 	 : groupMatchCount,
					tournamentMatchCount : tournamentMatchCount,
					clubs				 : clubs
				});
			})

		})
	})
};

exports.renderMatchDetailView = function(req, res) {

};