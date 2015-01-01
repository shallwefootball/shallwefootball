var searchModel = require('../models/searchModel');

exports.player = function (req, res) {

	searchModel.selectLikePlayer(req.params.query, function (err, results) {

		res.json(results);
	});
}